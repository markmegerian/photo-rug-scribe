import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getBlogPosts } from "@/components/landing/LandingBlog";
import { faqs } from "@/components/landing/LandingFAQ";
import { plans } from "@/data/plans";

const BASE = "https://rugboost.com";

type Meta = { title: string; description: string; canonical?: string; noindex?: boolean; jsonLd?: object };

const STATIC: Record<string, Meta> = {
  "/": {
    title: "RugBoost — Rug Care Expertise That Builds Client Confidence",
    description:
      "RugBoost helps cleaning companies and rug retailers recommend relevant rug care services and give clients annotated photos, detailed service explanations, and transparent pricing for informed approval.",
  },
  "/how-it-works": {
    title: "How It Works — RugBoost",
    description: "See how RugBoost helps your team upload rug photos, review recommendations and pricing, and send a proposal for client approval.",
  },
  "/security": {
    title: "Security — RugBoost",
    description: "How RugBoost protects your business and client data with encryption, access controls, and secure infrastructure.",
  },
  "/pricing": {
    title: "Pricing — RugBoost",
    description: "RugBoost plans for cleaning companies and rug retailers: Starter at $200/month, Pro at $500/month, and custom Enterprise pricing with usage-based estimate volumes.",
  },
  "/request-demo": {
    title: "Request a Demo — RugBoost",
    description: "Book a personalized RugBoost demo and see how RugBoost helps your team recommend rug care services and present clear client proposals.",
  },
  "/live-demo": {
    title: "Live Demo — Try an AI Rug Assessment | RugBoost",
    description: "Upload photos of a rug and see an AI-assisted assessment with observed condition notes, suggested services, and example pricing for your team to review.",
  },
  "/about": {
    title: "About Us — RugBoost",
    description: "Who is behind RugBoost, why it helps teams recommend rug care services and explain their value, and how we protect your data.",
  },
  "/blog": {
    title: "Blog — Insights for Rug Professionals | RugBoost",
    description: "Tips, pricing strategies, and industry insights to help cleaning companies and rug retailers offer rug care services.",
  },
  "/support": {
    title: "Support & Contact — RugBoost",
    description: "Get in touch with the RugBoost team for product questions, account help, or partnership inquiries.",
  },
  "/privacy-policy": {
    title: "Privacy Policy — RugBoost",
    description: "How RugBoost collects, uses, and protects your personal and business information.",
  },
  "/terms-of-service": {
    title: "Terms of Service — RugBoost",
    description: "The terms and conditions that govern your use of RugBoost's website and services.",
  },
  "/thank-you": {
    title: "Thank You — RugBoost",
    description: "Thanks for requesting a RugBoost demo. Our team will be in touch shortly.",
    noindex: true,
  },
};

const ALIASES: Record<string, string> = { "/privacy": "/privacy-policy", "/terms": "/terms-of-service" };

function resolve(pathname: string): Meta {
  const path = ALIASES[pathname] ?? (pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname);

  if (path === "/") {
    return {
      ...STATIC[path],
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    };
  }

  if (path === "/pricing") {
    return {
      ...STATIC[path],
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "RugBoost",
        description: STATIC[path].description,
        brand: { "@type": "Brand", name: "RugBoost" },
        offers: plans
          .filter((p) => /^\$\d/.test(p.price))
          .map((p) => ({
            "@type": "Offer",
            name: p.name,
            price: p.price.replace(/[^0-9.]/g, ""),
            priceCurrency: "USD",
            url: `${BASE}/pricing`,
          })),
      },
    };
  }

  if (path.startsWith("/blog/")) {
    const slug = path.slice(6);
    const post = getBlogPosts().find((p) => p.slug === slug);
    if (post) {
      return {
        title: `${post.metaTitle || post.title} | RugBoost`,
        description: post.metaDescription || post.excerpt,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.metaDescription || post.excerpt,
          datePublished: post.publishedAt,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@type": "Organization", name: "RugBoost", logo: { "@type": "ImageObject", url: `${BASE}/pwa-512x512.png` } },
          mainEntityOfPage: `${BASE}${path}`,
          ...(post.coverImage?.startsWith("http") ? { image: post.coverImage } : {}),
        },
      };
    }
  }

  if (path.startsWith("/blog-admin")) {
    return { title: "Blog Admin — RugBoost", description: "RugBoost content administration.", noindex: true };
  }

  return (
    STATIC[path] ?? {
      title: "Page Not Found — RugBoost",
      description: "The page you are looking for does not exist.",
      noindex: true,
    }
  );
}

export default function RouteMeta() {
  const { pathname } = useLocation();
  const meta = resolve(pathname);

  // Drop static index.html fallbacks so each page ships only its own tags.
  useEffect(() => {
    document
      .querySelectorAll(
        'head meta[property="og:title"]:not([data-rh]), head meta[property="og:description"]:not([data-rh]), head meta[property="og:url"]:not([data-rh]), head meta[name="description"]:not([data-rh]), head meta[name="twitter:title"]:not([data-rh]), head meta[name="twitter:description"]:not([data-rh])',
      )
      .forEach((el) => el.remove());
  }, []);
  const canonicalPath = ALIASES[pathname] ?? pathname;
  const url = `${BASE}${canonicalPath === "/" ? "/" : canonicalPath.replace(/\/$/, "")}`;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {!meta.noindex && <link rel="canonical" href={url} />}
      {meta.noindex && <meta name="robots" content="noindex" />}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {meta.jsonLd && <script type="application/ld+json">{JSON.stringify(meta.jsonLd)}</script>}
    </Helmet>
  );
}
