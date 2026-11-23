"use client";

import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export function RouteStructuredData({ routes }: { routes: { path: string; name: string }[] }) {
  const pathname = usePathname();
  const current = routes.find(route => route.path === pathname);
  if (!current) return null;
  const segments = pathname.split("/").filter(Boolean);
  const trail = [{ path: "/", name: site.name }, ...segments.map((_, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/");
    return routes.find(route => route.path === path);
  }).filter((route): route is { path: string; name: string } => Boolean(route))];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(pathname, trail)).replace(/</g, "\\u003c") }} />;
}
