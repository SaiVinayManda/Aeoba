# Aeoba search readiness

The source implements search identity and crawler-facing metadata for `https://aeoba.com`. Deployment and search-engine recrawling are still required before these changes can appear in live search results. Google selects site names automatically; `WebSite` structured data and consistent naming express the preferred name rather than forcing a particular result. [Google site-name guidance](https://developers.google.com/search/docs/appearance/site-names).

## Generated assets

Run `npm run generate:seo` to regenerate the search badge, PNG icons, multi-frame ICO, social card, manifest, Microsoft tile configuration, and LLM references. `npm run build` runs this automatically through `prebuild`.

The search badge uses the supplied 320 × 320 woven-A geometry, a rounded `#09090D` background, white strokes, and the indigo cross-weave. The existing header mark and navigation are unchanged. `sharp` is an explicit build dependency; the social card uses the checked-in Geist font.

- `/favicon.ico`: embedded 48, 96, and 144 pixel PNG frames.
- `/icon-48.png`, `/icon-96.png`, `/icon-144.png`, `/icon-192.png`, `/icon-512.png`.
- `/apple-touch-icon.png`: 180 × 180.
- `/logo.png`: 512 × 512 Organization logo, with `/logo.svg` as its vector counterpart.
- `/og-image.png`: 1200 × 630 social-preview image.
- `/manifest.webmanifest` and `/browserconfig.xml`.

## Metadata and structured data

The root layout declares application name, favicon alternatives, Apple icon, manifest, social previews, Microsoft tile metadata, `WebSite`, and the agency `Organization` / `ProfessionalService` entity. The agency logo is an `ImageObject`; locations remain Milan, Italy and Sliema, Malta, with `info@aeoba.com` as the contact email.

Every registered page has a self-referencing canonical, unique title and description, and a route-specific breadcrumb in its initial HTML. Query variants retain their base-page canonical. Private login, portal, and onboarding routes retain their noindex rules and are excluded from the sitemap.

Homepage, pricing, service, and blog FAQ JSON-LD matches visible answers. Blog posts use `BlogPosting`; the complete field guide uses `Article`. Both identify Aeoba as organization author and publisher and include the raster publisher logo.

Service and blog pages include direct 40–60 word answer blocks below question headings. Sixteen individual glossary pages provide canonical definitions, semantic definition lists, and contextual links. All seven guide chapters are available in readable server-rendered HTML alongside the original chapter navigator. Existing pages and research article bodies are retained.

## Crawler and LLM references

`robots.ts` permits standard search and the requested AI agents to retrieve public pages, images, LLM files, and `/_next/static/`, while retaining exclusions for APIs and private account routes. Hosting/CDN rules must also permit legitimate crawler requests; repository robots rules cannot override a host firewall.

The sitemap is derived from the content catalog and includes 83 public URLs, with editorial modification dates and per-category priorities. Update `src/config/content-dates.ts` when shared public content materially changes, and each article's `modifiedAt` when that article changes. Dates are not fabricated on every request.

`llms.txt` is the compact Markdown entity and canonical-URL index; `llms-full.txt` adds full service explanations, all eleven articles, guide chapters, and glossary definitions. These are generated from the site content and plans. The LLM index follows the published proposal; it does not replace robots.txt or establish a search-ranking guarantee. [LLMs.txt proposal](https://llmstxt.org/).

Public pricing and LLM references consistently describe Growth at $1,597/month with 8 answer pages, Scale at $2,997/month with 15 answer pages, and Enterprise Custom. The ROI calculator's Enterprise amount remains explicitly illustrative. Mentions are subject to publication/community approval and disclosure; the original guarantee conditions remain available.

## Release and recrawl

1. Deploy the built application and static public assets to the canonical HTTPS host.
2. Confirm that the homepage source exposes the Aeoba site-name schema, favicon links, canonical, social image, and LLM alternate link. Fetch the favicon and logo without authentication and confirm successful image responses.
3. Inspect the homepage and representative service, glossary, guide, and blog URLs in Google Search Console and Bing Webmaster Tools. Submit `https://aeoba.com/sitemap.xml` and request supported recrawls of changed URLs.
4. Keep the favicon URL stable and allow the engines time to refetch assets and reconsider presentation. Favicon inclusion depends on search-engine processing and guidelines. [Google favicon guidance](https://developers.google.com/search/docs/appearance/favicon-in-search), [Bing structured-data guidance](https://www.bing.com/webmasters/help/marking-up-your-site-with-structured-data-3a93e731).

## Verification

- Lint, route type generation, TypeScript, and production build passed. The untouched navigation component retains one existing unused-import warning.
- Nineteen tests passed, including icon sizes and ICO frames, sitemap coverage, crawler policies, answer lengths, editorial metadata, and LLM links.
- The production audit passed 91 page checks, 86 unique canonical page titles/descriptions, 264 internal links/anchors, 24 aliases, 19 application assets, and 16 search/discovery assets. It checks initial HTML, so breadcrumbs and metadata do not depend on a later browser interaction.
- The 192px badge and social card were visually inspected. Current browser-preview automation was unavailable because its tool requires Node >=22.22 while the local runtime is 22.19; no browser-only verification is claimed for this update.
- Header/navigation configuration, shared palette stylesheets, and existing header-logo component have no diff.

See [route-audit.json](route-audit.json) for the recorded production check results.
