-- Drop the existing policy that prevents viewing blocked users' profiles
DROP POLICY IF EXISTS "Authenticated users can view non-blocked profiles" ON profiles;

-- Create a new policy that allows users to view profiles except when:
-- 1. They are blocked BY someone (they can't see that person's profile)
-- 2. But they CAN see profiles of people THEY have blocked (for the blocked users list)
CREATE POLICY "Authenticated users can view profiles with block rules"
ON profiles
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid() 
  OR (
    auth.uid() IS NOT NULL 
    AND NOT EXISTS (
      SELECT 1 
      FROM blocked_users
      WHERE blocked_users.user_id = profiles.user_id 
        AND blocked_users.blocked_user_id = auth.uid()
    )
  )
);