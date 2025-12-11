-- Drop and recreate get_discoverable_profiles function to include verification_selfie_url
DROP FUNCTION IF EXISTS public.get_discoverable_profiles();

CREATE FUNCTION public.get_discoverable_profiles()
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
  country text, 
  date_of_birth date, 
  age_verified boolean, 
  verification_selfie_url text,
  created_at timestamp with time zone, 
  updated_at timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
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
    p.verification_selfie_url,
    p.created_at,
    p.updated_at
  FROM public.profiles p
  WHERE p.user_id != auth.uid()
    AND public.are_users_compatible(auth.uid(), p.user_id);
$$;