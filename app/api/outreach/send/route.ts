import { NextRequest, NextResponse } from 'next/server'
import { outreachService } from '@/services/outreach.service'
import { hasSupabaseConfig } from '@/lib/runtime'

/**
 * POST /api/outreach/send
 * Send an approved outreach email
 */
export async function POST(request: NextRequest) {
  try {
    const { outreachId, userEmail } = await request.json()

    if (!hasSupabaseConfig) {
      return NextResponse.json({ success: true, mode: 'mock', outreachId, userEmail })
    }

    if (!outreachId || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await outreachService.sendOutreachEmail(outreachId, userEmail)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error sending outreach email:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send outreach email' },
      { status: 500 }
    )
  }
}
