import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client for the Riviera Med website.
 *
 * Reads the project URL and anon key from environment variables.
 * Create a `.env.local` file in the project root with:
 *
 *   VITE_SUPABASE_URL="https://YOUR-PROJECT.supabase.co"
 *   VITE_SUPABASE_ANON_KEY="your-anon-key"
 *
 * SECURITY: The anon key is intentionally public (visible in the browser bundle).
 * It CANNOT be kept secret. The sole access-control layer is Supabase Row Level
 * Security (RLS). Before activating any table writes from this client:
 *
 *   1. Enable RLS on every table (Dashboard → Table Editor → RLS toggle).
 *   2. Add explicit INSERT/SELECT policies — the default denies all.
 *   3. Never expose service-role keys in client-side code.
 *   4. Test with: curl -H "apikey: <anon-key>" <url>/rest/v1/<table>?select=*
 *      — the response must be empty or 403, not a data dump.
 */
const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? "";
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});
