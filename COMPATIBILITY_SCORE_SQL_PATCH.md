# Compatibility Score SQL Patch (Opposites-aware)

Use this when two users have **clearly complementary (opposite) quiz answers** (e.g. `love` vs `rather-not`, `lead` vs `prefer-partner`) but the app still shows a low compatibility score like **20–40%**.

## Scoring Weights
- **Quiz answers: 80%** (opposites = full points, together/sometimes = high match points)
- **Age bonus: up to 12%**
- **Location bonus: up to 8%**

## Run instructions
1. Open **Cloud → SQL Editor**
2. Paste the SQL below
3. Run it as one script
4. Refresh the app and re-check the compatibility score

---

```sql
-- ============================================
-- Patch: calculate_compatibility_score
-- Quiz = 80%, Age = 12%, Location = 8%
-- Opposites = full points, together/sometimes = 0.8
-- ============================================

CREATE OR REPLACE FUNCTION public.calculate_compatibility_score(
  user1_id uuid,
  user2_id uuid
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  total_questions INTEGER := 0;
  opposite_answers INTEGER := 0;
  together_matches INTEGER := 0;
  sometimes_matches INTEGER := 0;
  compatibility_score INTEGER := 0;
  age_bonus INTEGER := 0;
  location_bonus INTEGER := 0;
  user1_age INTEGER;
  user2_age INTEGER;
  user1_location TEXT;
  user2_location TEXT;

  -- "I love it / I'll handle this" answers (highest tier)
  lead_answers TEXT[] := ARRAY[
    'love',
    'dont-mind',
    'main-driver',
    'lead',
    'organiser',
    'fixer',
    'love-lead',
    'planner',
    'chooser',
    'me',
    'yes',
    'matters',
    'enjoy-lead',
    'enjoy',
    'always',
    'definitely'
  ];

  -- "I'd prefer my partner do this" answers (highest tier complement)
  prefer_partner_answers TEXT[] := ARRAY[
    'rather-not',
    'dont-enjoy',
    'prefer-partner',
    'not-my-thing',
    'not-into-it',
    'rarely',
    'not-for-me',
    'last-minute',
    'not-great',
    'usually-not',
    'no',
    'partner',
    'never',
    'avoid'
  ];

  -- "Together" answers (perfect match when both choose it)
  -- IMPORTANT: keep this strict (only values that literally mean "together")
  together_answers TEXT[] := ARRAY[
    'together'
  ];

  -- "Sometimes / share" answers (match tier)
  -- These are explicitly "shared" but not necessarily "always together".
  sometimes_answers TEXT[] := ARRAY[
    'sometimes',
    'share',
    'pack-fine',
    'basics',
    'contribute',
    'easy',
    'depends',
    'occasional',
    'when-needed'
  ];
BEGIN
  IF user1_id IS NULL OR user2_id IS NULL THEN
    RETURN 0;
  END IF;

  SELECT age, location INTO user1_age, user1_location
  FROM public.profiles WHERE user_id = user1_id;

  SELECT age, location INTO user2_age, user2_location
  FROM public.profiles WHERE user_id = user2_id;

  -- Count total questions both users answered (excluding gender/looking_for)
  SELECT COUNT(DISTINCT qa1.question_id)
  INTO total_questions
  FROM public.quiz_answers qa1
  INNER JOIN public.quiz_answers qa2 ON qa1.question_id = qa2.question_id
  WHERE qa1.user_id = user1_id
    AND qa2.user_id = user2_id
    AND qa1.question_id NOT IN ('gender', 'looking_for');

  -- HIGHEST TIER: Full points for complementary "love it" vs "prefer partner" answers
  SELECT COUNT(*)
  INTO opposite_answers
  FROM public.quiz_answers qa1
  INNER JOIN public.quiz_answers qa2 ON qa1.question_id = qa2.question_id
  WHERE qa1.user_id = user1_id
    AND qa2.user_id = user2_id
    AND qa1.question_id NOT IN ('gender', 'looking_for')
    AND (
      -- Classic yes/no opposites
      ((qa1.answer = 'yes' AND qa2.answer = 'no') OR (qa1.answer = 'no' AND qa2.answer = 'yes'))
      OR
      -- "I love it" <-> "I'd prefer my partner"
      ((qa1.answer = ANY(lead_answers) AND qa2.answer = ANY(prefer_partner_answers))
       OR
       (qa2.answer = ANY(lead_answers) AND qa1.answer = ANY(prefer_partner_answers)))
    );

  -- HIGH TIER: Both want to do it together
  SELECT COUNT(*)
  INTO together_matches
  FROM public.quiz_answers qa1
  INNER JOIN public.quiz_answers qa2 ON qa1.question_id = qa2.question_id
  WHERE qa1.user_id = user1_id
    AND qa2.user_id = user2_id
    AND qa1.question_id NOT IN ('gender', 'looking_for')
    AND qa1.answer = ANY(together_answers)
    AND qa2.answer = ANY(together_answers);

  -- MATCH TIER: Both answered sometimes/share
  SELECT COUNT(*)
  INTO sometimes_matches
  FROM public.quiz_answers qa1
  INNER JOIN public.quiz_answers qa2 ON qa1.question_id = qa2.question_id
  WHERE qa1.user_id = user1_id
    AND qa2.user_id = user2_id
    AND qa1.question_id NOT IN ('gender', 'looking_for')
    AND qa1.answer = ANY(sometimes_answers)
    AND qa2.answer = ANY(sometimes_answers);

  IF total_questions > 0 THEN
    -- Quiz contributes up to 80 points
    -- Opposites = 1.0 (full), Together = 1.0 (perfect match), Sometimes/Share = 0.8
    -- This ensures that if both users answered "together" on every scored question,
    -- their quiz component is 80/80.
    compatibility_score := ROUND(
      ((opposite_answers::DECIMAL * 1.0
        + together_matches::DECIMAL * 1.0
        + sometimes_matches::DECIMAL * 0.8
      ) / total_questions::DECIMAL) * 80
    );
  END IF;

  -- Age bonus (up to 12 points)
  IF user1_age IS NOT NULL AND user2_age IS NOT NULL THEN
    CASE
      WHEN ABS(user1_age - user2_age) <= 2 THEN age_bonus := 12;
      WHEN ABS(user1_age - user2_age) <= 5 THEN age_bonus := 9;
      WHEN ABS(user1_age - user2_age) <= 10 THEN age_bonus := 6;
      WHEN ABS(user1_age - user2_age) <= 15 THEN age_bonus := 3;
      ELSE age_bonus := 0;
    END CASE;
  END IF;

  -- Location bonus (up to 8 points)
  IF user1_location IS NOT NULL AND user2_location IS NOT NULL THEN
    IF LOWER(user1_location) = LOWER(user2_location) THEN
      location_bonus := 8;
    END IF;
  END IF;

  compatibility_score := compatibility_score + age_bonus + location_bonus;

  IF compatibility_score > 100 THEN
    compatibility_score := 100;
  END IF;

  RETURN compatibility_score;
END;
$function$;

REVOKE ALL ON FUNCTION public.calculate_compatibility_score(uuid, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.calculate_compatibility_score(uuid, uuid) TO authenticated;
```

## After running the patch

Compatibility scores are **calculated dynamically** via `public.calculate_compatibility_score(user1_id, user2_id)` and are **not stored** in the `matches` table, so there is nothing to backfill—just refresh the app (or re-open Discover/Matches) to see updated percentages.
