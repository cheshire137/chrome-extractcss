/**
 * popup.js
 * https://github.com/moneypenny/chrome-extractcss
 * Author: @cheshire137
 * Copyright 2013, Sarah Vessels (sarah-vessels.com)
 * Licensed under the MIT license.
 */

var extractcss_popup = {
  on_popup_opened: function(html) {
    var options = {
        extractInline: 'on',
        extractChildren: 'on'
    };
    var cssboptions = {
      openbrace: 'end-of-line',
      indent: '  ',
      autosemicolon: true
    };
    var result = extractCSS.extractIDs(html, options, cssboptions) + '\n\n' +
                 extractCSS.extractClasses(html, options, cssboptions);
    $('#result').val(result);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(
      tab.id,
      {greeting: 'popup_opened', tab_id: tab.id},
      function(html) {
        extractcss_popup.on_popup_opened(html);
      }
    );
  });
});
