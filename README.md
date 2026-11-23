# Aeoba

Aeoba is an AEO, GEO, and SEO agency, operating from **Milan, Italy** and **Sliema, Malta**. Contact: **info@aeoba.com**.

Next.js 16 App Router, React 19, TypeScript, Tailwind v4, and local Geist fonts. The header keeps its original desktop and mobile layout. All navigation, calls to action, resources, and onboarding destinations are native routes.

## Run

```sh
npm install
npm run dev
```

Open `http://localhost:3000`. On Windows with PowerShell script restrictions, use `npm.cmd` for these commands.

## Verify

```sh
npm run test
npm run check
npm run audit:brand
npm run audit:routes
```

The route audit starts an isolated production server on port 3011 with temporary credentials and data. It checks every registered page, menu target, internal section link, alias, metadata, schema, request persistence, and portal security. Test data is removed when it finishes. Override `AEOBA_AUDIT_PORT` if that port is occupied. The last successful summary is written to `docs/route-audit.json`.

## Content and navigation

- `src/config/site.ts`: identity, contact, locations, metadata, guarantee, JSON-LD, and the single Cal event link.
- `src/config/navigation.ts`: every header item, in its existing order and grouping.
- `src/config/routes.ts`: explicit public and private route inventory.
- `src/config/aliases.ts`: native redirects for earlier relative paths.
- `src/config/plans.ts`: program pricing and deliverables.
- `src/content/catalog.ts`: platform, service, and industry content.
- `src/content/resources.ts`: original articles, glossary, guide, and illustrative implementation studies.
- `src/components/aeoba/`: shared page sections and styles.
- `src/components/interactive/`: native planners, calculators, observation logs, forms, and portal UI.

Dynamic category routes use finite content catalogs, static parameters, and explicit unknown-page handling. Unknown slugs return 404. Page-specific canonical URLs and metadata are generated from their actual local paths.

## Booking

Every booking CTA opens `/book-call`. Only that page loads the scheduling provider, embedded for the Aeoba event configured in `site.ts`. No booking CTA redirects off-site. If the calendar cannot load, the page provides a native contact-request route.

## Requests and portal

Report, contact, collaboration, access, and onboarding forms validate and persist submissions through `/api/requests`. Local records are stored in `.data/requests.jsonl`, which is excluded from Git. Success is returned only after the write succeeds. No automated email or payment is claimed or attempted.

Copy `.env.example` to `.env.local` and set the operator credentials to enable `/login` → `/portal`:

- `AEOBA_PORTAL_EMAIL`: defaults to the contact email in `site.ts`.
- `AEOBA_PORTAL_PASSWORD`: at least 16 characters.
- `AEOBA_SESSION_SECRET`: at least 32 characters; use a separate random secret.
- `AEOBA_DATA_DIR`: a persistent, access-controlled directory for production requests.

Private portal access is an operator account. It shows submitted enquiries; it is not a multi-tenant client authentication service. The separate `/portal/demo` route is labelled and contains fictional data only. Access enquiries are saved for the operator to review. Sessions use signed, expiring HTTP-only cookies; login is rate-limited and unsafe cross-origin form requests are rejected.

For production, deploy on a Node host with a persistent mounted data directory, or replace `src/server/requests.ts` with your durable database adapter. An ephemeral serverless filesystem is not durable storage. Do not publish until the required production storage and operator secrets are configured. In-memory rate limits are per process; shared deployments should enforce rate limits at their ingress.

## Tool behavior

- Citation tracking uses actual observations entered by the visitor. Nothing queries AI engines automatically. Save explicitly to local storage, restore on demand, or export CSV.
- The ROI calculator separates assumed prompts, citation coverage, visits, opportunities, pipeline, revenue, and program cost. It is an illustrative model.
- The readiness checker fetches one public HTML page and reports real technical findings. It blocks private/reserved addresses, revalidates redirects, pins the resolved public IP, and limits time and response size. It does not verify engine citations.
- Briefs, schema drafts, prompt sets, and authority plans are generated locally and can be downloaded.
- The guide is interactive and downloadable. Audio notes use browser text-to-speech with full readable transcripts.
- Implementation studies are clearly labelled demonstrations with no invented client results.

Third-party libraries and font licensing remain subject to their original licenses.
