function readMeta(name, attr = 'name') {
  const el = document.querySelector(`meta[${attr}="${name}"]`)
  return el?.getAttribute('content') || ''
}

function extractJobLikeData() {
  const title = document.title || ''

  const h1 = document.querySelector('h1')?.textContent?.trim() || ''
  const ogTitle = readMeta('og:title', 'property')
  const description =
    readMeta('description') || readMeta('og:description', 'property') || ''

  const bodyText = document.body?.innerText || ''
  const emailMatch = bodyText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)

  return {
    url: window.location.href,
    pageTitle: title,
    extractedTitle: h1 || ogTitle || title,
    description: description.slice(0, 2000),
    recruiterEmail: emailMatch?.[0] || '',
  }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === 'EXTRACT_PAGE_DATA') {
    sendResponse({ ok: true, data: extractJobLikeData() })
    return true
  }
  return false
})
