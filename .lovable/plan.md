
# Plan: Strip Down to Marketing Site Only

## Overview
Transform this full-featured rug inspection application into a lightweight marketing/landing site by removing all application functionality and keeping only the specified routes.

---

## Routes to Keep

| Route | Page |
|-------|------|
| `/` and `/landing` | Landing page (redirect `/landing` to `/`) |
| `/blog` | Blog listing |
| `/blog/:slug` | Individual blog posts |
| `/blog-admin` | Blog CMS (passphrase protected) |
| `/privacy` and `/privacy-policy` | Privacy Policy |
| `/terms` and `/terms-of-service` | Terms of Service |
| `/support` | Support/FAQ page |
| `*` | 404 Not Found |

---

## Implementation Strategy

Since `LandingApp.tsx` already exists with most of the routes you need, the simplest approach is to:

1. Replace `App.tsx` content with `LandingApp.tsx` structure
2. Add the missing route aliases (`/privacy-policy`, `/terms-of-service`)
3. Delete all unused pages, components, hooks, and libraries

---

## Files to Delete

### Pages (22 files to remove)
```text
src/pages/admin/ (entire folder - 6 files)
  - AdminAuditLog.tsx
  - AdminDashboard.tsx
  - AdminPayouts.tsx
  - AdminSettings.tsx
  - AdminUserDetail.tsx
  - AdminUsers.tsx

src/pages/
  - AccountSettings.tsx
  - AccountsReceivable.tsx
  - Analytics.tsx
  - Auth.tsx
  - ClientAuth.tsx
  - ClientDashboard.tsx
  - ClientHistory.tsx
  - ClientPortal.tsx
  - ClientSetPassword.tsx
  - CompanySetup.tsx
  - Dashboard.tsx
  - History.tsx
  - Index.tsx
  - JobDetail.tsx
  - NewJob.tsx
  - PaymentCancelled.tsx
  - PaymentSuccess.tsx
  - ResetPassword.tsx
  - ScreenshotGenerator.tsx
```

### Components (48+ files to remove)
```text
src/components/admin/ (entire folder)
src/components/analytics/ (entire folder)
src/components/screenshots/ (entire folder)
src/components/skeletons/ (entire folder)

src/components/
  - AnalysisProgress.tsx
  - AnalysisReport.tsx
  - AppInitializer.tsx
  - BatchActionBar.tsx
  - BillingStatusBanner.tsx
  - ClientPortalStatus.tsx
  - ClientSearch.tsx
  - CompanyGuard.tsx
  - ConditionInspectionForm.tsx
  - DeleteAccountDialog.tsx
  - EditClientInfoDialog.tsx
  - EditRugDialog.tsx
  - EmailPreviewDialog.tsx
  - EmailTemplatesSettings.tsx
  - EstimateReview.tsx
  - ExpertEstimateCard.tsx
  - ExpertInspectionReport.tsx
  - ExportCsvButton.tsx
  - FeatureGate.tsx
  - GlobalSearch.tsx
  - GuidedPhotoCapture.tsx
  - JobBreadcrumb.tsx
  - JobForm.tsx
  - JobStatusControl.tsx
  - JobTimeline.tsx
  - JobsFilter.tsx
  - LazyPhotoGallery.tsx
  - LifecycleErrorState.tsx
  - MobileJobActionBar.tsx
  - MobileNav.tsx
  - MobilePhotoUpload.tsx
  - ModelComparisonDialog.tsx
  - NavLink.tsx
  - NotificationBell.tsx
  - OfflineBanner.tsx
  - PaginatedTable.tsx
  - PaymentInfoSettings.tsx
  - PaymentTracking.tsx
  - PhotoCapture.tsx
  - PhotoUploadProgress.tsx
  - PricingReview.tsx
  - ProtectedRoute.tsx
  - RateLimitFeedback.tsx
  - RugForm.tsx
  - RugInspectionForm.tsx
  - RugPhoto.tsx
  - ServiceCompletionCard.tsx
  - ServicePricing.tsx
  - StatusGatedButton.tsx
  - SystemDeterminedServices.tsx
  - TeachAIDialog.tsx
  - UnsavedChangesDialog.tsx
```

### Hooks (21 files to remove)
```text
src/hooks/
  - useAdminAuth.tsx
  - useAuditLog.tsx
  - useAuth.tsx
  - useBatchSelection.ts
  - useCapacitor.tsx
  - useCompany.tsx
  - useDeepLinking.tsx
  - useInspectionPdf.ts
  - useJobActions.ts
  - useJobDetail.ts
  - useJobs.ts
  - useJobsWithFilters.ts
  - useLifecycleGuards.ts
  - useOfflineStatus.ts
  - usePhotoUpload.ts
  - usePlanFeatures.tsx
  - usePushToken.tsx
  - useRealtimeNotifications.ts
  - useSignedUrl.ts
  - useSignedUrls.tsx
  - useUnsavedChanges.ts
```

### Libraries (13 files to remove)
```text
src/lib/
  - authRateLimiter.ts
  - csvExport.ts
  - lifecycleStateMachine.ts
  - navigation.ts
  - passwordValidation.ts
  - pdfGenerator.ts
  - planFeatures.ts
  - platformUrls.ts
  - pricingEngine.ts
  - queryKeys.ts
  - serviceCategories.ts
  - serviceRulesEngine.ts
  - tenantQueries.ts
```

### Other Files to Remove
```text
- src/LandingApp.tsx (will be merged into App.tsx)
- src/data/demoData.ts
- src/landing-main.tsx
- landing.html
- vite.config.landing.ts
- capacitor.config.ts (Capacitor no longer needed)
```

### Edge Functions (entire folder can be removed)
All 15 edge functions in `supabase/functions/` can be deleted as they're for the full app.

---

## Files to Keep

### Pages (6 files)
```text
src/pages/
  - LandingPage.tsx
  - BlogPage.tsx (includes BlogPostPage export)
  - BlogAdmin.tsx
  - PrivacyPolicy.tsx
  - TermsOfService.tsx
  - Support.tsx
  - NotFound.tsx
```

### Components
```text
src/components/landing/ (entire folder - 12 files)
src/components/blog/RichTextEditor.tsx
src/components/ui/ (entire folder - keep all UI primitives)
src/components/ErrorBoundary.tsx (useful for any React app)
```

### Hooks (keep minimal set)
```text
src/hooks/
  - use-mobile.tsx
  - use-toast.ts
  - useScrollAnimation.ts
```

### Libraries (keep minimal set)
```text
src/lib/
  - utils.ts
  - queryClient.ts (may be needed if blog uses React Query)
```

### Other Files to Keep
```text
- src/App.tsx (will be simplified)
- src/main.tsx
- src/index.css
- src/App.css
- src/assets/ (logo and images)
- src/integrations/ (keep for potential future use)
- All UI components in src/components/ui/
```

---

## Code Changes

### 1. Simplify `src/App.tsx`

Replace with a stripped-down version:

```text
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPage").then(m => ({ default: m.BlogPostPage })));
const BlogAdmin = lazy(() => import("./pages/BlogAdmin"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Support = lazy(() => import("./pages/Support"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <ErrorBoundary>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Landing */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<Navigate to="/" replace />} />
            
            {/* Blog */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/blog-admin" element={<BlogAdmin />} />
            
            {/* Legal */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/support" element={<Support />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </ErrorBoundary>
);

export default App;
```

### 2. Update Support Page Links

The Support page has links to `/auth` that need updating to point to the external app URL or be removed.

---

## Dependencies to Remove from package.json

These packages are only used by the full app and can be uninstalled:

```text
@capacitor/android
@capacitor/app
@capacitor/camera
@capacitor/cli
@capacitor/core
@capacitor/filesystem
@capacitor/haptics
@capacitor/ios
@capacitor/push-notifications
@capacitor/share
@capacitor/status-bar
@hookform/resolvers
@lovable.dev/cloud-auth-js
@playwright/test
html2canvas
jspdf
jspdf-autotable
react-day-picker
react-hook-form
react-resizable-panels
recharts
zod
```

---

## Summary

| Category | Files to Delete | Files to Keep |
|----------|-----------------|---------------|
| Pages | 22 | 7 |
| Components (non-UI) | ~50+ | ~15 |
| Hooks | 21 | 3 |
| Libraries | 13 | 2 |
| Edge Functions | 15 | 0 |

**Result**: A lightweight marketing site with landing page, blog with CMS, and legal pages. No authentication, no database operations (blog uses localStorage), and a significantly smaller bundle size.
