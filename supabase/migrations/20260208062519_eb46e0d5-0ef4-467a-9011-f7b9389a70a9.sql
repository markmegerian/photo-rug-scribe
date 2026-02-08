-- Fix security vulnerability: Add explicit anonymous access denial policies
-- This prevents unauthenticated users from reading sensitive data

-- 1. Deny anonymous access to profiles table (contains PII: business_email, phone, address)
CREATE POLICY "Deny anonymous access"
ON public.profiles
AS RESTRICTIVE
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- 2. Deny anonymous access to user_roles table (exposes admin/staff privileges)
CREATE POLICY "Deny anonymous access"
ON public.user_roles
AS RESTRICTIVE
FOR ALL
TO anon
USING (false)
WITH CHECK (false);