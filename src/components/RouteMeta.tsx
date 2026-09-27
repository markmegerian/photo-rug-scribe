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
    title: "Rugboost — AI Rug Inspections in Under 60 Seconds",
    description:
      "Photograph a rug and send a priced repair report in 60 seconds. AI inspections, estimates, and a client portal for rug cleaning and repair businesses.",
  },
  "/how-it-works": {
    title: "How It Works — Rugboost",
    description: "See how Rugboost turns rug photos into an AI inspection, a priced estimate, and a client-ready report in four simple steps.",
  },
  "/security": {
    title: "Security — Rugboost",
    description: "How Rugboost protects your business and client data with encryption, access controls, and secure infrastructure.",
  },
  "/pricing": {
    title: "Pricing — Rugboost",
    description: "Rugboost plans for rug cleaning businesses: Starter at $200/month, Pro at $500/month, and custom Enterprise pricing with usage-based estimate volumes.",
  },
  "/request-demo": {
    title: "Request a Demo — Rugboost",
    description: "Book a personalized Rugboost demo and see how AI rug inspections and instant estimates can work for your business.",
  },
  "/live-demo": {
    title: "Live Demo — Try AI Rug Inspection | Rugboost",
    description: "Upload your own rug photos and get a real AI inspection with findings, recommended services, and a priced repair report.",
  },
  "/about": {
    title: "About Us — Rugboost",
    description: "Who Rugboost is, our mission to modernize rug cleaning and repair businesses, and how we protect your rug and client data.",
  },
  "/blog": {
    title: "Blog — Insights for Rug Professionals | Rugboost",
    description: "Tips, pricing strategies, and industry insights to help rug cleaning and repair businesses grow.",
  },
  "/support": {
    title: "Support & Contact — Rugboost",
    description: "Get in touch with the Rugboost team for product questions, account help, or partnership inquiries.",
  },
  "/privacy-policy": {
    title: "Privacy Policy — Rugboost",
    description: "How Rugboost collects, uses, and protects your personal and business information.",
  },
  "/terms-of-service": {
    title: "Terms of Service — Rugboost",
    description: "The terms and conditions that govern your use of Rugboost's website and services.",
  },
  "/thank-you": {
    title: "Thank You — Rugboost",
    description: "Thanks for requesting a Rugboost demo. Our team will be in touch shortly.",
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
        name: "Rugboost",
        description: STATIC[path].description,
        brand: { "@type": "Brand", name: "Rugboost" },
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
        title: `${post.metaTitle || post.title} | Rugboost`,
        description: post.metaDescription || post.excerpt,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.metaDescription || post.excerpt,
          datePublished: post.publishedAt,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@type": "Organization", name: "Rugboost", logo: { "@type": "ImageObject", url: `${BASE}/pwa-512x512.png` } },
          mainEntityOfPage: `${BASE}${path}`,
          ...(post.coverImage?.startsWith("http") ? { image: post.coverImage } : {}),
        },
      };
    }
  }

  if (path.startsWith("/blog-admin")) {
    return { title: "Blog Admin — Rugboost", description: "Rugboost content administration.", noindex: true };
  }

  return (
    STATIC[path] ?? {
      title: "Page Not Found — Rugboost",
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
