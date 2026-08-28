import { test, expect } from "@playwright/test";
import { ROUTES, ICON_ASSETS } from "./routes";

test.describe("branding + icons", () => {
  test("all icon / manifest / SEO assets are served", async ({ request }) => {
    for (const asset of ICON_ASSETS) {
      const res = await request.get(asset);
      expect(res.status(), `${asset} status`).toBe(200);
      const type = res.headers()["content-type"] ?? "";
      expect(type, `${asset} content-type`).not.toContain("text/html");
    }
  });

  test("manifest declares required PWA fields and icons", async ({ request }) => {
    const manifest = await (await request.get("/manifest.json")).json();
    expect(manifest.name).toBe("Rugboost");
    expect(manifest.short_name).toBe("Rugboost");
    expect(manifest.start_url).toBe("/");
    const sizes = manifest.icons.map((i: { sizes: string }) => i.sizes);
    expect(sizes).toContain("192x192");
    expect(sizes).toContain("512x512");
    expect(
      manifest.icons.some((i: { purpose?: string }) => i.purpose === "maskable"),
    ).toBe(true);
    for (const icon of manifest.icons) {
      expect((await request.get(icon.src)).status(), icon.src).toBe(200);
    }
  });

  for (const route of ROUTES) {
    if (route.name === "not-found") continue;

    test(`${route.name} renders the Rugboost wordmark and loads every image`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "networkidle" });

      const logo = page.locator('img[src*="rugboost-horizontal"]').first();
      await expect(logo, "wordmark present").toBeVisible();

      const broken = await page.evaluate(() =>
        Array.from(document.images)
          .filter((i) => !i.complete || i.naturalWidth === 0)
          .map((i) => i.currentSrc || i.src),
      );
      expect(broken, "broken images").toEqual([]);

      const alts = await page.evaluate(() =>
        Array.from(document.images).map((i) => i.getAttribute("alt")),
      );
      expect(alts.every((a) => a !== null), "every image has alt text").toBe(true);
    });
  }

  test("head metadata is branded (no template defaults)", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(/Rugboost/);
    const desc = await page.getAttribute('meta[name="description"]', "content");
    expect(desc).toBeTruthy();
    expect(desc).not.toBe("Lovable Generated Project");
    expect(await page.getAttribute('link[rel="canonical"]', "href")).toBe(
      "https://rugboost.com/",
    );
    expect(await page.getAttribute('link[rel="manifest"]', "href")).toBe("/manifest.json");
    expect(await page.getAttribute('link[rel="icon"]', "href")).toBe("/favicon.svg");
  });
});

test.describe("responsive layout", () => {
  for (const route of ROUTES) {
    test(`${route.name} has no horizontal overflow`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "networkidle" });
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  }

  test("exactly one h1 and one main landmark on the landing page", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    expect(await page.locator("h1").count()).toBe(1);
    expect(await page.locator("main").count()).toBe(1);
  });
});
