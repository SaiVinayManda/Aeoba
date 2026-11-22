import type { MetadataRoute } from "next";
import { publicRoutes } from "@/config/routes";
import { site } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap { return publicRoutes.map(route => ({ url: `${site.url}${route}`, changeFrequency: "monthly", priority: route === "/" ? 1 : .7 })); }
