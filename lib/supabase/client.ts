import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  storage: {
    storageKey: 'supabase.storage.token',
  },
});

export type Tables = Database['public']['Tables'];
export type Profiles = Tables['profiles']['Row'];
export type UserInterests = Tables['user_interests']['Row'];