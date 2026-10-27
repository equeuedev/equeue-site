# E-Queue site: Home page implementation guide

Checked against a fresh Next.js 16.4.3 + React 19 + Tailwind 4 project with the same structure as yours. `npm run lint` passes and `next build` compiles with no type errors (fonts excluded, see Gotchas).

## 1. Before you paste anything

1. Open `package.json` and confirm `next` is 16.x and `tailwindcss` is `^4`. Your project has no `postcss.config.mjs`, which is normal here: Tailwind runs through `@tailwindcss/turbopack`, configured in `next.config.ts`. Don't add a postcss config or a `tailwind.config.js`.
2. Open `AGENTS.md`. It warns that this Next version differs from older docs. The guides are in `node_modules/next/dist/docs/`.
3. Your `next.config.ts` has `cacheComponents: true`. Don't call `new Date()`, `Math.random()` or read cookies/headers in server components without a Suspense boundary. The code below avoids all of these.

## 2. Add the files

Copy these into your project, keeping the paths. Files marked REPLACE overwrite the starter versions.

| Path | Action |
| --- | --- |
| `app/globals.css` | REPLACE: brand tokens, focus ring, reduced motion |
| `app/layout.tsx` | REPLACE: fonts, metadata, header, footer, skip link |
| `app/page.tsx` | REPLACE: composes the Home sections |
| `app/contact/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx` | NEW: placeholder pages so links don't 404 |
| `lib/site.ts` | NEW: site name, URL, email, nav and footer links |
| `components/ui/*` | NEW: Button, Container, SectionHeading, TokenChip, Icon, PlaceholderPage |
| `components/layout/*` | NEW: Header, MobileMenu, Footer |
| `components/mockups/*` | NEW: PhoneToken, TvDisplay, PosSlip |
| `components/home/*` | NEW: one file per Home section |

Then run `npm run dev` and open http://localhost:3000.

## 3. Section map (build and edit one at a time)

| Home section | File | Notes |
| --- | --- | --- |
| Header and mobile menu | `components/layout/Header.tsx`, `MobileMenu.tsx` | Text wordmark until you have the logo |
| Hero | `components/home/Hero.tsx` | Headline, subhead, two CTAs, phone mockup with lime token chip |
| Problem strip | `components/home/ProblemStrip.tsx` | Three cards |
| How it works (`#how-it-works`) | `components/home/HowItWorks.tsx` | Three numbered steps |
| For patients and For clinics (`#for-patients`, `#for-clinics`) | `components/home/Benefits.tsx` | Two cards side by side |
| Waiting room | `components/home/WaitingRoom.tsx` | TV display and POS slip mockups |
| Industries (`#industries`) | `components/home/IndustriesStrip.tsx` | Four cards |
| Trust | `components/home/Trust.tsx` | Privacy points |
| Final CTA (`#pilot`) | `components/home/FinalCta.tsx` | Aubergine band, lime button |
| Footer | `components/layout/Footer.tsx` | Charcoal, three columns |

Suggested order: globals.css, layout, ui, Header/Footer, then Hero, then the rest top to bottom. Check each in the browser at 375px, 768px and 1280px before moving on.

## 4. Things to change now

- `lib/site.ts`: set the real email. Add `NEXT_PUBLIC_SITE_URL` in Vercel project settings once you have the domain.
- Mockup text (token A-042, Dr. Ali, Example Clinic, "Lab closes at 4 PM today") is illustrative. Keep it clearly fictional.
- The Industries section's button goes to `/contact` for now. When you build the Industries page, point it to `/industries`.
- Nav links point to Home anchors. When each page exists, change the hrefs in `lib/site.ts` only.
- Footer year is hardcoded as 2026 because `cacheComponents` blocks `new Date()` in server components.

## 5. Gotchas

- Google Fonts (Manrope, Inter) need internet at build time. If your build runs offline, self-host with `next/font/local`.
- Brand contrast rules are baked into the components: white on aubergine, dark plum on lime. Never add `text-white` on a `bg-lime` element.
- Grey-Purple (`text-grey-purple`) is for 16px+ text on ivory or white. Check contrast if you use it smaller.
- Mockups are `aria-hidden`, so screen readers skip them. The surrounding copy carries the meaning.

## 6. Next steps (in build order)

1. Contact page with the real form: Server Action, validation, Cloudflare Turnstile, email delivery.
2. For Clinics, Industries, For Patients, How It Works, Features pages, reusing the same components.
3. Appointments, Why E-Queue, Pilot Program, About, FAQ (accordion).
4. SEO: per-page metadata, JSON-LD, `app/sitemap.ts`, `app/robots.ts`, OG image.
5. Analytics events and the accessibility, performance and cross-browser QA pass.
