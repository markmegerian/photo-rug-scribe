import { test, expect } from "@playwright/test";
import { ROUTES } from "./routes";

/**
 * Full-page visual regression per route and per breakpoint.
 * Baselines live in e2e/__screenshots__ and are committed.
 */
for (const route of ROUTES) {
  test(`visual: ${route.name}`, async ({ page }) => {
    await page.goto(route.path, { waitUntil: "networkidle" });
    // Freeze scroll-reveal animations so shots are deterministic.
    await page.addStyleTag({
      content: `*,*::before,*::after{animation:none!important;transition:none!important;opacity:1!important;transform:none!important}`,
    });
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot(`${route.name}.png`, { fullPage: true });
  });
}
