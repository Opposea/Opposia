-- Fix function search paths for security compliance
-- Update all functions to use SET search_path = 'public' instead of TO 'public'

-- Drop and recreate functions with correct search_path syntax

CREATE OR REPLACE FUNCTION public.are_users_blocked(user_a uuid, user_b uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.blocked_users
    WHERE (user_id = user_a AND blocked_user_id = user_b)
       OR (user_id = user_b AND blocked_user_id = user_a)
  );
$$;

CREATE OR REPLACE FUNCTION public.get_current_user_profile()
RETURNS profiles
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT * FROM public.profiles WHERE user_id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.are_users_matched(user1_id uuid, user2_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.matches 
    WHERE (user1_id = $1 AND user2_id = $2 AND status = 'matched')
       OR (user1_id = $2 AND user2_id = $1 AND status = 'matched')
  );
$$;

CREATE OR REPLACE FUNCTION public.calculate_compatibility_score(user1_id uuid, user2_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
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
  SELECT age, location INTO user1_age, user1_location
  FROM public.profiles WHERE user_id = user1_id;
  
  SELECT age, location INTO user2_age, user2_location
  FROM public.profiles WHERE user_id = user2_id;
  
  SELECT COUNT(DISTINCT qa1.question_id)
  INTO total_questions
  FROM public.quiz_answers qa1
  INNER JOIN public.quiz_answers qa2 ON qa1.question_id = qa2.question_id
  WHERE qa1.user_id = user1_id AND qa2.user_id = user2_id;
  
  SELECT COUNT(*)
  INTO opposite_answers
  FROM public.quiz_answers qa1
  INNER JOIN public.quiz_answers qa2 ON qa1.question_id = qa2.question_id
  WHERE qa1.user_id = user1_id 
    AND qa2.user_id = user2_id 
    AND qa1.answer != qa2.answer;
  
  IF total_questions > 0 THEN
    compatibility_score := ROUND((opposite_answers::DECIMAL / total_questions::DECIMAL) * 70);
  END IF;
  
  IF user1_age IS NOT NULL AND user2_age IS NOT NULL THEN
    CASE 
      WHEN ABS(user1_age - user2_age) <= 2 THEN age_bonus := 20;
      WHEN ABS(user1_age - user2_age) <= 5 THEN age_bonus := 15;
      WHEN ABS(user1_age - user2_age) <= 10 THEN age_bonus := 10;
      WHEN ABS(user1_age - user2_age) <= 15 THEN age_bonus := 5;
      ELSE age_bonus := 0;
    END CASE;
  END IF;
  
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
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_discoverable_profiles()
RETURNS TABLE(id uuid, user_id uuid, name text, age integer, bio text, location text, avatar_url text, interests text[], is_verified boolean, created_at timestamp with time zone, updated_at timestamp with time zone)
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT 
    id,
    user_id,
    name,
    age,
    bio,
    location,
    avatar_url,
    interests,
    is_verified,
    created_at,
    updated_at
  FROM public.profiles
  WHERE user_id != auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_profile_owner(profile_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT auth.uid() = profile_user_id;
$$;

CREATE OR REPLACE FUNCTION public.normalize_match_users()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  IF NEW.user1_id > NEW.user2_id THEN
    DECLARE
      temp_id UUID;
    BEGIN
      temp_id := NEW.user1_id;
      NEW.user1_id := NEW.user2_id;
      NEW.user2_id := temp_id;
    END;
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.sanitize_text_input(input_text text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN LEFT(regexp_replace(input_text, '<[^>]*>', '', 'g'), 1000);
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_email(email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$;