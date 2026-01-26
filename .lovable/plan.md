

# Fix CSS Build Error: @import Order

## Problem
The build is failing with:
```
@import must precede all other statements (besides @charset or empty @layer)
```

The `@import` for Google Fonts on line 5 comes **after** the `@tailwind` directives, which violates CSS specification rules.

## Solution
Move the `@import` statement to the very top of the file, before the `@tailwind` directives.

### Change in `src/index.css`

**Before (current order - causes error):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=...');
```

**After (correct order):**
```css
@import url('https://fonts.googleapis.com/css2?family=Libre+Bodoni:wght@400;500;600;700&family=EB+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Why This Fix Works
CSS requires `@import` statements to appear before any other rules. The Tailwind directives are processed as CSS rules, so the import must come first.

## After the Fix
Once I make this change, you'll need to run:
```bash
cd /Users/Mark/Desktop/rug-scan-report
git pull origin main
npm run build
npx cap sync ios
```

Then rebuild in Xcode with Clean Build (`Cmd + Shift + K`) and Run (`Cmd + R`).

