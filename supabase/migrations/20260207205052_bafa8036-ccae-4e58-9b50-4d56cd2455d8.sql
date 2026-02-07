-- Remove unused financial/payment columns from profiles table
ALTER TABLE public.profiles
  DROP COLUMN IF EXISTS bank_account_number,
  DROP COLUMN IF EXISTS bank_name,
  DROP COLUMN IF EXISTS bank_routing_number,
  DROP COLUMN IF EXISTS paypal_email,
  DROP COLUMN IF EXISTS venmo_handle,
  DROP COLUMN IF EXISTS zelle_email,
  DROP COLUMN IF EXISTS payment_method,
  DROP COLUMN IF EXISTS payment_notes;