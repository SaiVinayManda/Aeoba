import { finishArticle, type Article } from "./article-types";
import { researchArticles } from "./research-articles";

export type { Article, ArticleSection } from "./article-types";

const fieldNotes: Pick<Article, "slug" | "title" | "category" | "summary" | "minutes" | "sections">[] = [
  { slug: "build-a-buyer-intent-prompt-map", title: "Build a buyer-intent prompt map before publishing another page", category: "Strategy", summary: "A practical way to connect customer questions, commercial pages, and the evidence an AI answer would need.", minutes: 6, sections: [
    { heading: "Start with a decision, not a keyword list", paragraphs: ["Write down the decisions a qualified buyer makes before contacting you. Someone choosing a supplier may ask about capability, integration effort, price, alternatives, or location. Those questions have different evidence requirements. Grouping them into one broad topic produces vague content and an equally vague measurement plan.", "Use sales conversations, support questions, and your own subject-matter expertise to draft the first list. Preserve the wording your customers use. Add the audience, decision stage, and relevant product or service beside each question."] },
    { heading: "Choose prompts you can actually answer", paragraphs: ["A useful prompt has a clear connection to your offer and enough specificity to distinguish a useful answer from a generic recommendation. Include comparison, suitability, implementation, and commercial questions. Avoid padding the set with variations that ask for the same answer.", "For each prompt, identify the page that should resolve the question. If no suitable page exists, record an evidence gap before commissioning a draft."], bullets: ["Who is the buyer and what decision are they making?", "Which visible facts support your answer?", "Which page should own the topic?", "What useful next step should the reader take?"] },
    { heading: "Capture a repeatable baseline", paragraphs: ["Run the agreed prompts under documented conditions and keep the date, engine, answer excerpt, and sources together. Record a mention separately from a citation. An answer that names your business without linking to a useful source represents a different observation from a supported recommendation.", "Answers can vary. A single favorable result is not a durable ranking. Repeating a stable set makes the evidence more useful without pretending that an answer engine behaves like a fixed search results page."] },
    { heading: "Turn the map into an execution queue", paragraphs: ["Prioritize the prompts closest to a real buying decision, then assess the work needed to support them. The next action might be a technical correction, a clearer comparison page, a missing product fact, or an independent editorial reference. Publishing an article is only one possible response.", "Review the map weekly. Keep the question set stable enough to compare observations, and record any deliberate changes so the next report explains what moved and why."] },
  ] },
  { slug: "schema-without-contradictions", title: "Useful schema starts with consistent facts", category: "Technical AEO", summary: "How to align organization entities, canonical URLs, and visible answers before adding structured data.", minutes: 5, sections: [
    { heading: "Reconcile the visible business first", paragraphs: ["Structured data describes a page; it should not introduce a different business. Check the name, canonical domain, contact details, locations, and service descriptions that a visitor sees. Reconcile inconsistent facts before adding more markup.", "Choose a stable organization identifier and reuse it when describing the business on related pages. Distinguish the organization from individual people, products, services, and locations. Those entities are related, but they are not interchangeable."] },
    { heading: "Use the simplest accurate representation", paragraphs: ["Start with the entities and properties you can support with visible, current information. An Organization record can describe the brand and connect its locations. A page-specific record should describe what the page actually contains.", "Do not add ratings, certifications, offices, or awards simply because a schema generator offers a field for them. A technically valid claim can still be inaccurate."], bullets: ["Use canonical URLs for identifiers and page references.", "Represent each location with its actual locality and country.", "Keep FAQ markup synchronized with questions visible on the page.", "Review changes when the underlying business information changes."] },
    { heading: "Validate structure and meaning separately", paragraphs: ["Parsing JSON verifies syntax. A structured data validator can identify vocabulary and property problems. Neither step proves that the facts match the page or that an engine will display a rich result.", "Review the rendered HTML and compare the markup with the visible content. Check duplicate organization records, conflicting canonical URLs, and accidental markup copied from a template. Preserve a small validation record with each release."] },
    { heading: "Connect schema to a useful page", paragraphs: ["The strongest implementation is still attached to an answer a person can use. Clear headings, specific evidence, accessible content, and sensible internal links remain part of the work. Treat structured data as one consistent representation of that work rather than a substitute for it."] },
  ] },
  { slug: "measure-citations-with-evidence", title: "A citation report should let you inspect the evidence", category: "Measurement", summary: "Separate mentions, citations, visits, and pipeline so your weekly report supports a decision.", minutes: 5, sections: [
    { heading: "Name the observation precisely", paragraphs: ["A brand mention, a linked citation, a referral visit, and a qualified enquiry are different events. A report becomes confusing when it presents them as one visibility score. Define each observation before selecting a dashboard.", "Keep the engine, prompt, date, answer excerpt, and cited source together. Where a result depends on location, account state, or a particular conversation, record that context too."] },
    { heading: "Keep a stable comparison set", paragraphs: ["Choose a manageable set of questions connected to real buying decisions. Repeat those questions on a documented cadence. Add new questions deliberately and distinguish them from the original baseline so the report remains comparable.", "Do not convert unobserved answers into wins or losses. Missing evidence should remain missing evidence until the check is performed."], bullets: ["Observed mention: the answer explicitly names the brand.", "Observed citation: the answer provides an inspectable source reference.", "Referral: analytics records a visit with available attribution.", "Qualified enquiry: the business applies its own agreed qualification criteria."] },
    { heading: "Connect the report to shipped work", paragraphs: ["A useful weekly report includes the pages, schema changes, technical repairs, and editorial work that actually shipped. Link those changes to the prompts they were intended to support. Explain uncertainty rather than assigning every movement to the latest change.", "A source may change, an engine may update, or an answer may vary. A dated record helps distinguish an execution problem from a measurement problem, even when it cannot establish a single cause."] },
    { heading: "End with the next decision", paragraphs: ["Choose a small number of actions based on the evidence. You might improve an answer page, resolve an entity inconsistency, investigate a lost citation, or revisit a prompt that has little commercial relevance. The purpose of measurement is to improve the next allocation of effort."] },
  ] },
  { slug: "authority-without-manufactured-endorsements", title: "Build authority without manufacturing endorsements", category: "Authority", summary: "A practical editorial approach to relevant publications, public communities, and useful third-party references.", minutes: 5, sections: [
    { heading: "Start with a contribution worth making", paragraphs: ["A relevant reference usually begins with something useful: firsthand data, a clear explanation, a working resource, or expertise that resolves a difficult question. Identify that contribution before building an outreach list.", "Match the contribution to the audience. A specialist publication, a category comparison, and a community thread serve different purposes. A placement that looks impressive in a spreadsheet may be irrelevant to the people you want to reach."] },
    { heading: "Make relationships clear", paragraphs: ["Disclose material relationships and respect a publication or community's rules. Do not present a paid placement as an independent recommendation, create fictional reviews, or impersonate a satisfied customer.", "Community participation works best when the answer stands on its own. A link should add context or evidence rather than replace the contribution."], bullets: ["Research audience and editorial fit.", "Check contribution and disclosure requirements.", "Provide original, reviewable material.", "Record the resulting source and its context."] },
    { heading: "Measure relevance before volume", paragraphs: ["Track what the reference helps a buyer understand. Record the publication, audience, subject, relationship, and source URL. Keep earned editorial coverage separate from owned profiles and paid distribution.", "An AI model may or may not cite a particular source. The useful claim is that the reference exists and contributes relevant evidence; an observed citation requires a separate engine check."] },
    { heading: "Feed the learning back into your site", paragraphs: ["Questions and objections from an editorial conversation can reveal missing explanations on your own pages. Use those observations to improve your answer library, comparisons, and documentation. Authority work and content work should reinforce the same clear account of your expertise."] },
  ] },
];

const fieldNoteDetails: Record<string, Pick<Article, "hook" | "keywords" | "faq"> & { service: string; serviceLabel: string }> = {
  "build-a-buyer-intent-prompt-map": {
    hook: "Your next article may answer a question no qualified buyer is asking. A prompt map exposes that mismatch before you spend another week writing.",
    keywords: ["buyer intent prompts", "B2B AEO content strategy"],
    service: "/services/managed-aeo", serviceLabel: "Managed AEO + SEO",
    faq: [
      { question: "How many buyer prompts should we start with?", answer: "Choose a manageable panel covering distinct, valuable decisions. Start small enough to repeat checks and keep the evidence, then expand deliberately when a new question has a clear purpose." },
      { question: "Should every prompt have its own page?", answer: "No. Related questions may belong on one useful page. Assign a primary URL to each decision and create a new page only when it resolves a distinct information need." },
      { question: "How often should we update the map?", answer: "Review priorities weekly while keeping the baseline wording stable. Record changes to prompts and cohorts so later reports remain comparable." }
    ]
  },
  "schema-without-contradictions": {
    hook: "Perfectly valid JSON-LD can still describe the wrong business. One copied company name or outdated contact field can undermine the consistency your schema was meant to create.",
    keywords: ["AEO schema markup", "entity consistency", "Organization structured data"],
    service: "/services/technical-aeo", serviceLabel: "Technical AEO",
    faq: [
      { question: "Does valid schema guarantee a citation?", answer: "No. Syntax and vocabulary checks establish implementation quality. The page still needs useful, accurate evidence, and engine citations require separate observation." },
      { question: "Which facts should we reconcile first?", answer: "Start with the brand name, canonical domain, public email, locations, and service scope. Compare the shared configuration, rendered pages, and JSON-LD." },
      { question: "When should structured data be reviewed?", answer: "Review it when business facts, templates, services, or content dates change. Include representative public URLs in release checks." }
    ]
  },
  "measure-citations-with-evidence": {
    hook: "A dashboard says your AI visibility rose, but nobody can open the answer or its cited source. Without those records, the team cannot tell a real change from a reporting artifact.",
    keywords: ["AI citation measurement", "LLM visibility reporting"],
    service: "/services/ai-search-analytics", serviceLabel: "AI Search Analytics",
    faq: [
      { question: "Is a mention the same as a citation?", answer: "No. A mention names the brand; a citation provides an inspectable source reference. Record each separately, alongside whether the answer makes a relevant recommendation." },
      { question: "What should an observation contain?", answer: "Save the exact prompt, engine or product, date, available context, answer excerpt, source URLs, and result status. Keep technical failures separate from completed checks." },
      { question: "Can citations be counted as pipeline?", answer: "No. A citation is an observed answer event. Qualified opportunities need your commercial criteria and their own records, with attribution evidence preserved where available." }
    ]
  },
  "authority-without-manufactured-endorsements": {
    hook: "A hundred mentions can add less buying evidence than one detailed, independent comparison. The difference is whether the reference helps a real prospect evaluate your offer.",
    keywords: ["AEO authority building", "off-site citation evidence", "digital PR for AI search"],
    service: "/services/authority-community-mentions", serviceLabel: "authority and community services",
    faq: [
      { question: "What makes an external reference useful?", answer: "It should reach a relevant audience and provide specific, accurate evidence about a buying decision. Record its source, context, and relationship to the brand." },
      { question: "Can paid coverage be an independent endorsement?", answer: "A commercial placement should be disclosed and recorded as paid distribution. Keep it distinct from independent editorial recommendations." },
      { question: "How do we know a reference supports AI visibility?", answer: "First verify that the reference exists and is relevant. Count an AI citation only when a documented engine check actually returns that source." }
    ]
  }
};

// Keep the existing audio field-note collection independent of blog expansion.
export const podcastArticles = fieldNotes;

export const articles: Article[] = [
  ...fieldNotes.map(article => {
    const details = fieldNoteDetails[article.slug];
    return finishArticle({
      ...article,
      hook: details.hook,
      keywords: details.keywords,
      faq: details.faq,
      publishedAt: "2026-11-22",
      modifiedAt: "2026-11-23",
      sections: [...article.sections, {
        heading: "Put the framework to work",
        paragraphs: [`Use Aeoba's [${details.serviceLabel}](${details.service}) to connect this framework to a scoped execution program. Start with the [Free AEO Report](/free-aeo-report) to identify the buyer questions and evidence gaps that deserve attention first.`],
        subsections: [{ heading: "Your first action", paragraphs: ["Choose one commercial question, assign its primary page, and record the evidence you have today. Agree on the next improvement and a date to review what changed."] }]
      }]
    });
  }),
  ...researchArticles
];

export const glossary = [
  ["AEO", "Answer Engine Optimization", "The work of making a brand's expertise understandable, useful, and supportable in answers generated by search and AI systems."],
  ["GEO", "Generative Engine Optimization", "A term for improving how a business and its content are represented in generated answers, including entity clarity, evidence, and source quality."],
  ["SEO", "Search Engine Optimization", "Technical, content, and authority work that helps search engines discover, understand, and present useful pages."],
  ["Entity", "Entity", "A distinguishable person, organization, product, service, place, or concept with a consistent identity and relationships."],
  ["Citation", "AI citation", "An inspectable source reference included in an AI answer. A named mention without a source is recorded separately."],
  ["Buyer intent", "Buyer intent", "The decision or commercial need behind a question, such as comparing alternatives, checking suitability, or estimating implementation effort."],
  ["Schema", "Structured data / schema", "Machine-readable descriptions of visible facts and relationships, often expressed as JSON-LD on a web page."],
  ["JSON-LD", "JSON-LD", "A JSON-based format for linked data used to describe entities and connect them with stable identifiers."],
  ["Canonical", "Canonical URL", "The preferred URL declared for a page to help consolidate duplicate or overlapping versions."],
  ["Indexability", "Indexability", "Whether a page is technically eligible for inclusion in a search index. Eligibility does not guarantee inclusion."],
  ["Crawlability", "Crawlability", "Whether a crawler can reach and retrieve a page and the content needed to understand it."],
  ["Prompt map", "Prompt map", "An organized set of buyer questions linked to audiences, decision stages, target pages, and evidence requirements."],
  ["Baseline", "Citation baseline", "A dated set of observed answers recorded under documented conditions before evaluating subsequent changes."],
  ["Referral", "AI referral", "A visit for which available analytics attributes the source to an AI service. Attribution can be incomplete."],
  ["Answer-first", "Answer-first content", "A page structure that addresses the reader's central question promptly, then provides evidence, qualifications, detail, and an appropriate next step."],
  ["Internal link", "Internal linking", "Contextual connections between related pages on the same website, helping readers and crawlers discover the next useful destination."],
] as const;

export const guideChapters = [
  { title: "Define the buyer and the decision", body: "Choose one offer, one audience, and a specific buying decision. Write down the facts a buyer needs to compare options. Separate product fit, implementation, pricing, and local availability so each question has a clear purpose.", task: "Write your primary offer and three buying questions." },
  { title: "Record an honest baseline", body: "Run a stable prompt set in the engines you care about. Save the date, exact wording, context, answer excerpt, and sources. Record mentions and citations separately. An unchecked prompt is an unknown, not a failure.", task: "Save your first dated observation in the Answer Index." },
  { title: "Fix the technical foundations", body: "Check titles, headings, canonicals, indexability, useful internal links, and mobile access. Make the business name, locations, contact details, and service facts consistent. Prioritize commercial pages before expanding the article library.", task: "Run the homepage readiness checker and list the first three repairs." },
  { title: "Publish useful, evidence-led answers", body: "Answer the buyer's question directly, then support the answer with specific detail and firsthand evidence. Attribute substantive claims, explain limitations, and give the reader a next step matched to their intent. A comparison should help a buyer understand tradeoffs.", task: "Create an answer-page brief with the content workbench." },
  { title: "Describe the facts consistently", body: "Add structured data that matches the visible page. Connect related entities with stable identifiers and canonical URLs. Only describe real locations, people, services, and claims. Keep FAQ markup synchronized with the questions a visitor can read.", task: "Generate and review an Organization or FAQ schema draft." },
  { title: "Earn relevant references", body: "Contribute useful expertise where your buyers already look for evidence. Research editorial and community fit, disclose relationships, and keep a source log. Do not substitute distribution volume or manufactured endorsements for genuine relevance.", task: "Identify three relevant publications or communities and an original contribution." },
  { title: "Review evidence and decide what ships next", body: "Repeat the agreed prompts and compare the results with the baseline. Add the work that shipped, the sources that changed, and the uncertainty that remains. Choose a small number of actions for the next week instead of chasing every fluctuation.", task: "Set a weekly review date and a priority for the next execution cycle." },
];

export interface Playbook { slug: string; title: string; sector: string; description: string; challenge: string; work: string[]; evidence: string[]; prompt: string }
export const playbooks: Playbook[] = [
  { slug: "saas-citation-architecture", title: "A citation architecture for B2B SaaS", sector: "B2B SaaS", description: "An illustrative implementation showing how use cases, integrations, and comparison pages can support buyer questions.", challenge: "A software buyer needs specific answers about fit, integrations, implementation, and alternatives. A generic product overview leaves those decisions unresolved.", work: ["Map evaluation prompts to commercial pages", "Reconcile product, company, and integration entities", "Write answer-first comparison and implementation briefs", "Record repeat observations with the sources attached"], evidence: ["A reviewed prompt-to-page map", "Consistent page and organization identifiers", "A dated technical validation record", "Observed citations recorded only after actual checks"], prompt: "Which software fits our workflow and integrates with the tools we already use?" },
  { slug: "ecommerce-answer-library", title: "An answer library for considered purchases", sector: "Ecommerce", description: "An illustrative product discovery workflow built around suitability, buying criteria, and clear product facts.", challenge: "A shopper comparing a considered purchase needs practical distinctions. Category copy that repeats product names does not explain which option fits a particular need.", work: ["Group product questions by suitability and comparison intent", "Reconcile category and product attributes", "Create useful buying-guide and FAQ briefs", "Connect guides with relevant products and clear policies"], evidence: ["A product fact and evidence inventory", "Descriptive contextual internal links", "Visible answers synchronized with structured data", "A buyer-question review before publication"], prompt: "What should I compare before choosing the right product for this use case?" },
  { slug: "professional-services-entity-baseline", title: "An entity baseline for professional services", sector: "Professional services", description: "An illustrative workflow for consistent services, locations, expertise, and consultation paths.", challenge: "A prospective client needs to understand what a firm does, where it operates, and who owns the work. Inconsistent business facts make that decision harder.", work: ["Reconcile organization, location, and service facts", "Create specific service and location answer structures", "Add schema grounded in visible content", "Track a stable set of local and specialist prompts"], evidence: ["A canonical organization fact sheet", "Service scope and qualification criteria", "A clear consultation journey", "A dated prompt and source log"], prompt: "Who offers the expertise I need, and what will working together involve?" },
];
