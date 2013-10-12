/**
 * popup.js
 * https://github.com/moneypenny/chrome-extractcss
 * Author: @cheshire137
 * Copyright 2013, Sarah Vessels (sarah-vessels.com)
 * Licensed under the MIT license.
 */

var extractcss_popup = {
  on_popup_opened: function() {
  }
};

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(
      tab.id,
      {greeting: 'popup_opened', tab_id: tab.id},
      function() {
        extractcss_popup.on_popup_opened();
      }
    );
  });
});
