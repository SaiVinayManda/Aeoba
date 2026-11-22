import { platformFeatures, services, industries } from "@/content/catalog";
import { articles, playbooks } from "@/content/resources";
import { freeTools } from "@/config/tools";
export const publicRoutes = ["/", "/platform", "/services", "/industries", "/case-studies", "/pricing", "/about", "/careers", "/contact", "/free-aeo-report", "/book-call", "/resources", "/resources/blog", "/resources/glossary", "/resources/free-aeo-guide", "/resources/podcast", "/resources/tools", "/answer-index", "/answer-index/archive", "/privacy", "/terms", ...platformFeatures.map(item => `/platform/${item.slug}`), ...services.map(item => `/services/${item.slug}`), ...industries.map(item => `/industries/${item.slug}`), ...articles.map(item => `/resources/blog/${item.slug}`), ...playbooks.map(item => `/case-studies/${item.slug}`), ...freeTools.map(item => `/resources/tools/${item.slug}`)];
export const privateRoutes = ["/login", "/portal", "/portal/demo", "/checkout"];
