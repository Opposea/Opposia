-- Create gifts table for the gift sending feature
CREATE TABLE public.gifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL,
  receiver_id UUID NOT NULL,
  match_id UUID NOT NULL,
  gift_type TEXT NOT NULL,
  gift_name TEXT NOT NULL,
  gift_price INTEGER NOT NULL DEFAULT 0, -- price in cents
  message TEXT,
  status TEXT NOT NULL DEFAULT 'sent',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;

-- Create policies for gifts
CREATE POLICY "Users can send gifts in their matches" 
ON public.gifts 
FOR INSERT 
WITH CHECK (
  sender_id = auth.uid() AND 
  EXISTS (
    SELECT 1 FROM matches 
    WHERE id = match_id 
    AND ((user1_id = auth.uid() AND user2_id = receiver_id) OR (user2_id = auth.uid() AND user1_id = receiver_id))
    AND status = 'matched'
  )
);

CREATE POLICY "Users can view gifts in their matches" 
ON public.gifts 
FOR SELECT 
USING (
  sender_id = auth.uid() OR receiver_id = auth.uid()
);

-- Create video calls table for video calling feature
CREATE TABLE public.video_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caller_id UUID NOT NULL,
  receiver_id UUID NOT NULL,
  match_id UUID NOT NULL,
  call_status TEXT NOT NULL DEFAULT 'pending', -- pending, accepted, rejected, ended
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.video_calls ENABLE ROW LEVEL SECURITY;

-- Create policies for video calls
CREATE POLICY "Users can create video calls in their matches" 
ON public.video_calls 
FOR INSERT 
WITH CHECK (
  caller_id = auth.uid() AND 
  EXISTS (
    SELECT 1 FROM matches 
    WHERE id = match_id 
    AND ((user1_id = auth.uid() AND user2_id = receiver_id) OR (user2_id = auth.uid() AND user1_id = receiver_id))
    AND status = 'matched'
  )
);

CREATE POLICY "Users can view video calls in their matches" 
ON public.video_calls 
FOR SELECT 
USING (
  caller_id = auth.uid() OR receiver_id = auth.uid()
);

CREATE POLICY "Users can update video calls they're part of" 
ON public.video_calls 
FOR UPDATE 
USING (
  caller_id = auth.uid() OR receiver_id = auth.uid()
);

-- Update profiles table to add avatar upload functionality (if not already exists)
-- Check if the column exists first
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'avatar_url' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN avatar_url TEXT;
    END IF;
END $$;