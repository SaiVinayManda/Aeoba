# Aeoba verification

The automated production audit is summarized in [route-audit.json](route-audit.json). It starts an isolated server with temporary credentials and storage, validates native destinations and API behavior, then removes the test records.

## Automated checks

- Lint, Next route type generation, TypeScript, and production build.
- Fourteen regression tests covering article structure and internal links, article metadata and FAQ schema, route registration, agency identity/schema consistency, pipeline calculations, CSV formula protection, public-network URL policy, HTML analysis, request validation/persistence, session protection, and loopback/proxy origin handling.
- Every registered public page, menu destination, private route behavior, onboarding plan query, local alias, and linked section.
- JavaScript, stylesheet, favicon, and font availability.
- Saved report requests, invalid form rejection, cross-origin rejection, private-address scan rejection, authenticated portal access, tampered-session rejection, and logout.
- Source/configuration/documentation/text-asset brand audit, including the environment example. Dependencies, generated build files, temporary research artifacts, Git history, and private runtime records are excluded.

## Manual checks

- Inspected the 1280px desktop header and its preserved navigation order.
- Opened Resources and confirmed its solid surface, readable contents, border, and shadow over the hero.
- Navigated from the dropdown to the local ROI calculator.
- Changed the average deal value from $10,000 to $20,000: the interface updated illustrative pipeline to $20,000, revenue to $4,000, and revenue less program fee to $2,403.
- Called the local readiness endpoint against a public test website with network access enabled. It returned HTTP 200, the actual page title, fetch time, and seven technical findings. This test did not submit an enquiry or send an email.

The optional public-fetch step in the isolated production audit is skipped unless `AEOBA_AUDIT_PUBLIC_URL` is set; the live public fetch described above was verified separately on the development server.

## Agency identity and blog update · 23 November 2026

- Removed personal agency identity and callout sections; organization JSON-LD uses the agency brand, Milan and Sliema, and `info@aeoba.com`.
- Added seven full-length AEO/GEO research articles and updated all eleven blog posts with Aeoba Research authorship, hooks, FAQs, internal service/report links, and article metadata/JSON-LD. Retained the four existing audio field notes independently of the blog expansion.
- Verified all eleven pre-rendered article pages against their visible FAQs and organization authorship. The production route audit passed 75 page checks, 232 internal links/anchors, 24 aliases, and 18 assets.
- Inspected the custom floating strategy-call CTA on desktop and at a 390px mobile viewport. Confirmed its Cal.com modal loads the existing `manasflow/aeoba` calendar. No booking was submitted.
- Checked keyword filtering, article headings, hooks, bylines, internal links, and the mobile comparison-table scroll container. Moved the scroll-to-top control above the floating CTA to avoid overlap.
- Confirmed the header navigation component, navigation configuration, and header/palette stylesheet have no diff. Other page changes are limited to the requested agency identity, contact details, and callout removals.
- Lint passed with one existing unused-import warning in the untouched navigation file. Type generation, TypeScript, the production build, fourteen tests, the route audit, and the brand audit passed.

## Production setup

Set operator credentials and a persistent data directory using [the environment example](../.env.example). The portal is an operator workspace, with a separate labelled public demo; it is not a multi-tenant identity service. Email follow-up and service agreements remain operator actions. The website does not collect payments. Booking remains on the native `/book-call` route through an embedded scheduling provider.
