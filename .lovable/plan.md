
# Fix: Restore Smart Redirect on Root URL

## The Problem
The root URL (`/`) was changed to show the Support page directly, but this broke the mobile app experience. In TestFlight, users get stuck on the Support & Help Center page because the navigation links aren't working properly in the Capacitor WebView.

## The Solution
Restore the original `Index` component at the root URL (`/`), which has smart redirect logic:
- **Not logged in** → redirects to `/auth` (login page)
- **Logged in as admin** → redirects to `/admin`
- **Logged in as staff** → redirects to `/dashboard`
- **Logged in as client** → redirects to `/client/dashboard`

The Support page will still be available at `/support` for Apple's App Store requirement - Apple just needs a valid URL that shows support info, they don't require it to be the homepage.

---

## Changes Required

### File: `src/App.tsx`

**Line 64** - Change from:
```tsx
<Route path="/" element={<Support />} />
```

**To:**
```tsx
<Route path="/" element={<Index />} />
```

---

## Route Summary After Fix

| URL | What Shows | Purpose |
|-----|-----------|---------|
| `/` | Index (auto-redirect) | App entry point - sends users where they need to go |
| `/auth` | Login/Signup page | Authentication |
| `/support` | Support & Help Center | App Store Support URL requirement |
| `/privacy` | Privacy Policy | App Store Privacy URL requirement |

---

## App Store URLs
These will still work for Apple:
- **Support URL**: `https://app.rugboost.com/support`
- **Privacy Policy URL**: `https://app.rugboost.com/privacy`

Apple's reviewer can visit `/support` directly and see the help content. Regular app users will land on `/` and get redirected to login or their dashboard automatically.
