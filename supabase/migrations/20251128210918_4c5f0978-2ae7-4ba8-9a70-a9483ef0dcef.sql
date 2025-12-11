-- Fix admin access to verification selfies
-- Drop existing admin policy and recreate it using the has_role function
DROP POLICY IF EXISTS "Admins can view all verification selfies" ON storage.objects;

CREATE POLICY "Admins can view all verification selfies"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'verification-selfies'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Also ensure admins can update and delete verification selfies if needed
CREATE POLICY "Admins can update verification selfies"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'verification-selfies'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

CREATE POLICY "Admins can delete verification selfies"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'verification-selfies'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);