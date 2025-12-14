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
    <div className="fixed inset-0 z-50 flex items-end justify-center p-3 bg-black/40">
      <div className="w-full max-w-lg bg-card border border-border rounded-xl shadow-xl animate-in slide-in-from-bottom-4 duration-300">
        <div className="p-4">
          <h2 className="text-base font-semibold text-foreground mb-2">We Value Your Privacy</h2>

          {!showPreferences ? (
            <>
              <p className="text-sm text-muted-foreground mb-3">
                We use cookies to make our site work securely. Essential cookies are always active.{" "}
                <Link to="/cookie-policy" className="text-primary hover:underline">Learn more</Link>
              </p>

              <div className="flex flex-wrap gap-2">
                <Button onClick={handleAcceptAll} variant="magnetic" size="sm">
                  Accept All
                </Button>
                <Button onClick={handleRejectAll} variant="outline" size="sm">
                  Reject All
                </Button>
                <Button onClick={() => setShowPreferences(true)} variant="ghost" size="sm">
                  Preferences
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md text-sm">
                  <span className="font-medium text-foreground">Essential</span>
                  <span className="text-xs text-muted-foreground">Always Active</span>
                </div>

                <label className="flex items-center justify-between p-2 bg-muted/50 rounded-md cursor-pointer hover:bg-muted/70 transition-colors text-sm">
                  <span className="font-medium text-foreground">Analytics</span>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between p-2 bg-muted/50 rounded-md cursor-pointer hover:bg-muted/70 transition-colors text-sm">
                  <span className="font-medium text-foreground">Marketing</span>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between p-2 bg-muted/50 rounded-md cursor-pointer hover:bg-muted/70 transition-colors text-sm">
                  <span className="font-medium text-foreground">Functional</span>
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                </label>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button onClick={handleSavePreferences} variant="magnetic" size="sm">
                  Save
                </Button>
                <Button onClick={() => setShowPreferences(false)} variant="ghost" size="sm">
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
