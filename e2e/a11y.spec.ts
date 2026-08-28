import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { ROUTES } from "./routes";

/**
 * Automated WCAG 2 A/AA checks. Scroll-reveal animations are frozen first so
 * mid-transition opacity values don't produce phantom contrast failures.
 */
for (const route of ROUTES) {
  test(`a11y: ${route.name}`, async ({ page }) => {
    await page.goto(route.path, { waitUntil: "networkidle" });
    await page.addStyleTag({
      content: `*,*::before,*::after{animation:none!important;transition:none!important;opacity:1!important;transform:none!important}`,
    });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      results.violations.flatMap((v) =>
        v.nodes.map((n) => `${v.id}: ${n.any[0]?.message ?? ""} :: ${n.html.slice(0, 160)}`),
      ),
      "axe violations",
    ).toEqual([]);
  });
}
