import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { INDUSTRIES } from "@/lib/industries";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/for-clinics",
    "/industries",
    "/features",
    "/how-it-works",
    "/appointments",
    "/why-e-queue",
    "/pilot",
    "/about",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
  ];
  return [...routes, ...INDUSTRIES.map((industry) => `/industries/${industry.slug}`)].map(
    (path) => ({ url: `${SITE.url}${path}` }),
  );
}
