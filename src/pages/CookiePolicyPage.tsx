import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-hero py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Cookie Policy
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Learn about how we use cookies and similar technologies on our website.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8">Last Updated: December 2025</p>
            
            <div className="space-y-8">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">1. What Are Cookies?</h3>
                <p className="text-muted-foreground">
                  Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site. Cookies help us remember your preferences, understand how you use our site, and improve your overall experience.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">2. How We Use Cookies</h3>
                <p className="text-muted-foreground mb-4">
                  We use cookies for the following purposes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Essential Operations:</strong> To enable basic website functionality and security features.</li>
                  <li><strong>Authentication:</strong> To keep you logged in and maintain your session.</li>
                  <li><strong>Preferences:</strong> To remember your settings and preferences.</li>
                  <li><strong>Analytics:</strong> To understand how visitors interact with our website (only with your consent).</li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">3. Types of Cookies We Use</h3>
                
                <div className="space-y-4 mt-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-foreground">Essential Cookies</h4>
                    <p className="text-muted-foreground text-sm mt-1">
                      These cookies are strictly necessary for the website to function. They enable core functionality such as security, network management, and accessibility. You cannot opt out of these cookies.
                    </p>
                    <div className="mt-2 text-sm">
                      <table className="w-full text-muted-foreground">
                        <tbody>
                          <tr className="border-b border-border">
                            <td className="py-2 font-medium">Cookie Consent</td>
                            <td className="py-2">Stores your cookie preferences</td>
                            <td className="py-2">1 year</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="py-2 font-medium">Authentication</td>
                            <td className="py-2">Maintains your logged-in session</td>
                            <td className="py-2">Session</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">Security</td>
                            <td className="py-2">Helps protect against security threats</td>
                            <td className="py-2">Session</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-foreground">Analytics Cookies</h4>
                    <p className="text-muted-foreground text-sm mt-1">
                      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our services.
                    </p>
                    <p className="text-muted-foreground text-sm mt-2">
                      <strong>Status:</strong> Only active with your consent
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-foreground">Marketing Cookies</h4>
                    <p className="text-muted-foreground text-sm mt-1">
                      These cookies may be set through our site by advertising partners. They may be used to build a profile of your interests and show you relevant advertisements on other sites.
                    </p>
                    <p className="text-muted-foreground text-sm mt-2">
                      <strong>Status:</strong> Only active with your consent. We currently do not use marketing cookies.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-foreground">Functional Cookies</h4>
                    <p className="text-muted-foreground text-sm mt-1">
                      These cookies enable enhanced functionality and personalisation, such as remembering your preferences and settings.
                    </p>
                    <p className="text-muted-foreground text-sm mt-2">
                      <strong>Status:</strong> Only active with your consent
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">4. Third-Party Cookies</h3>
                <p className="text-muted-foreground">
                  Some cookies on our site are set by third-party services. These include our hosting provider (Supabase) which is necessary for the site to function. We do not currently use third-party advertising or social media tracking cookies.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">5. Managing Your Cookie Preferences</h3>
                <p className="text-muted-foreground mb-4">
                  You can manage your cookie preferences at any time by:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Visiting our <Link to="/cookie-settings" className="text-primary hover:underline">Cookie Settings</Link> page</li>
                  <li>Clicking the "Cookie Settings" link in our website footer</li>
                  <li>Adjusting your browser settings to block or delete cookies</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Please note that blocking essential cookies may affect the functionality of our website.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">6. Browser Cookie Controls</h3>
                <p className="text-muted-foreground mb-4">
                  Most web browsers allow you to control cookies through their settings. Here are links to manage cookies in popular browsers:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">7. Changes to This Policy</h3>
                <p className="text-muted-foreground">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this page periodically for the latest information on our cookie practices.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">8. Contact Us</h3>
                <p className="text-muted-foreground">
                  If you have any questions about our use of cookies, please contact us at:<br />
                  <strong>Opposia</strong><br />
                  <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a>
                </p>
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
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-20 bg-muted text-center">
        <Link to="/">
          <Button variant="magnetic" size="lg">
            Back to Home
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default CookiePolicyPage;
