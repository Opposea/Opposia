-- Make verification-selfies bucket public so images can load
UPDATE storage.buckets 
SET public = true 
WHERE id = 'verification-selfies';