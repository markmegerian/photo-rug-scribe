
# Font Update: Garamond for Headings, Georgia/Cambria for Body

## Overview
Replace the current modern sans-serif typography (DM Sans / DM Serif Display) with professional, formal serif fonts throughout the entire site: **Garamond** for headings and **Georgia/Cambria** for body text.

## Current State
- Headings: DM Serif Display (loaded from Google Fonts)
- Body: DM Sans (loaded from Google Fonts)
- Additional: Source Serif Pro available as serif option

## Implementation Details

### 1. Update Google Fonts Loading (index.html)
- Remove DM Sans and DM Serif Display font preloads
- Add EB Garamond (Google Fonts equivalent of Garamond) for headings
- Georgia and Cambria are system fonts - no loading needed (already on most devices)

**Font loading changes:**
- Preload: EB Garamond (woff2 file for headings)
- System fonts: Georgia, Cambria (no loading required)
- Keep performance optimizations (async loading pattern)

### 2. Update Tailwind Configuration (tailwind.config.ts)
Update the `fontFamily` settings:
- `display`: EB Garamond, Garamond, Georgia, serif
- `body`: Georgia, Cambria, serif
- `sans`: Georgia, Cambria, serif (to ensure fallback consistency)
- `serif`: EB Garamond, Garamond, Georgia, serif

### 3. Update CSS Custom Properties (src/index.css)
Update the `:root` CSS variables:
- `--font-serif`: "EB Garamond", Garamond, Georgia, serif
- `--font-sans`: Georgia, Cambria, "Times New Roman", serif

Update base styles:
- `body`: Use Georgia/Cambria font-family
- `h1-h6`: Use EB Garamond font-family
- `.font-display`: Use EB Garamond
- `.font-body`: Use Georgia/Cambria

### 4. Files to Modify

| File | Changes |
|------|---------|
| `index.html` | Update font preloads and Google Fonts stylesheet links |
| `tailwind.config.ts` | Update fontFamily definitions for display, body, sans, serif |
| `src/index.css` | Update CSS variables and base font-family declarations |

### 5. Font Stack Details

**Headings (EB Garamond):**
```
'EB Garamond', Garamond, Georgia, serif
```

**Body Text (Georgia/Cambria):**
```
Georgia, Cambria, 'Times New Roman', Times, serif
```

## Visual Impact
- More traditional, established, professional appearance
- Excellent readability for body text (Georgia is highly optimized for screens)
- Classic elegance for headings with Garamond
- Consistent serif styling throughout the site

## Technical Notes
- EB Garamond is the open-source Google Fonts version of the classic Garamond typeface
- Georgia and Cambria are web-safe system fonts with excellent cross-platform support
- No additional font files needed for body text (reduces page load)
- Maintains the existing performance optimizations (async loading, preloading)
