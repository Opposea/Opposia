# Paywall & Subscription Rollout Plan (Grandfathering Existing Users)

## Overview
- **Goal:** Grandfather existing users into free unlimited access and introduce a paywall for new signups after the cutoff.
- **Cutoff date:** **10 February** (2026 assumed; adjust year as needed).
- **Trial:** 3-day free trial for new signups.
- **Plans:** Monthly and annual subscriptions.

## Definitions
- **Grandfathered user:** Any account created before the cutoff date.
- **New user:** Any account created on or after the cutoff date.
- **Entitlement status:** A server-side evaluation that determines whether a user has full access.

## Proposed Entitlement Logic
1. **If `profiles.created_at` < cutoff:** grant unlimited access.
2. **Else if subscription status is `trialing` or `active`:** grant access.
3. **Else:** show paywall and restrict premium features.

## Data Model (to be implemented later)
### Option A: Minimal (time-based)
- Use `profiles.created_at` with a fixed cutoff date.
- No schema changes required.
- Harder to override per-user without code changes.

### Option B: Explicit entitlements (recommended)
- Add `is_grandfathered` flag in `profiles` OR create an `entitlements` table.
- Track:
  - `is_grandfathered`
  - `subscription_status` (trialing/active/past_due/canceled/ended)
  - `trial_ends_at`
  - `subscription_ends_at`
  - `stripe_customer_id`
  - `stripe_subscription_id`

## Stripe Implementation (when ready)
- Create subscription-mode Checkout Sessions with a 3-day trial.
- Webhooks to sync subscription status to Supabase.
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`

## Rollout Steps
1. **Before 10 February**
   - Implement entitlement checks in server/RLS logic (if not already).
   - Add database schema for entitlements (Option B).
   - Prepare Stripe products/prices for monthly and annual plans.
   - Confirm legal copy in Terms/Refund policies aligns with trial + auto-renew.
2. **On 10 February**
   - Enable paywall for new signups (created_at >= cutoff).
   - Ensure grandfathered users are exempt.
3. **After launch**
   - Monitor trial conversion, churn, and support tickets.
   - Add administrative tooling to override entitlement if needed.

## Decision Log
- **Cutoff date:** 10 February (to grandfather existing users).
- **Trial length:** 3 days.
- **Plans:** Monthly and annual.
