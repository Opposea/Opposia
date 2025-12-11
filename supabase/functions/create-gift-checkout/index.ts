import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Server-side gift catalog - prices in pence (GBP)
const GIFT_CATALOG: Record<string, { name: string; price: number }> = {
  'rose': { name: '🌹 Rose', price: 360 },
  'heart': { name: '❤️ Heart', price: 360 },
  'coffee': { name: '☕ Coffee', price: 360 },
};

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isValidUUID(str: string): boolean {
  return UUID_REGEX.test(str);
}

interface GiftCheckoutRequest {
  giftId: string;
  receiverId: string;
  matchId: string;
  message?: string;
}

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 10; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute window

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(userId);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(userId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  
  if (userLimit.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  userLimit.count++;
  return true;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check Stripe key first
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      console.error('CRITICAL: STRIPE_SECRET_KEY not set');
      return new Response(
        JSON.stringify({ error: 'Payment service temporarily unavailable' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 503,
        }
      );
    }

    // Get the authenticated user
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('CRITICAL: Supabase configuration missing');
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 503,
        }
      );
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const token = authHeader.replace('Bearer ', '');
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      console.error('Authentication failed');
      return new Response(
        JSON.stringify({ error: 'Authentication failed' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      );
    }

    // Rate limiting check
    if (!checkRateLimit(user.id)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please wait a moment.' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 429,
        }
      );
    }

    // Parse request body
    const body = await req.json();
    const { giftId, receiverId, matchId, message }: GiftCheckoutRequest = body;

    // Validate gift ID exists in catalog (SERVER-SIDE PRICE LOOKUP)
    const gift = GIFT_CATALOG[giftId];
    if (!gift) {
      return new Response(
        JSON.stringify({ error: 'Invalid gift selection' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Validate UUID formats
    if (!isValidUUID(receiverId)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    if (!isValidUUID(matchId)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Validate message length if provided
    if (message && message.length > 200) {
      return new Response(
        JSON.stringify({ error: 'Message too long (max 200 characters)' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Verify the match exists and involves both users
    const { data: matchData, error: matchError } = await supabase
      .from('matches')
      .select('id, user1_id, user2_id, status')
      .eq('id', matchId)
      .eq('status', 'matched')
      .single();

    if (matchError || !matchData) {
      return new Response(
        JSON.stringify({ error: 'Invalid match' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Verify sender is part of the match
    const isUserInMatch = matchData.user1_id === user.id || matchData.user2_id === user.id;
    if (!isUserInMatch) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403,
        }
      );
    }

    // Verify receiver is the other user in the match
    const expectedReceiver = matchData.user1_id === user.id ? matchData.user2_id : matchData.user1_id;
    if (receiverId !== expectedReceiver) {
      return new Response(
        JSON.stringify({ error: 'Invalid recipient' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Get receiver profile for display name
    const { data: receiverProfile } = await supabase
      .from('profiles')
      .select('name')
      .eq('user_id', receiverId)
      .single();

    const receiverName = receiverProfile?.name || 'User';

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Create Stripe checkout session with SERVER-SIDE price
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: gift.name,
              description: `Virtual gift for ${receiverName}`,
            },
            unit_amount: gift.price, // Use server-side price
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/profile?gift_success=true`,
      cancel_url: `${req.headers.get('origin')}/profile?gift_cancelled=true`,
      client_reference_id: user.id,
      metadata: {
        sender_id: user.id,
        gift_id: giftId,
        gift_name: gift.name,
        receiver_id: receiverId,
        match_id: matchId,
        message: message || '',
      },
    });

    return new Response(
      JSON.stringify({ 
        sessionId: session.id,
        url: session.url 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    // Log detailed error server-side only
    console.error('Error in create-gift-checkout:', error.message);
    
    // Return generic error to client
    return new Response(
      JSON.stringify({ error: 'Unable to process request. Please try again.' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
