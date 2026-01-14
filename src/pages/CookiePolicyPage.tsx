import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Cookie Policy</h1>
            <p className="text-lg text-muted-foreground">OPPOSIA LTD</p>
            <p className="text-sm text-muted-foreground mt-2">Last Updated: December 2025</p>
          </div>

          <div className="space-y-8">
            {/* Section 1 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">1. What Are Cookies?</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Cookies are small text files placed on your device when you visit a website. Cookies help websites function, remember preferences, and (where permitted) improve performance.
                </p>
                <p>
                  We may also use similar technologies (such as local storage). In this policy, we refer to these collectively as "cookies".
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">2. How We Use Cookies</h3>
              <p className="text-muted-foreground mb-4">We use cookies for:</p>
              <div className="space-y-3 text-muted-foreground">
                <div className="pl-4 border-l-2 border-primary/30">
                  <p><strong>Strictly Necessary (Essential):</strong> to enable core website functionality and security, including remembering your cookie choices.</p>
                </div>
                <div className="pl-4 border-l-2 border-primary/30">
                  <p><strong>Authentication (where applicable):</strong> to keep you logged in and maintain your session.</p>
                </div>
                <div className="pl-4 border-l-2 border-primary/30">
                  <p><strong>Analytics (no cookies):</strong> we use Vercel Web Analytics to understand overall site usage and improve performance. Vercel Web Analytics is designed to operate without third-party cookies and stores anonymised analytics data.</p>
                </div>
                <div className="pl-4 border-l-2 border-primary/30">
                  <p><strong>Marketing:</strong> we do not use marketing/advertising cookies.</p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">3. Analytics and Performance Measurement (Vercel)</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>We use:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>Vercel Web Analytics</strong> to measure website usage in a privacy-focused way (designed not to use third-party cookies).</li>
                  <li><strong>Vercel Speed Insights</strong> to measure performance (Core Web Vitals) in a way intended not to identify users or reconstruct browsing sessions across pages.</li>
                </ul>
                <p>
                  These tools may still involve processing limited technical information as part of normal web requests (for example device/browser information and approximate location such as country), but are designed to avoid traditional cookie-based tracking.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">4. Cookies We Use (Cookie List)</h3>
              <p className="text-muted-foreground mb-4">We maintain a list of cookies used on our website. This list may change as we update the Service.</p>
              
              <h4 className="font-semibold text-foreground mb-3">Strictly Necessary Cookies (Always On)</h4>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-foreground font-semibold">Purpose</th>
                      <th className="text-left py-2 px-3 text-foreground font-semibold">Example</th>
                      <th className="text-left py-2 px-3 text-foreground font-semibold">Typical Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="py-2 px-3">Store cookie preferences</td>
                      <td className="py-2 px-3">Cookie preference record</td>
                      <td className="py-2 px-3">Up to 1 year</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3">Authentication/session (where applicable)</td>
                      <td className="py-2 px-3">Session/auth cookies (may be set by Opposia and/or Supabase)</td>
                      <td className="py-2 px-3">Session / as required</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Security</td>
                      <td className="py-2 px-3">Security-related cookies</td>
                      <td className="py-2 px-3">Session</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="font-semibold text-foreground mb-3">Analytics Cookies</h4>
              <p className="text-muted-foreground text-sm italic">
                As noted above, we use Vercel Web Analytics which is designed to operate without third-party cookies.
              </p>
            </div>

            {/* Section 5 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">5. Third-Party Cookies</h3>
              <p className="text-muted-foreground">
                Some cookies may be set by third-party service providers we use to operate the website (for example authentication/session services such as Supabase, where applicable). We do not use third-party advertising or social media tracking cookies.
              </p>
            </div>

            {/* Section 6 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">6. Managing Your Cookie Preferences</h3>
              <p className="text-muted-foreground mb-4">You can manage cookies by:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Visiting this page: <Link to="/cookie-policy" className="text-primary hover:underline">https://www.opposia.com/cookie-policy</Link></li>
                <li>Using the <Link to="/cookie-settings" className="text-primary hover:underline">Cookie Settings</Link> link in the website footer (if available); and/or</li>
                <li>Adjusting your browser settings to block or delete cookies.</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                <strong>Please note:</strong> blocking strictly necessary cookies may affect website functionality (for example logging in).
              </p>
            </div>

            {/* Section 7 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">7. Changes to This Policy</h3>
              <p className="text-muted-foreground">
                We may update this Cookie Policy to reflect changes in our practices or for operational, legal, or regulatory reasons. Please review this page periodically.
              </p>
            </div>

            {/* Section 8 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">8. Contact Us</h3>
              <div className="text-muted-foreground">
                <p>If you have questions about cookies, contact:</p>
                <p className="mt-2">
                  <strong>Opposia Ltd</strong><br />
                  Company No. 16955158<br />
                  167–169 Great Portland Street, 5th Floor, London, W1W 5PF<br />
                  <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20 text-center">
            <p className="text-foreground font-medium mb-4">Want to update your cookie preferences?</p>
            <Link to="/cookie-settings">
              <Button variant="magnetic" size="lg">
                Manage Cookie Settings
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicyPage;
