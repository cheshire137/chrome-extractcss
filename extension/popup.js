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
        extractInline: $('#extract_inline').val(),
        extractChildren: $('#extract_children').val()
    };
    var cssboptions = {
      openbrace: $('input[name="openbrace"]:checked').val(),
      indent: '    ',
      autosemicolon: $('#autosemicolon').val() === 'on' ? true : false
    };
    var indent_choice = $('input[name="indent"]:checked').val();
    if (indent_choice === 'twospaces') {
      cssboptions.indent = '  ';
    } else if (indent_choice === 'tab') {
        cssboptions.indent = '\t';
    }
    var should_extract_ids = $('#extract_ids').val();
    var should_extract_classes = $('#extract_classes').val();
    var result = '';
    var extract_ids = function() {
      try {
        return extractCSS.extractIDs(html, options, cssboptions);
      } catch (err) {
        console.error('[extractcss] Failed to extract CSS IDs: ' + err);
        return '';
      }
    };
    var extract_classes = function() {
      try {
        return extractCSS.extractClasses(html, options, cssboptions);
      } catch (err) {
        console.log('[extractcss] Failed to extract CSS classes: ' + err);
        return ''
      }
    };
    if (extract_ids === 'on' && extract_classes === 'on') {
      result = extract_ids() + '\n\n' + extract_classes();
    } else if (extract_ids === 'on' && extract_classes !== 'on') {
      result = extract_ids();
    } else {
      result = extract_classes();
    }
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
