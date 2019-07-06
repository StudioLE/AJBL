/**
 * Send getAssets request
 */
var sendGetAssets = function(info, tab) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    // Send message to content.js
    chrome.tabs.sendMessage(tabs[0].id, {
      message: 'getAssets'
    })
  })
}

/**
 * Send getAsset request
 */
var sendGetAsset = function(info, tab) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    // Send message to content.js
    chrome.tabs.sendMessage(tabs[0].id, {
      message: 'getAsset',
      src: info.srcUrl
    })
  })
}

/**
 * Download assets
 */
var downloadAssets = function(assets) {
  assets.forEach(function(asset) {
    chrome.downloads.download({
      url: 'https://www.ajbuildingslibrary.co.uk/download.php?id=' + asset.id
    })
  })
}

/**
 * Create download all context menu entry
 */
chrome.contextMenus.create({
  title: 'AJBL Helper - Download all files',
  onclick: sendGetAssets,
  documentUrlPatterns: [
    'https://www.ajbuildingslibrary.co.uk/projects/display/id/*'
  ]
})

/**
 * Create download file context menu entry
 */
chrome.contextMenus.create({
  title: 'AJBL Helper - Download file',
  contexts: [ 'image' ],
  onclick: sendGetAsset,
  documentUrlPatterns: [
    'https://www.ajbuildingslibrary.co.uk/projects/display/id/*'
  ]
})

/**
 * Message listener
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.message === 'downloadAssets') {
    downloadAssets(request.assets)
  }
  else {
    alert('AJBL Helper Error: unknown message: ' + request.message)
  }
})
