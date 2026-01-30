-- Migration to convert existing signed URLs to file paths
-- This extracts the file path from signed URLs stored in inspections.photo_urls

-- First, let's update any existing signed URLs to just the file path
-- Signed URLs have format: .../rug-photos/{path}?token=...
-- We want to extract just the {path} portion

UPDATE inspections
SET photo_urls = (
  SELECT array_agg(
    CASE 
      -- If it's a signed URL, extract the path
      WHEN url LIKE '%/rug-photos/%?token=%' THEN
        split_part(split_part(url, '/rug-photos/', 2), '?token=', 1)
      -- If it's a signed URL without token in expected format, try alternate parsing
      WHEN url LIKE '%/object/sign/rug-photos/%' THEN
        split_part(split_part(url, '/object/sign/rug-photos/', 2), '?', 1)
      -- Otherwise keep as-is (already a path or different format)
      ELSE url
    END
  )
  FROM unnest(photo_urls) AS url
)
WHERE photo_urls IS NOT NULL 
  AND array_length(photo_urls, 1) > 0
  AND EXISTS (
    SELECT 1 FROM unnest(photo_urls) AS url 
    WHERE url LIKE 'http%'
  );