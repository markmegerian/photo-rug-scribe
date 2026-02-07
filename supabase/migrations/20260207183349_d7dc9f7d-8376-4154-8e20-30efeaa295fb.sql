-- Drop all unused tables from the legacy SaaS app
-- Only keeping: contact_form_rate_limits, user_roles, profiles (for auth)

-- First drop tables with foreign key dependencies
DROP TABLE IF EXISTS service_completions CASCADE;
DROP TABLE IF EXISTS declined_services CASCADE;
DROP TABLE IF EXISTS client_service_selections CASCADE;
DROP TABLE IF EXISTS price_overrides CASCADE;
DROP TABLE IF EXISTS approved_estimates CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS client_job_access CASCADE;
DROP TABLE IF EXISTS inspections CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS client_accounts CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS push_tokens CASCADE;
DROP TABLE IF EXISTS payouts CASCADE;
DROP TABLE IF EXISTS email_templates CASCADE;
DROP TABLE IF EXISTS service_prices CASCADE;
DROP TABLE IF EXISTS company_service_prices CASCADE;
DROP TABLE IF EXISTS company_enabled_services CASCADE;
DROP TABLE IF EXISTS company_branding CASCADE;
DROP TABLE IF EXISTS company_memberships CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS ai_analysis_feedback CASCADE;
DROP TABLE IF EXISTS admin_audit_logs CASCADE;
DROP TABLE IF EXISTS platform_settings CASCADE;

-- Drop unused functions
DROP FUNCTION IF EXISTS client_has_job_access(uuid) CASCADE;
DROP FUNCTION IF EXISTS company_can_create_jobs(uuid) CASCADE;
DROP FUNCTION IF EXISTS company_has_feature(uuid, text) CASCADE;
DROP FUNCTION IF EXISTS company_max_staff(uuid) CASCADE;
DROP FUNCTION IF EXISTS get_user_company_id(uuid) CASCADE;
DROP FUNCTION IF EXISTS get_user_company_role(uuid) CASCADE;
DROP FUNCTION IF EXISTS is_company_admin(uuid, uuid) CASCADE;
DROP FUNCTION IF EXISTS user_belongs_to_company(uuid, uuid) CASCADE;
DROP FUNCTION IF EXISTS validate_access_token(text) CASCADE;
DROP FUNCTION IF EXISTS update_client_access_tracking(text, boolean, boolean) CASCADE;
DROP FUNCTION IF EXISTS set_client_access_company_id() CASCADE;
DROP FUNCTION IF EXISTS set_inspection_company_id() CASCADE;
DROP FUNCTION IF EXISTS set_job_company_id() CASCADE;
DROP FUNCTION IF EXISTS update_job_last_activity() CASCADE;
DROP FUNCTION IF EXISTS update_enabled_services_timestamp() CASCADE;
DROP FUNCTION IF EXISTS prevent_audit_log_changes() CASCADE;

-- Drop unused enums (after tables that use them are dropped)
DROP TYPE IF EXISTS billing_status CASCADE;
DROP TYPE IF EXISTS company_role CASCADE;
DROP TYPE IF EXISTS plan_tier CASCADE;