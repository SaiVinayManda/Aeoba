import { glossary } from "./resources";

const explanations: Record<string, string> = {
  AEO: "A practical program connects buyer questions to accessible pages, consistent business entities, relevant proof, and repeat citation checks. Measure observed answers separately from website visits and qualified enquiries.",
  GEO: "Its scope overlaps with AEO and SEO. Use clear business facts and useful public sources, then evaluate actual answers under documented conditions rather than assuming a universal generative ranking formula.",
  SEO: "The foundation includes crawl access, canonical URLs, descriptive metadata, useful content, and contextual links. Evaluate qualified demand and commercial outcomes alongside search impressions and visits, with clear definitions for each observation.",
  Entity: "Stable names, identifiers, and accurate public facts help distinguish one entity from another. In AEO, reconcile the agency, service, and location records before connecting them with structured data or publishing additional claims.",
  Citation: "Keep the answer excerpt, engine, exact prompt, date, and source URL together. A citation can support information without recommending its publisher, and it does not establish that a buyer clicked or became a customer.",
  "Buyer intent": "Record who is asking, what decision they face, and which evidence would resolve it. Use this context to prioritize commercial pages and supporting answers instead of treating every keyword variation as a separate content opportunity.",
  Schema: "Use accurate types and properties to connect the business with its services and publications. Validate syntax and meaning separately, keep markup synchronized with visible content, and avoid promising rich results or AI citations from validity alone.",
  "JSON-LD": "On an agency website, it can describe an organization, its services, published articles, and visible questions. Escape script-breaking characters, reuse consistent identifiers, and check the final rendered output rather than trusting a template configuration alone.",
  Canonical: "Use a self-referencing canonical on each original public page and maintain consistent internal links. Tracking parameters or alternate paths should resolve to the intended document identity; declaring a canonical remains a signal rather than an indexing guarantee.",
  Indexability: "Review response status, robots directives, canonical signals, and content availability together. A page can be crawlable but excluded from indexing. Confirm important URLs in the relevant search engine's inspection tools after deployment.",
  Crawlability: "Check robots rules, server responses, rendering, and infrastructure restrictions on important public URLs. Allowing a user agent in robots.txt is insufficient if a firewall still challenges requests or the content requires authentication to read.",
  "Prompt map": "Each entry should identify a meaningful decision, its primary URL, and the missing proof. Keep a stable subset for repeated engine observations, then add new questions deliberately so changes in coverage remain interpretable.",
  Baseline: "Save exact prompts, engines, modes, dates, answer excerpts, and cited URLs. Distinguish completed checks from failures. A stable baseline supports comparison across releases without converting a single favorable answer into a durable ranking claim.",
  Referral: "Inspect available source, medium, referrer, landing page, and campaign data before assigning a channel. Preserve missing attribution as unknown, and record buyer-reported AI discovery separately from a technically observed referral visit.",
  "Answer-first": "A useful section states the answer clearly, identifies its scope, and adds concrete proof or a worked example. Concise summaries help readers evaluate relevance, while the remaining page supplies the depth needed for a buying decision.",
  "Internal link": "Use descriptive anchor text where the destination supplies relevant detail or a useful next step. Connect explanations with their primary service or tool page, and review orphaned pages and broken anchors as the content library expands.",
};

export const glossaryEntries = glossary.map(([short, title, definition]) => ({
  slug: short.toLowerCase().replaceAll(" ", "-"), short, title, definition,
  question: `What is ${title}?`,
  answer: `${definition} ${explanations[short]}`,
}));
