-- Allow users to view their own verification selfies
CREATE POLICY "Users can view their own verification selfies"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'verification-selfies'
  AND (storage.foldername(name))[1] = auth.uid()::text
);