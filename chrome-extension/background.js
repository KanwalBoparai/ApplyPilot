const PANEL_PATH = 'sidepanel.html'

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
})

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (info.status !== 'complete' || !tab.url) {
    return
  }

  const supported = tab.url.startsWith('http://') || tab.url.startsWith('https://')

  await chrome.sidePanel.setOptions({
    tabId,
    path: PANEL_PATH,
    enabled: supported,
  })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === 'OPEN_SIDE_PANEL') {
    chrome.windows.getCurrent(async (window) => {
      await chrome.sidePanel.open({ windowId: window.id })
      sendResponse({ ok: true })
    })
    return true
  }

  return false
})
