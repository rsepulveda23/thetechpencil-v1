export type DemoArticle = {
  id: string
  slug: string
  title: string
  subhead?: string
  body_md: string
  hero_url?: string
  access: 'free' | 'premium'
  published_at: string
}

export type DemoReport = {
  id: string
  slug: string
  title: string
  summary?: string
  price_cents: number
  published_at: string
}

export const demoArticles: DemoArticle[] = [
  {
    id: 'a1',
    slug: 'welcome-to-thetechpencil',
    title: 'Welcome to TheTechPencil',
    subhead: 'What “evidence‑first” means and how we publish',
    body_md: `We focus on first‑principles analysis with transparent sources, runnable math, and reproducible charts.\n\nIn practice, each article links to source docs and datasets. We prioritize signal over takes.\n\nHighlights:\n\n- Clear problem statements and assumptions\n- Links to papers, filings, and docs\n- Lightweight models you can audit\n\nEnjoy the journey — and hold us accountable.`,
    hero_url: '/sample/hero-1.svg',
    access: 'free',
    published_at: new Date().toISOString(),
  },
  {
    id: 'a2',
    slug: 'ai-inference-costs-2025',
    title: 'AI Inference Costs in 2025',
    subhead: 'Where the dollars go across hardware, energy, and ops',
    body_md: `Serving modern LLMs blends hardware amortization, energy, utilization, and SRE time.\n\nWe break down a representative stack and provide a simple model.\n\n## TL;DR\n- Utilization dominates small deployments\n- Energy pricing and cooling matter more than you think\n- Model choice shifts memory vs. compute\n\n> Methodology: public filings, vendor papers, and our test rigs.`,
    hero_url: '/sample/hero-2.svg',
    access: 'premium',
    published_at: new Date().toISOString(),
  },
  {
    id: 'a3',
    slug: 'mobile-metrics-that-matter',
    title: 'Mobile Metrics That Matter',
    subhead: 'LCP, INP, CLS — and how to actually improve them',
    body_md: `Core Web Vitals correlate with real retention.\n\n- LCP: lazy‑load non‑critical, preconnect origins, compress images.\n- INP: avoid long tasks, defer third‑party JS.\n- CLS: reserve space, avoid late font swaps.\n\nWe include a checklist you can ship today.`,
    hero_url: '/sample/hero-3.svg',
    access: 'free',
    published_at: new Date().toISOString(),
  },
]

export const demoReports: DemoReport[] = [
  {
    id: 'r1',
    slug: '2025-cloud-unit-economics',
    title: '2025 Cloud Unit Economics',
    summary: 'A 25‑page teardown of infra cost curves and the margin stack.',
    price_cents: 2900,
    published_at: new Date().toISOString(),
  },
]
