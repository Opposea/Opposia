-- Drop and recreate get_discoverable_profiles with new fields
DROP FUNCTION IF EXISTS public.get_discoverable_profiles();

CREATE FUNCTION public.get_discoverable_profiles()
RETURNS TABLE(
  id UUID,
  user_id UUID,
  name TEXT,
  age INTEGER,
  bio TEXT,
  location TEXT,
  avatar_url TEXT,
  interests TEXT[],
  is_verified BOOLEAN,
  country TEXT,
  date_of_birth DATE,
  age_verified BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
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
    p.country,
    p.date_of_birth,
    p.age_verified,
    p.created_at,
    p.updated_at
  FROM public.profiles p
  WHERE p.user_id != auth.uid()
    AND public.are_users_compatible(auth.uid(), p.user_id);
$$;