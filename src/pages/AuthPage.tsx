import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Heart, Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthRateLimit } from '@/hooks/useAuthRateLimit';
import TermsOfServiceDialog from '@/components/TermsOfServiceDialog';
import TurnstileWidget from '@/components/TurnstileWidget';

const TURNSTILE_SITE_KEY = '0x4AAAAAACNSbE7cWdnQ7ZJk';

const AuthPage = () => {
const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [country, setCountry] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyingLocation, setVerifyingLocation] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | undefined>(undefined);
  const [captchaError, setCaptchaError] = useState(false);

  const isPreviewHost =
    typeof window !== 'undefined' &&
    (window.location.hostname.endsWith('lovable.app') ||
      window.location.hostname.endsWith('lovableproject.com'));

  // Enforce captcha only on real domains (Turnstile keys must be configured per-domain)
  const isCaptchaRequired = !isPreviewHost;

  const handleCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
    setCaptchaError(false);
  }, []);

  const handleCaptchaExpire = useCallback(() => {
    setCaptchaToken(undefined);
  }, []);

  const handleCaptchaError = useCallback(() => {
    setCaptchaToken(undefined);
    setCaptchaError(true);
    // Don't block user - allow sign-in but log the error
    console.error('Captcha failed to load - allowing sign-in without captcha');
  }, []);
  
  const { signUp, signIn, user } = useAuth();
  const navigate = useNavigate();
  const { isLocked, getRemainingLockoutTime, recordFailedAttempt, resetOnSuccess, getAttemptsRemaining } = useAuthRateLimit();

  // Check lockout status and update countdown
  useEffect(() => {
    const checkLockout = () => {
      const remaining = getRemainingLockoutTime();
      setLockoutSeconds(remaining);
    };
    
    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, [getRemainingLockoutTime]);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      // Don't auto-redirect, let the sign-in handler manage it
      // This prevents unwanted redirects when users are already on other pages
    }
  }, [user]);

  const validateInput = (email: string, password: string, name?: string, dob?: string, country?: string) => {
    // Email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // Password validation
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      toast.error('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      return false;
    }

    // Name validation for signup
    if (isSignUp && name && name.trim().length < 2) {
      toast.error('Name must be at least 2 characters long');
      return false;
    }

    // Date of birth validation for signup
    if (isSignUp && dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      
      const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
      
      if (actualAge < 18) {
        toast.error('You must be at least 18 years old to sign up');
        return false;
      }
      
      if (actualAge > 120) {
        toast.error('Please enter a valid date of birth');
        return false;
      }
    }

    // Country validation for signup
    if (isSignUp && !country) {
      toast.error('Please select your country');
      return false;
    }

    // Password confirmation for signup
    if (isSignUp && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    return true;
  };

  const sanitizeInput = (input: string) => {
    // Remove HTML tags and trim whitespace
    return input.replace(/<[^>]*>/g, '').trim();
  };

  const verifyLocation = async (selectedCountry: string): Promise<{ allowed: boolean; message: string }> => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-location', {
        body: { selectedCountry }
      });

      if (error) {
        console.error('Location verification error:', error);
        // Fail open if function unavailable
        return { allowed: true, message: 'Verification skipped' };
      }

      return { 
        allowed: data.allowed, 
        message: data.message 
      };
    } catch (err) {
      console.error('Location verification failed:', err);
      return { allowed: true, message: 'Verification skipped' };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedName = sanitizeInput(name);
    
    if (!validateInput(sanitizedEmail, password, sanitizedName, dateOfBirth, country)) {
      return;
    }

    // Check rate limiting before proceeding
    if (isLocked()) {
      toast.error(`Too many failed attempts. Please try again in ${Math.ceil(getRemainingLockoutTime() / 60)} minutes.`);
      return;
    }

    // For signup, show terms dialog if not yet accepted
    if (isSignUp && !termsAccepted) {
      setShowTermsDialog(true);
      return;
    }

    await processAuth(sanitizedEmail, sanitizedName);
  };

  const verifyTurnstile = async (token: string): Promise<{ success: boolean; message: string }> => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-turnstile', {
        body: { token }
      });

      if (error) {
        console.error('Turnstile verification error:', error);
        return { success: false, message: 'Captcha verification failed. Please try again.' };
      }

      return { 
        success: data.success, 
        message: data.message 
      };
    } catch (err) {
      console.error('Turnstile verification failed:', err);
      return { success: false, message: 'Captcha verification failed. Please try again.' };
    }
  };

  const processAuth = async (sanitizedEmail: string, sanitizedName: string) => {
    setLoading(true);

    try {
      // Captcha enforcement:
      // - On preview domains, allow auth even if Turnstile can't load (common during setup)
      // - On real domains, require a token and verify server-side
      if (isCaptchaRequired) {
        if (!captchaToken) {
          toast.error('Please complete the captcha');
          setLoading(false);
          return;
        }

        const captchaResult = await verifyTurnstile(captchaToken);
        if (!captchaResult.success) {
          toast.error(captchaResult.message);
          setCaptchaToken(undefined);
          setLoading(false);
          return;
        }
      } else {
        // Preview: if Turnstile errors, don't block sign-in/sign-up
        if (captchaError) {
          console.warn('Turnstile unavailable on preview host; bypassing captcha.');
        }
      }

      let result;
      if (isSignUp) {
        // Verify location before signup
        setVerifyingLocation(true);
        const locationCheck = await verifyLocation(country);
        setVerifyingLocation(false);

        if (!locationCheck.allowed) {
          toast.error(locationCheck.message);
          setLoading(false);
          return;
        }

        result = await signUp(sanitizedEmail, password, sanitizedName, dateOfBirth, country);
        if (!result.error) {
          resetOnSuccess();
          const ukMessage = country === 'GB' ? ' For UK members, your age will be manually verified before you can access all features.' : '';
          toast.success(`Account created! Please check your email to verify your account before signing in.${ukMessage}`);
        }
      } else {
        result = await signIn(sanitizedEmail, password);
        if (!result.error) {
          resetOnSuccess();
          toast.success('Welcome back!');
          // Get the current user after sign in
          const { data: { user: currentUser } } = await supabase.auth.getUser();
          
          if (currentUser) {
            // Check if user has completed quiz
            const { data } = await supabase
              .from('quiz_answers')
              .select('id')
              .eq('user_id', currentUser.id)
              .limit(1);
            
            if (!data || data.length === 0) {
              navigate('/quiz');
            } else {
              navigate('/profile?tab=discover');
            }
          }
        }
      }

      if (result.error) {
        // Record failed attempt for rate limiting (only for sign-in to prevent enumeration)
        if (!isSignUp) {
          const { locked, remainingAttempts } = recordFailedAttempt();
          if (locked) {
            toast.error('Too many failed attempts. Your account has been temporarily locked for 15 minutes.');
            setLoading(false);
            return;
          } else if (remainingAttempts <= 2 && remainingAttempts > 0) {
            toast.warning(`Warning: ${remainingAttempts} attempt${remainingAttempts === 1 ? '' : 's'} remaining before temporary lockout.`);
          }
        }

        if (result.error.message.includes('User already registered')) {
          toast.error('This email is already registered. Try signing in instead.');
        } else if (result.error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password. Please try again.');
        } else if (result.error.message.includes('Email not confirmed')) {
          toast.error('Please verify your email before signing in. Check your inbox for the confirmation link.');
        } else {
          toast.error(result.error.message || 'An error occurred. Please try again.');
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-4 pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,theme(colors.primary/20),transparent)] backdrop-blur-3xl" />
      
      <Card className="w-full max-w-md relative z-10 border-primary/20 bg-background/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-primary/10">
              <Heart className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </CardTitle>
          <p className="text-muted-foreground">
            {isSignUp 
              ? 'Join thousands finding their perfect match' 
              : 'Sign in to continue your journey'
            }
          </p>
        </CardHeader>
        
        <CardContent>
          {lockoutSeconds > 0 && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2 text-sm text-destructive">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>
                Too many failed attempts. Try again in {Math.floor(lockoutSeconds / 60)}:{(lockoutSeconds % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={100}
                  placeholder="Enter your full name"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={254}
                placeholder="Enter your email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  maxLength={128}
                  placeholder="Enter your password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </Button>
              </div>
            </div>
            
            {isSignUp && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                    placeholder="Select your date of birth"
                  />
                  <p className="text-xs text-muted-foreground">You must be 18 or older to use this service</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select your country</option>
                    <optgroup label="United Kingdom">
                      <option value="GB">United Kingdom</option>
                    </optgroup>
                    <optgroup label="North America">
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                    </optgroup>
                    <optgroup label="European Union">
                      <option value="AT">Austria</option>
                      <option value="BE">Belgium</option>
                      <option value="BG">Bulgaria</option>
                      <option value="HR">Croatia</option>
                      <option value="CY">Cyprus</option>
                      <option value="CZ">Czech Republic</option>
                      <option value="DK">Denmark</option>
                      <option value="EE">Estonia</option>
                      <option value="FI">Finland</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                      <option value="GR">Greece</option>
                      <option value="HU">Hungary</option>
                      <option value="IE">Ireland</option>
                      <option value="IT">Italy</option>
                      <option value="LV">Latvia</option>
                      <option value="LT">Lithuania</option>
                      <option value="LU">Luxembourg</option>
                      <option value="MT">Malta</option>
                      <option value="NL">Netherlands</option>
                      <option value="PL">Poland</option>
                      <option value="PT">Portugal</option>
                      <option value="RO">Romania</option>
                      <option value="SK">Slovakia</option>
                      <option value="SI">Slovenia</option>
                      <option value="ES">Spain</option>
                      <option value="SE">Sweden</option>
                    </optgroup>
                    <optgroup label="Australia & New Zealand">
                      <option value="AU">Australia</option>
                      <option value="NZ">New Zealand</option>
                    </optgroup>
                  </select>
                  {country === 'GB' && (
                    <p className="text-xs text-amber-600">UK members require manual age verification for regulatory compliance</p>
                  )}
                  <p className="text-xs text-muted-foreground">Service available in UK, EU, USA, Canada, Australia & New Zealand only</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    maxLength={128}
                    placeholder="Confirm your password"
                  />
                </div>
              </>
            )}

            <TurnstileWidget
              siteKey={TURNSTILE_SITE_KEY}
              onVerify={handleCaptchaVerify}
              onExpire={handleCaptchaExpire}
              onError={handleCaptchaError}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={
                loading ||
                verifyingLocation ||
                lockoutSeconds > 0 ||
                (isCaptchaRequired && !captchaToken)
              }
            >
              {lockoutSeconds > 0 ? (
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Locked ({Math.floor(lockoutSeconds / 60)}:{(lockoutSeconds % 60).toString().padStart(2, '0')})
                </span>
              ) : verifyingLocation ? (
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 animate-pulse" />
                  Verifying location...
                </span>
              ) : loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <Button
                type="button"
                variant="link"
                className="p-0 ml-1 h-auto font-semibold"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setEmail('');
                  setPassword('');
                  setName('');
                  setConfirmPassword('');
                  setDateOfBirth('');
                  setCountry('');
                  setTermsAccepted(false);
                }}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </Button>
            </p>
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>

      <TermsOfServiceDialog
        open={showTermsDialog}
        onAccept={() => {
          setShowTermsDialog(false);
          setTermsAccepted(true);
          // Re-submit the form after accepting
          const sanitizedEmail = sanitizeInput(email);
          const sanitizedName = sanitizeInput(name);
          processAuth(sanitizedEmail, sanitizedName);
        }}
        onDecline={() => {
          setShowTermsDialog(false);
          toast.info('You must accept the Terms of Service to create an account.');
        }}
      />
    </div>
  );
};

export default AuthPage;
