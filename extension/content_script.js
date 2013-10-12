/**
 * content_script.js
 * https://github.com/moneypenny/chrome-extractcss
 * Author: @cheshire137
 * Copyright 2013, Sarah Vessels (sarah-vessels.com)
 * Licensed under the MIT license.
 */

var extractcss_content_script = {
  get_page_html: function() {
    return document.documentElement.outerHTML;
  },

  on_popup_opened: function(tab_id, callback) {
    console.log('popup opened');
    callback(this.get_page_html());
  }
};

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.greeting == 'popup_opened') {
    extractcss_content_script.on_popup_opened(request.tab_id, function(data) { sendResponse(data);
    });
  }
});
