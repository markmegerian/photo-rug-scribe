
# Fix Capacitor Version Mismatch

## Problem
The `@capacitor/cli` package is at version 8.x while all other Capacitor packages are at version 6.x. Mixing major versions can cause build failures and unexpected behavior.

## Solution
Downgrade `@capacitor/cli` from `^8.0.2` to `^6.2.0` to match the rest of the Capacitor ecosystem in your project.

## Change

**File: `package.json`**

| Package | Before | After |
|---------|--------|-------|
| `@capacitor/cli` | `^8.0.2` | `^6.2.0` |

Also, `@capacitor/cli` should be moved from `dependencies` to `devDependencies` since it's only used during development (for commands like `cap sync`, `cap build`, etc.).

## After This Fix
All Capacitor packages will be aligned at version 6.x:
- `@capacitor/cli`: 6.2.0
- `@capacitor/core`: 6.2.1
- `@capacitor/android`: 6.2.1
- `@capacitor/ios`: 6.2.1
- All plugins: 6.x

## Next Steps After Approval
Once you pull the updated code locally:
```bash
npm install
npx cap sync
```
