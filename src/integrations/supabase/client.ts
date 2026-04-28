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
 * Until those are set the client will throw on first network call. That is
 * fine in dev — pages render normally; only the contact / job-application
 * form actually hits Supabase.
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
