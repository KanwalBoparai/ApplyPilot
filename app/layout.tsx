import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Job Application Agent - Automate Your Job Search',
  description:
    'AI-powered job application platform with smart resume parsing, automated outreach, and application tracking.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
