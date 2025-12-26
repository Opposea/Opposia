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

    const { userId, matchUserId } = await req.json();

    if (!userId || !matchUserId) {
      return new Response(
        JSON.stringify({ error: 'userId and matchUserId are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch quiz answers for both users
    const [userAnswers, matchAnswers] = await Promise.all([
      supabase.from('quiz_answers').select('question_id, answer').eq('user_id', userId),
      supabase.from('quiz_answers').select('question_id, answer').eq('user_id', matchUserId)
    ]);

    // Fetch profiles for both users
    const [userProfile, matchProfile] = await Promise.all([
      supabase.from('profiles').select('name, bio, interests, location').eq('user_id', userId).single(),
      supabase.from('profiles').select('name, bio, interests, location').eq('user_id', matchUserId).single()
    ]);

    // Build context for AI
    const userQuizContext = userAnswers.data?.map(a => `${a.question_id}: ${a.answer}`).join('\n') || 'No quiz answers';
    const matchQuizContext = matchAnswers.data?.map(a => `${a.question_id}: ${a.answer}`).join('\n') || 'No quiz answers';

    const userProfileContext = userProfile.data ? 
      `Bio: ${userProfile.data.bio || 'Not set'}\nInterests: ${userProfile.data.interests?.join(', ') || 'Not set'}\nLocation: ${userProfile.data.location || 'Not set'}` : 
      'No profile';
    
    const matchProfileContext = matchProfile.data ? 
      `Name: ${matchProfile.data.name || 'Unknown'}\nBio: ${matchProfile.data.bio || 'Not set'}\nInterests: ${matchProfile.data.interests?.join(', ') || 'Not set'}\nLocation: ${matchProfile.data.location || 'Not set'}` : 
      'No profile';

    // Find complementary differences (opposites attract)
    const opposites: string[] = [];
    if (userAnswers.data && matchAnswers.data) {
      const matchAnswerMap = new Map(matchAnswers.data.map(a => [a.question_id, a.answer]));
      userAnswers.data.forEach(userAnswer => {
        const matchAnswer = matchAnswerMap.get(userAnswer.question_id);
        if (matchAnswer && userAnswer.answer !== matchAnswer) {
          opposites.push(`${userAnswer.question_id}: You said "${userAnswer.answer}", they said "${matchAnswer}"`);
        }
      });
    }

    const systemPrompt = `You are a friendly dating coach helping users start conversations with their matches on a dating app called Opposia, which celebrates how "opposites attract."

Your job is to generate 3-4 creative, engaging conversation starters based on:
1. Their quiz answers and how they complement each other (differences can be conversation topics!)
2. Their shared or contrasting interests
3. Their profiles and bios

Rules:
- Keep messages friendly, warm, and NOT creepy
- Make them personal based on the data provided
- Highlight interesting differences as conversation topics
- Keep each starter under 100 characters
- Be playful but respectful
- Don't be generic - make them specific to this pair

Return a JSON array of conversation starters, like:
["Starter 1", "Starter 2", "Starter 3"]`;

    const userPrompt = `Generate conversation starters for this match:

USER'S PROFILE:
${userProfileContext}

USER'S QUIZ ANSWERS:
${userQuizContext}

MATCH'S PROFILE:
${matchProfileContext}

MATCH'S QUIZ ANSWERS:
${matchQuizContext}

COMPLEMENTARY DIFFERENCES (potential conversation topics):
${opposites.length > 0 ? opposites.slice(0, 5).join('\n') : 'No significant differences found'}

Generate 3-4 personalized conversation starters that the user can send to their match.`;

    console.log('Calling Lovable AI for conversation starters...');

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
        temperature: 0.8,
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
    const content = aiResponse.choices?.[0]?.message?.content || '[]';
    
    // Parse the JSON array from the response
    let starters: string[];
    try {
      // Try to extract JSON array from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      starters = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback starters
      starters = [
        `Hey ${matchProfile.data?.name || 'there'}! I noticed we have some interesting differences - what's the story behind your quiz answers?`,
        "I love how we're different in some ways - opposites attract, right? 😊",
        "Your profile caught my eye! Would love to chat more."
      ];
    }

    console.log('Generated starters:', starters);

    return new Response(
      JSON.stringify({ starters, matchName: matchProfile.data?.name }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-conversation-starters:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
