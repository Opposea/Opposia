import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-hero py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Help Center
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Find answers to frequently asked questions and get the support you need.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">How does the compatibility quiz work?</h3>
                <p className="text-muted-foreground">
                  Our quiz analyzes your personality traits, values, and preferences to match you with compatible partners who complement your unique qualities.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Is my personal information secure?</h3>
                <p className="text-muted-foreground">
                  Yes, we use industry-standard encryption and security measures to protect your personal data and conversations.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">How do I update my profile?</h3>
                <p className="text-muted-foreground">
                  You can update your profile information anytime by visiting your profile page and clicking the edit button.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">How do I report a user?</h3>
                <p className="text-muted-foreground">
                  If you encounter inappropriate behavior or need to report a user, please visit their profile and use the block/report feature, or contact our support team directly at support@opposia.co.uk with details of the incident.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">How can I contact support?</h3>
                <p className="text-muted-foreground">
                  For general inquiries, feedback, or support questions, please email us at <a href="mailto:support@opposia.co.uk" className="text-primary hover:underline">support@opposia.co.uk</a>. We aim to respond to all inquiries within 24-48 hours.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">How do I provide feedback?</h3>
                <p className="text-muted-foreground">
                  We'd love to hear your thoughts! Send your feedback, suggestions, or feature requests to support@opposia.co.uk. Your input helps us improve the app for everyone.
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

export default HelpPage;
