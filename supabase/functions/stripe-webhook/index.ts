import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isValidUUID(str: string | undefined): boolean {
  return str ? UUID_REGEX.test(str) : false;
}

// Server-side gift catalog for validation
const VALID_GIFT_IDS = ['rose', 'heart', 'coffee'];

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  if (!signature || !webhookSecret) {
    console.error('Missing signature or webhook secret');
    return new Response('Webhook configuration error', { status: 400 });
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    // Handle successful payment
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata;

      if (metadata && metadata.gift_id) {
        // Validate all UUIDs from metadata
        if (!isValidUUID(metadata.sender_id)) {
          console.error('Invalid sender_id in metadata');
          return new Response('Invalid metadata', { status: 400 });
        }

        if (!isValidUUID(metadata.receiver_id)) {
          console.error('Invalid receiver_id in metadata');
          return new Response('Invalid metadata', { status: 400 });
        }

        if (!isValidUUID(metadata.match_id)) {
          console.error('Invalid match_id in metadata');
          return new Response('Invalid metadata', { status: 400 });
        }

        // Validate gift_id is from our catalog
        if (!VALID_GIFT_IDS.includes(metadata.gift_id)) {
          console.error('Invalid gift_id in metadata');
          return new Response('Invalid gift type', { status: 400 });
        }

        // Validate message length
        if (metadata.message && metadata.message.length > 200) {
          console.error('Message too long in metadata');
          return new Response('Invalid message', { status: 400 });
        }

        // Verify the match exists and involves both sender and receiver
        const { data: matchData, error: matchError } = await supabase
          .from('matches')
          .select('id, user1_id, user2_id, status')
          .eq('id', metadata.match_id)
          .eq('status', 'matched')
          .single();

        if (matchError || !matchData) {
          console.error('Match not found or not active');
          return new Response('Invalid match', { status: 400 });
        }

        // Verify sender and receiver are both in the match
        const matchUsers = [matchData.user1_id, matchData.user2_id];
        if (!matchUsers.includes(metadata.sender_id) || !matchUsers.includes(metadata.receiver_id)) {
          console.error('Sender or receiver not in match');
          return new Response('Invalid participants', { status: 400 });
        }

        // Verify sender and receiver are different
        if (metadata.sender_id === metadata.receiver_id) {
          console.error('Sender and receiver are the same');
          return new Response('Invalid participants', { status: 400 });
        }

        // Insert gift record with validated data
        const { error: insertError } = await supabase
          .from('gifts')
          .insert({
            sender_id: metadata.sender_id,
            receiver_id: metadata.receiver_id,
            match_id: metadata.match_id,
            gift_type: metadata.gift_id,
            gift_name: metadata.gift_name,
            gift_price: session.amount_total || 0,
            message: metadata.message || null,
            status: 'sent',
            stripe_payment_id: session.payment_intent as string,
          });

        if (insertError) {
          console.error('Error inserting gift record');
          return new Response('Database error', { status: 500 });
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    console.error('Webhook processing error');
    return new Response('Webhook processing failed', { status: 400 });
  }
});
