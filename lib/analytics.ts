export type AnalyticsEvent = "contact_start" | "contact_submit" | "cta_click" | "industry_tab" | "feature_tab" | "faq_open";

export function trackEvent(name: AnalyticsEvent, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const plausible = (window as Window & { plausible?: (event: string, options?: { props?: Record<string, string> }) => void }).plausible;
  plausible?.(name, props ? { props } : undefined);
}
