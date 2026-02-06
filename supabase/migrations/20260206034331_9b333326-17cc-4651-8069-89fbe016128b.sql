-- Drop and recreate the validate_access_token function with new return type
DROP FUNCTION IF EXISTS public.validate_access_token(text);

CREATE FUNCTION public.validate_access_token(_token text)
RETURNS TABLE(
  access_id uuid, 
  job_id uuid, 
  invited_email text, 
  client_id uuid, 
  staff_user_id uuid, 
  job_number text, 
  client_name text, 
  job_status text,
  auth_user_id uuid
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cja.id as access_id,
    cja.job_id,
    cja.invited_email,
    cja.client_id,
    j.user_id as staff_user_id,
    j.job_number,
    j.client_name,
    j.status as job_status,
    cja.auth_user_id
  FROM client_job_access cja
  JOIN jobs j ON j.id = cja.job_id
  WHERE cja.access_token = _token
    AND (cja.expires_at IS NULL OR cja.expires_at > NOW());
END;
$$;