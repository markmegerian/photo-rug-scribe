-- Create a function to add admin role for the first user (for testing)
-- This should be removed in production after initial admin is set up
CREATE OR REPLACE FUNCTION public.auto_add_first_admin()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this is the first user in the system (for testing purposes)
  -- Only add admin role if no admin exists yet
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE role = 'admin'::app_role
  ) THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::app_role);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to run on new user creation
CREATE TRIGGER on_auth_user_created_add_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.auto_add_first_admin();