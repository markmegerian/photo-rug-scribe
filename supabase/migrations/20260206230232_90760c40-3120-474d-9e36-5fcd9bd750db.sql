-- Create rate limit tracking table for contact form
CREATE TABLE public.contact_form_rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for efficient lookups by IP and time
CREATE INDEX idx_rate_limits_ip_time ON public.contact_form_rate_limits (ip_address, created_at);

-- Enable RLS but allow public insert (the edge function handles validation)
ALTER TABLE public.contact_form_rate_limits ENABLE ROW LEVEL SECURITY;

-- Allow edge functions to insert rate limit records (using service role)
CREATE POLICY "Allow service role full access" 
ON public.contact_form_rate_limits 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Auto-cleanup old rate limit records (older than 1 hour)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS trigger AS $$
BEGIN
  DELETE FROM public.contact_form_rate_limits 
  WHERE created_at < now() - INTERVAL '1 hour';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger to clean up on each insert
CREATE TRIGGER cleanup_rate_limits_trigger
AFTER INSERT ON public.contact_form_rate_limits
FOR EACH STATEMENT
EXECUTE FUNCTION public.cleanup_old_rate_limits();