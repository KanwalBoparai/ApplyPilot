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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Settings</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Resume Upload */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Upload Resume</h2>
            <p className="mb-4 text-sm text-gray-600">
              Upload your resume to enable AI-powered features like cover
              letter generation and job matching.
            </p>

            <label className="flex cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition-colors hover:border-blue-400 hover:bg-blue-50">
              <Upload className="mb-2 h-12 w-12 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                {uploading ? 'Uploading...' : 'Click to upload resume'}
              </span>
              <span className="mt-1 text-xs text-gray-500">
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
              <div className="mt-4 rounded-lg bg-green-50 p-4">
                <p className="text-sm font-medium text-green-800">
                  ✓ Resume parsed successfully
                </p>
                <p className="mt-1 text-xs text-green-700">
                  {resumeData.skills?.length || 0} skills,{' '}
                  {resumeData.experience?.length || 0} experiences found
                </p>
              </div>
            )}
          </div>

          {/* Preferences */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Job Preferences</h2>
            <p className="mb-4 text-sm text-gray-600">
              Set your preferences to receive better job recommendations.
            </p>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Preferred Locations
                </label>
                <input
                  type="text"
                  placeholder="e.g., San Francisco, Remote"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Target Companies
                </label>
                <input
                  type="text"
                  placeholder="e.g., Google, Meta, Stripe"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
              </div>

              <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
