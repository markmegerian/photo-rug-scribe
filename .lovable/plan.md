
# Fix iOS App Browser Redirect

## Problem
The `capacitor.config.ts` file still has the `server` block active, which tells Capacitor to load from the remote Lovable preview URL instead of the local bundled assets. This causes the app to open Safari.

## Solution

### Step 1: Comment Out the Server Block
Update `capacitor.config.ts` to disable the remote server URL:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.fef72b1bd1214ff6bcc3c957ca919cde',
  appName: 'rug-scan-report',
  webDir: 'dist',
  // COMMENTED OUT for local builds - uncomment for live reload development
  // server: {
  //   url: 'https://fef72b1b-d121-4ff6-bcc3-c957ca919cde.lovableproject.com?forceHideBadge=true',
  //   cleartext: true
  // },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    scheme: 'Rugboost'
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#f7f5f3',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true
    },
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true
    }
  }
};

export default config;
```

### Step 2: Rebuild and Sync
After I make this change, you'll need to run these commands in Terminal:

```bash
cd /Users/Mark/Desktop/rug-scan-report
git pull origin main
npm run build
npx cap sync ios
```

### Step 3: Rebuild in Xcode
1. Open `ios/App/App.xcworkspace`
2. Clean Build Folder: **Cmd + Shift + K**
3. Build and Run: **Cmd + R**

---

## Why This Happens
The `server.url` setting tells Capacitor's WebView to load content from that URL instead of from the bundled `dist/` folder. When you `git pull`, it overwrites your local changes with what's in the repository.

After this fix is committed to the repo, future `git pull` commands will keep the server block commented out.
