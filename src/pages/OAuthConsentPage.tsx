import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, User, Heart, MessageCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import logo from '@/assets/opposia-logo-new.png';

const buildAllowedRedirectOrigins = () => {
  const originSet = new Set<string>();
  const envOrigins = import.meta.env.VITE_OAUTH_ALLOWED_REDIRECT_ORIGINS as string | undefined;

  if (envOrigins) {
    envOrigins
      .split(',')
      .map(origin => origin.trim())
      .filter(Boolean)
      .forEach(origin => originSet.add(origin));
  }

  if (typeof window !== 'undefined') {
    originSet.add(window.location.origin);
  }

  return originSet;
};

const isSafeRedirect = (url: URL, allowedOrigins: Set<string>) => {
  const isLocalhost = ['localhost', '127.0.0.1'].includes(url.hostname);
  const protocolAllowed = url.protocol === 'https:' || (url.protocol === 'http:' && isLocalhost);
  return protocolAllowed && allowedOrigins.has(url.origin);
};

const OAuthConsentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();
  const [consents, setConsents] = useState({
    profile: true,
    email: true,
    matches: false,
    messages: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const clientId = searchParams.get('client_id');
  const redirectUri = searchParams.get('redirect_uri');
  const scope = searchParams.get('scope') || 'profile email';
  const state = searchParams.get('state');
  const responseType = searchParams.get('response_type');
  const allowedRedirectOrigins = buildAllowedRedirectOrigins();

  const redirectValidation = (() => {
    if (!redirectUri) {
      return { url: null, error: 'Missing redirect_uri parameter.' };
    }

    try {
      const parsed = new URL(redirectUri);

      if (!isSafeRedirect(parsed, allowedRedirectOrigins)) {
        return { url: null, error: 'Redirect URI is not allowlisted.' };
      }

      return { url: parsed, error: null };
    } catch {
      return { url: null, error: 'Redirect URI is invalid.' };
    }
  })();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      const currentUrl = window.location.href;
      navigate(`/auth?redirect=${encodeURIComponent(currentUrl)}`);
    }
  }, [user, loading, navigate]);

  // Parse requested scopes
  const requestedScopes = scope.split(' ').filter(Boolean);

  const scopeDetails = [
    {
      id: 'profile',
      name: 'Profile Information',
      description: 'Access your name, profile picture, and basic information',
      icon: User,
      required: true,
    },
    {
      id: 'email',
      name: 'Email Address',
      description: 'Access your email address for communication',
      icon: Shield,
      required: true,
    },
    {
      id: 'matches',
      name: 'Match Data',
      description: 'View your matches and compatibility information',
      icon: Heart,
      required: false,
    },
    {
      id: 'messages',
      name: 'Messages',
      description: 'Read and send messages on your behalf',
      icon: MessageCircle,
      required: false,
    },
  ];

  const filteredScopes = scopeDetails.filter(s => requestedScopes.includes(s.id));

  const handleConsent = async (approved: boolean) => {
    setIsProcessing(true);
    const safeRedirect = redirectValidation.url;

    if (!approved) {
      // User denied - redirect back with error
      if (safeRedirect) {
        const errorUrl = new URL(safeRedirect.toString());
        errorUrl.searchParams.set('error', 'access_denied');
        errorUrl.searchParams.set('error_description', 'User denied the authorization request');
        if (state) errorUrl.searchParams.set('state', state);
        window.location.href = errorUrl.toString();
      } else {
        navigate('/');
      }
      return;
    }

    // User approved - in a real implementation, this would:
    // 1. Generate an authorization code
    // 2. Store the consent in the database
    // 3. Redirect with the code
    
    // For now, simulate success
    if (safeRedirect) {
      const successUrl = new URL(safeRedirect.toString());
      // In production, this would be a real authorization code
      successUrl.searchParams.set('code', 'demo_authorization_code');
      if (state) successUrl.searchParams.set('state', state);
      window.location.href = successUrl.toString();
    } else {
      navigate('/profile');
    }
  };

  const toggleConsent = (scopeId: string) => {
    setConsents(prev => ({
      ...prev,
      [scopeId]: !prev[scopeId as keyof typeof prev],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!clientId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle>Invalid Request</CardTitle>
            <CardDescription>
              This authorization request is missing required parameters. Please try again from the application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (responseType !== 'code' || redirectValidation.error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle>Invalid Request</CardTitle>
            <CardDescription>
              This authorization request contains unsupported or invalid parameters. Please contact the application
              owner.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {responseType !== 'code' && <p>Unsupported response_type. Only "code" is allowed.</p>}
              {redirectValidation.error && <p>{redirectValidation.error}</p>}
            </div>
            <Button onClick={() => navigate('/')} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img src={logo} alt="Opposia" className="h-12 w-auto" />
          </div>
          <div>
            <CardTitle className="text-xl">Authorization Request</CardTitle>
            <CardDescription className="mt-2">
              <span className="font-semibold text-foreground">{clientId}</span> is requesting access to your Opposia account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* User info */}
          {user && (
            <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{user.user_metadata?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          )}

          {/* Permissions */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">This application will be able to:</h3>
            <div className="space-y-2">
              {filteredScopes.map((scopeItem) => {
                const Icon = scopeItem.icon;
                const isChecked = consents[scopeItem.id as keyof typeof consents];
                
                return (
                  <div
                    key={scopeItem.id}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <Checkbox
                      id={scopeItem.id}
                      checked={isChecked}
                      disabled={scopeItem.required}
                      onCheckedChange={() => !scopeItem.required && toggleConsent(scopeItem.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor={scopeItem.id}
                        className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                      >
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        {scopeItem.name}
                        {scopeItem.required && (
                          <span className="text-xs text-muted-foreground">(Required)</span>
                        )}
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">
                        {scopeItem.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Security notice */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
            <div className="flex gap-2">
              <Shield className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-amber-800 dark:text-amber-200">
                <p className="font-medium">Security Notice</p>
                <p className="mt-1">
                  Only authorize applications you trust. You can revoke access at any time from your profile settings.
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleConsent(false)}
              disabled={isProcessing}
            >
              Deny
            </Button>
            <Button
              className="flex-1"
              onClick={() => handleConsent(true)}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Authorize'}
            </Button>
          </div>

          {/* Redirect info */}
          {redirectValidation.url && (
            <p className="text-xs text-center text-muted-foreground">
              You will be redirected to: <span className="font-mono">{redirectValidation.url.origin}</span>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OAuthConsentPage;
