import OpenAI from 'openai'
import { hasOpenAIConfig } from './runtime'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'not-configured',
})

export const DEFAULT_MODEL = 'gpt-4o-mini'
export { hasOpenAIConfig }
