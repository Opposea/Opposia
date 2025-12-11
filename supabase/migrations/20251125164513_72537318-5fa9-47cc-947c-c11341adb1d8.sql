-- Update the calculate_compatibility_score function to handle "sometimes" answers
CREATE OR REPLACE FUNCTION public.calculate_compatibility_score(user1_id uuid, user2_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  total_questions INTEGER := 0;
  opposite_answers INTEGER := 0;
  sometimes_matches INTEGER := 0;
  compatibility_score INTEGER := 0;
  age_bonus INTEGER := 0;
  location_bonus INTEGER := 0;
  user1_age INTEGER;
  user2_age INTEGER;
  user1_location TEXT;
  user2_location TEXT;
BEGIN
  SELECT age, location INTO user1_age, user1_location
  FROM public.profiles WHERE user_id = user1_id;
  
  SELECT age, location INTO user2_age, user2_location
  FROM public.profiles WHERE user_id = user2_id;
  
  -- Count total questions both users answered
  SELECT COUNT(DISTINCT qa1.question_id)
  INTO total_questions
  FROM public.quiz_answers qa1
  INNER JOIN public.quiz_answers qa2 ON qa1.question_id = qa2.question_id
  WHERE qa1.user_id = user1_id AND qa2.user_id = user2_id;
  
  -- Count opposite answers (yes/no pairs)
  SELECT COUNT(*)
  INTO opposite_answers
  FROM public.quiz_answers qa1
  INNER JOIN public.quiz_answers qa2 ON qa1.question_id = qa2.question_id
  WHERE qa1.user_id = user1_id 
    AND qa2.user_id = user2_id 
    AND ((qa1.answer = 'yes' AND qa2.answer = 'no') OR (qa1.answer = 'no' AND qa2.answer = 'yes'));
  
  -- Count "sometimes" matches (both answered sometimes)
  SELECT COUNT(*)
  INTO sometimes_matches
  FROM public.quiz_answers qa1
  INNER JOIN public.quiz_answers qa2 ON qa1.question_id = qa2.question_id
  WHERE qa1.user_id = user1_id 
    AND qa2.user_id = user2_id 
    AND qa1.answer = 'sometimes' 
    AND qa2.answer = 'sometimes';
  
  IF total_questions > 0 THEN
    -- Opposite answers get full points (70% max)
    -- Sometimes matches get partial points (35% of opposite value)
    compatibility_score := ROUND(
      ((opposite_answers::DECIMAL * 1.0 + sometimes_matches::DECIMAL * 0.5) / total_questions::DECIMAL) * 70
    );
  END IF;
  
  -- Age bonus calculation
  IF user1_age IS NOT NULL AND user2_age IS NOT NULL THEN
    CASE 
      WHEN ABS(user1_age - user2_age) <= 2 THEN age_bonus := 20;
      WHEN ABS(user1_age - user2_age) <= 5 THEN age_bonus := 15;
      WHEN ABS(user1_age - user2_age) <= 10 THEN age_bonus := 10;
      WHEN ABS(user1_age - user2_age) <= 15 THEN age_bonus := 5;
      ELSE age_bonus := 0;
    END CASE;
  END IF;
  
  -- Location bonus calculation
  IF user1_location IS NOT NULL AND user2_location IS NOT NULL THEN
    IF LOWER(user1_location) = LOWER(user2_location) THEN
      location_bonus := 10;
    END IF;
  END IF;
  
  compatibility_score := compatibility_score + age_bonus + location_bonus;
  
  -- Cap at 100
  IF compatibility_score > 100 THEN
    compatibility_score := 100;
  END IF;
  
  RETURN compatibility_score;
END;
$function$;