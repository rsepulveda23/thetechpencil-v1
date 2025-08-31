-- Enable needed extensions
create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

-- profiles
create table if not exists profile (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  role text not null default 'member' check (role in ('member','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists profile_email_idx on profile using gin (email gin_trgm_ops);

-- articles
create table if not exists article (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subhead text,
  body_md text not null,
  hero_url text,
  access text not null default 'free' check (access in ('free','premium')),
  sources jsonb not null default '[]'::jsonb,
  published_at timestamptz,
  scheduled_at timestamptz,
  created_by uuid references profile(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists article_slug_idx on article(slug);
create index if not exists article_published_idx on article(published_at);

-- comments
create table if not exists comment (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references article(id) on delete cascade,
  author_id uuid not null references profile(id) on delete cascade,
  body text not null check (length(body) <= 2000),
  is_hidden boolean not null default false,
  spam_flag boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists comment_article_idx on comment(article_id);

-- reports (paid PDFs)
create table if not exists report (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  file_path text not null, -- storage path in private bucket
  price_cents integer not null check (price_cents >= 0),
  sources jsonb not null default '[]'::jsonb,
  published_at timestamptz,
  created_by uuid references profile(id) on delete set null,
  created_at timestamptz not null default now()
);

-- purchases (one-off report purchases)
create table if not exists purchase (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references profile(id) on delete cascade,
  report_id uuid not null references report(id) on delete cascade,
  stripe_payment_intent text,
  created_at timestamptz not null default now(),
  unique(buyer_id, report_id)
);

-- subscriptions (Stripe)
create table if not exists subscription (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profile(id) on delete cascade,
  stripe_customer_id text not null,
  stripe_subscription_id text,
  status text not null default 'inactive',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  unique(user_id)
);

-- Triggers to keep updated_at current
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end; $$ language plpgsql;

drop trigger if exists set_article_updated_at on article;
create trigger set_article_updated_at before update on article
for each row execute procedure set_updated_at();

drop trigger if exists set_profile_updated_at on profile;
create trigger set_profile_updated_at before update on profile
for each row execute procedure set_updated_at();

-- RLS
alter table profile enable row level security;
alter table article enable row level security;
alter table comment enable row level security;
alter table report enable row level security;
alter table purchase enable row level security;
alter table subscription enable row level security;

-- Profile policies: user can read own and admins can read all
create policy "read own profile" on profile for select using (auth.uid() = id);
create policy "update own profile" on profile for update using (auth.uid() = id);
create policy "admin all profiles" on profile for all using (exists(select 1 from profile p where p.id = auth.uid() and p.role = 'admin'));
create policy "insert self profile" on profile for insert with check (auth.uid() = id);

-- Article policies: public can read published; admins can manage; authors can manage own
create policy "public read published articles" on article for select using (published_at is not null and published_at <= now());
create policy "admin manage articles" on article for all using (exists(select 1 from profile p where p.id = auth.uid() and p.role='admin'));
create policy "author manage own" on article for all using (created_by = auth.uid());

-- Comment policies: public read non-hidden; author can manage own; admins manage all
create policy "public read comments" on comment for select using (not is_hidden);
create policy "author manage own comments" on comment for all using (author_id = auth.uid());
create policy "admin manage comments" on comment for all using (exists(select 1 from profile p where p.id = auth.uid() and p.role='admin'));

-- Report policies: public read published metadata; file is protected via signed URLs
create policy "public read published reports" on report for select using (published_at is not null and published_at <= now());
create policy "admin manage reports" on report for all using (exists(select 1 from profile p where p.id = auth.uid() and p.role='admin'));
create policy "author manage own report" on report for all using (created_by = auth.uid());

-- Purchases: user can read own; admins read all; insert via webhook/server
create policy "buyer read own purchases" on purchase for select using (buyer_id = auth.uid());
create policy "admin manage purchases" on purchase for all using (exists(select 1 from profile p where p.id = auth.uid() and p.role='admin'));

-- Subscriptions: user read own; admins manage
create policy "user read own subscription" on subscription for select using (user_id = auth.uid());
create policy "admin manage subscriptions" on subscription for all using (exists(select 1 from profile p where p.id = auth.uid() and p.role='admin'));

-- Storage buckets (to be created in Supabase dashboard or SQL)
-- Private bucket for reports files named 'reports-private'. Public images bucket 'public'.

