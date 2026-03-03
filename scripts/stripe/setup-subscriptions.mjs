#!/usr/bin/env node

const STRIPE_API_BASE = 'https://api.stripe.com/v1';

const config = {
  productName: process.env.STRIPE_PRODUCT_NAME ?? 'Opposia Premium Subscription',
  productId: process.env.STRIPE_PRODUCT_ID ?? null,
  currency: 'gbp',
  monthlyAmount: 1299,
  annualAmount: 6292,
  monthlyLookupKey: 'opposia_premium_monthly_gbp',
  annualLookupKey: 'opposia_premium_annual_gbp',
  paywallDate: '2026-01-26',
};

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error('Missing STRIPE_SECRET_KEY in environment.');
  process.exit(1);
}

const buildFormBody = (params) => {
  const body = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item) => body.append(`${key}[]`, String(item)));
      return;
    }
    body.append(key, String(value));
  });
  return body;
};

const stripeRequest = async (path, { method = 'GET', body, idempotencyKey } = {}) => {
  const headers = {
    Authorization: `Bearer ${stripeSecretKey}`,
  };

  if (body) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  if (idempotencyKey) {
    headers['Idempotency-Key'] = idempotencyKey;
  }

  const response = await fetch(`${STRIPE_API_BASE}${path}`, {
    method,
    headers,
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message ?? 'Stripe API error');
  }

  return data;
};

const findPriceByLookupKey = async (lookupKey) => {
  const body = buildFormBody({ limit: 1, 'lookup_keys[]': lookupKey, active: true });
  const data = await stripeRequest(`/prices?${body.toString()}`);
  return data?.data?.[0] ?? null;
};

const ensureProduct = async () => {
  if (config.productId) {
    return config.productId;
  }

  const body = buildFormBody({
    name: config.productName,
    description: 'Premium access subscription for Opposia.',
    'metadata[paywall_date]': config.paywallDate,
  });

  const product = await stripeRequest('/products', {
    method: 'POST',
    body,
    idempotencyKey: `opposia-product-${config.paywallDate}`,
  });

  return product.id;
};

const ensurePrice = async ({
  lookupKey,
  nickname,
  unitAmount,
  interval,
  intervalCount,
  productId,
}) => {
  const existing = await findPriceByLookupKey(lookupKey);
  if (existing) {
    return existing;
  }

  const body = buildFormBody({
    unit_amount: unitAmount,
    currency: config.currency,
    'recurring[interval]': interval,
    'recurring[interval_count]': intervalCount,
    product: productId,
    lookup_key: lookupKey,
    nickname,
    'metadata[paywall_date]': config.paywallDate,
    'metadata[billing_cycle]': interval === 'month' ? 'monthly' : 'annual',
  });

  return stripeRequest('/prices', {
    method: 'POST',
    body,
    idempotencyKey: `${lookupKey}-${unitAmount}`,
  });
};

const main = async () => {
  const productId = await ensureProduct();

  const monthlyPrice = await ensurePrice({
    lookupKey: config.monthlyLookupKey,
    nickname: 'Opposia Premium Monthly',
    unitAmount: config.monthlyAmount,
    interval: 'month',
    intervalCount: 1,
    productId,
  });

  const annualPrice = await ensurePrice({
    lookupKey: config.annualLookupKey,
    nickname: 'Opposia Premium Annual',
    unitAmount: config.annualAmount,
    interval: 'year',
    intervalCount: 1,
    productId,
  });

  const summary = {
    productId,
    paywallDate: config.paywallDate,
    monthly: {
      priceId: monthlyPrice.id,
      unitAmount: monthlyPrice.unit_amount,
      currency: monthlyPrice.currency,
      lookupKey: monthlyPrice.lookup_key,
    },
    annual: {
      priceId: annualPrice.id,
      unitAmount: annualPrice.unit_amount,
      currency: annualPrice.currency,
      lookupKey: annualPrice.lookup_key,
    },
    reminder: 'Apply a 3-day trial in Checkout or subscription creation for signups after 2026-01-26.',
  };

  console.log(JSON.stringify(summary, null, 2));
};

main().catch((error) => {
  console.error('Failed to set up Stripe subscriptions:', error.message);
  process.exit(1);
});
