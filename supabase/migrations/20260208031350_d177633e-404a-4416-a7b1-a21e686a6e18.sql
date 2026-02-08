-- Fix security vulnerability: Remove automatic admin role assignment
-- This trigger creates a privilege escalation risk where any user could become admin

-- Step 1: Drop the trigger that auto-assigns admin role
DROP TRIGGER IF EXISTS on_auth_user_created_add_admin ON auth.users;

-- Step 2: Drop the function that was used by the trigger
DROP FUNCTION IF EXISTS public.auto_add_first_admin();

-- Step 3: Add explicit service_role check to contact_form_rate_limits policy
-- First drop the existing overly permissive policy
DROP POLICY IF EXISTS "Allow service role full access" ON public.contact_form_rate_limits;

-- Create a proper policy that only allows service role access
-- Note: The service role key bypasses RLS by default, so we need a policy for regular access
-- This ensures the table is not accessible to regular users or anonymous access
CREATE POLICY "Service role only access"
ON public.contact_form_rate_limits
FOR ALL
TO authenticated
USING (false)
WITH CHECK (false);

-- Add a policy to allow anon to NOT access this table (explicit deny for safety)
CREATE POLICY "Deny anonymous access"
ON public.contact_form_rate_limits
FOR ALL
TO anon
USING (false)
WITH CHECK (false);