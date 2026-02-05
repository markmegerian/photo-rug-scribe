-- ============================================
-- PHASE 1 & 2: Multi-Tenant Governance Schema
-- ============================================

-- 1. Create company_role enum
CREATE TYPE public.company_role AS ENUM ('company_admin', 'staff');

-- 2. Create companies table (tenant container)
CREATE TABLE public.companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  subscription_status text NOT NULL DEFAULT 'active',
  payment_account_connected boolean NOT NULL DEFAULT false,
  stripe_account_id text,
  settings jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3. Create company_memberships table (user-company link)
CREATE TABLE public.company_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  role public.company_role NOT NULL DEFAULT 'staff',
  invited_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(company_id, user_id)
);

-- 4. Create company_branding table
CREATE TABLE public.company_branding (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL UNIQUE REFERENCES public.companies(id) ON DELETE CASCADE,
  business_name text,
  business_email text,
  business_phone text,
  business_address text,
  logo_path text,
  logo_url text,
  primary_color text DEFAULT '#3b82f6',
  secondary_color text DEFAULT '#1e40af',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 5. Create company_service_prices table
CREATE TABLE public.company_service_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  service_name text NOT NULL,
  unit_price numeric NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  is_additional boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(company_id, service_name)
);

-- 6. Add company_id to existing tables
ALTER TABLE public.jobs ADD COLUMN company_id uuid REFERENCES public.companies(id);
ALTER TABLE public.client_accounts ADD COLUMN company_id uuid REFERENCES public.companies(id);
ALTER TABLE public.email_templates ADD COLUMN company_id uuid REFERENCES public.companies(id);
ALTER TABLE public.payouts ADD COLUMN company_id uuid REFERENCES public.companies(id);
ALTER TABLE public.inspections ADD COLUMN company_id uuid REFERENCES public.companies(id);
ALTER TABLE public.admin_audit_logs ADD COLUMN company_id uuid REFERENCES public.companies(id);

-- ============================================
-- SECURITY DEFINER FUNCTIONS
-- ============================================

-- Get current user's company ID
CREATE OR REPLACE FUNCTION public.get_user_company_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT company_id FROM public.company_memberships
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- Check if user belongs to company
CREATE OR REPLACE FUNCTION public.user_belongs_to_company(_user_id uuid, _company_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.company_memberships
    WHERE user_id = _user_id AND company_id = _company_id
  )
$$;

-- Check if user is company admin
CREATE OR REPLACE FUNCTION public.is_company_admin(_user_id uuid, _company_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.company_memberships
    WHERE user_id = _user_id 
      AND company_id = _company_id
      AND role = 'company_admin'
  )
$$;

-- Get user's company role
CREATE OR REPLACE FUNCTION public.get_user_company_role(_user_id uuid)
RETURNS public.company_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.company_memberships
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- ============================================
-- ENABLE RLS ON NEW TABLES
-- ============================================

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_branding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_service_prices ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES FOR COMPANIES TABLE
-- ============================================

CREATE POLICY "Users can view their own company"
  ON public.companies FOR SELECT
  USING (id = get_user_company_id(auth.uid()));

CREATE POLICY "Company admins can update their company"
  ON public.companies FOR UPDATE
  USING (is_company_admin(auth.uid(), id));

CREATE POLICY "Platform admins can view all companies"
  ON public.companies FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Platform admins can manage all companies"
  ON public.companies FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- ============================================
-- RLS POLICIES FOR COMPANY_MEMBERSHIPS TABLE
-- ============================================

CREATE POLICY "Users can view their company's memberships"
  ON public.company_memberships FOR SELECT
  USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Company admins can manage memberships"
  ON public.company_memberships FOR ALL
  USING (is_company_admin(auth.uid(), company_id));

CREATE POLICY "Platform admins can view all memberships"
  ON public.company_memberships FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- ============================================
-- RLS POLICIES FOR COMPANY_BRANDING TABLE
-- ============================================

CREATE POLICY "Users can view their company's branding"
  ON public.company_branding FOR SELECT
  USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Company admins can manage branding"
  ON public.company_branding FOR ALL
  USING (is_company_admin(auth.uid(), company_id));

CREATE POLICY "Platform admins can view all branding"
  ON public.company_branding FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Clients can view branding for their jobs' company
CREATE POLICY "Clients can view company branding via job access"
  ON public.company_branding FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM client_job_access cja
      JOIN client_accounts ca ON ca.id = cja.client_id
      JOIN jobs j ON j.id = cja.job_id
      WHERE ca.user_id = auth.uid()
        AND j.company_id = company_branding.company_id
    )
  );

-- ============================================
-- RLS POLICIES FOR COMPANY_SERVICE_PRICES TABLE
-- ============================================

CREATE POLICY "Users can view their company's service prices"
  ON public.company_service_prices FOR SELECT
  USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Company admins can manage service prices"
  ON public.company_service_prices FOR ALL
  USING (is_company_admin(auth.uid(), company_id));

CREATE POLICY "Platform admins can view all service prices"
  ON public.company_service_prices FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- ============================================
-- UPDATE RLS POLICIES FOR JOBS TABLE
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own jobs" ON public.jobs;
DROP POLICY IF EXISTS "Users can insert their own jobs" ON public.jobs;
DROP POLICY IF EXISTS "Users can update their own jobs" ON public.jobs;
DROP POLICY IF EXISTS "Users can delete their own jobs" ON public.jobs;

-- Create new company-scoped policies
CREATE POLICY "Staff can view their company's jobs"
  ON public.jobs FOR SELECT
  USING (
    company_id = get_user_company_id(auth.uid())
    OR company_id IS NULL AND user_id = auth.uid()
  );

CREATE POLICY "Staff can insert jobs for their company"
  ON public.jobs FOR INSERT
  WITH CHECK (
    company_id = get_user_company_id(auth.uid())
    OR company_id IS NULL AND user_id = auth.uid()
  );

CREATE POLICY "Staff can update their company's jobs"
  ON public.jobs FOR UPDATE
  USING (
    company_id = get_user_company_id(auth.uid())
    OR company_id IS NULL AND user_id = auth.uid()
  );

CREATE POLICY "Staff can delete their company's jobs"
  ON public.jobs FOR DELETE
  USING (
    company_id = get_user_company_id(auth.uid())
    OR company_id IS NULL AND user_id = auth.uid()
  );

-- ============================================
-- UPDATE RLS POLICIES FOR CLIENT_ACCOUNTS TABLE
-- ============================================

DROP POLICY IF EXISTS "Users can view their own client account" ON public.client_accounts;
DROP POLICY IF EXISTS "Users can insert their own client account" ON public.client_accounts;
DROP POLICY IF EXISTS "Users can update their own client account" ON public.client_accounts;

-- Clients can view/update their own account
CREATE POLICY "Clients can view their own account"
  ON public.client_accounts FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Clients can insert their own account"
  ON public.client_accounts FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Clients can update their own account"
  ON public.client_accounts FOR UPDATE
  USING (user_id = auth.uid());

-- Staff can view client accounts for their company
CREATE POLICY "Staff can view company client accounts"
  ON public.client_accounts FOR SELECT
  USING (company_id = get_user_company_id(auth.uid()));

-- ============================================
-- UPDATE RLS POLICIES FOR EMAIL_TEMPLATES TABLE
-- ============================================

DROP POLICY IF EXISTS "Users can view their own email templates" ON public.email_templates;
DROP POLICY IF EXISTS "Users can insert their own email templates" ON public.email_templates;
DROP POLICY IF EXISTS "Users can update their own email templates" ON public.email_templates;
DROP POLICY IF EXISTS "Users can delete their own email templates" ON public.email_templates;

CREATE POLICY "Staff can view company email templates"
  ON public.email_templates FOR SELECT
  USING (
    company_id = get_user_company_id(auth.uid())
    OR company_id IS NULL AND user_id = auth.uid()
  );

CREATE POLICY "Company admins can manage email templates"
  ON public.email_templates FOR ALL
  USING (
    is_company_admin(auth.uid(), company_id)
    OR company_id IS NULL AND user_id = auth.uid()
  );

-- ============================================
-- UPDATE RLS POLICIES FOR PAYOUTS TABLE
-- ============================================

DROP POLICY IF EXISTS "Users can view their own payouts" ON public.payouts;

CREATE POLICY "Staff can view company payouts"
  ON public.payouts FOR SELECT
  USING (
    company_id = get_user_company_id(auth.uid())
    OR company_id IS NULL AND user_id = auth.uid()
  );

-- ============================================
-- UPDATE RLS POLICIES FOR INSPECTIONS TABLE
-- ============================================

DROP POLICY IF EXISTS "Users can view their own inspections" ON public.inspections;
DROP POLICY IF EXISTS "Users can insert their own inspections" ON public.inspections;
DROP POLICY IF EXISTS "Users can update their own inspections" ON public.inspections;
DROP POLICY IF EXISTS "Users can delete their own inspections" ON public.inspections;

CREATE POLICY "Staff can view company inspections"
  ON public.inspections FOR SELECT
  USING (
    company_id = get_user_company_id(auth.uid())
    OR company_id IS NULL AND user_id = auth.uid()
  );

CREATE POLICY "Staff can insert company inspections"
  ON public.inspections FOR INSERT
  WITH CHECK (
    company_id = get_user_company_id(auth.uid())
    OR company_id IS NULL AND user_id = auth.uid()
  );

CREATE POLICY "Staff can update company inspections"
  ON public.inspections FOR UPDATE
  USING (
    company_id = get_user_company_id(auth.uid())
    OR company_id IS NULL AND user_id = auth.uid()
  );

CREATE POLICY "Staff can delete company inspections"
  ON public.inspections FOR DELETE
  USING (
    company_id = get_user_company_id(auth.uid())
    OR company_id IS NULL AND user_id = auth.uid()
  );

-- ============================================
-- TRIGGERS FOR AUTO-SETTING COMPANY_ID
-- ============================================

-- Function to auto-set company_id on job insert
CREATE OR REPLACE FUNCTION public.set_job_company_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.company_id IS NULL THEN
    NEW.company_id := get_user_company_id(auth.uid());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER set_job_company_id_trigger
  BEFORE INSERT ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.set_job_company_id();

-- Function to auto-set company_id on inspection insert
CREATE OR REPLACE FUNCTION public.set_inspection_company_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.company_id IS NULL AND NEW.job_id IS NOT NULL THEN
    SELECT company_id INTO NEW.company_id FROM jobs WHERE id = NEW.job_id;
  END IF;
  IF NEW.company_id IS NULL THEN
    NEW.company_id := get_user_company_id(auth.uid());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER set_inspection_company_id_trigger
  BEFORE INSERT ON public.inspections
  FOR EACH ROW
  EXECUTE FUNCTION public.set_inspection_company_id();

-- ============================================
-- UPDATED_AT TRIGGERS FOR NEW TABLES
-- ============================================

CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_company_branding_updated_at
  BEFORE UPDATE ON public.company_branding
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_company_service_prices_updated_at
  BEFORE UPDATE ON public.company_service_prices
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_company_memberships_user_id ON public.company_memberships(user_id);
CREATE INDEX idx_company_memberships_company_id ON public.company_memberships(company_id);
CREATE INDEX idx_jobs_company_id ON public.jobs(company_id);
CREATE INDEX idx_inspections_company_id ON public.inspections(company_id);
CREATE INDEX idx_client_accounts_company_id ON public.client_accounts(company_id);
CREATE INDEX idx_company_service_prices_company_id ON public.company_service_prices(company_id);