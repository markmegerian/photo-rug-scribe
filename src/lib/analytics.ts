// Google Analytics 4 event tracking utility
// Provides type-safe wrappers around gtag() for key conversion events

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

// CTA click events
export function trackCTAClick(ctaLabel: string, location: string) {
  trackEvent('cta_click', {
    cta_label: ctaLabel,
    cta_location: location,
  });
}

// Pricing section view (fired once when section scrolls into view)
export function trackPricingView() {
  trackEvent('pricing_view');
}

// Pricing plan CTA click
export function trackPricingPlanClick(planName: string) {
  trackEvent('pricing_plan_click', {
    plan_name: planName,
  });
}

// Contact form submission
export function trackContactFormSubmit() {
  trackEvent('contact_form_submit');
}

// Navigation link clicks
export function trackNavClick(label: string) {
  trackEvent('nav_click', {
    nav_label: label,
  });
}
