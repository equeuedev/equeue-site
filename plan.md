# Implementation Plan: E-Queue Marketing Website

**Date**: 2026-10-27 | **Spec**: `C:\Users\Dell\Downloads\copilot-pack\docs\IMPLEMENTATION.md`, `COPY.md`, and `BRAND-UPDATE.md`

## Summary

Complete the E-Queue sales-led B2B marketing website without implementing the underlying queue product. The site will use approved copy, typed content modules, HTML/CSS product mockups, small client components for the documented interactions, a validated contact Server Action, route-level metadata, structured data, cookie-less Plausible analytics, and a final responsive/accessibility/performance QA pass.

The implementation follows the locked build order in the specification. It preserves server components by default, adds client boundaries only for documented interactions, keeps all claims within the pilot/goal guardrails, and uses the existing Tailwind 4 token system rather than inline colours.

## Technical Context

**Language/Version**: TypeScript strict, React 19, Next.js 16.4.3 App Router

**Primary Dependencies**: Existing Next/React/Tailwind 4 stack; add `zod` for server/client form validation and `resend` for contact delivery. Do not add a UI kit or icon library. Use the existing `components/ui/Icon.tsx`.

**Storage**: None. Content is typed source code in `lib/`. Contact submissions are validated and sent through Resend; they are not persisted or logged.

**Testing**: `npm run lint`, `npm run build`, focused browser checks where available, and manual keyboard/reduced-motion/responsive checks. Final QA covers Lighthouse targets and the acceptance criteria in the specification.

**Target Platform**: Static/server-rendered marketing pages hosted by Next.js, with progressive enhancement for interactions and contact submission.

**Performance Goals**: LCP under 2.5 seconds on mid-range Android over 4G; under 100KB page JavaScript; no avoidable layout shift; no render-blocking analytics request; no horizontal scroll at 320px.

**Constraints**:

- B2B institute owners/managers only; no patient-facing route.
- Primary CTA is `Contact us` linking to `/contact`; no pricing page or prices.
- Use approved copy verbatim and preserve all claims guardrails.
- English-only content, with logical CSS properties for future RTL support.
- Boldonse is limited to hero H1 text; Manrope remains for other headings and Inter for body/UI.
- `cacheComponents: true` means no dynamic date/randomness/cookies/headers in server components outside the documented boundaries.
- Environment variables are documented in `.env.example`; real credentials never enter the repository.
- Production Turnstile verification is required; local development may bypass only through an explicit, documented configuration path.

## Constitution Check

*GATE: Pass, subject to re-check after implementation.*

| Principle | Status | Evidence |
|---|---|---|
| Preserve approved product and claims boundaries | PASS | Copy and route tasks use `docs/COPY.md`; pilot goals are isolated to `/pilot`; no invented customers, results, rankings, or competitor names. |
| Prefer progressive enhancement | PASS | Server-rendered content remains readable without JavaScript; D1-D6 are isolated client enhancements with static fallbacks. |
| Accessibility is part of the feature | PASS | Semantic landmarks, keyboard-operable tabs/accordion, visible focus, live regions, reduced motion, and mockup labelling are planned. |
| Use the existing design system | PASS | Components consume `app/globals.css` tokens and existing UI primitives; no inline hex values or new UI kit. |
| Minimize data collection and exposure | PASS | Contact data is not persisted/logged; public displays show tokens/counters only; analytics is cookie-less and opt-in by environment variable. |
| Validate before completion | PASS | Every phase has acceptance checks; final phase runs lint/build and responsive/accessibility/performance QA. |

## Applied Guidelines

No migration-specific guideline applies. The plan follows the repository conventions in `IMPLEMENTATION.md` and the Next.js 16/React 19 constraints in `AGENTS.md`. Before implementation, the developer must consult the installed Next.js 16.4 documentation relevant to metadata, Server Actions, route handlers/static params, `next/script`, and generated image routes; the repository currently does not expose a `node_modules/next/dist/docs/` tree, so this is a validation prerequisite rather than a source artifact.

## Implementation Steps

### Phase 1: Setup

### Step 1.1: [Cross-cutting] Establish approved content and shared foundations
- **Requirements**: REQ-001, REQ-002, REQ-003
- **Design inputs**: `docs/IMPLEMENTATION.md` sections 2, 4, 6, 8, 11; `docs/COPY.md`; `docs/BRAND-UPDATE.md`; existing `app/globals.css`, `app/layout.tsx`, `lib/site.ts`.
- **Description**: Add Boldonse through `next/font/google`, expose the `font-hero` Tailwind token, update the home hero H1 only, confirm the existing colour/typography tokens, update shared navigation/footer links, and rename the home benefits card to “What your patients get”. Add the permitted dependencies and environment-variable documentation without adding product functionality.

### Phase 1 Tasks

- [ ] T001 [Cross-cutting] [Plan:1.1] Add Boldonse font loading and the `--font-hero` token in `app/layout.tsx` and `app/globals.css`, then apply `font-hero` only to the Home hero H1 in `components/home/Hero.tsx`.
- [ ] T002 [P] [Cross-cutting] [Plan:1.1] Update `lib/site.ts`, `components/layout/Header.tsx`, `components/layout/MobileMenu.tsx`, and `components/layout/Footer.tsx` to use the locked navigation and footer route links.
- [ ] T003 [P] [Cross-cutting] [Plan:1.1] Rename the home patient-benefits card in `components/home/Benefits.tsx` and document the allowed contact/Turnstile/Plausible variables in `.env.example`.
- [ ] T004 [Cross-cutting] [Plan:1.1] Install only `zod` and `resend`, update `package.json` and `package-lock.json`, and verify `npm run lint` and `npm run build`.

### Phase 2: Foundational interactions

### Step 2.1: [Cross-cutting] Add progressive-enhancement interaction primitives
- **Requirements**: REQ-004, REQ-005
- **Design inputs**: `IMPLEMENTATION.md` D1, D4, D5, section 10 accessibility/performance, and existing home/mockup components.
- **Description**: Build the live queue hero demonstration, reusable reveal hook, and mobile CTA. Keep static markup as the no-JavaScript and reduced-motion baseline; pause timers on hover/focus/hidden tabs; reserve mockup dimensions; hide the CTA while the footer is visible and never render it on `/contact`.

### Phase 2 Tasks

- [ ] T005 [Cross-cutting] [Plan:2.1] Create the client live queue demo in `components/home/LiveQueueDemo.tsx`, replacing the static `PhoneToken`/chip composition in `components/home/Hero.tsx` with synchronized token and people-ahead frames.
- [ ] T006 [Cross-cutting] [Plan:2.1] Create `hooks/useReveal.ts` and apply reveal attributes/classes to home section cards while preserving visible content when JavaScript or IntersectionObserver is unavailable.
- [ ] T007 [Cross-cutting] [Plan:2.1] Create the responsive sticky CTA component and footer-observer behavior in `components/layout/StickyCta.tsx`, wiring it through the root layout with `/contact` exclusion.
- [ ] T008 [Cross-cutting] [Plan:2.1] Add shared tab/mockup interaction accessibility patterns in `components/ui/` as needed, including reduced-motion handling, fixed mockup sizing, keyboard focus, and `aria-hidden` boundaries.

### Phase 3: Primary conversion and industry journeys

### Step 3.1: [US1] Contact conversion flow
- **Requirements**: REQ-006, REQ-013
- **Design inputs**: `IMPLEMENTATION.md` section 9 and section 10 analytics; Contact copy in `docs/COPY.md`; existing `app/contact/page.tsx`.
- **Description**: Replace the placeholder contact page with the approved form, typed Server Action, zod validation mirrored on the client, honeypot, production Turnstile verification, Resend delivery, typed success/error results, accessible announcements, and privacy link. Never log or persist personal data. Add analytics hooks for first focus and successful submit.

### Step 3.2: [US2] Industry-aware content
- **Requirements**: REQ-007, REQ-008
- **Design inputs**: `docs/COPY.md` Industries table and mockup labels; D2 requirements; existing `IndustriesStrip`.
- **Description**: Create typed `lib/industries.ts`, implement accessible industry tabs on Home and `/industries`, and generate static detail pages for the three supported slugs plus the `other` content entry. Unknown slugs use `notFound()`. Each page gets approved copy and route metadata.

### Phase 3 Tasks

- [ ] T009 [US1] [Plan:3.1] Create `app/contact/actions.ts` with typed form input/result types, zod server validation, honeypot rejection, production Turnstile verification, and Resend delivery using `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` without logging personal data.
- [ ] T010 [US1] [Plan:3.1] Build the client contact form in `components/contact/ContactForm.tsx` and update `app/contact/page.tsx` with all required fields, inline validation, consent link, idle/submitting/success/error states, live error announcements, and `contact_start`/`contact_submit` hooks.
- [ ] T011 [P] [US2] [Plan:3.2] Create typed industry content in `lib/industries.ts`, including clinics, dermatologists, salons, other, three highlights each, and fictional A-023 mockup labels.
- [ ] T012 [US2] [Plan:3.2] Implement the reusable accessible industry switcher in `components/industries/IndustrySwitcher.tsx` and replace the Home industry cards/section in `components/home/IndustriesStrip.tsx`.
- [ ] T013 [P] [US2] [Plan:3.2] Create `/industries` and `/industries/[slug]` pages with `generateStaticParams`, `notFound()` handling, per-page metadata, breadcrumbs, and Contact us CTAs.
- [ ] T014 [US1] [Plan:3.1] Run focused lint/build checks for the contact and industry routes and verify missing environment variables produce explicit, user-safe errors rather than success-shaped fallbacks.

### Phase 4: Core marketing pages

### Step 4.1: [US3] Explain the clinic workflow and product value
- **Requirements**: REQ-009, REQ-010, REQ-011
- **Design inputs**: `docs/COPY.md` For Clinics, How It Works, Features, Appointments, Why E-Queue, Pilot sections; D3/D6 requirements; existing UI primitives and mockups.
- **Description**: Add the major marketing routes with thin server pages and focused components. Features use typed content and accessible HTML/CSS mockups, including the optional local “Call next” counter demo. Claims-sensitive pages retain the pilot-only goals and category comparisons.

### Phase 4 Tasks

- [ ] T015 [P] [US3] [Plan:4.1] Create `/for-clinics` and `/how-it-works` pages with approved copy, Contact us CTAs, metadata, semantic sections, and breadcrumb JSON-LD.
- [ ] T016 [P] [US3] [Plan:4.1] Create typed feature content in `lib/features.ts` and reusable mockups in `components/mockups/FeatureMockup.tsx`.
- [ ] T017 [US3] [Plan:4.1] Build `/features` and `components/features/FeatureExplorer.tsx` with accessible Counter board, Waiting-room display, Printed slip, and Analytics tabs plus the optional local “Call next” interaction.
- [ ] T018 [P] [US3] [Plan:4.1] Build `/appointments`, `/why-e-queue`, and `/pilot` using approved copy, metadata, breadcrumbs, and explicit guardrails that keep the 80%/30% figures labelled as pilot goals only on `/pilot`.
- [ ] T019 [US3] [Plan:4.1] Verify all core pages use one H1, approved CTA wording, logical layout properties, existing tokens, and no unsupported product claims.

### Phase 5: Supporting trust and discoverability

### Step 5.1: [US4] Provide company, FAQ, SEO, and analytics surfaces
- **Requirements**: REQ-012, REQ-013, REQ-014
- **Design inputs**: `docs/COPY.md` About/FAQ/Contact copy; `IMPLEMENTATION.md` sections 8 and 10; site map and analytics event table.
- **Description**: Add About and FAQ content, typed FAQ data, one-open-at-a-time accordion, JSON-LD, route metadata, sitemap/robots/OG image, Organization/WebSite/SoftwareApplication/FAQPage/BreadcrumbList structured data, and conditional Plausible loading with the complete event vocabulary.

### Phase 5 Tasks

- [ ] T020 [P] [US4] [Plan:5.1] Create `/about` and `/faq`, typed `lib/faq.ts`, and `components/faq/FaqAccordion.tsx` with one-open-at-a-time keyboard behavior and `faq_open` tracking.
- [ ] T021 [P] [US4] [Plan:5.1] Create `components/seo/JsonLd.tsx` and route-specific structured data for Home, Features, FAQ, and inner pages without exposing invented organization details.
- [ ] T022 [P] [US4] [Plan:5.1] Add `app/sitemap.ts`, `app/robots.ts`, and `app/opengraph-image.tsx` using brand tokens, explicit route coverage, and a fictional token chip only.
- [ ] T023 [US4] [Plan:5.1] Create `lib/analytics.ts` and conditionally load Plausible with `next/script` only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set; wire `cta_click`, `industry_tab`, and `feature_tab` exactly once per user action.
- [ ] T024 [US4] [Plan:5.1] Add metadata to every public route with the approved title/description limits and the `%s | E-Queue` template.

### Phase 6: Polish and cross-cutting QA

### Step 6.1: [Cross-cutting] Validate marketing-site quality gates
- **Requirements**: REQ-001 through REQ-014
- **Design inputs**: all acceptance criteria and Definition of Done in `IMPLEMENTATION.md`.
- **Description**: Test responsive rendering, accessibility, reduced motion, no-JavaScript fallbacks, contrast, claims, route coverage, analytics gating, build health, and performance. Fix only issues introduced by this implementation and document any environment-dependent validation gap.

### Phase 6 Tasks

- [ ] T025 [Cross-cutting] [Plan:6.1] Run `npm run lint` and `npm run build`; resolve introduced TypeScript, ESLint, metadata, Server Action, and route-generation errors.
- [ ] T026 [P] [Cross-cutting] [Plan:6.1] Exercise every route at 320px, 375px, 768px, and 1280px, checking no horizontal scroll, stable mockup dimensions, CTA visibility, and readable fallbacks without JavaScript.
- [ ] T027 [P] [Cross-cutting] [Plan:6.1] Perform keyboard-only and screen-reader-oriented checks for navigation, mobile menu, tabs, accordion, form errors, live regions, skip link, focus rings, and 44px targets.
- [ ] T028 [P] [Cross-cutting] [Plan:6.1] Verify `prefers-reduced-motion`, hidden-tab/hover/focus pauses, Turnstile production gating, analytics absence when unset, and absence of personal data in logs.
- [ ] T029 [Cross-cutting] [Plan:6.1] Run Lighthouse/mobile checks and contrast verification; target accessibility 95+, performance 90+, 4.5:1 text contrast, and Home LCP under 2.5 seconds where the environment permits.
- [ ] T030 [Cross-cutting] [Plan:6.1] Perform a final claims/copy audit against `docs/COPY.md` and `IMPLEMENTATION.md`, then report any deployment-only prerequisites such as Resend, Turnstile, Plausible, and site URL configuration.

## Requirement Mapping

| REQ ID | Description | Plan Items | Implementation Evidence |
|---|---|---|---|
| REQ-001 | Apply the approved Boldonse/Manrope/Inter typography and token rules | 1.1 | `app/layout.tsx`, `app/globals.css`, `components/home/Hero.tsx` |
| REQ-002 | Use the locked B2B navigation, footer, and CTA routes | 1.1 | `lib/site.ts`, `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/home/Benefits.tsx` |
| REQ-003 | Preserve Next.js/Tailwind/runtime constraints and allowed dependencies | 1.1 | `package.json`, `package-lock.json`, `.env.example`, server/client boundaries |
| REQ-004 | Provide progressive-enhancement live queue animation | 2.1 | `components/home/LiveQueueDemo.tsx`, `components/home/Hero.tsx` |
| REQ-005 | Provide reveal behavior and mobile sticky CTA | 2.1 | `hooks/useReveal.ts`, `components/layout/StickyCta.tsx`, root layout |
| REQ-006 | Provide a secure, accessible contact conversion form | 3.1 | `app/contact/actions.ts`, `components/contact/ContactForm.tsx`, `app/contact/page.tsx` |
| REQ-007 | Provide typed industry content and Home switcher | 3.2 | `lib/industries.ts`, `components/industries/IndustrySwitcher.tsx` |
| REQ-008 | Provide industry overview/detail pages with static params and 404 handling | 3.2 | `app/industries/page.tsx`, `app/industries/[slug]/page.tsx` |
| REQ-009 | Provide clinic workflow and feature-explorer pages | 4.1 | `/for-clinics`, `/how-it-works`, `lib/features.ts`, `/features` |
| REQ-010 | Provide appointments, comparison, and pilot pages within claims guardrails | 4.1 | `/appointments`, `/why-e-queue`, `/pilot` |
| REQ-011 | Provide accessible HTML/CSS mockups and optional local counter demo | 4.1 | `components/mockups/FeatureMockup.tsx`, `components/features/FeatureExplorer.tsx` |
| REQ-012 | Provide About and FAQ content with accessible accordion | 5.1 | `/about`, `/faq`, `lib/faq.ts`, `components/faq/FaqAccordion.tsx` |
| REQ-013 | Provide conditional cookie-less analytics for every specified event | 3.1, 5.1 | `lib/analytics.ts`, layout script, CTA/industry/feature/contact/FAQ hooks |
| REQ-014 | Provide metadata, structured data, sitemap, robots, OG image, and final QA | 5.1, 6.1 | `components/seo/JsonLd.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, QA evidence |

## Project Structure

```text
app/
  appointments/page.tsx
  about/page.tsx
  contact/
    actions.ts
    page.tsx
  faq/page.tsx
  features/page.tsx
  for-clinics/page.tsx
  how-it-works/page.tsx
  industries/
    page.tsx
    [slug]/page.tsx
  opengraph-image.tsx
  pilot/page.tsx
  robots.ts
  sitemap.ts
  why-e-queue/page.tsx
components/
  contact/ContactForm.tsx
  faq/FaqAccordion.tsx
  features/FeatureExplorer.tsx
  home/LiveQueueDemo.tsx
  industries/IndustrySwitcher.tsx
  layout/StickyCta.tsx
  mockups/FeatureMockup.tsx
  seo/JsonLd.tsx
hooks/useReveal.ts
lib/
  analytics.ts
  faq.ts
  features.ts
  industries.ts
plan.md
checkpoints/
  spec-to-plan.yaml
  plan-to-tasks.yaml
```

## Testing Strategy

- **appType**: Server-rendered marketing HTML with progressive-enhancement client interactions and one server-backed contact form.
- **Critical user journeys**:
  1. A clinic owner reads Home, opens an industry/feature interaction, and reaches `/contact`.
  2. A visitor completes the contact form and receives the success state; invalid, honeypot, Turnstile, and delivery failures remain explicit and safe.
  3. A keyboard-only visitor navigates all primary routes, tabs, accordion, menu, and form controls.
  4. A reduced-motion or JavaScript-disabled visitor can read every page and use the core links/forms.
  5. A crawler can discover all routes and receives valid metadata, sitemap, robots, and structured data.
- **primaryValidationStack**: `npm run lint`, `npm run build`, browser/dev-server checks, Lighthouse, and manual accessibility checks.
- **fallbackMatrix**:
  - `browser-tier`: browser automation if available -> manual browser checks. Prerequisite: local Next dev/build server.
  - `delivery-tier`: Resend/Turnstile staging credentials -> explicit local bypass/mock configuration. Prerequisite: deployment secrets for live delivery.
- **Environment requirements**: Node/npm, internet access for Google Fonts and package installation, optional Resend/Turnstile/Plausible variables, and a browser for responsive/accessibility checks.
- **knownGaps**: Without deployment credentials, live email delivery, Turnstile verification, Plausible network loading, and production Lighthouse measurements cannot be fully proven; the build must still verify configuration gating and safe failure behavior.
- **Test data strategy**: Use only fictional mockup values (`A-023`, example services/counters); never submit real personal data during validation; use a test recipient and redact form payloads from output.
- **Acceptance criteria**: Every journey remains usable at required breakpoints, with keyboard and reduced motion; lint/build pass; claims and route/metadata checks pass; no personal data is logged.
- **Validation review expectations**: Confirm each REQ maps to implemented evidence, no route is missing from navigation/sitemap, no forbidden claim or hardcoded colour is introduced, and deployment-only prerequisites are clearly reported.

## Complexity Tracking

No constitution violations are planned. The additional content modules and client boundaries are required by the approved specification and are not generalized product architecture.
