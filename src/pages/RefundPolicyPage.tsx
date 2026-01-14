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
            {/* Section 1 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">1. General Refund Principle</h3>
              <p className="text-muted-foreground">
                Opposia Ltd offers paid subscription plans. Unless otherwise required by law, all fees are non-refundable. This is because you pay for access to the platform and its features for a period of time, not for a specific result (such as finding a match).
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">2. Subscription Terms & Cancellation</h3>
              <div className="space-y-3 text-muted-foreground">
                <p><strong>2.1 Subscription Cycles:</strong> Subscriptions renew automatically at the end of each billing cycle (monthly or annual) unless you cancel before the renewal date.</p>
                <p><strong>2.2 How to Cancel:</strong> You can cancel automatic renewal at any time via your account settings. Cancellation stops future charges but does not trigger a refund for the current paid period.</p>
                <p><strong>2.3 Service After Cancellation:</strong> Your subscription will remain active until the end of the pre-paid period, after which your account will revert to free features (if available) or be deactivated.</p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">3. Exceptional Circumstances for Refund Consideration</h3>
              <p className="text-muted-foreground mb-4">We may, at our sole discretion, consider issuing a refund in the following exceptional circumstances:</p>
              <div className="space-y-3 text-muted-foreground">
                <div className="pl-4 border-l-2 border-primary/30">
                  <p><strong>Technical Failure:</strong> A significant, verified technical fault with the Opposia platform that prevented your reasonable use of the core paid services for a substantial portion of your subscription period.</p>
                </div>
                <div className="pl-4 border-l-2 border-primary/30">
                  <p><strong>Duplicate Charge:</strong> A demonstrable error where you were charged multiple times for the same subscription period.</p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">4. How to Request a Refund</h3>
              <div className="space-y-3 text-muted-foreground">
                <p><strong>4.1</strong> To request a refund under the exceptional circumstances in Section 3, you must contact <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a> within 14 days of the charge in question.</p>
                <p><strong>4.2</strong> You must provide your account username, the date and amount of the charge, and a detailed explanation and evidence supporting your request.</p>
                <p><strong>4.3</strong> We will review your request and notify you of our decision within 14 business days. If a refund is granted, it will be issued to the original payment method within 10 business days.</p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">5. Your Statutory Rights</h3>
              <p className="text-muted-foreground">
                This policy does not affect your statutory rights under UK consumer law, including your right to a refund if the services we provide are not as described, not of satisfactory quality, or not fit for purpose. For more information on your statutory rights, visit the{' '}
                <a href="https://www.citizensadvice.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Citizens Advice website
                </a>.
              </p>
            </div>

            {/* Section 6 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">6. Changes to this Policy</h3>
              <p className="text-muted-foreground">
                We may update this Refund Policy. Material changes will be communicated to users via email or platform notification.
              </p>
            </div>

            {/* Contact Section */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">Contact</h3>
              <div className="text-muted-foreground">
                <p className="font-medium">Opposia Ltd</p>
                <p>Company No. 16955158</p>
                <p>167–169 Great Portland Street, 5th Floor, London, W1W 5PF</p>
                <p className="mt-2">
                  <strong>Email:</strong>{' '}
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
