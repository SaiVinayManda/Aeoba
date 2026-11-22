import type { Metadata } from "next";
import { site } from "@/config/site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: `${title} | ${site.name}`,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url: path, siteName: site.name, type: "website" },
    twitter: { card: "summary", title: `${title} | ${site.name}`, description },
  };
}
