-- Additional migration to handle public URLs
-- Public URLs have format: .../storage/v1/object/public/rug-photos/{path}

UPDATE inspections
SET photo_urls = (
  SELECT array_agg(
    CASE 
      -- If it's a public URL, extract the path
      WHEN url LIKE '%/object/public/rug-photos/%' THEN
        split_part(url, '/object/public/rug-photos/', 2)
      -- Otherwise keep as-is (already a path)
      ELSE url
    END
  )
  FROM unnest(photo_urls) AS url
)
WHERE photo_urls IS NOT NULL 
  AND array_length(photo_urls, 1) > 0
  AND EXISTS (
    SELECT 1 FROM unnest(photo_urls) AS url 
    WHERE url LIKE '%/object/public/rug-photos/%'
  );