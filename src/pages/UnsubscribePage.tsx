import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Loader2, Mail } from 'lucide-react';

const UnsubscribePage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'invalid'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const processUnsubscribe = async () => {
      const token = searchParams.get('token');
      const email = searchParams.get('email');

      if (!token || !email) {
        setStatus('invalid');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setStatus('invalid');
        return;
      }

      try {
        // Check if already unsubscribed
        const { data: existing } = await supabase
          .from('email_unsubscribes' as any)
          .select('id')
          .eq('email', email.toLowerCase())
          .maybeSingle();

        if (existing) {
          // Already unsubscribed, still show success
          setStatus('success');
          return;
        }

        // Insert unsubscribe record
        const { error } = await supabase
          .from('email_unsubscribes' as any)
          .insert({
            email: email.toLowerCase(),
            unsubscribe_token: token,
            unsubscribed_at: new Date().toISOString()
          } as any);

        if (error) {
          console.error('Unsubscribe error:', error);
          setErrorMessage('Failed to process your request. Please try again later.');
          setStatus('error');
          return;
        }

        setStatus('success');
      } catch (err) {
        console.error('Unsubscribe failed:', err);
        setErrorMessage('An unexpected error occurred. Please try again later.');
        setStatus('error');
      }
    };

    processUnsubscribe();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {status === 'loading' && (
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
            )}
            {status === 'success' && (
              <CheckCircle className="h-12 w-12 text-green-500" />
            )}
            {(status === 'error' || status === 'invalid') && (
              <AlertCircle className="h-12 w-12 text-destructive" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {status === 'loading' && 'Processing...'}
            {status === 'success' && 'Unsubscribed Successfully'}
            {status === 'error' && 'Something Went Wrong'}
            {status === 'invalid' && 'Invalid Link'}
          </CardTitle>
          <CardDescription className="text-base">
            {status === 'loading' && 'Please wait while we process your request.'}
            {status === 'success' && 'You have been unsubscribed from our email marketing.'}
            {status === 'error' && errorMessage}
            {status === 'invalid' && 'This unsubscribe link is invalid or has expired.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {status === 'success' && (
            <>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm">You will no longer receive marketing emails from us.</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Please note: You may still receive important transactional emails about your account.
              </p>
            </>
          )}
          <Button asChild variant="outline" className="mt-4">
            <Link to="/">Return to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnsubscribePage;
