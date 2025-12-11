-- Fix: Reports table - add admin SELECT policy for moderation
CREATE POLICY "Admins can view all reports"
ON public.reports
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Fix: Gifts table - allow receivers to update gifts (mark as received)
CREATE POLICY "Receivers can update their gifts"
ON public.gifts
FOR UPDATE
TO authenticated
USING (receiver_id = auth.uid());

-- Fix: Messages table - allow match participants to update messages (mark as read)
-- Since messages only track sender_id, we check via match membership
DROP POLICY IF EXISTS "Users can update their own messages" ON public.messages;
CREATE POLICY "Match participants can update messages"
ON public.messages
FOR UPDATE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM matches 
  WHERE matches.id = messages.match_id 
  AND (matches.user1_id = auth.uid() OR matches.user2_id = auth.uid())
  AND matches.status = 'matched'
));