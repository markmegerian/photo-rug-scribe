
# Multi-Tenant Governance Implementation Plan

## Executive Summary

This plan transforms RugBoost from a single-tenant (user-based isolation) to a multi-tenant (company-based isolation) architecture. Currently, data is scoped by individual `user_id`. After implementation, data will be scoped by `company_id`, with users belonging to companies and all business data flowing through that tenant boundary.

---

## Current Architecture Analysis

### Existing Data Model
- **User-centric isolation**: All tables use `user_id` for ownership (jobs, inspections, service_prices, profiles)
- **Role system**: `user_roles` table with `app_role` enum (`staff`, `client`, `admin`)
- **Client access**: Via `client_job_access` table linking clients to specific jobs
- **No company concept**: Each staff user is essentially their own "business"

### Key Tables Requiring Tenant Scoping
| Table | Current Scope | New Scope |
|-------|--------------|-----------|
| jobs | user_id | company_id |
| inspections | user_id | company_id (via job) |
| profiles | user_id | company_id (becomes company_profiles) |
| service_prices | user_id | company_id |
| email_templates | user_id | company_id |
| approved_estimates | job.user_id | company_id (via job) |
| payments | job.user_id | company_id |
| payouts | user_id | company_id |
| client_accounts | user_id | company_id |

---

## Implementation Phases

### Phase 1: Database Schema Foundation

#### 1.1 Create Companies Table
```text
+------------------------+
|       companies        |
+------------------------+
| id (uuid, PK)          |
| name                   |
| slug (unique)          |
| created_at             |
| updated_at             |
| subscription_status    |
| payment_account_connected |
| stripe_account_id      |
| settings (jsonb)       |
+------------------------+
```

#### 1.2 Create Company Memberships Table
```text
+---------------------------+
|    company_memberships    |
+---------------------------+
| id (uuid, PK)             |
| company_id (FK)           |
| user_id (FK auth.users)   |
| role (company_admin|staff)|
| created_at                |
| invited_by                |
+---------------------------+
```

#### 1.3 Create Company Branding Table
```text
+---------------------------+
|     company_branding      |
+---------------------------+
| id (uuid, PK)             |
| company_id (FK, unique)   |
| business_name             |
| business_email            |
| business_phone            |
| business_address          |
| logo_path                 |
| primary_color             |
| created_at                |
| updated_at                |
+---------------------------+
```

#### 1.4 Create Company Pricing Table
```text
+---------------------------+
|    company_service_prices |
+---------------------------+
| id (uuid, PK)             |
| company_id (FK)           |
| service_name              |
| unit_price                |
| is_active                 |
| created_at                |
| updated_at                |
+---------------------------+
```

#### 1.5 Add company_id to Existing Tables
- Add `company_id` column to: `jobs`, `client_accounts`, `email_templates`, `payouts`
- Keep `user_id` for audit (who created), but scope access by `company_id`

---

### Phase 2: Security Functions & RLS Policies

#### 2.1 Create Tenant Context Functions

```sql
-- Get current user's company ID (SECURITY DEFINER)
CREATE FUNCTION get_user_company_id(_user_id uuid)
RETURNS uuid AS $$
  SELECT company_id FROM company_memberships
  WHERE user_id = _user_id
  LIMIT 1
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Check if user belongs to company
CREATE FUNCTION user_belongs_to_company(_user_id uuid, _company_id uuid)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM company_memberships
    WHERE user_id = _user_id AND company_id = _company_id
  )
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Check if user is company admin
CREATE FUNCTION is_company_admin(_user_id uuid, _company_id uuid)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM company_memberships
    WHERE user_id = _user_id 
      AND company_id = _company_id
      AND role = 'company_admin'
  )
$$ LANGUAGE sql STABLE SECURITY DEFINER;
```

#### 2.2 Update RLS Policies Pattern

All tenant-scoped tables will use this pattern:
```sql
-- Jobs table example
CREATE POLICY "Users can view their company's jobs"
  ON jobs FOR SELECT
  USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Users can insert jobs for their company"
  ON jobs FOR INSERT
  WITH CHECK (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Users can update their company's jobs"
  ON jobs FOR UPDATE
  USING (company_id = get_user_company_id(auth.uid()));
```

#### 2.3 Client Isolation
Clients remain scoped to individual jobs, but now through company context:
```sql
CREATE FUNCTION client_has_company_job_access(_job_id uuid)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM client_job_access cja
    JOIN client_accounts ca ON ca.id = cja.client_id
    WHERE cja.job_id = _job_id
      AND ca.user_id = auth.uid()
  )
$$ LANGUAGE sql STABLE SECURITY DEFINER;
```

---

### Phase 3: Authentication & Context Layer

#### 3.1 Update Auth Provider

Add company context to `useAuth` hook:
```typescript
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  roles: AppRole[];
  companyId: string | null;        // NEW
  companyRole: 'company_admin' | 'staff' | null; // NEW
  company: Company | null;          // NEW
  isCompanyAdmin: boolean;          // NEW
  // ... existing fields
}
```

#### 3.2 Create Company Context Hook

```typescript
// src/hooks/useCompany.ts
export const useCompany = () => {
  // Fetches company details, branding, settings
  // Provides companyId for all data operations
  // Enforces tenant boundary in frontend
};
```

#### 3.3 Tenant-Scoped Query Helpers

```typescript
// src/lib/tenantQueries.ts
export const withCompanyScope = (query, companyId) => {
  return query.eq('company_id', companyId);
};

// Usage in hooks
const { data } = await supabase
  .from('jobs')
  .select('*')
  .eq('company_id', companyId); // Enforced everywhere
```

---

### Phase 4: Global vs Company-Scoped Configuration

#### 4.1 Global System Tables (Read-Only)
These remain platform-level, no company isolation:
- `platform_settings` - Platform fee, global configs
- Service classification rules (in code: `serviceRulesEngine.ts`)
- Risk/severity multiplier logic (in code: `pricingEngine.ts`)

#### 4.2 Company-Scoped Configuration
| Configuration | Table | Editable By |
|--------------|-------|-------------|
| Base pricing | `company_service_prices` | Company Admin |
| Branding | `company_branding` | Company Admin |
| Email templates | `email_templates` (+ company_id) | Company Admin |
| Payment account | `companies.stripe_account_id` | Company Admin |

---

### Phase 5: Edge Functions Update

All edge functions require company context validation:

#### 5.1 Pattern for Tenant-Safe Edge Functions

```typescript
// create-checkout-session/index.ts changes
async function handler(req) {
  // 1. Authenticate user
  const user = await getAuthenticatedUser(req);
  
  // 2. Get user's company
  const { company_id } = await getCompanyMembership(user.id);
  
  // 3. Verify job belongs to company
  const job = await getJob(jobId);
  if (job.company_id !== company_id) {
    throw new ForbiddenError('Job not in your company');
  }
  
  // 4. Use company's Stripe account
  const company = await getCompany(company_id);
  const stripe = new Stripe(company.stripe_account_id);
  
  // 5. Process payment to company's account
}
```

#### 5.2 Edge Functions Requiring Updates
- `create-checkout-session` - Route payment to company
- `invite-client` - Use company branding
- `send-report-email` - Use company email templates
- `verify-payment` - Update company's payment record
- `notify-payment-received` - Notify company staff
- `notify-payout` - Process company payout

---

### Phase 6: Frontend Component Updates

#### 6.1 Dashboard & Data Fetching

```typescript
// src/hooks/useJobs.ts - Updated pattern
export const useJobs = () => {
  const { companyId } = useCompany();
  
  return useQuery({
    queryKey: ['jobs', companyId],
    queryFn: async () => {
      const { data } = await supabase
        .from('jobs')
        .select('*')
        .eq('company_id', companyId) // Explicit scope
        .order('created_at', { ascending: false });
      return data;
    },
    enabled: !!companyId,
  });
};
```

#### 6.2 Components Requiring Updates
- `Dashboard.tsx` - Use company context
- `JobDetail.tsx` - Verify job belongs to company
- `AccountSettings.tsx` - Split into personal vs company settings
- `ServicePricing.tsx` - Company-scoped pricing
- `ClientPortal.tsx` - Show company branding only

---

### Phase 7: Company Onboarding Flow

#### 7.1 New Company Registration

```text
+------------------+     +-------------------+     +------------------+
|  User Signs Up   | --> | Create Company    | --> | Configure        |
|  (staff role)    |     | (auto or manual)  |     | Branding/Pricing |
+------------------+     +-------------------+     +------------------+
                                  |
                                  v
                         +-------------------+
                         | Connect Payment   |
                         | Account (Stripe)  |
                         +-------------------+
```

#### 7.2 Team Member Invitation

Company admins can invite staff:
- Create invitation with email
- New user signs up, auto-joins company
- Existing user gets added to company membership

---

### Phase 8: Admin Platform View

#### 8.1 Platform Admin vs Company Admin

| Capability | Platform Admin | Company Admin |
|-----------|---------------|---------------|
| View all companies | Yes | No |
| Manage platform fees | Yes | No |
| Manage company branding | No | Yes (own) |
| Manage company pricing | No | Yes (own) |
| Invite company staff | No | Yes (own) |
| View audit logs | Yes (all) | Yes (own) |

#### 8.2 Admin Dashboard Updates
- `AdminUsers.tsx` becomes company list view
- Drill-down to see company details, staff, jobs
- Company-specific metrics and analytics

---

### Phase 9: Data Migration Strategy

#### 9.1 Migration Approach

```sql
-- 1. Create company for each existing user with jobs
INSERT INTO companies (id, name, slug)
SELECT 
  gen_random_uuid(),
  COALESCE(p.business_name, 'Company ' || p.id::text),
  p.user_id::text
FROM profiles p
WHERE EXISTS (SELECT 1 FROM jobs j WHERE j.user_id = p.user_id);

-- 2. Create company memberships
INSERT INTO company_memberships (company_id, user_id, role)
SELECT c.id, p.user_id, 'company_admin'
FROM companies c
JOIN profiles p ON c.slug = p.user_id::text;

-- 3. Add company_id to jobs
ALTER TABLE jobs ADD COLUMN company_id uuid REFERENCES companies(id);

UPDATE jobs j
SET company_id = (
  SELECT cm.company_id 
  FROM company_memberships cm 
  WHERE cm.user_id = j.user_id
  LIMIT 1
);

-- 4. Migrate branding
INSERT INTO company_branding (company_id, business_name, ...)
SELECT cm.company_id, p.business_name, p.business_email, ...
FROM profiles p
JOIN company_memberships cm ON cm.user_id = p.user_id;
```

#### 9.2 Backward Compatibility
- Keep `user_id` columns for audit purposes
- RLS uses `company_id` for access, `user_id` for attribution
- Gradual rollout possible per company

---

## Technical Specifications

### New Database Objects

| Object Type | Name | Purpose |
|-------------|------|---------|
| Table | companies | Tenant container |
| Table | company_memberships | User-company link |
| Table | company_branding | Per-tenant branding |
| Table | company_service_prices | Per-tenant pricing |
| Function | get_user_company_id() | Tenant context |
| Function | user_belongs_to_company() | Access check |
| Function | is_company_admin() | Role check |
| Trigger | set_job_company_id | Auto-set on insert |

### Files to Create
- `src/hooks/useCompany.ts` - Company context hook
- `src/contexts/CompanyContext.tsx` - Company provider
- `src/lib/tenantQueries.ts` - Tenant-scoped query helpers
- `src/pages/CompanySettings.tsx` - Company configuration
- `src/pages/TeamManagement.tsx` - Staff invitations
- `src/components/CompanyGuard.tsx` - Route protection

### Files to Modify
- `src/hooks/useAuth.tsx` - Add company context
- `src/hooks/useJobs.ts` - Add company scope
- `src/hooks/useJobDetail.ts` - Verify company access
- `src/pages/Dashboard.tsx` - Company-scoped data
- `src/pages/AccountSettings.tsx` - Split personal/company
- All edge functions - Add company validation

---

## Security Considerations

### Cross-Tenant Protection
1. **RLS Enforcement**: All tables with company_id have RLS policies
2. **Function Security**: All context functions use SECURITY DEFINER
3. **Frontend Guards**: CompanyGuard component prevents cross-tenant routes
4. **Edge Function Validation**: Every request validates company membership

### Audit Trail
- All mutations log `user_id` (who), `company_id` (where)
- `admin_audit_logs` extended with company context
- Declined services tracked per company for analytics

---

## Estimated Implementation Effort

| Phase | Effort | Dependencies |
|-------|--------|--------------|
| Phase 1: Schema | 2-3 hours | None |
| Phase 2: RLS/Functions | 2 hours | Phase 1 |
| Phase 3: Auth Layer | 2 hours | Phase 2 |
| Phase 4: Config Split | 1 hour | Phase 3 |
| Phase 5: Edge Functions | 3 hours | Phase 3 |
| Phase 6: Frontend | 4-5 hours | Phase 3 |
| Phase 7: Onboarding | 2 hours | Phase 6 |
| Phase 8: Admin Views | 2 hours | Phase 6 |
| Phase 9: Migration | 1 hour | All phases |

**Total: 19-21 hours of implementation**

---

## Success Criteria

1. No cross-company data visibility in any query
2. Company admins can manage only their company
3. Clients see only their servicing company's branding
4. Payments route to correct company accounts
5. Platform admin can view all companies without data mutation
6. Existing data migrated without loss
7. All audit logs include company context
