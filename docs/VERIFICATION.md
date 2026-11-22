# Aeoba verification

The automated production audit is summarized in [route-audit.json](route-audit.json). It starts an isolated server with temporary credentials and storage, validates native destinations and API behavior, then removes the test records.

## Automated checks

- Lint, Next route type generation, TypeScript, and production build.
- Eleven regression tests covering route registration, identity/schema consistency, pipeline calculations, CSV formula protection, public-network URL policy, HTML analysis, request validation/persistence, session protection, and loopback/proxy origin handling.
- Every registered public page, menu destination, private route behavior, onboarding plan query, local alias, and linked section.
- JavaScript, stylesheet, favicon, and font availability.
- Saved report requests, invalid form rejection, cross-origin rejection, private-address scan rejection, authenticated portal access, tampered-session rejection, and logout.
- Source/configuration/documentation/text-asset brand audit. Dependencies, generated build files, Git history, and private runtime records are excluded.

## Manual checks

- Inspected the 1280px desktop header and its preserved navigation order.
- Opened Resources and confirmed its solid surface, readable contents, border, and shadow over the hero.
- Navigated from the dropdown to the local ROI calculator.
- Changed the average deal value from $10,000 to $20,000: the interface updated illustrative pipeline to $20,000, revenue to $4,000, and revenue less program fee to $2,403.
- Called the local readiness endpoint against a public test website with network access enabled. It returned HTTP 200, the actual page title, fetch time, and seven technical findings. This test did not submit an enquiry or send an email.

The optional public-fetch step in the isolated production audit is skipped unless `AEOBA_AUDIT_PUBLIC_URL` is set; the live public fetch described above was verified separately on the development server.

## Production setup

Set operator credentials and a persistent data directory using [the environment example](../.env.example). The portal is an operator workspace, with a separate labelled public demo; it is not a multi-tenant identity service. Email follow-up and service agreements remain operator actions. The website does not collect payments. Booking remains on the native `/book-call` route through an embedded scheduling provider.
