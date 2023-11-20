console.info('chrome-ext template-react-ts background script')

const filter: chrome.webRequest.RequestFilter = {
  types: ['xmlhttprequest'],
  urls: ['https://localhost/*'],
}

chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    const hasProfiling = details.responseHeaders?.find(
      (header) => header.name === 'x-debug-token-link',
    )
    if (hasProfiling) {
      const webdebugToolbarUrl = hasProfiling.value?.replace('_profiler', '_wdt')
      if (!webdebugToolbarUrl) return
    
      setTimeout(() => {
          chrome.tabs.sendMessage(details.tabId, { message: webdebugToolbarUrl });
      }, 200);
    }
  },
  filter,
  ['responseHeaders'],
)

export {}
