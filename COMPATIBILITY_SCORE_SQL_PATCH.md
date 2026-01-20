# Compatibility Score SQL Patch (Opposites-aware)

Use this when two users have **clearly complementary (opposite) quiz answers** (e.g. `love` vs `rather-not`, `lead` vs `prefer-partner`) but the app still shows a low compatibility score like **20–40%**.

## Why this happens
The current `calculate_compatibility_score(user1_id, user2_id)` function only gives full quiz points for strict `yes`/`no` opposites and ignores most of the app’s real quiz values (like `love`, `rather-not`, `organiser`, `prefer-partner`, etc.).

This patch updates the function so it correctly treats the quiz’s **“I’ll lead”** values as complementary to **“I’d rather not / partner leads”** values.

## Run instructions
1. Open **Cloud → SQL Editor**
2. Paste the SQL below
3. Run it as one script
4. Refresh the app and re-check the compatibility score

---

```sql
-- ============================================
-- Patch: calculate_compatibility_score
-- Makes quiz scoring "opposites-aware" for the
-- real quiz answer values used by the app.
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
  share_matches INTEGER := 0;
  together_matches INTEGER := 0;
  compatibility_score INTEGER := 0;
  age_bonus INTEGER := 0;
  location_bonus INTEGER := 0;
  user1_age INTEGER;
  user2_age INTEGER;
  user1_location TEXT;
  user2_location TEXT;

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
    'enjoy-lead'
  ];

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
    'no'
  ];

  share_answers TEXT[] := ARRAY[
    'sometimes',
    'share',
    'basics',
    'contribute',
    'easy'
  ];
BEGIN
  IF user1_id IS NULL OR user2_id IS NULL THEN
    RETURN 0;
  END IF;

  SELECT age, location INTO user1_age, user1_location
  FROM public.profiles WHERE user_id = user1_id;

  SELECT age, location INTO user2_age, user2_location
  FROM public.profiles WHERE user_id = user2_id;

  -- Count total questions both users answered
  SELECT COUNT(DISTINCT qa1.question_id)
  INTO total_questions
  FROM public.quiz_answers qa1
  INNER JOIN public.quiz_answers qa2 ON qa1.question_id = qa2.question_id
  WHERE qa1.user_id = user1_id
    AND qa2.user_id = user2_id;

  -- Full points for complementary "lead" vs "prefer partner" answers
  SELECT COUNT(*)
  INTO opposite_answers
  FROM public.quiz_answers qa1
  INNER JOIN public.quiz_answers qa2 ON qa1.question_id = qa2.question_id
  WHERE qa1.user_id = user1_id
    AND qa2.user_id = user2_id
    AND (
      -- Classic yes/no opposites (kept for safety)
      ((qa1.answer = 'yes' AND qa2.answer = 'no') OR (qa1.answer = 'no' AND qa2.answer = 'yes'))
      OR
      -- App's real "opposites": lead <-> prefer-partner
      ((qa1.answer = ANY(lead_answers) AND qa2.answer = ANY(prefer_partner_answers))
       OR
       (qa2.answer = ANY(lead_answers) AND qa1.answer = ANY(prefer_partner_answers)))
    );

  -- Partial credit when both want to share
  SELECT COUNT(*)
  INTO share_matches
  FROM public.quiz_answers qa1
  INNER JOIN public.quiz_answers qa2 ON qa1.question_id = qa2.question_id
  WHERE qa1.user_id = user1_id
    AND qa2.user_id = user2_id
    AND qa1.answer = ANY(share_answers)
    AND qa2.answer = ANY(share_answers);

  -- Partial credit when both answered "together"
  SELECT COUNT(*)
  INTO together_matches
  FROM public.quiz_answers qa1
  INNER JOIN public.quiz_answers qa2 ON qa1.question_id = qa2.question_id
  WHERE qa1.user_id = user1_id
    AND qa2.user_id = user2_id
    AND qa1.answer = 'together'
    AND qa2.answer = 'together';

  IF total_questions > 0 THEN
    -- Quiz contributes up to 70 points
    compatibility_score := ROUND(
      ((opposite_answers::DECIMAL * 1.0
        + share_matches::DECIMAL * 0.5
        + together_matches::DECIMAL * 0.5
      ) / total_questions::DECIMAL) * 70
    );
  END IF;

  -- Age bonus (up to 20)
  IF user1_age IS NOT NULL AND user2_age IS NOT NULL THEN
    CASE
      WHEN ABS(user1_age - user2_age) <= 2 THEN age_bonus := 20;
      WHEN ABS(user1_age - user2_age) <= 5 THEN age_bonus := 15;
      WHEN ABS(user1_age - user2_age) <= 10 THEN age_bonus := 10;
      WHEN ABS(user1_age - user2_age) <= 15 THEN age_bonus := 5;
      ELSE age_bonus := 0;
    END CASE;
  END IF;

  -- Location bonus (up to 10)
  IF user1_location IS NOT NULL AND user2_location IS NOT NULL THEN
    IF LOWER(user1_location) = LOWER(user2_location) THEN
      location_bonus := 10;
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
