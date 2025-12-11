-- Add verification selfie URL to profiles
ALTER TABLE public.profiles 
ADD COLUMN verification_selfie_url TEXT;

-- Create storage bucket for verification selfies (not public - only admins see these)
INSERT INTO storage.buckets (id, name, public)
VALUES ('verification-selfies', 'verification-selfies', false);

-- RLS policies for verification-selfies bucket
-- Users can upload their own verification selfie
CREATE POLICY "Users can upload their own verification selfie"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'verification-selfies' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can view their own verification selfie
CREATE POLICY "Users can view their own verification selfie"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'verification-selfies' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can update their own verification selfie
CREATE POLICY "Users can update their own verification selfie"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'verification-selfies' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can delete their own verification selfie
CREATE POLICY "Users can delete their own verification selfie"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'verification-selfies' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Admins can view all verification selfies
CREATE POLICY "Admins can view all verification selfies"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'verification-selfies' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);