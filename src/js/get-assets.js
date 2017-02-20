/**
 * Get all asset ids
 */
var getAssets = function() {
  console.log('getAssets() called')
  var assets = []
  // For each item
  $('.jcarousel-item a, .slick-slide a').each(function(index, el) {
    // Add to list
    assets.push({
      id: $(this).attr('rel'),
      title: $(this).attr('title'),
      thumb: $(this).children('a img').attr('src')
    })
  })
  .promise()
  .done(function() {
    console.log(assets)
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
  src = src.substr('http://www.ajbuildingslibrary.co.uk'.length)
  console.log('getAsset() called: ' + src)
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
