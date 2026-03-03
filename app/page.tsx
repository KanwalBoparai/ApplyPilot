import Link from 'next/link'
import { Briefcase, TrendingUp, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900">
            Job Application Agent
          </h1>
          <p className="mb-8 text-xl text-gray-700">
            AI-powered job search automation platform
          </p>

          <div className="mb-12 flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/jobs"
              className="rounded-lg border-2 border-blue-600 bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
            >
              Browse Jobs
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex justify-center">
                <Sparkles className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                AI Resume Parsing
              </h3>
              <p className="text-gray-600">
                Upload your resume and let AI extract structured data,
                generate cover letters, and match you with jobs.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex justify-center">
                <Briefcase className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Smart Job Discovery
              </h3>
              <p className="text-gray-600">
                Automatically fetch jobs from YC, Greenhouse, and other
                official sources. No CAPTCHA bypass—only ethical scraping.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex justify-center">
                <TrendingUp className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Recruiter Outreach
              </h3>
              <p className="text-gray-600">
                Generate personalized cold emails, preview before sending, and
                track response rates.
              </p>
            </div>
          </div>

          <div className="mt-16 rounded-lg border-2 border-yellow-400 bg-yellow-50 p-6">
            <h3 className="mb-2 text-lg font-semibold text-yellow-900">
              ⚠️ Ethical & Compliant
            </h3>
            <p className="text-yellow-800">
              This platform uses only official APIs and RSS feeds. No automated
              login, no CAPTCHA bypass, and no security violations. All
              applications require manual submission.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
