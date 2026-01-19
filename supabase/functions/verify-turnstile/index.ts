import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TurnstileResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
  action?: string;
  cdata?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();

    if (!token || typeof token !== 'string') {
      console.log('Missing or invalid token');
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Captcha token is required' 
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const secretKey = Deno.env.get('TURNSTILE_SECRET_KEY');
    
    if (!secretKey) {
      console.error('TURNSTILE_SECRET_KEY not configured');
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Server configuration error' 
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get client IP for additional validation
    const forwardedFor = req.headers.get('x-forwarded-for');
    const cfConnectingIp = req.headers.get('cf-connecting-ip');
    const clientIp = cfConnectingIp || (forwardedFor ? forwardedFor.split(',')[0].trim() : null);

    console.log(`Verifying Turnstile token for IP: ${clientIp || 'unknown'}`);

    // Verify with Cloudflare's siteverify endpoint
    const formData = new FormData();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (clientIp) {
      formData.append('remoteip', clientIp);
    }

    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!verifyResponse.ok) {
      console.error('Turnstile API request failed:', verifyResponse.status);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Captcha verification service unavailable' 
        }),
        { 
          status: 503,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const result: TurnstileResponse = await verifyResponse.json();
    console.log('Turnstile verification result:', JSON.stringify({ 
      success: result.success, 
      hostname: result.hostname,
      errorCodes: result['error-codes'] 
    }));

    if (result.success) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Captcha verified successfully' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      const errorCodes = result['error-codes'] || [];
      let message = 'Captcha verification failed';
      
      // Provide more specific error messages
      if (errorCodes.includes('timeout-or-duplicate')) {
        message = 'Captcha expired or already used. Please try again.';
      } else if (errorCodes.includes('invalid-input-response')) {
        message = 'Invalid captcha. Please complete the captcha again.';
      }

      console.log('Turnstile verification failed:', errorCodes);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message,
          errorCodes 
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
  } catch (error) {
    console.error('Error in verify-turnstile:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'An error occurred during captcha verification' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
