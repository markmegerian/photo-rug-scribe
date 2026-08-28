export const ROUTES = [
  { path: "/", name: "home" },
  { path: "/how-it-works", name: "how-it-works" },
  { path: "/security", name: "security" },
  { path: "/blog", name: "blog" },
  { path: "/support", name: "support" },
  { path: "/privacy-policy", name: "privacy-policy" },
  { path: "/terms-of-service", name: "terms-of-service" },
  { path: "/this-route-does-not-exist", name: "not-found" },
] as const;

export const ICON_ASSETS = [
  "/favicon.svg",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/pwa-192x192.png",
  "/pwa-512x512.png",
  "/manifest.json",
  "/robots.txt",
  "/sitemap.xml",
];
