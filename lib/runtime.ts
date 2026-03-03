// Getters to check config at runtime (not module load time)
export const hasSupabaseConfig = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const hasOpenRouterConfig = Boolean(process.env.OPENROUTER_API_KEY)

// Only OpenRouter is active AI service
export const hasAIConfig = hasOpenRouterConfig
