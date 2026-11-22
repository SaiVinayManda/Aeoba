export interface NavLink { label: string; href: string; description?: string }
export interface NavGroup { title?: string; links: NavLink[] }
export interface NavMenu { label: string; slug: string; groups: NavGroup[] }
const link = (label: string, href: string, description?: string): NavLink => ({ label, href, description });

export const navigationMenus: NavMenu[] = [
  { label: "Platform", slug: "platform", groups: [
    { title: "Monitoring", links: [link("Brand Intelligence", "/platform/brand-intelligence", "Track your brand, entities, and citation evidence"), link("AI Search Tracking", "/platform/ai-search-tracking", "Record visibility across buyer-intent prompts"), link("SEO Reporting", "/platform/seo-reporting", "Connect execution with search and pipeline signals"), link("Website Visitor Tracking", "/platform/website-visitor-tracking", "Plan consent-aware attribution and measurement"), link("Social Listening", "/platform/social-listening")] },
    { title: "Content creation", links: [link("AI Blog Writer", "/platform/ai-blog-writer", "Build an evidence-led answer-page brief"), link("Trend Discovery", "/platform/trend-discovery", "Turn customer questions into content opportunities"), link("AI Podcast Automation", "/platform/ai-podcast-automation", "Structure useful episodes and reusable transcripts")] },
    { title: "Content optimization", links: [link("On-Page SEO Automation", "/platform/on-page-seo-automation", "Audit metadata, headings, entities, and schema"), link("Internal Linking", "/platform/internal-linking", "Connect answers to commercial pages"), link("Bulk Indexing", "/platform/bulk-indexing", "Prepare crawlable, indexable pages for discovery")] },
    { title: "Authority building", links: [link("Link Building", "/platform/link-building", "Earn relevant editorial references"), link("Reddit & Quora Seeding", "/platform/reddit-quora-seeding", "Plan useful, transparent community contributions"), link("Parasite SEO", "/platform/parasite-seo")] },
  ] },
  { label: "Services", slug: "services", groups: [{ links: [link("Managed AEO + SEO", "/services/managed-aeo", "Technical foundations, buyer-led content, and citation measurement."), link("Technical AEO (Schema + Entity)", "/services/technical-aeo", "Consistent entities, structured data, and crawlable answers."), link("AI Search Analytics", "/services/ai-search-analytics", "A repeatable baseline for prompts and citations."), link("AI Visibility Recovery", "/services/ai-visibility-recovery", "Find what changed and prioritize the repair."), link("Digital PR", "/services/authority-community-mentions", "Relevant editorial coverage and community participation."), link("All services →", "/services")] }] },
  { label: "Industries", slug: "industries", groups: [
    { links: [link("Law Firm SEO", "/industries/law-firm-seo"), link("Senior Living SEO", "/industries/senior-living"), link("Healthcare SEO", "/industries/healthcare-seo"), link("Finance SEO", "/industries/finance-seo"), link("Hospitality SEO", "/industries/hospitality-seo")] },
    { links: [link("Real Estate SEO", "/industries/real-estate-seo"), link("Local Business SEO", "/industries/local-business-seo"), link("Manufacturing SEO", "/industries/manufacturing-seo"), link("All industries →", "/industries")] },
  ] },
  { label: "Resources", slug: "resources", groups: [
    { title: "Learning", links: [link("The Answer Index", "/answer-index", "Build a dated record of prompts, answers, and citations"), link("Blog", "/resources/blog"), link("AEO Glossary", "/resources/glossary", "Clear definitions for AI search and answer engines"), link("Free AEO Guide", "/resources/free-aeo-guide"), link("AI Search Podcast", "/resources/podcast"), link("About Us", "/about"), link("Careers", "/careers")] },
    { title: "Free tools", links: [link("AEO Report", "/free-aeo-report"), link("AI Visibility Checker", "/resources/tools/ai-visibility-checker"), link("AEO ROI Calculator", "/resources/tools/aeo-roi-calculator"), link("GEO Audit", "/resources/tools/geo-audit"), link("All free tools →", "/resources/tools")] },
  ] },
];
