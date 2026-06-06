-- ── VIDI26 Database Schema ──

-- Teams
create table if not exists teams (
  id           uuid primary key default gen_random_uuid(),
  team_number  int unique not null,
  name         text not null,
  slogan       text,
  color_hex    text,
  members      jsonb default '[]'::jsonb,
  cohort       text default 'Cohort-7-to-be',
  created_at   timestamptz default now()
);

-- Stations
create table if not exists stations (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  name_vi      text not null,
  name_en      text not null,
  description  text,
  day          int check (day in (1,2,3)),
  order_index  int
);

-- Challenges
create table if not exists challenges (
  id           uuid primary key default gen_random_uuid(),
  station_id   uuid references stations(id) on delete cascade,
  name         text not null,
  description  text,
  max_score    int default 100,
  weight       numeric default 1.0,
  active       boolean default true,
  starts_at    timestamptz,
  ends_at      timestamptz,
  created_at   timestamptz default now()
);

-- Scores (append-only audit log)
create table if not exists scores (
  id           uuid primary key default gen_random_uuid(),
  team_id      uuid references teams(id) on delete cascade,
  challenge_id uuid references challenges(id) on delete cascade,
  raw_score    numeric not null,
  notes        text,
  entered_by   uuid references auth.users(id),
  created_at   timestamptz default now()
);

-- Latest score per (team, challenge)
create or replace view latest_scores as
select distinct on (team_id, challenge_id)
  team_id, challenge_id, raw_score, notes, entered_by, created_at
from scores
order by team_id, challenge_id, created_at desc;

-- Leaderboard view with weighted totals
create or replace view leaderboard as
select
  t.id,
  t.team_number,
  t.name,
  t.color_hex,
  coalesce(sum(ls.raw_score * c.weight), 0)::numeric as total_score,
  count(ls.challenge_id) as challenges_scored,
  max(ls.created_at) as last_update
from teams t
left join latest_scores ls on ls.team_id = t.id
left join challenges c on c.id = ls.challenge_id and c.active = true
group by t.id, t.team_number, t.name, t.color_hex;

-- Announcements
create table if not exists announcements (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  body_md      text not null,
  cover_url    text,
  pinned       boolean default false,
  published    boolean default false,
  published_at timestamptz,
  created_at   timestamptz default now()
);

-- Gallery
create table if not exists gallery_items (
  id          uuid primary key default gen_random_uuid(),
  url         text not null,
  caption     text,
  day         int,
  station_id  uuid references stations(id),
  uploaded_at timestamptz default now()
);

-- Admin profiles
create table if not exists admin_profiles (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  role       text check (role in ('super_admin','scorer','editor')) default 'scorer',
  created_at timestamptz default now()
);

-- ── Row Level Security ──

alter table teams           enable row level security;
alter table stations        enable row level security;
alter table challenges      enable row level security;
alter table scores          enable row level security;
alter table announcements   enable row level security;
alter table gallery_items   enable row level security;
alter table admin_profiles  enable row level security;

-- Public read policies
create policy "teams_public_read"         on teams           for select using (true);
create policy "stations_public_read"      on stations        for select using (true);
create policy "challenges_public_read"    on challenges      for select using (true);
create policy "gallery_public_read"       on gallery_items   for select using (true);
create policy "announcements_public_read" on announcements   for select using (published = true);

-- Scores: insert only for admin_profiles users
create policy "scores_admin_insert" on scores
  for insert
  with check (
    auth.uid() is not null
    and exists (
      select 1 from admin_profiles
      where user_id = auth.uid()
      and role in ('scorer', 'super_admin')
    )
  );

create policy "scores_admin_read" on scores
  for select
  using (
    exists (
      select 1 from admin_profiles
      where user_id = auth.uid()
    )
  );

-- Admin profiles: read own
create policy "admin_profiles_read_own" on admin_profiles
  for select using (auth.uid() = user_id);

-- Super admin / editor: full CRUD on announcements and gallery
create policy "announcements_admin_all" on announcements
  for all
  using (
    exists (
      select 1 from admin_profiles
      where user_id = auth.uid()
      and role in ('super_admin', 'editor')
    )
  );

create policy "gallery_admin_insert" on gallery_items
  for insert
  with check (auth.uid() is not null);

-- Realtime: enable for scores table
alter publication supabase_realtime add table scores;
