-- Harden storage upload policies to validate image size and MIME type

DROP POLICY IF EXISTS "Users can upload their own photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own verification selfie" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own verification selfie" ON storage.objects;

CREATE POLICY "Users can upload their own photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'user-photos' AND
    auth.uid()::text = (storage.foldername(name))[1] AND
    (metadata->>'mimetype') IN ('image/jpeg', 'image/png', 'image/webp', 'image/gif') AND
    COALESCE((metadata->>'size')::int, 0) BETWEEN 1 AND 5242880
  );

CREATE POLICY "Users can update their own photos" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'user-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  )
  WITH CHECK (
    bucket_id = 'user-photos' AND
    auth.uid()::text = (storage.foldername(name))[1] AND
    (metadata->>'mimetype') IN ('image/jpeg', 'image/png', 'image/webp', 'image/gif') AND
    COALESCE((metadata->>'size')::int, 0) BETWEEN 1 AND 5242880
  );

CREATE POLICY "Users can upload their own verification selfie" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'verification-selfies' AND
    auth.uid()::text = (storage.foldername(name))[1] AND
    (metadata->>'mimetype') IN ('image/jpeg', 'image/png', 'image/webp', 'image/gif') AND
    COALESCE((metadata->>'size')::int, 0) BETWEEN 1 AND 5242880
  );

CREATE POLICY "Users can update their own verification selfie" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'verification-selfies' AND
    auth.uid()::text = (storage.foldername(name))[1]
  )
  WITH CHECK (
    bucket_id = 'verification-selfies' AND
    auth.uid()::text = (storage.foldername(name))[1] AND
    (metadata->>'mimetype') IN ('image/jpeg', 'image/png', 'image/webp', 'image/gif') AND
    COALESCE((metadata->>'size')::int, 0) BETWEEN 1 AND 5242880
  );
