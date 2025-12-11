-- Delete invalid matches where users are not compatible
DELETE FROM public.matches m
WHERE NOT public.are_users_compatible(m.user1_id, m.user2_id);

-- Drop and recreate the INSERT policy to include compatibility check
DROP POLICY IF EXISTS "Users can insert their own match requests" ON public.matches;

CREATE POLICY "Users can insert their own match requests" 
ON public.matches 
FOR INSERT 
WITH CHECK (
  (auth.uid() = requester_id) 
  AND (NOT are_users_blocked(user1_id, user2_id))
  AND are_users_compatible(user1_id, user2_id)
);