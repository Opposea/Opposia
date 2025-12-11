# Security Fixes - Required SQL Commands

Since migrations are read-only, you need to run these SQL commands manually in your Supabase SQL Editor.

## 1. Create blocked_users Table

```sql
-- Create blocked_users table
CREATE TABLE IF NOT EXISTS public.blocked_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  blocked_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, blocked_user_id),
  CHECK (user_id != blocked_user_id)
);

-- Enable RLS
ALTER TABLE public.blocked_users ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blocked_users_user_id ON public.blocked_users(user_id);
CREATE INDEX IF NOT EXISTS idx_blocked_users_blocked_user_id ON public.blocked_users(blocked_user_id);

-- RLS Policies: Users can only manage their own blocks
DROP POLICY IF EXISTS "Users can view their own blocks" ON public.blocked_users;
CREATE POLICY "Users can view their own blocks"
ON public.blocked_users
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own blocks" ON public.blocked_users;
CREATE POLICY "Users can create their own blocks"
ON public.blocked_users
FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own blocks" ON public.blocked_users;
CREATE POLICY "Users can delete their own blocks"
ON public.blocked_users
FOR DELETE
USING (auth.uid() = user_id);
```

## 2. Create user_photos Table

```sql
-- Create user_photos table
CREATE TABLE IF NOT EXISTS public.user_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (length(photo_url) > 0 AND length(photo_url) <= 2048)
);

-- Enable RLS
ALTER TABLE public.user_photos ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_photos_user_id ON public.user_photos(user_id);
CREATE INDEX IF NOT EXISTS idx_user_photos_display_order ON public.user_photos(user_id, display_order);

-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Anyone can view user photos" ON public.user_photos;
DROP POLICY IF EXISTS "Users can insert their own photos" ON public.user_photos;
DROP POLICY IF EXISTS "Users can update their own photos" ON public.user_photos;
DROP POLICY IF EXISTS "Users can delete their own photos" ON public.user_photos;

-- Now create the policies
CREATE POLICY "Anyone can view user photos"
ON public.user_photos
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can insert their own photos"
ON public.user_photos
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own photos"
ON public.user_photos
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own photos"
ON public.user_photos
FOR DELETE
USING (auth.uid() = user_id);
```

## 3. Add Foreign Key Constraints

```sql
-- Drop existing constraints first (if they exist)
ALTER TABLE public.gifts DROP CONSTRAINT IF EXISTS gifts_sender_id_fkey;
ALTER TABLE public.gifts DROP CONSTRAINT IF EXISTS gifts_receiver_id_fkey;
ALTER TABLE public.video_calls DROP CONSTRAINT IF EXISTS video_calls_caller_id_fkey;
ALTER TABLE public.video_calls DROP CONSTRAINT IF EXISTS video_calls_receiver_id_fkey;

-- Add foreign key constraints to gifts table
ALTER TABLE public.gifts
ADD CONSTRAINT gifts_sender_id_fkey 
FOREIGN KEY (sender_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.gifts
ADD CONSTRAINT gifts_receiver_id_fkey 
FOREIGN KEY (receiver_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add foreign key constraints to video_calls table
ALTER TABLE public.video_calls
ADD CONSTRAINT video_calls_caller_id_fkey 
FOREIGN KEY (caller_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.video_calls
ADD CONSTRAINT video_calls_receiver_id_fkey 
FOREIGN KEY (receiver_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add helpful indexes
CREATE INDEX IF NOT EXISTS idx_gifts_sender_id ON public.gifts(sender_id);
CREATE INDEX IF NOT EXISTS idx_gifts_receiver_id ON public.gifts(receiver_id);
CREATE INDEX IF NOT EXISTS idx_video_calls_caller_id ON public.video_calls(caller_id);
CREATE INDEX IF NOT EXISTS idx_video_calls_receiver_id ON public.video_calls(receiver_id);
```

## 4. Add Input Validation Constraints

```sql
-- Drop existing constraints first (if they exist)
ALTER TABLE public.messages DROP CONSTRAINT IF EXISTS message_content_length;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profile_name_length;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profile_bio_length;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profile_location_length;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profile_age_range;
ALTER TABLE public.gifts DROP CONSTRAINT IF EXISTS gift_message_length;
ALTER TABLE public.gifts DROP CONSTRAINT IF EXISTS gift_name_length;

-- Add input validation constraints to messages table
ALTER TABLE public.messages
ADD CONSTRAINT message_content_length 
CHECK (length(content) > 0 AND length(content) <= 2000);

-- Add input validation constraints to profiles table
ALTER TABLE public.profiles
ADD CONSTRAINT profile_name_length
CHECK (length(name) >= 2 AND length(name) <= 100);

ALTER TABLE public.profiles
ADD CONSTRAINT profile_bio_length
CHECK (bio IS NULL OR length(bio) <= 500);

ALTER TABLE public.profiles
ADD CONSTRAINT profile_location_length
CHECK (location IS NULL OR length(location) <= 100);

ALTER TABLE public.profiles
ADD CONSTRAINT profile_age_range
CHECK (age IS NULL OR (age >= 18 AND age <= 120));

-- Add validation to gifts table
ALTER TABLE public.gifts
ADD CONSTRAINT gift_message_length
CHECK (message IS NULL OR length(message) <= 200);

ALTER TABLE public.gifts
ADD CONSTRAINT gift_name_length
CHECK (length(gift_name) > 0 AND length(gift_name) <= 100);
```

## How to Run These Commands

1. Go to your Supabase Dashboard
2. Navigate to the SQL Editor
3. Copy and paste each section above (one at a time)
4. Click "Run" to execute
5. Verify there are no errors

## What Was Fixed in Code

✅ **Input Validation**: Added validation for messages (max 2000 chars), profiles, and gift messages  
✅ **Excessive Logging**: Removed console.log statements from production code  
✅ **Profile Updates**: Added comprehensive validation with detailed error messages  
✅ **Edge Functions**: Cleaned up logging and added input validation

## What Still Needs Attention

⚠️ **Gift localStorage Vulnerability**: We're leaving this for last as requested. The current implementation still stores gift data client-side which could be manipulated.
