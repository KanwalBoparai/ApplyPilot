import Link from 'next/link'
import { Briefcase, TrendingUp, Sparkles, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="app-shell">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12">
          <p className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
            APPLYPILOT • AI JOB OPS
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-6xl">
            Run your job search like a
            <span className="heading-gradient"> high-performance pipeline</span>
          </h1>
          <p className="mt-5 max-w-3xl text-base text-slate-300 sm:text-lg">
            Discover roles, tailor applications, generate outreach, and track outcomes
            from one command center.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Open Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/jobs"
              className="rounded-lg border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
            >
              Browse Jobs
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="glass-card p-5">
              <div className="mb-3 inline-flex rounded-lg bg-cyan-500/15 p-2">
                <Sparkles className="h-5 w-5 text-cyan-200" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-white">AI Resume Intelligence</h3>
              <p className="text-sm text-slate-300">
                Parse resume context and generate role-aligned material in seconds.
              </p>
            </div>

            <div className="glass-card p-5">
              <div className="mb-3 inline-flex rounded-lg bg-blue-500/15 p-2">
                <Briefcase className="h-5 w-5 text-blue-200" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-white">Smart Job Discovery</h3>
              <p className="text-sm text-slate-300">
                Aggregate and filter opportunities from official/public channels.
              </p>
            </div>

            <div className="glass-card p-5">
              <div className="mb-3 inline-flex rounded-lg bg-violet-500/15 p-2">
                <TrendingUp className="h-5 w-5 text-violet-200" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-white">Outreach + Tracking</h3>
              <p className="text-sm text-slate-300">
                Draft personalized recruiter emails and monitor conversion metrics.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-amber-400/30 bg-amber-500/10 p-4">
            <h3 className="text-sm font-semibold text-amber-200">Ethical & Compliant</h3>
            <p className="mt-1 text-sm text-amber-100/90">
              Official APIs and public sources only. No CAPTCHA bypass, no login automation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
