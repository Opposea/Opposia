-- Update the compatibility calculation function to prioritize age and location
CREATE OR REPLACE FUNCTION public.calculate_compatibility_score(user1_id uuid, user2_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  total_questions INTEGER := 0;
  opposite_answers INTEGER := 0;
  compatibility_score INTEGER := 0;
  age_bonus INTEGER := 0;
  location_bonus INTEGER := 0;
  user1_age INTEGER;
  user2_age INTEGER;
  user1_location TEXT;
  user2_location TEXT;
BEGIN
  -- Get user profiles for age and location matching
  SELECT age, location INTO user1_age, user1_location
  FROM public.profiles WHERE user_id = user1_id;
  
  SELECT age, location INTO user2_age, user2_location
  FROM public.profiles WHERE user_id = user2_id;
  
  -- Get total questions both users answered
  SELECT COUNT(DISTINCT qa1.question_id)
  INTO total_questions
  FROM public.quiz_answers qa1
  INNER JOIN public.quiz_answers qa2 ON qa1.question_id = qa2.question_id
  WHERE qa1.user_id = user1_id AND qa2.user_id = user2_id;
  
  -- Count opposite answers (for attraction of opposites)
  SELECT COUNT(*)
  INTO opposite_answers
  FROM public.quiz_answers qa1
  INNER JOIN public.quiz_answers qa2 ON qa1.question_id = qa2.question_id
  WHERE qa1.user_id = user1_id 
    AND qa2.user_id = user2_id 
    AND qa1.answer != qa2.answer;
  
  -- Calculate base compatibility as percentage of opposite answers
  IF total_questions > 0 THEN
    compatibility_score := ROUND((opposite_answers::DECIMAL / total_questions::DECIMAL) * 70); -- Base score out of 70%
  END IF;
  
  -- Age compatibility bonus (closer ages get higher scores)
  IF user1_age IS NOT NULL AND user2_age IS NOT NULL THEN
    CASE 
      WHEN ABS(user1_age - user2_age) <= 2 THEN age_bonus := 20;
      WHEN ABS(user1_age - user2_age) <= 5 THEN age_bonus := 15;
      WHEN ABS(user1_age - user2_age) <= 10 THEN age_bonus := 10;
      WHEN ABS(user1_age - user2_age) <= 15 THEN age_bonus := 5;
      ELSE age_bonus := 0;
    END CASE;
  END IF;
  
  -- Location compatibility bonus (same location gets bonus)
  IF user1_location IS NOT NULL AND user2_location IS NOT NULL THEN
    IF LOWER(user1_location) = LOWER(user2_location) THEN
      location_bonus := 10;
    END IF;
  END IF;
  
  -- Final score is base compatibility + age bonus + location bonus
  compatibility_score := compatibility_score + age_bonus + location_bonus;
  
  -- Ensure score doesn't exceed 100
  IF compatibility_score > 100 THEN
    compatibility_score := 100;
  END IF;
  
  RETURN compatibility_score;
END;
$function$;