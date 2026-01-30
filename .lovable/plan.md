
# Comprehensive Fix: Routing Error and System Issues

## Issue 1: useBlocker Runtime Error (Critical)

**Root Cause**: The browser is serving a cached bundle that still contains the old `useBlocker` implementation, even though the source code has been completely updated. The error at `RugForm.tsx:52:20` doesn't match the current source where line 52 is just an interface closing brace.

**Solution**: Force a complete module graph reset by making structural changes to the hook file, not just adding comments. The previous "version comment" approach didn't trigger a full cache bust because Vite's dependency tracking wasn't affected.

**Approach**:
1. Rename the export function to force all import sites to re-resolve
2. Create a barrel file that re-exports to ensure module boundaries are reset
3. Add a timestamp-based cache buster in the file content itself

---

## Issue 2: Forms Missing Unsaved Changes Protection

During the audit, I found several forms that could lose user data:

| Component | Risk Level | Issue |
|-----------|------------|-------|
| `AccountSettings.tsx` | High | Extensive profile/branding settings with no save warning |
| `RugInspectionForm.tsx` | Medium | Legacy form without protection (may not be in active use) |
| `EditRugDialog.tsx` | Low | Dialog that could be dismissed accidentally |
| `EstimateReview.tsx` | Medium | Manual price overrides could be lost |

---

## Implementation Plan

### Step 1: Fix the useBlocker Error (Nuclear Option)

Since comment-based cache invalidation didn't work, I'll:

1. **Restructure `useUnsavedChanges.ts`**:
   - Move the implementation into a new internal function
   - Add a unique runtime identifier that changes with each build
   - Ensure the export signature remains the same

2. **Touch all consuming components** with actual code changes (not just comments):
   - Add a console.log statement (can be removed later) to force re-bundling
   - Update the destructuring pattern slightly

### Step 2: Verify No Hidden useBlocker References

Double-check there are no:
- Dynamic imports that might cache old code
- Lazy-loaded chunks with stale references
- Service worker caching old bundles

### Step 3: Add Missing Unsaved Changes Protection (Optional Follow-up)

Add the `useUnsavedChanges` hook to:
- `AccountSettings.tsx` - Profile and branding forms
- `EstimateReview.tsx` - When manual overrides are made

---

## Files to Modify

| File | Change |
|------|--------|
| `src/hooks/useUnsavedChanges.ts` | Restructure with runtime cache buster |
| `src/components/RugForm.tsx` | Add debug log to force recompile |
| `src/components/JobForm.tsx` | Add debug log to force recompile |

---

## Technical Details

The new hook structure will include a runtime identifier:

```text
// Structure
const HOOK_VERSION = Date.now(); // Changes with each deploy
console.debug('[useUnsavedChanges] v' + HOOK_VERSION);

export const useUnsavedChanges = (hasChanges) => {
  // Same implementation, guaranteed fresh bundle
}
```

Each consuming component will log on mount to verify the new code is running.

## Expected Outcome

After these changes:
1. The `useBlocker` error will be gone permanently
2. Console will show version logs confirming new code is loaded
3. Navigation blocking will work correctly with BrowserRouter
