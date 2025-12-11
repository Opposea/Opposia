import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

export type CookieConsent = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: string;
};

const defaultConsent: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
  functional: false,
  timestamp: "",
};

export const getCookieConsent = (): CookieConsent | null => {
  const stored = localStorage.getItem("cookieConsent");
  return stored ? JSON.parse(stored) : null;
};

export const setCookieConsent = (consent: CookieConsent) => {
  localStorage.setItem("cookieConsent", JSON.stringify(consent));
};

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsent>(defaultConsent);

  useEffect(() => {
    const existingConsent = getCookieConsent();
    if (!existingConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent: CookieConsent = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString(),
    };
    setCookieConsent(consent);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const consent: CookieConsent = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString(),
    };
    setCookieConsent(consent);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const consent: CookieConsent = {
      ...preferences,
      essential: true,
      timestamp: new Date().toISOString(),
    };
    setCookieConsent(consent);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">We Value Your Privacy</h2>
          </div>

          {!showPreferences ? (
            <>
              <p className="text-muted-foreground mb-4">
                We use cookies to make our site work securely and to understand how it is used. Some cookies are essential, while others help us improve your experience. You can choose to accept or reject non-essential cookies.
              </p>
              <p className="text-muted-foreground mb-6 text-sm">
                <strong>Essential cookies are always active.</strong> They are necessary for the website's basic functions and security. You can set your browser to block them, but some site features may not work.
              </p>

              <div className="flex flex-wrap gap-3 mb-4">
                <Button onClick={handleAcceptAll} variant="magnetic" size="lg">
                  Accept All
                </Button>
                <Button onClick={handleRejectAll} variant="outline" size="lg">
                  Reject All
                </Button>
                <Button onClick={() => setShowPreferences(true)} variant="ghost" size="lg">
                  Preferences
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                You can change your consent choices at any time by clicking the "Cookie Settings" link in our website footer.
                For more details, please read our{" "}
                <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </>
          ) : (
            <>
              <p className="text-muted-foreground mb-6">
                Manage your cookie preferences below. Essential cookies cannot be disabled as they are required for the website to function.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-foreground">Essential Cookies</h3>
                    <p className="text-sm text-muted-foreground">Required for basic site functionality and security</p>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">Always Active</div>
                </div>

                <label className="flex items-center justify-between p-4 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors">
                  <div>
                    <h3 className="font-semibold text-foreground">Analytics Cookies</h3>
                    <p className="text-sm text-muted-foreground">Help us understand how visitors use our site</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors">
                  <div>
                    <h3 className="font-semibold text-foreground">Marketing Cookies</h3>
                    <p className="text-sm text-muted-foreground">Used to deliver relevant advertisements</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors">
                  <div>
                    <h3 className="font-semibold text-foreground">Functional Cookies</h3>
                    <p className="text-sm text-muted-foreground">Enable enhanced functionality and personalization</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                    className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                  />
                </label>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button onClick={handleSavePreferences} variant="magnetic" size="lg">
                  Save Preferences
                </Button>
                <Button onClick={() => setShowPreferences(false)} variant="ghost" size="lg">
                  Back
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
