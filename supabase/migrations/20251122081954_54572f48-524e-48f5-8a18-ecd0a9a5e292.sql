-- Fix critical security issues in profiles and user_photos tables
-- Both tables have RLS policies that allow unauthenticated public access

-- Drop the flawed policy on profiles that allows unauthenticated access
DROP POLICY IF EXISTS "Authenticated users can view non-blocked profiles" ON public.profiles;

-- Create a proper authenticated-only policy for viewing profiles
CREATE POLICY "Authenticated users can view non-blocked profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  -- User must be authenticated (enforced by TO authenticated)
  -- Allow users to view their own profile
  (user_id = auth.uid()) 
  OR 
  -- Or view profiles of users who haven't blocked them and they haven't blocked
  (
    auth.uid() IS NOT NULL 
    AND NOT EXISTS (
      SELECT 1 FROM blocked_users 
      WHERE (
        (blocked_users.user_id = auth.uid() AND blocked_users.blocked_user_id = profiles.user_id)
        OR 
        (blocked_users.user_id = profiles.user_id AND blocked_users.blocked_user_id = auth.uid())
      )
    )
  )
);

-- Drop the flawed policy on user_photos that allows unauthenticated access  
DROP POLICY IF EXISTS "Authenticated users can view non-blocked users photos" ON public.user_photos;

-- Create a proper authenticated-only policy for viewing photos
CREATE POLICY "Authenticated users can view non-blocked users photos" 
ON public.user_photos 
FOR SELECT 
TO authenticated
USING (
  -- User must be authenticated (enforced by TO authenticated)
  -- Allow users to view their own photos
  (user_id = auth.uid()) 
  OR 
  -- Or view photos of users who haven't blocked them and they haven't blocked
  (
    auth.uid() IS NOT NULL 
    AND NOT EXISTS (
      SELECT 1 FROM blocked_users 
      WHERE (
        (blocked_users.user_id = auth.uid() AND blocked_users.blocked_user_id = user_photos.user_id)
        OR 
        (blocked_users.user_id = user_photos.user_id AND blocked_users.blocked_user_id = auth.uid())
      )
    )
  )
);