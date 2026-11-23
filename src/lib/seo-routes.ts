import { site } from "@/config/site";
import { contentDates } from "@/config/content-dates";
import { freeTools } from "@/config/tools";
import { platformFeatures, services, industries } from "@/content/catalog";
import { articles, playbooks } from "@/content/resources";
import { glossaryEntries } from "@/content/glossary";

export interface SeoRoute { path: string; name: string; summary: string; modified: string; priority: number; category: string; index: boolean }
const staticPages = [
  ["/", "Aeoba", site.metadata.description],
  ["/platform", "Platform", "Interactive workflows for brand entities, technical SEO, content, authority, and citation evidence."],
  ["/services", "Services", "Managed AEO, technical entity engineering, AI analytics, visibility recovery, and authority services."],
  ["/industries", "Industries", "Buyer-focused AEO and technical SEO programs for software, services, ecommerce, and specialist industries."],
  ["/case-studies", "Case Studies", "Illustrative implementation studies with explicit evidence requirements; not achieved client results."],
  ["/pricing", "Pricing", "Growth, Scale, and Enterprise scopes, monthly pricing, and the 90-day citation commitment."],
  ["/about", "About Aeoba", "Aeoba's agency operating model and locations in Milan, Italy and Sliema, Malta."],
  ["/careers", "Careers & Collaboration", "Specialist collaboration enquiries and Aeoba's working principles."],
  ["/contact", "Contact Aeoba", "Contact info@aeoba.com or send a scoped agency enquiry."],
  ["/free-aeo-report", "Free AEO Report", "Request an AEO report using your website and real buyer questions."],
  ["/book-call", "Book a Strategy Call", "Choose a time in Aeoba's embedded strategy-call calendar."],
  ["/resources", "Resources", "Original AEO research, a glossary, guides, free tools, and audio field notes."],
  ["/resources/blog", "Blog", "Full-length research articles on AEO, GEO, technical schema, citations, and B2B demand."],
  ["/resources/glossary", "Glossary", "Clear definitions of answer-engine, technical-search, and citation-measurement terminology."],
  ["/resources/free-aeo-guide", "Free AEO Field Guide", "Seven chapters on prompts, technical foundations, answers, schema, authority, and measurement."],
  ["/resources/podcast", "Audio Field Notes", "Browser audio readings and original Aeoba field-note transcripts."],
  ["/resources/tools", "Free Tools", "AEO demand modelling, public homepage readiness checks, and GEO technical audits."],
  ["/answer-index", "Answer Index", "Record buyer prompts, AI answer excerpts, and source evidence on your device."],
  ["/answer-index/archive", "Citation Archive", "Restore and export citation observations saved in this browser."],
  ["/privacy", "Privacy", "How Aeoba handles enquiries, local tool data, scheduling, and website checks."],
  ["/terms", "Website Terms", "Website resources, service onboarding, access responsibilities, and guarantee terms."],
  ["/login", "Client Portal", "Invitation-only sign-in and access enquiries."],
  ["/portal", "Private Workspace", "Authenticated operator workspace for saved enquiries."],
  ["/portal/demo", "Demo Workspace", "A public interface demonstration containing fictional examples."],
  ["/checkout", "Plan Onboarding", "Request a scoped kickoff; this page does not collect payment."],
];

const entry = (path: string, name: string, summary: string, category: string, priority: number, modified: string = contentDates.updated): SeoRoute => ({ path, name, summary, category, priority, modified, index: !["/login", "/portal", "/portal/demo", "/checkout"].includes(path) });

export const routeCatalog: SeoRoute[] = [
  ...staticPages.map(([path, name, summary]) => entry(path, name, summary, "Agency & Resources", path === "/" ? 1 : ["/services", "/pricing", "/free-aeo-report"].includes(path) ? .9 : path === "/resources/blog" ? .8 : .6)),
  ...services.map(item => entry(`/services/${item.slug}`, item.title, item.description, "Services", .9)),
  ...platformFeatures.map(item => entry(`/platform/${item.slug}`, item.title, item.description, "Platform", .7)),
  ...industries.map(item => entry(`/industries/${item.slug}`, `AEO & SEO for ${item.title}`, item.description, "Industries", .8)),
  ...articles.map(item => entry(`/resources/blog/${item.slug}`, item.title, item.summary, "Research Articles", .8, item.modifiedAt)),
  ...playbooks.map(item => entry(`/case-studies/${item.slug}`, item.title, item.description, "Implementation Studies", .6)),
  ...freeTools.map(item => entry(`/resources/tools/${item.slug}`, item.title, item.description, "Free Tools", .7)),
  ...glossaryEntries.map(item => entry(`/resources/glossary/${item.slug}`, item.title, item.definition, "Glossary", .6)),
];
