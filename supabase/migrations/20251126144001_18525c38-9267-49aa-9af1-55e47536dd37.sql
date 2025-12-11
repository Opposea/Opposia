-- Add gender and sexual_orientation columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS gender TEXT,
ADD COLUMN IF NOT EXISTS sexual_orientation TEXT;

-- Helper function for one-way compatibility check
CREATE OR REPLACE FUNCTION public.check_one_way_compatibility(
  viewer_gender TEXT,
  viewer_orientation TEXT,
  target_gender TEXT,
  target_orientation TEXT
)
RETURNS boolean
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  -- Gay men see only gay men
  IF viewer_gender = 'male' AND viewer_orientation = 'gay' THEN
    RETURN target_gender = 'male' AND target_orientation = 'gay';
  END IF;
  
  -- Lesbian women see only lesbian women
  IF viewer_gender = 'female' AND viewer_orientation = 'lesbian' THEN
    RETURN target_gender = 'female' AND target_orientation = 'lesbian';
  END IF;
  
  -- Straight men see straight women + bi women
  IF viewer_gender = 'male' AND viewer_orientation = 'straight' THEN
    RETURN target_gender = 'female' AND target_orientation IN ('straight', 'bi');
  END IF;
  
  -- Straight women see straight men + bi men
  IF viewer_gender = 'female' AND viewer_orientation = 'straight' THEN
    RETURN target_gender = 'male' AND target_orientation IN ('straight', 'bi');
  END IF;
  
  -- Bi men see bi/pan men, bi/pan women, straight women, bi/pan non-binary/trans
  IF viewer_gender = 'male' AND viewer_orientation = 'bi' THEN
    IF target_gender = 'male' AND target_orientation IN ('bi', 'pansexual') THEN
      RETURN TRUE;
    END IF;
    IF target_gender = 'female' AND target_orientation IN ('bi', 'pansexual', 'straight') THEN
      RETURN TRUE;
    END IF;
    IF target_gender = 'non-binary/trans' AND target_orientation IN ('bi', 'pansexual') THEN
      RETURN TRUE;
    END IF;
    RETURN FALSE;
  END IF;
  
  -- Bi women see bi/pan men, bi/pan women, straight men, bi/pan non-binary/trans
  IF viewer_gender = 'female' AND viewer_orientation = 'bi' THEN
    IF target_gender = 'male' AND target_orientation IN ('bi', 'pansexual', 'straight') THEN
      RETURN TRUE;
    END IF;
    IF target_gender = 'female' AND target_orientation IN ('bi', 'pansexual') THEN
      RETURN TRUE;
    END IF;
    IF target_gender = 'non-binary/trans' AND target_orientation IN ('bi', 'pansexual') THEN
      RETURN TRUE;
    END IF;
    RETURN FALSE;
  END IF;
  
  -- Pansexual (any gender) see all bi/pan/pansexual + non-binary/trans
  IF viewer_orientation = 'pansexual' THEN
    IF target_orientation IN ('bi', 'pansexual') THEN
      RETURN TRUE;
    END IF;
    IF target_gender = 'non-binary/trans' THEN
      RETURN TRUE;
    END IF;
    RETURN FALSE;
  END IF;
  
  -- Non-binary/trans see bi/pan/pansexual users + other non-binary/trans
  IF viewer_gender = 'non-binary/trans' THEN
    IF target_orientation IN ('bi', 'pansexual') THEN
      RETURN TRUE;
    END IF;
    IF target_gender = 'non-binary/trans' THEN
      RETURN TRUE;
    END IF;
    RETURN FALSE;
  END IF;
  
  RETURN FALSE;
END;
$$;

-- Create compatibility function
CREATE OR REPLACE FUNCTION public.are_users_compatible(user_a_id uuid, user_b_id uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  user_a_gender TEXT;
  user_a_orientation TEXT;
  user_b_gender TEXT;
  user_b_orientation TEXT;
BEGIN
  -- Get user A's info
  SELECT gender, sexual_orientation INTO user_a_gender, user_a_orientation
  FROM public.profiles WHERE user_id = user_a_id;
  
  -- Get user B's info
  SELECT gender, sexual_orientation INTO user_b_gender, user_b_orientation
  FROM public.profiles WHERE user_id = user_b_id;
  
  -- If either user hasn't set their preferences, not compatible
  IF user_a_gender IS NULL OR user_a_orientation IS NULL OR 
     user_b_gender IS NULL OR user_b_orientation IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Check compatibility in both directions
  RETURN check_one_way_compatibility(user_a_gender, user_a_orientation, user_b_gender, user_b_orientation)
     AND check_one_way_compatibility(user_b_gender, user_b_orientation, user_a_gender, user_a_orientation);
END;
$$;

-- Update get_discoverable_profiles to use compatibility check
CREATE OR REPLACE FUNCTION public.get_discoverable_profiles()
RETURNS TABLE(
  id uuid,
  user_id uuid,
  name text,
  age integer,
  bio text,
  location text,
  avatar_url text,
  interests text[],
  is_verified boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT 
    p.id,
    p.user_id,
    p.name,
    p.age,
    p.bio,
    p.location,
    p.avatar_url,
    p.interests,
    p.is_verified,
    p.created_at,
    p.updated_at
  FROM public.profiles p
  WHERE p.user_id != auth.uid()
    AND public.are_users_compatible(auth.uid(), p.user_id);
$$;