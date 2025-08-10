import { createClient } from '@supabase/supabase-js'

export function getSupabase() {
  const url = import.meta.env.VITE_SUPABASE_URL
  const anon = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!url || !anon) return null
  return createClient(url, anon)
}
