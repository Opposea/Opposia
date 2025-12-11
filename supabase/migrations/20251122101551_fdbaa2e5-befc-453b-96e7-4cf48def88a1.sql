-- Drop the restrictive policy that only shows blocks users created
DROP POLICY IF EXISTS "Users can view their own blocks" ON public.blocked_users;

-- Create a new policy that allows users to see blocks involving them (both directions)
-- This allows:
-- 1. Users to see who THEY blocked (for the blocked users list UI)
-- 2. The code to check if THEY are blocked (for filtering them out of discovery)
CREATE POLICY "Users can view blocks involving them"
  ON public.blocked_users
  FOR SELECT
  USING (
    auth.uid() = user_id OR auth.uid() = blocked_user_id
  );