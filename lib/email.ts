import { Resend } from 'resend'

let resend: Resend | null = null

if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY)
}

export { resend }

// Gmail OAuth implementation would go here if chosen instead
export const sendEmail = async (params: {
  to: string
  subject: string
  html: string
  from?: string
}) => {
  if (!resend) {
    throw new Error('Email service not configured')
  }

  const { to, subject, html, from = 'onboarding@resend.dev' } = params

  return await resend.emails.send({
    from,
    to,
    subject,
    html,
  })
}
