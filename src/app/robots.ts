import type { MetadataRoute } from "next";
import { site } from "@/config/site";
export default function robots(): MetadataRoute.Robots {
  const allow = ["/", "/favicon.ico", "/icon-*.png", "/apple-touch-icon.png", "/logo.png", "/logo.svg", "/og-image.png", "/llms.txt", "/llms-full.txt", "/_next/static/"];
  const disallow = ["/api/", "/portal", "/login", "/checkout"];
  return {
    rules: [
      { userAgent: "*", allow, disallow },
      { userAgent: ["Googlebot", "Googlebot-Image", "Bingbot", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "anthropic-ai", "Google-Extended", "Applebot-Extended"], allow, disallow },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
