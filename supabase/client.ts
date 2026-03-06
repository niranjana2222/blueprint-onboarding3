import { createClient } from '@supabase/supabase-js';

// Expo loads only EXPO_PUBLIC_* env vars (NEXT_PUBLIC_ is for Next.js)
export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
);
