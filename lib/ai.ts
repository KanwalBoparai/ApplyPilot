import OpenAI from 'openai'

const openRouterApiKey = process.env.OPENROUTER_API_KEY || ''
const openRouterModel = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct'

let openRouterClient: OpenAI | null = null

function getOpenRouterClient(): OpenAI {
  if (!openRouterApiKey) {
    throw new Error(
      'OPENROUTER_API_KEY is not configured. Set OPENROUTER_API_KEY in .env.local with your key from https://openrouter.ai'
    )
  }

  if (!openRouterClient) {
    openRouterClient = new OpenAI({
      apiKey: openRouterApiKey,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'ApplyPilot',
      },
    })
  }

  return openRouterClient
}

export const hasOpenRouterConfig = Boolean(openRouterApiKey)

/**
 * Generate text using OpenRouter
 */
export async function generateText(prompt: string): Promise<string> {
  const client = getOpenRouterClient()
  const response = await client.chat.completions.create({
    model: openRouterModel,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  })

  return response.choices[0]?.message?.content || ''
}

/**
 * Generate JSON using OpenRouter
 */
export async function generateJSON<T>(prompt: string): Promise<T> {
  const client = getOpenRouterClient()
  const response = await client.chat.completions.create({
    model: openRouterModel,
    messages: [
      {
        role: 'user',
        content: `${prompt}\n\nIMPORTANT: Return ONLY valid JSON, no markdown, no code blocks, no explanations.`,
      },
    ],
    temperature: 0.2,
  })

  const raw = response.choices[0]?.message?.content || ''
  const cleaned = raw
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim()

  return JSON.parse(cleaned) as T
}
