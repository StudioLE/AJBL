/**
 * Get all asset ids
 */
var getAssets = function() {
  var assets = []
  // For each item
  $('.jcarousel-item a, .slick-slide a, li.tip a').each(function(index, el) {
    // Add to list
    assets.push({
      id: $(this).attr('rel'),
      title: $(this).attr('title'),
      thumb: $(this).children('a img').attr('src')
    })
  })
  .promise()
  .done(function() {
    // Send message to background.js
    chrome.runtime.sendMessage({
      message: 'downloadAssets', 
      assets: assets
    })
  })
}

/**
 * Get asset by src
 */
var getAsset = function(src) {
  src = src.substr('https://www.ajbuildingslibrary.co.uk'.length)
  var asset = {
    id: $('img[src$="' + src + '"]').parent().attr('rel'),
    title: $('img[src$="' + src + '"]').parent().attr('title'),
    thumb: src
  }
  // Send message to background.js
  chrome.runtime.sendMessage({
    message: 'downloadAssets', 
    assets: [asset]
  })
}

/**
 * Message listener
 */
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === 'getAssets') {
      getAssets()
    }
    else if(request.message === 'getAsset') {
      getAsset(request.src)
    }
    else {
      console.error('Unknown message: ' + request.message)
    }
  }
)
