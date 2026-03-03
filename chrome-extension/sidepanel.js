const DEFAULT_API_BASE = 'http://localhost:3000'

const elements = {
  apiBaseUrl: document.getElementById('apiBaseUrl'),
  saveConfig: document.getElementById('saveConfig'),
  tabTitle: document.getElementById('tabTitle'),
  tabUrl: document.getElementById('tabUrl'),
  openDashboard: document.getElementById('openDashboard'),
  openJobs: document.getElementById('openJobs'),
  extractJob: document.getElementById('extractJob'),
  status: document.getElementById('status'),
}

function setStatus(message, isError = false) {
  elements.status.textContent = message
  elements.status.style.color = isError ? '#b91c1c' : '#4b5563'
}

async function getApiBase() {
  const data = await chrome.storage.sync.get(['apiBaseUrl'])
  return data.apiBaseUrl || DEFAULT_API_BASE
}

async function setApiBase(value) {
  await chrome.storage.sync.set({ apiBaseUrl: value })
}

async function getActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
  return tabs[0]
}

async function refreshTabInfo() {
  const tab = await getActiveTab()
  elements.tabTitle.textContent = tab?.title || 'No active tab'
  elements.tabUrl.textContent = tab?.url || '-'
}

async function openAppPath(path) {
  const base = await getApiBase()
  await chrome.tabs.create({ url: `${base}${path}` })
}

async function extractAndSendJob() {
  try {
    setStatus('Extracting page data...')
    const tab = await getActiveTab()
    if (!tab?.id) {
      setStatus('No active tab found.', true)
      return
    }

    const response = await chrome.tabs.sendMessage(tab.id, {
      type: 'EXTRACT_PAGE_DATA',
    })

    if (!response?.ok || !response?.data) {
      setStatus('Could not extract data from this page.', true)
      return
    }

    const data = response.data
    const base = await getApiBase()

    const payload = {
      title: data.extractedTitle || data.pageTitle || 'Untitled role',
      company: new URL(data.url).hostname.replace('www.', ''),
      location: 'Unknown',
      work_type: 'remote',
      role_type: 'other',
      term: 'fulltime',
      source: data.url,
      apply_url: data.url,
      recruiter_email: data.recruiterEmail || null,
      description: data.description || null,
      created_at: new Date().toISOString(),
    }

    const result = await fetch(`${base}/api/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!result.ok) {
      const err = await result.text()
      setStatus(`Save failed: ${err}`, true)
      return
    }

    setStatus('Job lead saved to ApplyPilot.')
  } catch (error) {
    setStatus(`Error: ${error.message}`, true)
  }
}

async function init() {
  const apiBase = await getApiBase()
  elements.apiBaseUrl.value = apiBase
  await refreshTabInfo()

  elements.saveConfig.addEventListener('click', async () => {
    const value = elements.apiBaseUrl.value.trim()
    if (!value) {
      setStatus('Backend URL is required.', true)
      return
    }
    await setApiBase(value)
    setStatus('Backend URL saved.')
  })

  elements.openDashboard.addEventListener('click', () => openAppPath('/dashboard'))
  elements.openJobs.addEventListener('click', () => openAppPath('/jobs'))
  elements.extractJob.addEventListener('click', extractAndSendJob)
}

init()
