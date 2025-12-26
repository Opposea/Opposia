import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { userId, type, currentBio, currentInterests } = await req.json();

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'userId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch user's quiz answers for personality context
    const { data: quizAnswers } = await supabase
      .from('quiz_answers')
      .select('question_id, answer')
      .eq('user_id', userId);

    // Fetch user's profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('name, age, location, gender')
      .eq('user_id', userId)
      .single();

    const quizContext = quizAnswers?.map(a => `${a.question_id}: ${a.answer}`).join('\n') || 'No quiz answers available';

    let systemPrompt = '';
    let userPrompt = '';

    if (type === 'bio') {
      systemPrompt = `You are a dating profile expert helping users write authentic, engaging bios for the Opposia dating app. The app celebrates how "opposites attract."

Rules:
- Write in first person as if you are the user
- Keep bios between 50-150 words
- Be warm, genuine, and slightly playful
- Highlight unique personality traits based on their quiz answers
- Avoid clichés like "love to laugh" or "looking for my other half"
- Make it sound natural, not robotic
- Include hints about what makes them unique (based on quiz answers)

Return ONLY the bio text, no explanations or formatting.`;

      userPrompt = `Write a compelling dating bio for this user:

Name: ${profile?.name || 'Unknown'}
Age: ${profile?.age || 'Not specified'}
Location: ${profile?.location || 'Not specified'}
Gender: ${profile?.gender || 'Not specified'}

Their quiz answers (showing personality):
${quizContext}

Current bio (if any, improve upon it): ${currentBio || 'None'}

Write a fresh, engaging bio that reflects their personality based on quiz answers.`;

    } else if (type === 'interests') {
      systemPrompt = `You are helping a dating app user come up with interests/hobbies to list on their profile. The app is called Opposia and celebrates how "opposites attract."

Rules:
- Suggest 5-8 specific interests based on their quiz answers
- Make them specific (not just "music" but "discovering indie folk artists")
- Mix common and unique interests
- Base suggestions on their personality from quiz answers
- Return as a comma-separated list

Return ONLY the comma-separated interests, no explanations.`;

      userPrompt = `Suggest interests for this user's dating profile:

Name: ${profile?.name || 'Unknown'}
Location: ${profile?.location || 'Not specified'}

Their quiz answers (showing personality):
${quizContext}

Current interests (if any): ${currentInterests?.join(', ') || 'None'}

Suggest 5-8 specific, personality-matching interests.`;

    } else if (type === 'improve') {
      systemPrompt = `You are a dating profile expert. Your job is to improve an existing bio while keeping the user's voice and personality.

Rules:
- Keep the essence of what they wrote
- Fix grammar and improve flow
- Add personality based on their quiz answers
- Keep it authentic to them
- Keep length similar or slightly longer
- Don't make it sound generic

Return ONLY the improved bio text.`;

      userPrompt = `Improve this dating profile bio:

Current bio: "${currentBio}"

User's personality from quiz:
${quizContext}

Improve the bio while keeping their authentic voice.`;

    } else {
      return new Response(
        JSON.stringify({ error: 'Invalid type. Use "bio", "interests", or "improve"' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Calling Lovable AI for profile ${type} assistance...`);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add more credits.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content?.trim() || '';

    console.log('Generated content:', content);

    let result: any = { success: true };

    if (type === 'bio' || type === 'improve') {
      result.bio = content;
    } else if (type === 'interests') {
      // Parse comma-separated interests
      result.interests = content.split(',').map((i: string) => i.trim()).filter((i: string) => i.length > 0);
    }

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-profile-assistant:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
