import { useEffect, useRef, useState } from 'react';

interface TurnstileWidgetProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        'expired-callback'?: () => void;
        'error-callback'?: () => void;
        theme?: 'light' | 'dark' | 'auto';
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

const TurnstileWidget = ({ siteKey, onVerify, onExpire, onError }: TurnstileWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const renderWidget = () => {
      if (!containerRef.current || !window.turnstile || widgetIdRef.current) return;

      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            if (isMounted) {
              onVerify(token);
            }
          },
          'expired-callback': () => {
            if (isMounted && onExpire) {
              onExpire();
            }
          },
          'error-callback': () => {
            if (isMounted && onError) {
              onError();
            }
          },
          theme: 'auto',
        });
        if (isMounted) {
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to render Turnstile widget:', err);
        if (isMounted && onError) {
          onError();
        }
      }
    };

    const loadScript = () => {
      // If turnstile is already available, render immediately
      if (window.turnstile) {
        renderWidget();
        return;
      }

      // Check if script already exists
      const existingScript = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]');
      
      if (existingScript) {
        // Script exists, wait for it to load
        const checkInterval = setInterval(() => {
          if (window.turnstile) {
            clearInterval(checkInterval);
            renderWidget();
          }
        }, 100);

        // Clear interval after 10 seconds to prevent memory leak
        setTimeout(() => clearInterval(checkInterval), 10000);
        return;
      }

      // Create and load the script
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      
      script.onload = () => {
        // Wait a bit for turnstile to initialize
        const checkInterval = setInterval(() => {
          if (window.turnstile) {
            clearInterval(checkInterval);
            renderWidget();
          }
        }, 50);

        setTimeout(() => clearInterval(checkInterval), 5000);
      };

      script.onerror = () => {
        console.error('Failed to load Turnstile script');
        if (isMounted) {
          setIsLoading(false);
          if (onError) onError();
        }
      };

      document.head.appendChild(script);
    };

    loadScript();

    return () => {
      isMounted = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (err) {
          // Ignore errors during cleanup
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onVerify, onExpire, onError]);

  return (
    <div className="flex justify-center my-4">
      <div ref={containerRef} />
      {isLoading && (
        <div className="text-sm text-muted-foreground">Loading security check...</div>
      )}
    </div>
  );
};

export default TurnstileWidget;
