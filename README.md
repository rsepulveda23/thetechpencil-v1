# TheTechPencil (v3)

Evidence-first content + membership site built with Next.js, Tailwind, Supabase, Stripe, Resend, and Plausible.

## Milestones Status
- M0: Skeleton, Auth, Gate — Implemented (magic-link auth, hard registration wall, a11y basics)
- M1: Articles + Comments — Implemented (create via SQL/DB or admin in future)
- M2: Paywall + Subscriptions — Stubs (checkout/webhook routes present; requires Stripe config)
- M3: Research Sales — Stubs (report checkout + purchase write; signed downloads pending)
- M4: Newsletter/Analytics — Stubs (Plausible hook in layout pending; Resend integration pending)

## Repo Layout
- `app/` — App Router pages, APIs, sitemap/robots
- `components/` — UI components (header, footer, etc.)
- `lib/` — Supabase, auth, Stripe utilities
- `supabase/` — SQL migrations and RLS policies
- `scripts/` — Ops scripts (promote admin)
- `public/` — Static assets

## Environment Variables
Copy `.env.example` to `.env.local` and fill in:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only)
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SITE_URL` (e.g., `http://localhost:3000`)
- `RESEND_API_KEY`
- `PLAUSIBLE_DOMAIN` (e.g., `localhost` or domain)
- `REGISTRATION_GATE=hard`

## Setup
1. `pnpm i` (or `npm i`)
2. Create Supabase project; set Auth > URL for redirect to `${NEXT_PUBLIC_SITE_URL}/account`.
3. Apply SQL: run contents of `supabase/migrations/0001_init.sql` in SQL editor.
4. Buckets: create `reports-private` (private) and `public` (public) buckets.
5. Auth: enable email magic links.
6. Stripe: create prices and set `STRIPE_SECRET_KEY`. Update `lib/stripe.ts` price IDs.
7. Webhook: add endpoint `${NEXT_PUBLIC_SITE_URL}/api/stripe/webhook` with events: `checkout.session.completed`, `customer.subscription.created|updated|deleted`.
8. `npm run dev` and visit `/`.

## Registration Gate
- Hard registration: unauthenticated users see article preview (headline, subhead, first paragraph) and cannot comment.
- Premium paywall: premium articles require membership (subscription); stubs ready pending Stripe webhook setup.

## Admin
- Promote an email to admin:
  `SUPABASE_SERVICE_ROLE_KEY=... NEXT_PUBLIC_SUPABASE_URL=... ts-node scripts/promote-admin.ts you@example.com`
- Admin shell at `/admin` (role-gated) with links to CMS sections.

## Owner Runbook
- Setup: follow steps under Setup above.
- Promote Admin: use `scripts/promote-admin.ts`.
- First Article: insert via SQL or future admin UI:
  `insert into article (slug,title,subhead,body_md,access,published_at) values ('hello-world','Hello','Kickoff','First paragraph.\n\nMore body...', 'free', now());`
- First Report: insert via SQL, upload PDF to `reports-private`, set `file_path` to storage path.
- Go-live Stripe: set product/prices, update price IDs, add webhook secret.
- Deploy to Lovable: link repo; set env vars; configure domain.
- Backup/Restore: use Supabase PITR or `pg_dump`/`pg_restore`; ensure storage exported.
- Data Export/Delete: profiles/comments by user ID via SQL; respect privacy law.
- Incident Checklist:
  - Revoke leaked keys; rotate Supabase anon/service role.
  - Disable Stripe webhooks if compromised.
  - Audit RLS policies and logs.
  - Post-mortem with remediation timeline.

## Security & Privacy
- RLS on every table; service role is server-only.
- Basic security headers via `middleware.ts`.
- Downloads for reports must use signed URLs + ownership check (pending in M3 completion).

## Accessibility & SEO
- Skip-to-content link; focusable header; sane tab order.
- Sitemap and robots included.
- Add JSON-LD and canonical tags in article pages (pending polish).

## Assumptions
- Using Supabase Auth magic links; no passwords.
- Newsletter managed in-house list later; Resend used for transactional and campaigns.
- Pricing: USD; placeholder price IDs until owner updates.
- Reports stored in `reports-private` bucket; served via signed URLs with short TTL (to be implemented).
- Minimalistic UI without full shadcn scaffolding to meet performance budgets.

## References
- Next.js App Router docs: https://nextjs.org/docs/app — retrieved 2025-08-31
- Supabase RLS & Auth: https://supabase.com/docs — retrieved 2025-08-31
- Stripe Checkout/Webhooks: https://stripe.com/docs — retrieved 2025-08-31

