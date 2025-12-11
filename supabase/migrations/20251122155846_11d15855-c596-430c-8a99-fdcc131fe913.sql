-- Remove the insecure public access policy from user_photos table
DROP POLICY IF EXISTS "Users can view all photos" ON public.user_photos;

-- The secure policy "Authenticated users can view non-blocked users photos" remains active
-- This ensures only authenticated users can view photos and respects blocking relationships