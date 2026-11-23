import fs from "node:fs/promises";
import path from "node:path";
import { sourceLoader, root } from "./lib/load-source.mjs";

const load = sourceLoader();
const { site } = load("src/config/site.ts");
const { plans } = load("src/config/plans.ts");
const { routeCatalog } = load("src/lib/seo-routes.ts");
const { services } = load("src/content/catalog.ts");
const { articles, guideChapters } = load("src/content/resources.ts");
const { glossaryEntries } = load("src/content/glossary.ts");
const { serviceAnswers, blogAnswers } = load("src/content/seo-answers.ts");

const identity = `# Aeoba\n\n> Aeoba is a B2B Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and Technical SEO agency based in Milan, Italy and Sliema, Malta. Website: ${site.url}. Contact: ${site.email}.\n\nAeoba is the agency entity and publisher. Our work connects buyer-intent questions, technical access, schema and entity engineering, evidence-led content, relevant external references, and dated citation measurement.\n\n`;
const offer = `## Service plans and deliverables\n\n${plans.map(plan => `- **${plan.name}: ${plan.id === "enterprise" ? "Custom" : `$${plan.price.toLocaleString("en-US")}/mo`}**. ${plan.summary} ${plan.deliverables.join("; ")}.`).join("\n")}\n\nGrowth and Scale deliver 8–15 high-intent answer-engine pages/month and 3–8 targeted brand mentions/month across Reddit, Quora, and industry \"Best Of\" listicles, subject to fit, disclosure, and editorial/community approval. Programs include schema and entity engineering. Enterprise scope is agreed individually.\n\n## 90-day citation guarantee\n\n${site.guarantee}\n\n${site.guaranteeTerms}\n\n`;
const indexes = [
  ["Services", routeCatalog.filter(route => route.category === "Services")],
  ["Tools and workflows", routeCatalog.filter(route => ["Free Tools", "Platform"].includes(route.category))],
  ["Guides and research", routeCatalog.filter(route => route.category === "Research Articles" || ["/resources/free-aeo-guide", "/resources/glossary", "/answer-index"].includes(route.path))],
  ["Industries and implementation studies", routeCatalog.filter(route => ["Industries", "Implementation Studies"].includes(route.category))],
  ["Agency and contact", routeCatalog.filter(route => ["/about", "/contact", "/pricing", "/free-aeo-report", "/book-call", "/privacy", "/terms"].includes(route.path))],
].map(([heading, routes]) => `## ${heading}\n\n${routes.map(route => `- [${route.name}](${site.url}${route.path}): ${route.summary}`).join("\n")}\n\n`).join("");
const context = "Implementation studies are illustrative workflows, not achieved client performance claims. Tool outputs are user-supplied scenarios or actual public-HTML checks, not independent verification of AI recommendations. Mentions, citations, referral visits, and qualified pipeline are distinct observations.\n\n";
const short = identity + context + offer + indexes + `## Optional\n\n- [Full reference](${site.url}/llms-full.txt): Expanded service explanations, complete research articles, guide chapters, and glossary definitions.\n- [XML sitemap](${site.url}/sitemap.xml): Canonical public URLs and editorial modification dates.\n`;

const sectionText = section => `### ${section.heading}\n\n${section.paragraphs.join("\n\n")}\n\n${section.bullets ? section.bullets.map(bullet => `- ${bullet}`).join("\n") + "\n\n" : ""}${section.table ? `| ${section.table.headings.join(" | ")} |\n| ${section.table.headings.map(() => "---").join(" | ")} |\n${section.table.rows.map(row => `| ${row.join(" | ")} |`).join("\n")}\n\n` : ""}${section.code ? "```json\n" + section.code + "\n```\n\n" : ""}${section.subsections ? section.subsections.map(block => `#### ${block.heading}\n\n${block.paragraphs.join("\n\n")}\n\n${block.bullets?.map(bullet => `- ${bullet}`).join("\n") ?? ""}`).join("\n\n") : ""}`;
let full = short + "\n## Complete service reference\n\n";
full += services.map(service => `### ${service.title}\n\nCanonical: ${site.url}/services/${service.slug}\n\n${serviceAnswers[service.slug].answer}\n\n${service.challenge}\n\n${service.outcomes.map(item => `- ${item}`).join("\n")}\n`).join("\n");
full += "\n## Complete AEO field guide\n\nCanonical: " + site.url + "/resources/free-aeo-guide\n\nAuthor: Aeoba\n\n";
full += guideChapters.map((chapter, index) => `### ${index + 1}. ${chapter.title}\n\n${chapter.body}\n\nAction: ${chapter.task}\n`).join("\n");
full += "\n## Complete research articles\n\n";
full += articles.map(article => `### ${article.title}\n\nCanonical: ${site.url}/resources/blog/${article.slug}\n\nAuthor: ${article.author}\nPublished: ${article.publishedAt}\nUpdated: ${article.modifiedAt}\n\n${article.hook}\n\n#### ${blogAnswers[article.slug].question}\n\n${blogAnswers[article.slug].answer}\n\n${article.sections.map(sectionText).join("\n")}\n#### Frequently asked questions\n\n${article.faq.map(item => `##### ${item.question}\n\n${item.answer}`).join("\n\n")}\n`).join("\n");
full += "\n## Glossary\n\n" + glossaryEntries.map(term => `### ${term.title}\n\nCanonical: ${site.url}/resources/glossary/${term.slug}\n\n${term.answer}\n`).join("\n");
// Make every retrieval link absolute while preserving fragments and source links.
full = full.replace(/\]\((\/[^)]+)\)/g, `](${site.url}$1)`);
await fs.writeFile(path.join(root, "public/llms.txt"), short);
await fs.writeFile(path.join(root, "public/llms-full.txt"), full);
console.log(`Generated llms.txt and llms-full.txt from ${routeCatalog.filter(route => route.index).length} canonical public routes, current plans, ${articles.length} articles, and ${glossaryEntries.length} glossary terms.`);
