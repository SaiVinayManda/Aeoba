import type { Metadata } from "next";
import { site } from "@/config/site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: `${title} | ${site.name}`,
    description,
    alternates: { canonical: new URL(path, site.url).toString() },
    openGraph: { title: `${title} | ${site.name}`, description, url: new URL(path, site.url).toString(), siteName: site.name, type: "website", images: [{ url: `${site.url}${site.metadata.socialImage}`, width: 1200, height: 630, alt: "Aeoba — Become the answer. AEO, GEO, and Technical SEO." }] },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: [`${site.url}${site.metadata.socialImage}`] },
  };
}
