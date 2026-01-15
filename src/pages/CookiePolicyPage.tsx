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
              <h3 className="text-xl font-semibold text-foreground mb-4">1. What Are Cookies and Similar Technologies?</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Cookies are small text files placed on your device. We may also use similar technologies (e.g., local storage). In this policy we refer to these collectively as "cookies" or "storage/access technologies".
                </p>
                <p>
                  Under PECR, storing or accessing information on a user's device generally requires consent unless strictly necessary for a service the user requests.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">2. What We Use (and Don't Use)</h3>
              <p className="text-muted-foreground mb-4">We use:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li><strong>Strictly necessary cookies</strong> to run the site, secure it, and remember cookie choices.</li>
                <li><strong>Authentication/session cookies</strong> (where applicable) to keep you logged in.</li>
              </ul>
              <p className="text-muted-foreground mb-4">We do not use:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>third-party advertising cookies; or</li>
                <li>social media tracking cookies.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">3. Analytics (Vercel) — Consent-Gated</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>We use:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>Vercel Web Analytics</strong> (traffic measurement) and</li>
                  <li><strong>Vercel Speed Insights</strong> (performance/Core Web Vitals).</li>
                </ul>
                <p>
                  Vercel states Web Analytics does not use third-party cookies and identifies visitors using a hash created from the incoming request, and session lifespan is discarded after 24 hours.
                </p>
                <p>
                  <strong>Our approach:</strong> to be conservative under PECR/ICO guidance, we only enable analytics after you opt in via our cookie/settings banner (even if the tool is "cookieless").
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">4. Cookie List (Examples)</h3>
              
              <h4 className="font-semibold text-foreground mb-3">Strictly necessary (always on)</h4>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-foreground font-semibold">Purpose</th>
                      <th className="text-left py-2 px-3 text-foreground font-semibold">Typical Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="py-2 px-3">Cookie preference record</td>
                      <td className="py-2 px-3">Up to 1 year</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3">Authentication/session cookies (may be set by Opposia and/or our auth provider, e.g., Supabase)</td>
                      <td className="py-2 px-3">Session / as required</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Security cookies</td>
                      <td className="py-2 px-3">Session</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="font-semibold text-foreground mb-3">Analytics (optional, requires opt-in)</h4>
              <p className="text-muted-foreground text-sm">
                Analytics may run without cookies, but still involves processing limited technical data (e.g., device/browser, IP-derived country/region). We treat this category as optional and only enable it with consent.
              </p>
            </div>

            {/* Section 5 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">5. Third Parties</h3>
              <p className="text-muted-foreground">
                Some cookies may be set by service providers we use to operate the Service (e.g., authentication/session providers). We do not permit third-party advertising cookies.
              </p>
            </div>

            {/* Section 6 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">6. Managing Your Preferences</h3>
              <p className="text-muted-foreground mb-4">You can manage cookies by:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>using the <Link to="/cookie-settings" className="text-primary hover:underline">Cookie Settings</Link> link (where available); and/or</li>
                <li>adjusting your browser controls to block/delete cookies.</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                <strong>Please note:</strong> Blocking strictly necessary cookies may break site features (e.g., login).
              </p>
              <p className="text-muted-foreground mt-4">
                Cookie Policy URL: <Link to="/cookie-policy" className="text-primary hover:underline">https://www.opposia.com/cookie-policy</Link>
              </p>
            </div>

            {/* Section 7 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">7. Changes</h3>
              <p className="text-muted-foreground">
                We may update this Cookie Policy for operational, legal, or regulatory reasons. Please review it periodically.
              </p>
            </div>

            {/* Section 8 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">8. Contact</h3>
              <div className="text-muted-foreground">
                <p><strong>Opposia Ltd</strong></p>
                <p className="mt-2">
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