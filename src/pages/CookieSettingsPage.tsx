import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getCookieConsent, setCookieConsent, CookieConsent } from "@/components/CookieBanner";

const CookieSettingsPage = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<CookieConsent>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false,
    timestamp: "",
  });

  useEffect(() => {
    const existingConsent = getCookieConsent();
    if (existingConsent) {
      setPreferences(existingConsent);
    }
  }, []);

  const handleSave = () => {
    const consent: CookieConsent = {
      ...preferences,
      essential: true,
      timestamp: new Date().toISOString(),
    };
    setCookieConsent(consent);
    toast({
      title: "Preferences Saved",
      description: "Your cookie preferences have been updated.",
    });
  };

  const handleAcceptAll = () => {
    const consent: CookieConsent = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString(),
    };
    setPreferences(consent);
    setCookieConsent(consent);
    toast({
      title: "All Cookies Accepted",
      description: "You have accepted all cookies.",
    });
  };

  const handleRejectAll = () => {
    const consent: CookieConsent = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString(),
    };
    setPreferences(consent);
    setCookieConsent(consent);
    toast({
      title: "Non-Essential Cookies Rejected",
      description: "Only essential cookies are now active.",
    });
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-hero py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Cookie Settings
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Manage your cookie preferences and control how we use cookies on our site.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card p-8 rounded-lg border mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Your Cookie Preferences</h2>
              <p className="text-muted-foreground mb-6">
                Use the toggles below to manage your cookie preferences. Essential cookies cannot be disabled as they are required for the website to function properly.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Essential Cookies</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions made by you such as setting your privacy preferences, logging in, or filling in forms.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="w-5 h-5 rounded border-border text-primary opacity-50 cursor-not-allowed"
                    />
                  </div>
                </div>

                <label className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border cursor-pointer hover:bg-muted/70 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Analytics Cookies</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us understand which pages are the most and least popular.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="w-5 h-5 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border cursor-pointer hover:bg-muted/70 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Marketing Cookies</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant adverts on other sites.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                      className="w-5 h-5 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border cursor-pointer hover:bg-muted/70 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Functional Cookies</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third-party providers whose services we have added to our pages.
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                      className="w-5 h-5 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                  </div>
                </label>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button onClick={handleSave} variant="magnetic" size="lg">
                  Save Preferences
                </Button>
                <Button onClick={handleAcceptAll} variant="outline" size="lg">
                  Accept All
                </Button>
                <Button onClick={handleRejectAll} variant="ghost" size="lg">
                  Reject All
                </Button>
              </div>
            </div>

            <div className="text-center text-muted-foreground">
              <p>
                For more information about how we use cookies, please read our{" "}
                <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
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

export default CookieSettingsPage;
