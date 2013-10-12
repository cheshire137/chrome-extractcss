/**
 * popup.js
 * https://github.com/moneypenny/chrome-extractcss
 * Author: @cheshire137
 * Copyright 2013, Sarah Vessels (sarah-vessels.com)
 * Licensed under the MIT license.
 */

var extractcss_popup = {
  on_html_extracted: function(html) {
    var options = {
        extractInline: 'on',
        extractChildren: 'on'
    };
    var cssboptions = {
      openbrace: 'end-of-line',
      indent: '  ',
      autosemicolon: true
    };
    var extracted_ids = '', extracted_classes = '';
    try {
      extracted_ids = extractCSS.extractIDs(html, options, cssboptions);
    } catch (err) {
      console.error('[extractcss] Failed to extract CSS IDs: ' + err);
    }
    try {
      extracted_classes = extractCSS.extractClasses(html, options, cssboptions);
    } catch (err) {
      console.log('[extractcss] Failed to extract CSS classes: ' + err);
    }
    var result = extracted_ids + '\n\n' + extracted_classes;
    $('#result').text(result);
    Prism.highlightAll(true, function() {
      $('#spinner').hide();
      $('#select-all-btn').show();
      $('#result-wrapper').show();
    });
  },

  on_popup_opened: function(tab_id, url) {
    var me = this;
    $('#url').text(url).attr('href', url).click(function() {
      chrome.tabs.create({url: url});
      return false;
    });
    $('form').show();
    $('#spinner').hide();
    $('#result-wrapper').hide();
    $('#select-all-btn').hide().click(function() {
      $('pre').hide();
      var text = $('#result').text();
      $('textarea').val(text).show().focus().select();
    });
    $('textarea').focus(function() {
      var textarea = $(this);
      textarea.select();
      textarea.mouseup(function() {
        textarea.unbind('mouseup');
        return false;
      });
    }).blur(function() {
      $('textarea').val('').hide();
      $('pre').show();
    });
    $('form').submit(function(e) {
      e.preventDefault();
      $('form').hide();
      $('#spinner').show();
      chrome.tabs.sendRequest(
        tab_id,
        {greeting: 'popup_opened', tab_id: tab_id},
        function(html) {
          me.on_html_extracted(html);
        }
      );
    });
  }
};

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.getSelected(null, function(tab) {
    extractcss_popup.on_popup_opened(tab.id, tab.url);
  });
});
