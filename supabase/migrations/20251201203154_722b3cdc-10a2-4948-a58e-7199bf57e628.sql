-- Modify get_discoverable_profiles to allow admins to see all profiles
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
  country text, 
  date_of_birth date, 
  age_verified boolean, 
  verification_selfie_url text, 
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
    p.country,
    p.date_of_birth,
    p.age_verified,
    p.verification_selfie_url,
    p.created_at,
    p.updated_at
  FROM public.profiles p
  WHERE p.user_id != auth.uid()
    AND (
      -- Admins can see all profiles
      public.has_role(auth.uid(), 'admin')
      OR
      -- Regular users only see compatible profiles
      public.are_users_compatible(auth.uid(), p.user_id)
    );
$$;