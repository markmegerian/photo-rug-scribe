
# Fix: Photos Not Displaying Due to Expired Signed URLs

## ✅ COMPLETED

## Summary
Rug photos were failing to load because the app stored time-limited signed URLs (7-day expiry) in the database instead of file paths. After 7 days, these URLs expired and photos stopped displaying.

## Root Cause
The `usePhotoUpload.ts` hook generated signed URLs immediately after upload and stored those URLs in the database. When the URLs expired after 7 days, the images broke.

## Solution Implemented
Applied the same fix that was used for business logos: store file paths instead of signed URLs, then generate fresh signed URLs on-demand when displaying images.

---

## Changes Made

### 1. ✅ Updated Photo Upload Hook
**File:** `src/hooks/usePhotoUpload.ts`

- Modified `uploadSinglePhoto` to return the **storage file path** instead of a signed URL
- Removed signed URL generation during upload
- Path format: `{userId}/{timestamp}-{random}-{filename}`

### 2. ✅ Created Photo URL Component  
**New File:** `src/components/RugPhoto.tsx`

- Reusable component that takes a file path and generates a signed URL on-demand
- Uses the existing `useSignedUrl` hook with automatic refresh
- Handles loading states and error fallbacks gracefully
- Backward compatible: extracts file paths from legacy signed URLs

### 3. ✅ Updated AnalysisReport Photo Display
**File:** `src/components/AnalysisReport.tsx`

- Replaced direct `<img src={url}>` with the new `<RugPhoto>` component
- Added import for RugPhoto component

### 4. ✅ Updated ClientPortal Photo Display  
**File:** `src/pages/ClientPortal.tsx`

- Replaced direct `<img src={url}>` with the new `<RugPhoto>` component
- Added import for RugPhoto component

### 5. ✅ Database Migration for Existing Data
**Two migrations executed:**

1. Converted signed URLs (with `?token=`) to file paths
2. Converted public URLs (`/object/public/rug-photos/`) to file paths

---

## Benefits Achieved
1. Photos will never expire - URLs are generated fresh on each view
2. Consistent with how business logos already work
3. Reduces database storage (paths are shorter than full URLs)
4. Improves security - tokens aren't stored long-term
5. Backward compatible with any remaining legacy URLs
