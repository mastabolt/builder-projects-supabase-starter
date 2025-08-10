# Builder Projects + Supabase Starter (Safe)

This project is hardened so it **won't show a blank page** if env vars are missing.
- Supabase client only initializes when env vars exist
- ErrorBoundary shows friendly messages instead of crashing

## Steps
1) Upload to GitHub → Deploy on Netlify
2) Set env vars in Netlify:
   - `VITE_BUILDER_API_KEY = a8aeb804fff1441e8542a350250c6609`
   - (Optional) `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
3) In Builder.io → Projects → Connect existing site → select your repo and Netlify preview URL

You can now visually edit your site in Builder without legacy Models.
