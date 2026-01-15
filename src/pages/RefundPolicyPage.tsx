import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Refund Policy</h1>
            <p className="text-lg text-muted-foreground">OPPOSIA LTD</p>
            <p className="text-sm text-muted-foreground mt-2">Version: 1.0 | Last Updated: 14/01/2026</p>
          </div>

          <div className="space-y-8">
            {/* Section 1 - Overview */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">1. Overview</h3>
              <p className="text-muted-foreground">
                Opposia Ltd offers paid subscriptions that provide access to premium features for a set period. Unless required by law, fees are non-refundable because you pay for time-limited access to features, not for any specific outcome (such as finding a match).
              </p>
            </div>

            {/* Section 2 - Subscriptions, Renewals, and Cancellation */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">2. Subscriptions, Renewals, and Cancellation (Email Only)</h3>
              <div className="space-y-3 text-muted-foreground">
                <p><strong>2.1 Auto-renewal.</strong> Subscriptions renew automatically at the end of each billing cycle (e.g., monthly or annual) unless you cancel before the renewal date.</p>
                <p><strong>2.2 How to cancel (email only).</strong> To cancel auto-renewal, you must email <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a> from the email address linked to your account and clearly state that you wish to cancel your subscription. We may request information to verify your account.</p>
                <p><strong>2.3 Cancellation timing.</strong> To avoid being charged for the next billing cycle, we must receive your cancellation email at least 48 hours before your renewal date/time (or such other timeframe stated at checkout). If you cancel after that point, your next renewal charge may still be processed.</p>
                <p><strong>2.4 Access after cancellation.</strong> If you cancel, your subscription benefits remain available until the end of the then-current paid period, after which your account will revert to free features (if available).</p>
                <p><strong>2.5 Confirmation.</strong> We will email a cancellation confirmation once processed. If you do not receive confirmation, please contact us again.</p>
              </div>
            </div>

            {/* Section 3 - UK/EU 14-Day Cancellation Right */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">3. UK/EU 14-Day Cancellation Right (Consumers)</h3>
              <p className="text-muted-foreground mb-4">
                If you are a consumer in the UK or EU/EEA and you purchase a subscription online, you may have a legal right to cancel within 14 days from the day after purchase (the "cooling-off period"), subject to rules for digital services.
              </p>
              <div className="space-y-3 text-muted-foreground">
                <p><strong>3.1 Starting the service immediately.</strong> If you request immediate access to premium features during the 14-day period, you agree that we can start supplying the service right away. If you then cancel within the 14-day period, you may be required to pay a proportionate amount for the service supplied up to cancellation, where allowed by law.</p>
                <p><strong>3.2 Digital content / immediate performance.</strong> Where the law allows the cooling-off right to be waived for certain digital content or immediate supply, we will only rely on that waiver where we have obtained your express consent and acknowledgement at checkout in the required form.</p>
              </div>
            </div>

            {/* Section 4 - Discretionary Refunds */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">4. Discretionary Refunds (Exceptional Circumstances)</h3>
              <p className="text-muted-foreground mb-4">In addition to any legal rights you may have, we may (at our sole discretion) consider refunds in limited cases such as:</p>
              <div className="space-y-3 text-muted-foreground">
                <div className="pl-4 border-l-2 border-primary/30">
                  <p><strong>4.1 Verified technical failure.</strong> A significant, verified technical issue that prevented reasonable use of core paid features for a substantial part of your paid period, and which we could not resolve within a reasonable time.</p>
                </div>
                <div className="pl-4 border-l-2 border-primary/30">
                  <p><strong>4.2 Duplicate or erroneous charge.</strong> You were charged more than once for the same subscription period, or charged in error.</p>
                </div>
                <div className="pl-4 border-l-2 border-primary/30">
                  <p><strong>4.3 Unauthorised payment.</strong> If you believe a payment was unauthorised, contact your bank/payment provider immediately and notify us. We may request evidence and may suspend the account to protect you and the platform.</p>
                </div>
              </div>
              <p className="text-muted-foreground mt-4">
                Discretionary refunds are not guaranteed. We do not refund for dissatisfaction with outcomes (e.g., not finding a match), user behaviour, or where you forgot to cancel.
              </p>
            </div>

            {/* Section 5 - How to Request a Refund */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">5. How to Request a Refund</h3>
              <div className="space-y-3 text-muted-foreground">
                <p><strong>5.1 Time limit.</strong> To request a discretionary refund under Section 4, email <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a> within 14 days of the charge.</p>
                <p><strong>5.2 Information required.</strong> Provide:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>the email/username linked to your account;</li>
                  <li>the date and amount of the charge;</li>
                  <li>the subscription type (monthly/annual);</li>
                  <li>a clear explanation and any supporting evidence (screenshots, error details, etc.).</li>
                </ul>
                <p><strong>5.3 Decision timeframe.</strong> We aim to respond within 14 business days. If approved, refunds are issued to the original payment method and may take 5–10 business days to appear, depending on your payment provider.</p>
              </div>
            </div>

            {/* Section 6 - Chargebacks */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">6. Chargebacks</h3>
              <p className="text-muted-foreground">
                If you initiate a chargeback without a valid basis, we may suspend or terminate your account and recover reasonable administrative costs where permitted by law. Chargebacks do not remove your obligation to pay valid charges.
              </p>
            </div>

            {/* Section 7 - Your Statutory Rights */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">7. Your Statutory Rights</h3>
              <p className="text-muted-foreground">
                Nothing in this Refund Policy limits your rights under applicable consumer law. In the UK, this includes rights where services are not provided with reasonable care and skill, are not as described, or where other statutory remedies apply.
              </p>
            </div>

            {/* Section 8 - Changes to This Policy */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">8. Changes to This Policy</h3>
              <p className="text-muted-foreground">
                We may update this Refund Policy from time to time. Material changes will be communicated via the platform and/or email. The "Last Updated" date will be revised. You can always find the current version at{' '}
                <Link to="/refund-policy" className="text-primary hover:underline">
                  opposia.com/refund-policy
                </Link>.
              </p>
            </div>

            {/* Contact Section */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">Contact</h3>
              <div className="text-muted-foreground">
                <p className="font-medium">Opposia Ltd</p>
                <p>167–169 Great Portland Street, 5th Floor, London, W1W 5PF</p>
                <p className="mt-2">
                  <strong>Support:</strong>{' '}
                  <a href="mailto:support@opposia.com" className="text-primary hover:underline">
                    support@opposia.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicyPage;
