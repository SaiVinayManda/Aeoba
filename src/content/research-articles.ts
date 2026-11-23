import { finishArticle, type ArticleDraft } from "./article-types";

const drafts: ArticleDraft[] = [
  {
    slug: "zero-click-search-b2b-aeo-citations",
    title: "60% of Searches End Without a Click—How B2B Brands Win the Citation Anyway",
    category: "Strategy",
    summary: "Build a B2B zero-click search strategy that earns useful AI citations, protects demand capture, and connects Answer Engine Optimization to pipeline.",
    publishedAt: "2026-11-23",
    modifiedAt: "2026-11-23",
    keywords: ["zero-click search", "Answer Engine Optimization", "B2B AEO strategy", "AI citations"],
    hook: "Your best prospect can learn your category, compare suppliers, and build a shortlist before your analytics records a single visit. If your only success metric is the click, the first half of that buying journey is invisible.",
    sections: [
      {
        heading: "What the 60% zero-click search headline actually means",
        paragraphs: [
          "The headline rounds a historical finding: SparkToro and Datos reported that 58.5% of US and 59.7% of EU Google searches in their 2024 panel ended without a result click. These are regional, browser-based observations, not a current universal rate or a B2B-only benchmark. The [original study and its limitations](https://sparktoro.com/blog/2024-zero-click-search-study-for-every-1000-us-google-searches-only-374-clicks-go-to-the-open-web-in-the-eu-its-360/) matter more than the rounded headline.",
          "A search can end because the answer was sufficient, the buyer changed the question, or the session stopped. None of those events proves a commercial loss. For a B2B agency or software company, the practical problem is narrower: useful demand may exist where a traffic report cannot observe it. Design your content and reporting to distinguish influence, evidence, and visits instead of assigning the same value to every impression."
        ]
      },
      {
        heading: "Separate the answer, the citation, and the recommendation",
        paragraphs: [
          "An answer can use a source without recommending the business that published it. A citation can point to a research article while the shortlist names other vendors. A recommendation can name your company without providing a link. These outcomes need separate fields in your measurement log because they imply different next actions.",
          "Suppose a buyer asks how to evaluate a customer onboarding platform. Your implementation guide is cited, but your product is absent from the vendor comparison. The guide may be doing useful educational work; the commercial gap may sit on your integration or suitability pages. Rewriting the successful guide into a sales pitch could weaken the asset that already helps the buyer. Diagnose which decision remains unsupported before changing it."
        ],
        bullets: ["Answer coverage: does the page resolve the actual question?", "Citation coverage: does the observed answer link to your evidence?", "Recommendation coverage: is your brand included for a relevant use case?", "Conversion coverage: is there a useful next step for the visitor who arrives?"]
      },
      {
        heading: "Build an answer-to-evidence map for commercial questions",
        paragraphs: [
          "Choose one offer and write ten questions a qualified buyer would ask before a call. Include suitability, alternatives, implementation, budget, and risk. Assign one primary URL to each decision. Then record the specific evidence that page needs: supported integrations, a transparent scope, a dated methodology, or a worked example.",
          "Use a simple planning score: commercial relevance from one to three, evidence readiness from one to three, and implementation effort from one to three. Multiply relevance by readiness and divide by effort to order the first queue. This is Aeoba's suggested prioritization tool, not a ranking formula. It helps a team choose a useful comparison page ahead of a broad awareness article that has no evidence or commercial owner."
        ],
        subsections: [{ heading: "A worked B2B example", paragraphs: ["For an integration consultancy, replace a vague target such as ‘cloud expertise’ with ‘What should a mid-market finance team check before migrating its reporting stack?’ The answer page should explain prerequisites, delivery stages, data risks, and acceptance criteria. Link to the relevant service scope. Even if a summary satisfies the initial question, the page gives a serious evaluator a reason to return for the implementation detail."] }]
      },
      {
        heading: "Make each answer useful outside its original page",
        paragraphs: [
          "Open a section with a direct answer that names the subject and its limits. Follow with evidence, a comparison, and an example. A paragraph saying ‘it depends on your situation’ becomes more useful when it specifies which situation: regulated data, a small delivery team, a multi-region rollout, or a restricted budget.",
          "Keep important facts in readable page text. Add descriptive headings, stable URLs, and contextual internal links. Review technical access before inventing a special AI publishing format: [Google's AI-feature guidance](https://developers.google.com/search/docs/appearance/ai-features) does not require special AI schema. Our recommendation is to make the answer complete enough to stand on its own and detailed enough to reward a visit."
        ]
      },
      {
        heading: "Give the remaining click a commercial purpose",
        paragraphs: [
          "A visitor who already understands the category needs help making a decision. Send that visitor to a concrete diagnostic, scope, integration reference, or example. Repeating the article introduction behind a form adds friction without supplying new value. Explain what a report will examine and what information you need to prepare it.",
          "For this topic, the natural next step is to inspect whether your own commercial pages support the buyer questions you want to appear for. Start with the [Free AEO Report](/free-aeo-report), or review [Managed AEO + SEO](/services/managed-aeo) for an execution program. Connect the article to the service that can resolve the identified problem, using anchor text that tells the reader what comes next."
        ]
      },
      {
        heading: "Measure zero-click influence without inventing attribution",
        paragraphs: [
          "Maintain a stable prompt panel and save the engine, date, answer, and source URLs. Review referral sessions and qualified enquiries separately. Add a short ‘How did you first hear about us?’ question to your commercial process and retain the buyer's wording. A self-reported AI discovery is useful evidence, but it is still different from a measured click path.",
          "Illustrative example: a panel contains twenty prompts, checked twice each. Six of forty answers cite your domain. That is 15% observed citation coverage for those checks, not 15% of the market. If one later enquiry mentions ChatGPT, record it alongside the sales evidence without declaring the six citations responsible. For the reporting template, read [how to track AI visibility](/resources/blog/track-ai-search-visibility-attribution)."
        ],
        bullets: ["Week one: choose the offer, prompt panel, and baseline conditions.", "Week two: repair the highest-value answer and its evidence gaps.", "Week three: connect supporting pages, service scope, and report CTA.", "Week four: repeat the checks and decide which gap deserves the next release."]
      }
    ],
    faq: [
      { question: "Does zero-click search mean SEO is no longer valuable?", answer: "No. Discoverable, useful commercial pages still capture demand and provide evidence. Add answer and citation observations to traffic reporting so your program can evaluate more of the buyer journey." },
      { question: "Can a B2B brand guarantee an AI citation?", answer: "A brand controls its publishing and technical access, but not an engine's source selection. Use a documented prompt panel and repeated observations to assess progress rather than treating a single citation as a permanent position." },
      { question: "What should we optimize first?", answer: "Start with one valuable buyer decision and its primary page. Check access, factual completeness, proof, internal links, and the next step before commissioning a larger content calendar." }
    ]
  },
  {
    slug: "rank-in-chatgpt-90-day-brand-visibility",
    title: "Why ChatGPT Recommends Your Competitor Instead of You (And How to Fix It in 90 Days)",
    category: "AI Visibility",
    summary: "Diagnose missing ChatGPT brand mentions with a 90-day plan for technical access, buyer-fit pages, independent evidence, and repeatable citation checks.",
    publishedAt: "2026-11-23",
    modifiedAt: "2026-11-23",
    keywords: ["how to rank in ChatGPT", "ChatGPT brand mentions", "LLM visibility", "ChatGPT SEO"],
    hook: "A buyer asks ChatGPT for three suppliers. Your competitor appears with a specific reason to buy; your company disappears despite having a better product. The useful question is which part of your buyer-fit evidence is missing, inaccessible, or contradicted.",
    sections: [
      {
        heading: "There is no single ChatGPT ranking to fix",
        paragraphs: [
          "‘How to rank in ChatGPT’ is a useful commercial search, but it can suggest a fixed results page that does not exist. Recommendations vary with the prompt, conversation, search use, and available context. A generic ‘best platforms’ answer and a detailed ‘best platforms for a European finance team using this CRM’ answer are different evaluations.",
          "Start with the exact questions your buyers ask, then record the observed answer and sources. Separate responses that used web search from those that did not. Treat your diagnosis as a set of hypotheses: the brand may be hard to identify, the relevant capability may be absent from public pages, or the cited comparisons may simply omit it. None of these explanations can be established from one disappointing screenshot."
        ]
      },
      {
        heading: "Diagnose five reasons your competitor has stronger evidence",
        paragraphs: [
          "Compare the evidence presented in the actual answer. If the competitor is described as an ideal fit for a specific integration, inspect the cited integration page. If it is recommended for a market or team size, find the public facts that support that description. Record what is explicit and what is only your interpretation.",
          "Do the same exercise for your company without assuming that a polished homepage resolves every buyer concern. A feature may exist but lack public documentation. An old directory profile may still describe an earlier product. A service page may say ‘global expertise’ without naming the scope or delivery constraints. Fix the smallest factual gap that would help a human evaluate the same decision."
        ],
        bullets: ["Identity gap: inconsistent company names, domains, or service descriptions.", "Fit gap: no public explanation of the use case in the prompt.", "Proof gap: claims lack inspectable examples, documentation, or methodology.", "Access gap: important pages are blocked, unavailable, or require sign-in.", "Reference gap: relevant third-party sources omit or misdescribe the offer."]
      },
      {
        heading: "Days 1–15: establish access and a reproducible baseline",
        paragraphs: [
          "Choose fifteen to thirty high-intent prompts and label them by audience, market, and buying stage. Run each under documented conditions more than once. Store the wording, date, product or mode, mention, recommendation, cited URL, and any retrieval failure. Make a separate list for new exploratory prompts so your original comparison set stays stable.",
          "Check robots rules and your delivery infrastructure. [OpenAI distinguishes OAI-SearchBot from GPTBot](https://developers.openai.com/api/docs/bots): search discovery and model-training controls serve different purposes. Review the current guidance and verify actual access in your logs rather than relying on the name of a robots rule. An allowed crawler still does not guarantee a recommendation. Keep the technical audit connected to the pages the prompt panel actually needs."
        ],
        subsections: [{ heading: "Create a useful baseline record", paragraphs: ["A record might read: procurement lead; EU market; comparison stage; exact prompt; search-enabled response; company not mentioned; two competitor URLs cited; checked on a stated date. Add a screenshot or answer export where available. A missing result caused by an error should be marked unobserved, not counted as a competitive loss."] }]
      },
      {
        heading: "Days 16–45: publish the missing buying evidence",
        paragraphs: [
          "Build a small set of pages that explain suitability, implementation, integrations, and alternatives. Each should own a specific decision and make its claims testable. A comparison needs explicit criteria, relevant tradeoffs, and a review date. An implementation guide needs prerequisites, stages, responsibilities, and limits. Avoid producing several pages that repeat the same broad category pitch.",
          "For a B2B SaaS company, start with a use-case page and the integration detail that sales repeatedly sends by email. For a service agency, document who the engagement fits, what the first month contains, and what the client must supply. Connect these pages to the main offer and supporting guides. [Technical AEO](/services/technical-aeo) helps align their entities and markup; it cannot replace the underlying proof."
        ]
      },
      {
        heading: "Days 46–75: repair external facts and earn relevant coverage",
        paragraphs: [
          "Prioritize sources already appearing in your observed answers. Check whether those sources cover the right market and whether your company belongs in their editorial scope. Request corrections to inaccurate factual profiles through the publisher's normal process. For new coverage, contribute useful research, implementation lessons, or a practical comparison resource that gives the editor a reason to consider the material.",
          "Keep editorial outreach separate from purchased distribution. A paid article can provide information, but it should not be presented as an independent endorsement. Disclose commercial relationships and respect community rules. The useful operating goal is a more accurate public evidence base, supported by dated URLs. Whether an engine later cites a source remains a separate observation. Aeoba's [authority and community work](/services/authority-community-mentions) follows that distinction."
        ]
      },
      {
        heading: "Days 76–90: evaluate progress and choose the next experiment",
        paragraphs: [
          "Repeat the original panel and compare mention coverage, relevant recommendations, owned citations, and third-party citations. Retain the raw counts and denominator. Look at which buyer decisions improved and whether the observed answer now describes the offer accurately. Do not combine an expanded prompt set with the original baseline and call the difference growth.",
          "Ninety days is a planning window for diagnosis, implementation, and review; it is not a universal time-to-rank promise. If access is fixed but recommendations remain absent, inspect the source gap. If citations rise but enquiries do not, review fit and the destination experience. Start with the [Free AEO Report](/free-aeo-report), then use [AI Visibility Recovery](/services/ai-visibility-recovery) when you need a focused investigation rather than an undirected publishing sprint."
        ],
        bullets: ["Ship log: what changed, where, and when?", "Visibility log: what did the same checks actually show?", "Commercial log: which visits or enquiries have supporting attribution?", "Next experiment: which unresolved gap has the strongest evidence?"]
      }
    ],
    faq: [
      { question: "Can I pay OpenAI to rank my company in ChatGPT answers?", answer: "This playbook concerns organic visibility and public evidence. Advertising or other commercial products should not be treated as a way to guarantee an organic recommendation or citation." },
      { question: "Will allowing GPTBot make ChatGPT recommend us?", answer: "No. GPTBot and the search crawler have different documented roles. Review search access separately and evaluate whether the public pages answer the buyer's question; crawler access alone establishes no recommendation guarantee." },
      { question: "What can a small team accomplish in 90 days?", answer: "A small team can establish a defensible baseline, repair important access and identity gaps, ship a focused group of buyer-fit pages, and evaluate repeat checks. Scope the plan around evidence and delivery capacity." }
    ]
  },
  {
    slug: "aeo-vs-geo-vs-seo-pipeline-2026",
    title: "AEO vs. GEO vs. Traditional SEO: What Actually Moves Pipeline in 2026",
    category: "Strategy",
    summary: "Understand the difference between AEO, GEO, and SEO, then prioritize shared technical, content, and measurement work around qualified B2B demand.",
    publishedAt: "2026-11-23",
    modifiedAt: "2026-11-23",
    keywords: ["AEO vs GEO vs SEO", "difference between AEO and GEO", "B2B SEO pipeline", "GEO strategy 2026"],
    hook: "Three agencies can sell you SEO, AEO, and GEO while proposing the same technical fixes and content pages. The label is cheap. The valuable distinction is which buyer decision the work supports and which outcome the team can prove.",
    sections: [
      {
        heading: "Define SEO, AEO, and GEO before comparing them",
        paragraphs: [
          "SEO focuses on discovery and useful presentation in search engines. AEO, Answer Engine Optimization, focuses on making information usable in direct answers and supported recommendations. GEO, Generative Engine Optimization, describes work intended to improve representation in generated responses. These are working industry terms with overlapping usage, not three universally standardized products.",
          "Aeoba uses the distinctions to clarify a scope. Technical access and canonicalization can support all three. A direct answer with evidence is useful in both a traditional result and an AI summary. A prompt-and-citation panel adds observations that a conventional keyword report may not contain. A proposal should explain these deliverables directly so the buyer can compare substance rather than count acronyms."
        ],
        table: { headings: ["Discipline", "Primary question", "Useful evidence"], rows: [["SEO", "Can buyers discover and use the page through search?", "Indexation, relevant search performance, visits, conversions"], ["AEO", "Can an answer resolve the question and cite supporting facts?", "Answer quality, observed mentions and source URLs"], ["GEO", "How is the brand represented in generated responses?", "Repeated response samples, accuracy, fit, citations"]] }
      },
      {
        heading: "Follow one buying journey across all three disciplines",
        paragraphs: [
          "Imagine an operations director selecting compliance software. The first search asks about implementation risks. A later prompt compares suppliers that meet a regional requirement. A colleague checks integrations in a conventional search result. The final website visit lands on pricing. Assigning the entire opportunity to one channel discards the evidence from the other steps.",
          "Build one decision map covering research, evaluation, validation, and purchase. Use it to identify the page, evidence, and next step for each stage. An implementation guide may support early confidence. An integration reference may resolve a blocker. A comparison may narrow the shortlist. The program moves toward pipeline when those assets help qualified buyers advance, even when not every earlier interaction leaves a measurable click."
        ]
      },
      {
        heading: "Keep the technical foundation shared",
        paragraphs: [
          "Do not buy three separate audits of the same canonical URLs, crawl rules, rendering, and internal links. Create one technical backlog with clear acceptance criteria. A commercial page should return successfully, be reachable through descriptive links, represent the correct entity, and make its important content available to visitors.",
          "Assign one owner to each shared fix and record which page templates it affects. This prevents multiple providers from making conflicting changes to the same metadata or organization record. A coordinated release also gives the measurement team a reliable date to use when investigating later observations.",
          "[Google's guidance on AI features](https://developers.google.com/search/docs/appearance/ai-features) keeps foundational SEO relevant and introduces no special AI-feature technical requirements. Treat claims of a separate mandatory AI markup layer cautiously. A practical audit should identify the page, the observed defect, the proposed repair, and the validation method. [Technical AEO](/services/technical-aeo) connects that work to consistent brand and service facts."
        ],
        subsections: [{ heading: "Define completion before implementation", paragraphs: ["‘Improve entity optimization’ is difficult to review. ‘Use one organization identifier, reconcile the contact details across visible pages and JSON-LD, and remove duplicate conflicting records’ is concrete. Agree on the observable output before the work starts, then keep the release record with the prompt or page it was intended to support."] }]
      },
      {
        heading: "Allocate content by commercial friction",
        paragraphs: [
          "Start with the questions that block a real purchase. Interview sales and delivery teams, review anonymized objections, and inspect the material buyers request before signing. A missing integration page or ambiguous service scope may deserve attention before another broad explainer. Create an evidence brief before a writing brief so every important claim has a source or a documented gap.",
          "Use an illustrative capacity split such as half the effort on commercial-page gaps, a quarter on technical repairs, and a quarter on measurement and relevant external evidence. This is a planning example, not an industry benchmark. Change it when the audit shows a different bottleneck. An inaccessible site needs technical work first; a healthy site with weak differentiation needs better facts and explanations."
        ],
        bullets: ["High buying intent + clear evidence: improve the primary commercial page.", "High buying intent + weak evidence: commission the research or documentation.", "Strong content + poor access: resolve the technical constraint.", "Frequent citations + weak enquiries: inspect audience fit and conversion friction."]
      },
      {
        heading: "Use a pipeline model with visible assumptions",
        paragraphs: [
          "A simple commercial model starts with qualified visits, enquiry rate, qualification rate, average opportunity value, and win rate. Keep pipeline separate from revenue. For example, 100 visits producing five enquiries and two qualified opportunities at €20,000 each imply €40,000 of opportunity pipeline. At a stated 25% win assumption, the model suggests €10,000 of potential revenue. These are illustrative inputs, not Aeoba results.",
          "A citation is upstream evidence, not a visit and not an opportunity. Report observed citation coverage beside referral sessions and buyer-reported discovery, then show the commercial outcomes that actually occurred. If a buyer mentions an AI answer after arriving through branded search, retain both observations. [AI Search Analytics](/services/ai-search-analytics) can build that reporting discipline without pretending to recover every unseen interaction."
        ]
      },
      {
        heading: "Choose a program by outputs and review cadence",
        paragraphs: [
          "Ask the provider to show the baseline, the first execution queue, the evidence requirements, and the weekly review. The agreement should name who approves claims, who implements technical changes, and how results are checked. A proposal selling a content count without a decision map makes it difficult to know whether the work addresses a commercial constraint.",
          "Start with a [Free AEO Report](/free-aeo-report) if the bottleneck is unclear. Use [Managed AEO + SEO](/services/managed-aeo) when the work needs coordinated technical, content, authority, and measurement execution. Then assess the first ninety days against shipped improvements and documented buyer outcomes. The acronym matters less than the team's ability to connect a question, a page, supporting facts, and an accountable next action."
        ],
        bullets: ["One prompt and page map for the offer.", "One technical backlog with observable acceptance criteria.", "One editorial queue grounded in inspectable evidence.", "Separate reporting for discovery, citations, qualified opportunities, and revenue."]
      }
    ],
    faq: [
      { question: "What is the main difference between AEO and GEO?", answer: "AEO emphasizes answering questions clearly and supporting answers with evidence. GEO emphasizes representation in generative responses. The terms overlap, so compare the actual work and measurement definitions in a proposal." },
      { question: "Does GEO replace traditional SEO in 2026?", answer: "No. Technical discovery, useful content, and a clear conversion experience remain part of the same buyer journey. Add generative-response observations where relevant rather than abandoning the foundation." },
      { question: "Which discipline should a B2B company fund first?", answer: "Fund the most important observed constraint. Fix blocked commercial pages before scaling content; improve weak buying evidence before expanding a prompt dashboard. A shared diagnostic is more useful than selecting a label in isolation." }
    ]
  },
  {
    slug: "technical-aeo-schema-entity-blueprint",
    title: "The Exact Schema & Entity Blueprint LLMs Use to Verify Your Brand",
    category: "Technical AEO",
    summary: "A practical technical AEO blueprint for Organization, Service, and article schema, stable entity identifiers, visible facts, and structured-data validation.",
    publishedAt: "2026-11-23",
    modifiedAt: "2026-11-23",
    keywords: ["technical AEO schema markup", "entity optimization", "Organization schema", "LLM brand verification"],
    hook: "If your footer names one business, your schema names another, and your service pages imply a third, adding more JSON-LD creates a larger contradiction. Start with one verifiable account of the brand before adding another property.",
    sections: [
      {
        heading: "What an entity blueprint can actually establish",
        paragraphs: [
          "No public specification reveals an exact verification pipeline shared by every LLM. The blueprint here is an implementable approach to consistent brand facts, not a claim to know a model's private ranking logic. Its purpose is to make the organization, services, locations, and evidence understandable in both visible pages and machine-readable descriptions.",
          "[Google's Organization documentation](https://developers.google.com/search/docs/appearance/structured-data/organization) explains how organization markup can help disambiguate a business. That is a narrower and more useful claim than saying schema guarantees an AI recommendation. Treat factual consistency as the deliverable you control; record actual citations and brand descriptions separately when evaluating the result."
        ]
      },
      {
        heading: "Step 1: create a canonical brand fact sheet",
        paragraphs: [
          "List the public brand name, canonical domain, logo URL, contact email, operating locations, service names, and confirmed profile URLs. Beside each field, identify the page where a visitor can verify it and the team responsible for keeping it current. A shared source of truth is especially useful when several templates render contact details independently.",
          "For Aeoba, that public identity is the agency brand, info@aeoba.com, Milan in Italy, and Sliema in Malta. Do not invent a street address, a legal designation, or a review score to make the record look more complete. Keep operating locations separate from claims about a staffed storefront. The evidence should determine the model, rather than a schema generator determining what the business claims to be."
        ],
        bullets: ["Resolve conflicting names and legacy domains.", "Use current, public contact details in pages and markup.", "Describe real services with a clear scope and audience.", "Include only profiles that actually identify the organization.", "Assign a review owner and a change trigger for every important fact."]
      },
      {
        heading: "Step 2: connect entities with stable identifiers",
        paragraphs: [
          "Use a durable organization identifier such as `https://aeoba.com/#organization` and reference it from related records. Give a service a distinct identifier, then connect it to the organization through `provider`. A page URL identifies a document; the organization identifier identifies the business. Keeping those roles separate prevents an article, a service, and a company from becoming interchangeable records.",
          "The following compact example is an entity map, not a universal template. Adapt it to facts visible on the relevant pages. [Schema.org's Service type](https://schema.org/Service) supports describing a service and its provider. Additional properties are useful only when they express accurate information that helps someone understand the offer."
        ],
        code: '{\n  "@context": "https://schema.org",\n  "@graph": [\n    {\n      "@type": "Organization",\n      "@id": "https://aeoba.com/#organization",\n      "name": "Aeoba",\n      "url": "https://aeoba.com",\n      "email": "info@aeoba.com",\n      "location": [\n        { "@type": "Place", "name": "Milan, Italy" },\n        { "@type": "Place", "name": "Sliema, Malta" }\n      ]\n    },\n    {\n      "@type": "Service",\n      "@id": "https://aeoba.com/services/technical-aeo#service",\n      "name": "Technical AEO (Schema + Entity)",\n      "url": "https://aeoba.com/services/technical-aeo",\n      "provider": { "@id": "https://aeoba.com/#organization" }\n    }\n  ]\n}',
        subsections: [{ heading: "Avoid template-generated identity drift", paragraphs: ["Check what the final page emits when a CMS plugin, theme, and custom component all add organization records. Multiple records are not automatically wrong, but conflicting names or IDs create an avoidable maintenance problem. Keep one authoritative configuration and make intentional references to it from page-specific markup."] }]
      },
      {
        heading: "Step 3: choose page-specific schema that matches the page",
        paragraphs: [
          "A service page should describe the service it actually offers. An editorial page can use `BlogPosting` and identify its headline, publication date, author, publisher, and canonical page. [Google's article guidance](https://developers.google.com/search/docs/appearance/structured-data/article) covers article properties and author identification. A brand publication can identify an organization as its author when that matches the visible byline.",
          "Keep a FAQ visible if you describe it in markup. Do not add a hidden catalogue of questions solely for a crawler. A valid schema vocabulary does not mean a page qualifies for every search appearance, and an ordinary agency blog should not promise FAQ rich results. Choose the smallest accurate representation first, then review the relevant engine's eligibility guidance before expanding it."
        ]
      },
      {
        heading: "Step 4: validate access, syntax, meaning, and deployment",
        paragraphs: [
          "Validation needs several checks. Fetch the actual public URL and inspect the delivered HTML. Parse every JSON-LD script to catch syntax failures. Use a vocabulary validator to review types and properties. Compare names, services, dates, locations, and claims with visible content. These checks answer different questions; passing a parser does not establish factual accuracy.",
          "Include a changed-page check in the release process. If an editor updates a service name, confirm that the navigation label, visible heading, structured record, and relevant internal links still identify the same offer. Store a short validation note with the release so another team member can distinguish an approved fact change from accidental template drift.",
          "After deployment, inspect more than the homepage. A shared component can be correct while a page template emits an older record. Check representative service, article, contact, and location pages. Verify canonical URLs and internal links, then retain a short release record showing what changed and what was checked. [Technical AEO](/services/technical-aeo) should produce reviewable corrections rather than an unexplained schema score."
        ],
        bullets: ["Access: can the intended public page be retrieved successfully?", "Syntax: does every JSON-LD block parse?", "Vocabulary: do the chosen types and properties express the intended facts?", "Meaning: does markup agree with the visible page?", "Release: does the production output contain the approved implementation?"]
      },
      {
        heading: "Step 5: maintain the graph when business facts change",
        paragraphs: [
          "Put identity review into ordinary publishing work. A new service, revised contact email, changed location, or updated article should trigger the corresponding visible-page and markup checks. Store shared facts in configuration and page-specific facts beside their content so maintenance follows the same editorial process.",
          "Then evaluate the commercial question: are observed AI descriptions more accurate, are relevant pages cited, and can buyers understand the offer? Those observations do not prove that schema alone caused a change, but they reveal whether the combined system is becoming more useful. Request the [Free AEO Report](/free-aeo-report) to identify the first gaps, or read the [90-day implementation playbook](/resources/blog/90-day-answer-engine-playbook-b2b) to connect technical cleanup with content and measurement."
        ]
      }
    ],
    faq: [
      { question: "Is there a special schema type required for LLM visibility?", answer: "There is no universal LLM-visibility schema standard. Use accurate, established types for the organization and page, and verify the requirements of the specific search feature you are targeting." },
      { question: "Should an agency use Organization or LocalBusiness?", answer: "Choose the type that accurately represents the business and the page. Do not imply a storefront, street address, or local operating model that you cannot substantiate. Organization is a useful starting point for the agency identity." },
      { question: "Will valid JSON-LD guarantee ChatGPT or Perplexity citations?", answer: "No. Valid, consistent markup is an implementation quality measure. Source selection and recommendations need separate observation, and the page must still provide useful evidence for the buyer's question." }
    ]
  },
  {
    slug: "perplexity-seo-reddit-listicles-citation-signals",
    title: "Why Reddit and 'Best Of' Listicles Matter More Than Backlinks for Perplexity Rankings",
    category: "Authority",
    summary: "Build a Perplexity SEO strategy around observed source relevance, useful community participation, and accurate comparison coverage instead of chasing link counts.",
    publishedAt: "2026-11-23",
    modifiedAt: "2026-11-23",
    keywords: ["Perplexity SEO", "Perplexity rankings", "Reddit AI citations", "off-site citation signals"],
    hook: "A competitor earns one detailed comparison mention while you earn twenty irrelevant links. If the buyer asks which supplier fits a particular workflow, the comparison may contain the evidence the answer needs. A link-count report cannot tell you that.",
    sections: [
      {
        heading: "Treat the headline as a source-relevance hypothesis",
        paragraphs: [
          "There is no published universal Perplexity formula proving that Reddit or listicles always outweigh backlinks. The practical argument is conditional: when those sources answer your buyer's question and appear in the observed response, improving relevant coverage can deserve more attention than increasing an unrelated backlink total.",
          "This is a research priority, not a ranking guarantee. Begin with the exact prompt and sources the engine actually returns. A specialist documentation page may matter more than either a community thread or a comparison article. Your task is to identify the evidence required by the decision, then build a legitimate contribution that belongs in that context. Do not turn a useful editorial tactic into a claim about secret algorithm weights.",
          "Agree on the experiment's question before outreach begins. For example: does a clearer public integration guide give relevant editors better material to evaluate? That question creates an inspectable output even if the next engine check does not change. It also separates editorial progress from an unverified assumption about rankings."
        ],
        bullets: ["Find the decision and its observed sources.", "Verify the factual gap before proposing a contribution.", "Publish useful primary evidence and disclose relationships.", "Repeat the panel and record what the answer actually cites."]
      },
      {
        heading: "Inspect the sources behind high-intent Perplexity answers",
        paragraphs: [
          "Choose a small panel of comparison, suitability, implementation, and risk questions. Run repeat checks and save each source URL, the claim it supports, the publication date if visible, and whether it describes your market. Separate owned product pages, independent editorial coverage, communities, directories, and paid placements.",
          "Use this log to look for patterns rather than declaring a platform preference from one answer. If several relevant questions cite detailed integration documentation, your first priority may be your own documentation. If a recurring comparison excludes your category, inspect the criteria before pitching inclusion. A source opportunity is valuable when it can help the evaluator understand a real difference, not simply because it already appears in an answer."
        ],
        table: { headings: ["Source", "What to inspect", "Useful response"], rows: [["Community discussion", "Specific problem, firsthand detail, moderation rules", "Answer the problem with disclosed expertise"], ["Best-of comparison", "Criteria, audience, update policy, relationships", "Offer verifiable facts relevant to the criteria"], ["Product documentation", "Capability, prerequisites, limitations", "Publish missing implementation detail"], ["Directory profile", "Identity and service accuracy", "Correct outdated business facts"]] }
      },
      {
        heading: "Why a useful Reddit answer can support buyer evaluation",
        paragraphs: [
          "A discussion can surface the exact objections polished marketing copy omits: setup friction, a missing integration, procurement concerns, or a workflow that fails at a certain scale. Those details can help a buyer evaluate suitability. The value comes from specificity and a transparent context, not from the Reddit domain by itself.",
          "Research each community before participating. Read its rules, check whether commercial relationships must be disclosed, and contribute only where you can answer the question. An explanation should remain useful without a link. Never manufacture a satisfied customer, coordinate votes, or plant an undisclosed endorsement. These practices damage the evidence base you are trying to improve and can make the underlying contribution less credible to the people who matter."
        ],
        subsections: [{ heading: "A contribution that stands on its own", paragraphs: ["For an implementation question, explain the prerequisites, the main tradeoff, and the failure case. State your relationship to the product or service. If a public resource adds necessary detail and the rules allow it, link directly to that resource. Keep a record of the contribution and its context; measure an actual AI citation only if a later check observes one."] }]
      },
      {
        heading: "Earn comparison coverage with an evidence packet",
        paragraphs: [
          "An editor evaluating ‘best software for distributed finance teams’ needs accurate facts: supported markets, integrations, implementation requirements, pricing availability, and constraints. Prepare a compact packet with source URLs and a clear explanation of where the product fits. Include the limitations that a serious buyer would need to know.",
          "Read the publication's methodology and disclosure policy. Suggest a correction or a candidate for review through its editorial process. If the only route is a paid placement, label and track it as paid distribution. Avoid publishing a supposedly independent ‘best providers’ list that silently ranks your own company first. Aeoba's [authority and community services](/services/authority-community-mentions) focus on useful references with a clear relationship to the brand."
        ]
      },
      {
        heading: "Keep your own pages accessible and worth citing",
        paragraphs: [
          "Third-party work cannot compensate for unclear or unavailable primary information. Provide a stable destination where a buyer can verify the capability, scope, and contact details referenced elsewhere. Keep your comparison and implementation pages current, and connect them through meaningful internal links.",
          "[Perplexity's crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers) distinguishes its search crawler from user-initiated fetches and describes access configuration. Verify applicable crawler and infrastructure rules using the current documentation. Access is a prerequisite you can inspect; it is not evidence of a particular ranking. [Technical AEO](/services/technical-aeo) can resolve the owned-site gaps while your editorial program develops relevant external references."
        ]
      },
      {
        heading: "Run a four-week source experiment",
        paragraphs: [
          "In week one, establish the prompt panel and classify its citations. In week two, improve one primary evidence page and prepare a factual editorial packet. In week three, pursue a small number of appropriate corrections or contributions. In week four, repeat the checks and inspect what changed. External editors control their publishing schedules, so a four-week experiment may end with useful submissions rather than published coverage.",
          "Record inputs, outputs, and observations separately: contributions prepared, pieces accepted, source URLs published, citations observed, and enquiries received. Do not describe every acquired link as an AI visibility win. Start with the [Free AEO Report](/free-aeo-report), then compare your source findings with the [ChatGPT visibility plan](/resources/blog/rank-in-chatgpt-90-day-brand-visibility) to identify work that supports more than one engine."
        ]
      }
    ],
    faq: [
      { question: "Does Perplexity always favor Reddit?", answer: "No universal preference is established here. Inspect the sources returned for your own high-intent prompts and repeat the checks. Source usefulness depends on the question and the evidence available." },
      { question: "Are backlinks irrelevant to Perplexity SEO?", answer: "No. Relevant links can help people discover useful information and can accompany strong editorial evidence. A backlink count alone does not tell you whether a source supports the buyer's decision or is cited in an observed answer." },
      { question: "Should we buy placements in best-of articles?", answer: "Evaluate the audience, editorial process, factual usefulness, and disclosure first. Paid distribution should be recorded as paid and cannot establish an independent endorsement or guarantee a citation." }
    ]
  },
  {
    slug: "track-ai-search-visibility-attribution",
    title: "How to Track AI Search Visibility When Google Search Console Shows Zero Clicks",
    category: "Measurement",
    summary: "Track AI brand mentions, citations, referrals, and qualified pipeline with a stable prompt panel, clear denominators, and an honest attribution framework.",
    publishedAt: "2026-11-23",
    modifiedAt: "2026-11-23",
    keywords: ["AI citation tracking", "AI search visibility", "LLM traffic attribution", "ChatGPT referral analytics"],
    hook: "An AI answer can name your company and cite your research while Search Console records no click. That is not automatically a tracking failure. It is a reminder that a citation, a visit, and a sales opportunity are three different events.",
    sections: [
      {
        heading: "Start with the boundary of each measurement system",
        paragraphs: [
          "Search Console reports Google Search performance; it is not a cross-engine monitor for ChatGPT and Perplexity. [Google documents AI-feature traffic within its Web performance reporting](https://developers.google.com/search/docs/appearance/ai-features). A zero-click row therefore cannot prove that another engine omitted your brand, nor can a citation screenshot prove that a user visited your site.",
          "Build a measurement stack that preserves those boundaries. Use prompt observations for what an answer said, web analytics for recorded visits, and your commercial system for qualified opportunities. Connect records when evidence supports the connection. Retain uncertainty when a buyer's path crosses devices, applications, untagged links, or a later branded search. A useful report should make that uncertainty visible instead of hiding it in a single score."
        ]
      },
      {
        heading: "Define four metrics before selecting a dashboard",
        paragraphs: [
          "A brand mention means the answer explicitly names the company. A citation means the answer includes an inspectable source reference. An owned-domain citation and a third-party source discussing your brand should be separate categories. A qualified opportunity requires your business's qualification criteria, not merely a form submission.",
          "Define recommendation accuracy as well: a brand named for a capability it does not provide is not a useful win. Save whether the description matches the offer and whether the recommendation addresses the prompt. These fields make a small manual log more actionable than a large volume of unlabeled screenshots. Publish your definitions beside the report so stakeholders know what a change in coverage actually means."
        ],
        table: { headings: ["Metric", "Suggested calculation", "What it cannot establish"], rows: [["Mention coverage", "Checks naming the brand / completed checks", "Market share or a click"], ["Owned citation coverage", "Checks citing the domain / completed checks", "A visit or a recommendation"], ["Observed AI referrals", "Sessions with supporting source evidence", "All AI-influenced visits"], ["Qualified pipeline", "Value of qualified opportunities under agreed criteria", "Revenue already won"]] }
      },
      {
        heading: "Build a stable, commercially relevant prompt panel",
        paragraphs: [
          "Use sales and delivery questions to choose prompts across discovery, comparison, suitability, implementation, and risk. Add the audience and market when they affect the answer. Keep exact wording stable within a reporting period. If you introduce a new product or category, create a new cohort rather than rewriting the baseline without explanation.",
          "Run repeated checks under documented conditions. Save the engine or product, available mode, search use, date, region where relevant, prompt, answer excerpt, source URLs, and result status. Distinguish a technical failure from a completed answer with no mention. Automated API checks and consumer-interface checks may represent different experiences; label them separately instead of merging them into a single time series."
        ],
        subsections: [{ heading: "A denominator example", paragraphs: ["Suppose twenty-five prompts are checked twice. Two checks fail, leaving forty-eight completed observations. Twelve cite your domain, giving 25% observed owned citation coverage for that panel. Report the two failed checks as missing. If the next period has more failures or different prompts, explain the comparison limit before interpreting the change."] }]
      },
      {
        heading: "Capture available referral and conversion evidence",
        paragraphs: [
          "Inspect source and medium, the available referrer, campaign parameters, landing page, and conversion events in your analytics setup. Validate a controlled visit from the actual interface before relying on a channel grouping. Different clients can preserve different information, and a redirected or copied link can lose source context. Treat a missing referrer as unknown rather than automatically assigning it to AI.",
          "Attach the recorded first landing page and attribution details to an enquiry when your implementation and privacy choices allow it. Add a concise discovery question to the sales process. A buyer saying ‘I compared you in ChatGPT’ is useful self-reported influence. Keep it separate from a technically observed referral so your team can evaluate both without double-counting the opportunity."
        ],
        bullets: ["Test the source evidence with an actual controlled visit.", "Separate detected referrals from self-reported discovery.", "Keep direct and branded traffic available for investigation.", "Deduplicate enquiries and opportunities using your commercial process.", "Document consent, retention, and access practices for the data you collect."]
      },
      {
        heading: "Connect the visibility report to shipped work",
        paragraphs: [
          "Maintain a change log containing the release date, page, prompt cohort, and intended effect. A schema correction may target entity accuracy. An integration guide may target implementation questions. An editorial contribution may create a new independent source. Review whether the next observations are consistent with the intended effect without assuming that sequence alone proves causation.",
          "Keep raw exports available to the reviewer rather than retaining only a chart. If a classification changes, preserve the original observation and explain the correction. This allows a team to revise its definitions without silently rewriting the historical trend it uses for commercial decisions.",
          "Investigate lost coverage using the saved source record. Did the cited page change, become inaccessible, or move? Did a source update its comparison? Did your checks change product or mode? These questions often produce a more useful repair than rewriting the homepage after every fluctuation. [AI Search Analytics](/services/ai-search-analytics) and the [Answer Index](/answer-index) support this evidence-first review process."
        ]
      },
      {
        heading: "Make the weekly report end in a decision",
        paragraphs: [
          "A useful weekly report can fit on one page: completed checks and exceptions, mention and citation coverage, important answer examples, shipped changes, recorded referrals, qualified opportunities, and the next three actions. Include source URLs or answer exports so another person can inspect the basis for the recommendation.",
          "If coverage improves without relevant enquiries, review audience fit and the conversion destination. If enquiries improve while citations remain flat, inspect other sources of demand before crediting the program. If the evidence is too sparse, improve the sampling or instrumentation. Start with a [Free AEO Report](/free-aeo-report), then use the [AEO, GEO, and SEO comparison](/resources/blog/aeo-vs-geo-vs-seo-pipeline-2026) to connect these metrics to a coordinated commercial program."
        ]
      }
    ],
    faq: [
      { question: "Does Search Console show ChatGPT citations?", answer: "Search Console covers Google Search performance. Use separate observed-answer records for ChatGPT citations and your analytics system for visits with available referral evidence." },
      { question: "What is a good AI citation coverage percentage?", answer: "There is no universal target that applies to every market or prompt set. Establish a stable panel tied to commercial decisions, report completed observations, and compare progress using the same definitions and conditions." },
      { question: "Can we attribute every AI-influenced deal?", answer: "No. Some influence leaves no measurable click path. Combine detected referral evidence, buyer-reported discovery, and qualified opportunity records while preserving their different levels of certainty." }
    ]
  },
  {
    slug: "90-day-answer-engine-playbook-b2b",
    title: "The 90-Day Answer Engine Playbook for B2B SaaS and Service Companies",
    category: "Strategy",
    summary: "A 90-day B2B AEO implementation guide covering buyer prompts, technical repairs, answer pages, external evidence, ownership, and citation measurement.",
    publishedAt: "2026-11-23",
    modifiedAt: "2026-11-23",
    keywords: ["B2B AEO strategy", "90-day AEO playbook", "AEO for B2B SaaS", "answer engine implementation"],
    hook: "A ninety-day AEO program can ship dozens of articles and still leave the sales team's hardest question unanswered. Start with the decision that stalls a purchase, then build the technical access, content, and evidence needed to resolve it.",
    sections: [
      {
        heading: "Set the commercial scope before the content calendar",
        paragraphs: [
          "Choose one offer, one primary audience, and one market for the initial cycle. Define a qualified opportunity using criteria your sales team already understands. List the decisions a buyer must make before contacting you and the evidence required for each. Then name the people or functions responsible for strategy, technical changes, editorial review, and measurement.",
          "A useful initial scope might be a prompt panel, a small cluster of commercial pages, a technical repair queue, an entity fact sheet, and a source log. The exact count should follow capacity and evidence readiness. Ninety days is an implementation and learning cycle, not a promise that every engine will recommend every brand on a fixed deadline."
        ],
        table: { headings: ["Phase", "Main output", "Exit check"], rows: [["Days 1–15", "Decision map, prompt baseline, access audit", "The team can explain the offer and inspect the baseline"], ["Days 16–30", "Technical repairs and consistent entity facts", "Priority pages are accessible and factually aligned"], ["Days 31–60", "Evidence-led answer and commercial pages", "Each page resolves an assigned buyer decision"], ["Days 61–75", "Relevant external corrections and contributions", "Published sources and relationships are recorded accurately"], ["Days 76–90", "Repeat checks and next-cycle roadmap", "Decisions follow documented observations"]] }
      },
      {
        heading: "Days 1–15: map buyer questions and record the baseline",
        paragraphs: [
          "Collect questions from sales calls, procurement requests, onboarding, and support. Group them by suitability, alternatives, implementation, cost, and risk. Keep the customer's wording where possible. Assign a primary page and evidence gap to each question, then choose a manageable subset for repeat engine checks.",
          "For SaaS, include integration compatibility, migration effort, data handling, and team fit. For services, include deliverables, responsibilities, engagement scope, and handover. Record the exact prompt, engine or product, date, answer, and sources. A baseline is useful only if a later reviewer can reproduce its conditions well enough to understand the comparison. Use the [buyer-intent prompt guide](/resources/blog/build-a-buyer-intent-prompt-map) to structure the first map."
        ],
        bullets: ["Deliverable: agreed buyer-question and page map.", "Deliverable: dated observations with mentions and citations separated.", "Deliverable: a prioritized evidence and technical gap list.", "Review: confirm that the prompt panel represents actual buying decisions."]
      },
      {
        heading: "Days 16–30: repair access and reconcile the brand",
        paragraphs: [
          "Inspect the primary commercial pages for response status, canonical URLs, discoverable links, readable content, and appropriate crawl access. Review the delivered HTML as well as the visible browser page. A blocked or contradictory page should be repaired before a content expansion sends more internal links toward it.",
          "Create a brand fact sheet and align shared configuration, contact details, operating locations, and structured data. Keep an organization separate from its services and articles through stable identifiers. Record each repair with an acceptance check. The [schema and entity blueprint](/resources/blog/technical-aeo-schema-entity-blueprint) explains the implementation sequence; [Technical AEO](/services/technical-aeo) provides the corresponding service scope."
        ],
        subsections: [{ heading: "Keep the first release small enough to verify", paragraphs: ["Do not combine a redesign, a domain migration, and the initial answer program unless those projects are necessary to resolve the observed problem. Focused changes are easier to review and maintain. An initial release can contain a corrected entity configuration, a repaired service template, and a clearer implementation page, each with a documented purpose."] }]
      },
      {
        heading: "Days 31–60: build pages around evidence, not volume",
        paragraphs: [
          "Write an evidence brief for each priority page. Include the question, direct answer, supporting facts, example, limitations, internal links, and next step. Put technical and commercial reviewers on the draft before publication. A comparison should disclose its criteria; a delivery guide should identify prerequisites and responsibilities; a case example should distinguish illustration from achieved client results.",
          "Start with existing commercial pages when they already own the decision. Add a supporting article only when a separate information need justifies it. This avoids creating overlapping pages that compete for the same purpose. Link the supporting explanation to the service or product scope, then link back where it helps the buyer explore detail. [Managed AEO + SEO](/services/managed-aeo) coordinates this work around one execution queue."
        ],
        bullets: ["SaaS example: use-case page, integration guide, migration checklist, and a criteria-led comparison.", "Service example: scope page, implementation timeline, responsibility matrix, and a qualification guide.", "Editorial check: every material claim has a source, evidence, or a clearly stated limitation.", "Conversion check: the next step gives the reader something useful for their current decision."]
      },
      {
        heading: "Days 61–75: develop the public evidence beyond your site",
        paragraphs: [
          "Review the sources appearing in your baseline and identify legitimate opportunities to improve accuracy or contribute expertise. Correct outdated profiles, propose relevant editorial material, and participate in communities when the question and rules fit your expertise. Keep the contribution useful even if the publisher chooses not to link.",
          "Prepare a source log with the URL, publication or update date, audience, relationship, and claim supported. Separate proposed work from published coverage. Keep paid distribution distinct from independent editorial references. An external mention becomes an observed AI citation only when an actual answer check includes it. The [Perplexity source strategy](/resources/blog/perplexity-seo-reddit-listicles-citation-signals) provides a practical research framework for this phase."
        ]
      },
      {
        heading: "Days 76–90: review results and commit to the next constraint",
        paragraphs: [
          "Repeat the original prompt panel under documented conditions and compare completed observations. Review brand accuracy, relevant recommendations, owned and third-party citations, available referral sessions, and qualified opportunities. Add the release log so stakeholders can see what shipped. Preserve uncertainty about causation and missing attribution.",
          "Choose the next cycle from the evidence. If technical access remains weak, finish the repairs. If fit is poorly explained, improve the commercial pages. If the source landscape omits your category, invest in research and legitimate editorial contributions. If the program generates attention without qualified demand, reconsider the audience and offer. Request the [Free AEO Report](/free-aeo-report) to define a useful starting scope, or discuss [AI Search Analytics](/services/ai-search-analytics) when the measurement gap is preventing decisions."
        ],
        subsections: [{ heading: "A weekly review agenda that supports delivery", paragraphs: ["Review the work completed, the evidence checked, the blockers that need an owner, and the next three priorities. Keep approvals and due dates explicit. A short meeting with a visible delivery queue is more useful than a dashboard walkthrough that ends without a decision. Carry unresolved questions into the next cycle with a proposed way to investigate them."] }]
      }
    ],
    faq: [
      { question: "Is ninety days enough to see AEO results?", answer: "It is a useful period for establishing a baseline, shipping focused improvements, and reviewing repeated observations. Source updates, crawling, demand, and engine behavior vary, so it is not a universal deadline for recommendations or revenue." },
      { question: "How many articles should a B2B company publish?", answer: "Publish the number needed to resolve distinct buyer decisions with useful evidence and available review capacity. Improve existing commercial pages first when they already own the question. Content volume alone is not an implementation objective." },
      { question: "Can SaaS and service companies use the same playbook?", answer: "Yes, the sequence is shared: scope, baseline, access, evidence, references, and review. The underlying buying questions differ, so SaaS integration and migration evidence should not be substituted for a service company's scope and delivery responsibilities." }
    ]
  }
];

export const researchArticles = drafts.map(finishArticle);
