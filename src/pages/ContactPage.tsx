import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-hero py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            We're here to help! Reach out to our team for support, questions, or business inquiries.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Get in Touch</h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              We'd love to hear from you! Whether you have questions, feedback, or need support, our team is here to help.
            </p>

            <div className="space-y-8">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Customer Support</h3>
                <p className="text-muted-foreground">
                  Email: support@oppositesattract.com<br />
                  Phone: 1-800-OPPOSITE<br />
                  Hours: Monday-Friday, 9AM-6PM EST
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Business Inquiries</h3>
                <p className="text-muted-foreground">
                  Email: business@oppositesattract.com
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Press & Media</h3>
                <p className="text-muted-foreground">
                  Email: press@oppositesattract.com
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Mailing Address</h3>
                <p className="text-muted-foreground">
                  Opposites Attract Inc.<br />
                  123 Love Street<br />
                  Romance City, RC 12345
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

export default ContactPage;
