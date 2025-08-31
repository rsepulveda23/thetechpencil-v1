-- Demo seed content
insert into article (slug, title, subhead, body_md, hero_url, access, published_at)
values
 ('welcome-to-thetechpencil','Welcome to TheTechPencil','What evidence-first means','We focus on first‑principles analysis...','/sample/hero-1.svg','free', now()),
 ('ai-inference-costs-2025','AI Inference Costs in 2025','Where the dollars go','Serving modern LLMs blends hardware amortization...','/sample/hero-2.svg','premium', now()),
 ('mobile-metrics-that-matter','Mobile Metrics That Matter','LCP, INP, CLS','Core Web Vitals correlate with real retention...','/sample/hero-3.svg','free', now());

insert into report (slug, title, summary, file_path, price_cents, published_at)
values ('2025-cloud-unit-economics','2025 Cloud Unit Economics','A 25‑page teardown','reports-private/demo.pdf', 2900, now());

