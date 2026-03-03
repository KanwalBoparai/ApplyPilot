import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai'

// Lazy initialization to ensure env vars are loaded
let _genAI: GoogleGenerativeAI | null = null
let _model: GenerativeModel | null = null

function getModel(): GenerativeModel {
  if (!_model) {
    const apiKey = process.env.GEMINI_API_KEY || ''
    _genAI = new GoogleGenerativeAI(apiKey)
    // gemini-2.0-flash is the latest fast model
    _model = _genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
  }
  return _model
}

export const hasGeminiConfig = Boolean(process.env.GEMINI_API_KEY)

export const DEFAULT_MODEL = 'gemini-2.0-flash'

/**
 * Helper function to generate text with Gemini
 */
export async function generateText(prompt: string): Promise<string> {
  const model = getModel()
  const result = await model.generateContent(prompt)
  const response = await result.response
  return response.text()
}

/**
 * Helper function to generate JSON with Gemini
 */
export async function generateJSON<T>(prompt: string): Promise<T> {
  const model = getModel()
  const fullPrompt = `${prompt}\n\nIMPORTANT: Return ONLY valid JSON, no markdown, no code blocks, no explanations.`
  const result = await model.generateContent(fullPrompt)
  const response = await result.response
  const text = response.text()
  
  // Clean up potential markdown code blocks
  const cleanedText = text
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim()
  
  return JSON.parse(cleanedText) as T
}
