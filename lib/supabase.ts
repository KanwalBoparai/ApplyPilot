import { createClient } from '@supabase/supabase-js'
import { hasSupabaseConfig } from './runtime'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'anon-key-not-configured'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role key
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'service-role-key-not-configured',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

export { hasSupabaseConfig }
