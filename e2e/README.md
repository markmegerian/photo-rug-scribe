# End-to-end / visual regression tests

Guards against icon, branding, accessibility, and responsive-layout regressions.

```bash
npm run test:e2e            # run all suites (desktop / tablet / mobile)
npm run test:e2e:update     # re-record visual baselines after an intentional design change
```

| Spec | Covers |
| --- | --- |
| `branding.spec.ts` | Wordmark on every route, no broken images, alt text, favicon/apple-touch/PWA icon + manifest + sitemap availability, manifest fields, head metadata & canonical |
| `a11y.spec.ts` | axe-core WCAG 2.0/2.1 A + AA on every route |
| `visual.spec.ts` | Full-page screenshot diffs per route × breakpoint (baselines in `__screenshots__/`) |

Notes:

- Scroll-reveal animations are frozen before screenshots and axe runs so results are deterministic.
- Baselines are rendered on Linux Chromium; regenerate them on the same platform (or in CI) to avoid font-rendering noise.
- Set `PLAYWRIGHT_CHROMIUM_PATH` to reuse a pre-installed Chromium instead of Playwright's downloaded one.
