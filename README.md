# Builder Projects + Supabase Starter

This repo is prepped for **Builder Projects** visual editing and a **Supabase** backend.

## 1) Upload to GitHub (no terminal)
- Create a new repo on GitHub (e.g., `builder-projects-supabase-starter`)
- Drag & drop all files from this folder into the repo

## 2) Netlify
- Import the repo → Build command: `npm run build` → Publish directory: `dist`
- Set Environment Variables:
  - `VITE_BUILDER_API_KEY = a8aeb804fff1441e8542a350250c6609`
  - `VITE_SUPABASE_URL = <your Supabase project URL>`
  - `VITE_SUPABASE_ANON_KEY = <your anon key>`

## 3) Supabase table (optional demo)
Run this in Supabase SQL:
```sql
create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  address text not null,
  city text not null,
  state text not null,
  zip text not null,
  bedrooms int default 0,
  bathrooms int default 0,
  purchase_price numeric(12,2) default 0,
  created_at timestamp with time zone default now()
);
```

## 4) Connect Builder Projects
- In Builder.io → **Projects → New Project → Connect existing site**
- Choose **GitHub**, authorize, and select your repo
- Set **Preview URL** to your Netlify site (e.g. `https://your-site.netlify.app`)
- Open the page in Projects and start editing visually — Builder will create PRs

You're now 100% Projects-first. No legacy models required.
