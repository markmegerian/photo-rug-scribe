-- Add business branding fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN business_name text,
ADD COLUMN business_address text,
ADD COLUMN business_phone text,
ADD COLUMN business_email text,
ADD COLUMN logo_url text;