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
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const LOAD_TIMEOUT_MS = 8000;

const TurnstileWidget = ({ siteKey, onVerify, onExpire, onError }: TurnstileWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: number | undefined;
    let checkIntervalId: number | undefined;

    const fail = () => {
      if (!isMounted) return;
      setIsLoading(false);
      setLoadFailed(true);
      onError?.();
    };

    const renderWidget = () => {
      if (!containerRef.current || !window.turnstile || widgetIdRef.current) return;

      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            if (!isMounted) return;
            setLoadFailed(false);
            onVerify(token);
          },
          'expired-callback': () => {
            if (!isMounted) return;
            onExpire?.();
          },
          'error-callback': () => {
            fail();
          },
          theme: 'auto',
        });

        if (isMounted) {
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to render Turnstile widget:', err);
        fail();
      }
    };

    const waitForTurnstileThenRender = () => {
      // Start global timeout so we don't spin forever
      timeoutId = window.setTimeout(() => {
        if (!window.turnstile) {
          console.error('Turnstile did not initialize (CSP/adblock/domain misconfig likely)');
          fail();
        }
      }, LOAD_TIMEOUT_MS);

      // Poll briefly for the script to initialize window.turnstile
      checkIntervalId = window.setInterval(() => {
        if (window.turnstile) {
          if (timeoutId) window.clearTimeout(timeoutId);
          if (checkIntervalId) window.clearInterval(checkIntervalId);
          renderWidget();
        }
      }, 50);
    };

    // If turnstile is already available, render immediately
    if (window.turnstile) {
      renderWidget();
      return () => {
        isMounted = false;
      };
    }

    // Ensure script is present
    let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = TURNSTILE_SCRIPT_SRC;
      script.async = true;
      script.onload = () => waitForTurnstileThenRender();
      script.onerror = () => {
        console.error('Failed to load Turnstile script (blocked by CSP/adblock?)');
        fail();
      };
      document.head.appendChild(script);
    }

    // If script exists already, start waiting immediately
    waitForTurnstileThenRender();

    return () => {
      isMounted = false;
      if (timeoutId) window.clearTimeout(timeoutId);
      if (checkIntervalId) window.clearInterval(checkIntervalId);

      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore cleanup errors
        }
      }
      widgetIdRef.current = null;
    };
  }, [siteKey, onVerify, onExpire, onError]);

  return (
    <div className="my-4 flex flex-col items-center justify-center gap-2">
      <div ref={containerRef} />
      {isLoading && <div className="text-sm text-muted-foreground">Loading security check…</div>}
      {loadFailed && (
        <div className="text-sm text-muted-foreground">
          Security check couldn’t load (blocked by CSP/ad blocker or domain not allowed).
        </div>
      )}
    </div>
  );
};

export default TurnstileWidget;
