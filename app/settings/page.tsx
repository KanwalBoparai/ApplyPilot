'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'

export default function SettingsPage() {
  const [uploading, setUploading] = useState(false)
  const [resumeData, setResumeData] = useState<any>(null)

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      // Read file as text
      const text = await file.text()

      // Send to API
      const response = await fetch('/api/resume/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: text,
          userId: 'demo-user-id',
        }),
      })

      const data = await response.json()
      setResumeData(data.resumeData)
      alert('Resume uploaded and parsed successfully!')
    } catch (error) {
      console.error('Error uploading resume:', error)
      alert('Failed to upload resume')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="app-shell">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-semibold text-white">Settings</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Resume Upload */}
          <div className="glass-card p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Upload Resume</h2>
            <p className="mb-4 text-sm text-slate-300">
              Upload your resume to enable AI-powered features like cover
              letter generation and job matching.
            </p>

            <label className="flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-slate-600 bg-slate-900/70 p-8 transition-colors hover:border-cyan-300/40 hover:bg-slate-800">
              <Upload className="mb-2 h-12 w-12 text-slate-400" />
              <span className="text-sm font-medium text-slate-200">
                {uploading ? 'Uploading...' : 'Click to upload resume'}
              </span>
              <span className="mt-1 text-xs text-slate-400">
                PDF, DOC, or TXT
              </span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </label>

            {resumeData && (
              <div className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-4">
                <p className="text-sm font-medium text-emerald-200">
                  ✓ Resume parsed successfully
                </p>
                <p className="mt-1 text-xs text-emerald-100/90">
                  {resumeData.skills?.length || 0} skills,{' '}
                  {resumeData.experience?.length || 0} experiences found
                </p>
              </div>
            )}
          </div>

          {/* Preferences */}
          <div className="glass-card p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Job Preferences</h2>
            <p className="mb-4 text-sm text-slate-300">
              Set your preferences to receive better job recommendations.
            </p>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-200">
                  Preferred Locations
                </label>
                <input
                  type="text"
                  placeholder="e.g., San Francisco, Remote"
                  className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-200">
                  Target Companies
                </label>
                <input
                  type="text"
                  placeholder="e.g., Google, Meta, Stripe"
                  className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
                />
              </div>

              <button className="w-full rounded-md bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
