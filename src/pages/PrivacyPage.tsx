import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-hero py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Your privacy is our priority. Learn how we collect, use, and protect your personal information.
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
                <h3 className="text-xl font-semibold text-foreground mb-3">1. Who We Are</h3>
                <p className="text-muted-foreground">
                  This website, Opposia.com is operated temporarily by a sole trader based in Cheshire. She is the data controller for the personal data collected through this site if for any reason you need more information on the websites admin please contact support@opposia.com
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">2. The Information We Collect</h3>
                <p className="text-muted-foreground mb-4">
                  We collect and process the following information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Information You Provide:</strong> Your email address, sexual preferences, sexuality, gender, age verification, location and profile picture all of which essential for the sites functionality for matchmaking.</li>
                  <li><strong>Sexual Orientation Data:</strong> Processing of your sexual orientation is essential for showing you potential matches within your stated preference. This special category data under UK GDPR is collected with your explicit consent and processed solely for providing relevant matching services. Without this information, we cannot provide our core matchmaking functionality.</li>
                  <li><strong>Information Collected Automatically:</strong> When you visit our site, we may automatically collect limited technical data such as your IP address, browser type, and pages visited. This is standard for most web servers and may be used for security and basic operational purposes.</li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h3>
                <p className="text-muted-foreground mb-4">
                  We use your personal information for the following purposes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>To communicate with you about our dating site and provide early access updates.</li>
                  <li>To operate, secure, and maintain our website.</li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">4. Legal Basis for Processing (UK GDPR)</h3>
                <p className="text-muted-foreground">
                  We process your email address based on the consent you provide when signing up. You can withdraw this consent at any time by contacting us or using the unsubscribe link in our emails.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">5. Data Sharing and Third Parties</h3>
                <p className="text-muted-foreground">
                  We do not sell your personal data. We may share minimal technical data (like IP addresses) with our website hosting provider which is necessary for the site to function. We may use analytics tools, and seek your consent for any non-essential tracking.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">6. Data Security and Retention</h3>
                <p className="text-muted-foreground">
                  We implement appropriate measures to protect your data. We will retain your email address until you cancel or delete the account, after which it will be securely deleted.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">7. Your Data Protection Rights</h3>
                <p className="text-muted-foreground">
                  Under UK data protection law, you have rights including the right to access, correct, or request erasure of your personal data. To exercise these rights, please contact us at support@opposia.com
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">8. Cookies</h3>
                <p className="text-muted-foreground">
                  Our use of cookies and tracking technologies is explained in our Cookie Banner and separate Cookie Policy.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">9. Contact Us</h3>
                <p className="text-muted-foreground">
                  For any questions about this privacy policy or your data, please contact:<br />
                  <strong>Opposia</strong><br />
                  <a href="mailto:support@opposia.com" className="text-primary hover:underline">Support@opposia.com</a>
                </p>
              </div>
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

export default PrivacyPage;
