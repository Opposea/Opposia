import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const TermsPage = () => {
  return <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-hero py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Please read these terms carefully before using our service.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">Terms and Conditions</h2>
            <p className="text-lg text-muted-foreground mb-8">Last updated: March 2024</p>
            
            <div className="space-y-8">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Acceptance of Terms</h3>
                <p className="text-muted-foreground">
                  By accessing and using Opposites Attract, you accept and agree to be bound by the terms and provisions of this agreement.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">User Conduct</h3>
                <p className="text-muted-foreground">
                  You agree to use our service respectfully and lawfully. Harassment, hate speech, or inappropriate behavior will result in immediate account termination.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Account Security</h3>
                <p className="text-muted-foreground">
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Content Ownership</h3>
                <p className="text-muted-foreground">
                  You retain ownership of the content you post, but grant us a license to use, display, and distribute that content on our platform.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Service Modifications</h3>
                <p className="text-muted-foreground">
                  We reserve the right to modify or discontinue our service at any time, with or without notice.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Limitation of Liability</h3>
                <p className="text-muted-foreground">
                  We are not liable for any damages arising from your use of our service or from any interactions with other users.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Contact Information</h3>
                <p className="text-muted-foreground">
                  For questions about these terms, please contact us at legal@opposia.co.uk
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
    </div>;
};
export default TermsPage;