# VIDI26 — Next Station: VinUni

Website chính thức cho **VinUni Discovery 2026** — chương trình định hướng 3N2Đ dành cho Cohort-7-to-be.

**Concept**: Trạm Kế Tiếp / Next Station · VIDI26 Express · 17.06.2026

---

## Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)
- Supabase account (free tier is sufficient)

---

## Setup

### 1. Clone & install

```bash
git clone <repo-url>
cd vidi26
pnpm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable | Where to find |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API |

### 3. Supabase setup

**a. Create a new project** at [supabase.com](https://supabase.com)

**b. Run migrations:**

Supabase Dashboard → SQL Editor → paste content of:
```
supabase/migrations/001_schema.sql
```
Run the query.

**c. Seed data:**

SQL Editor → paste content of:
```
supabase/seed.sql
```
Run the query. This creates 7 stations and 24 team placeholders.

**d. Create admin user:**

Authentication → Users → Add user:
- Email: `admin@vinuni.edu.vn`
- Password: (choose a strong password)

SQL Editor:
```sql
insert into admin_profiles (user_id, full_name, role)
values (
  (select id from auth.users where email = 'admin@vinuni.edu.vn'),
  'Admin VIDI26',
  'super_admin'
);
```

**e. Enable Realtime for scores table:**

Database → Replication → Enable for table `scores`.

### 4. Run locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## Deploy to Vercel

```bash
pnpm build  # verify build passes locally first
```

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add env variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

Vercel settings:
- Framework: **Next.js** (auto-detected)
- Build command: `pnpm build`
- Install command: `pnpm install --ignore-scripts`

---

## Project Structure

```
vidi26/
├── app/
│   ├── (public)/               # Public-facing pages
│   │   ├── page.tsx            # Home (hero + leaderboard preview + announcements)
│   │   ├── HeroSection.tsx     # Animated train hero (client)
│   │   └── leaderboard/        # Live leaderboard
│   ├── admin/                  # Protected admin panel
│   │   ├── login/              # Supabase Auth login
│   │   ├── dashboard/          # Stats overview
│   │   └── scores/             # 3-step score entry form
│   ├── layout.tsx              # Root layout + Montserrat + Cormorant fonts
│   └── globals.css             # Design tokens (CSS vars) + Tailwind v4 @theme
├── components/
│   ├── theme/                  # BoardingPassCard, StationSign, NeonButton, GlowPanel, TrainTrack
│   ├── leaderboard/            # LeaderboardLive (realtime), TopThreeCards, DepartureBoardRow
│   └── layout/                 # Header (countdown timer, 7-station nav) + Footer
├── lib/
│   ├── supabase/               # client.ts (browser), server.ts (RSC), types.ts
│   └── utils.ts                # cn(), formatScore(), formatRelativeTime()
├── supabase/
│   ├── migrations/001_schema.sql   # Full schema + RLS + realtime
│   └── seed.sql                    # 7 stations + 24 teams + sample challenges
├── middleware.ts               # Redirect unauthenticated users away from /admin/*
├── CLAUDE.md                   # Project context for Claude Code
└── .env.example                # Environment variable template
```

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16, App Router, TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Database | Supabase Postgres |
| Auth | Supabase Auth (email/password) |
| Realtime | Supabase Realtime channels |
| Animation | Framer Motion (hero, leaderboard reorder) |
| Icons | lucide-react |
| Fonts | Montserrat (body) + Cormorant Garamond (headlines) |
| Deploy | Vercel |

---

## Phase 1 Done

- [x] Next.js project init, running locally
- [x] Supabase schema + migrations + seed SQL
- [x] Design system: dark navy theme, neon blue tokens, boarding-pass motifs
- [x] Root layout with Montserrat + Cormorant fonts
- [x] Header: 7-station nav + live countdown to 17.06.2026
- [x] Footer: boarding-pass style with route map
- [x] Home page: hero with animated train, announcements grid, mini leaderboard top 5
- [x] Leaderboard: top-3 gold/silver/bronze cards + departure-board list + realtime subscription
- [x] Admin login (Supabase Auth)
- [x] Admin dashboard with stats + recent activity
- [x] Admin score entry: 3-step form (select challenge → enter scores → confirm), history modal
- [x] Mobile responsive
- [x] CLAUDE.md project context file

## Phases 2–3 (Pending)

- `/story` — parallax narrative page
- `/agenda` — 3-day timeline tabs
- `/stations` + `/stations/[slug]` — station detail pages
- `/teams` + `/teams/[id]` — team pages with radar chart
- `/announcements` — markdown-rendered news
- `/gallery` — masonry photo grid + lightbox
- Admin full CRUD: challenges, teams, announcements, gallery upload
- CSV/PDF export for results
- PWA + offline cached leaderboard

---

## Commit Convention

```
feat(leaderboard): add station filter tabs
feat(admin): score history audit modal
fix(header): countdown timer timezone
```
