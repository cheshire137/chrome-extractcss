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
        extractInline: $('#extract_inline').is(':checked') ? 'on' : 'off',
        extractChildren: $('#extract_children').is(':checked') ? 'on' : 'off'
    };
    var cssboptions = {
      openbrace: $('input[name="openbrace"]:checked').val(),
      indent: '    ',
      autosemicolon: $('#autosemicolon').is(':checked')
    };
    var indent_choice = $('input[name="indent"]:checked').val();
    if (indent_choice === 'twospaces') {
      cssboptions.indent = '  ';
    } else if (indent_choice === 'tab') {
        cssboptions.indent = '\t';
    }
    var should_extract_ids = $('#extract_ids').is(':checked');
    var should_extract_classes = $('#extract_classes').is(':checked');
    var result = '';
    var extract_ids = function() {
      try {
        return extractCSS.extractIDs(html, options, cssboptions);
      } catch (err) {
        console.error('[extractCSS] Failed to extract CSS IDs: ' + err);
        return '';
      }
    };
    var extract_classes = function() {
      try {
        return extractCSS.extractClasses(html, options, cssboptions);
      } catch (err) {
        console.log('[extractCSS] Failed to extract CSS classes: ' + err);
        return ''
      }
    };
    if (should_extract_ids && should_extract_classes) {
      result = extract_ids() + '\n\n' + extract_classes();
    } else if (should_extract_ids && !should_extract_classes) {
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

  setup_tab_url_link: function(url) {
    $('#url').text(url).attr('href', url).click(function() {
      chrome.tabs.create({url: url});
      return false;
    });
  },

  setup_select_all_button: function() {
    $('#select-all-btn').hide().click(function() {
      $('pre').hide();
      var text = $('#result').text();
      $('textarea').val(text).show().focus().select();
    });
  },

  setup_textarea: function() {
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
  },

  setup_form: function(tab_id) {
    var me = this;
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
  },

  set_default_options: function() {
    extractcss_util.load_default_options();
  },

  on_popup_opened: function(tab_id, url) {
    $('form').show();
    $('#spinner').hide();
    $('#result-wrapper').hide();
    this.setup_tab_url_link(url);
    this.setup_select_all_button();
    this.setup_textarea();
    this.set_default_options();
    this.setup_form(tab_id);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.getSelected(null, function(tab) {
    extractcss_popup.on_popup_opened(tab.id, tab.url);
  });
});
