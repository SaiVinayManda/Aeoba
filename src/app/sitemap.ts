import type { MetadataRoute } from "next";
import { routeCatalog } from "@/lib/seo-routes";
import { site } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return routeCatalog.filter(route => route.index).map(route => ({
    url: route.path === "/" ? site.url : `${site.url}${route.path}`,
    lastModified: route.modified,
    changeFrequency: route.category === "Research Articles" || route.path === "/resources/blog" ? "weekly" : "monthly",
    priority: route.priority,
  }));
}
