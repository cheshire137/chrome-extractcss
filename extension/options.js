/**
 * options.js
 * https://github.com/moneypenny/chrome-extractcss
 * Author: @cheshire137
 * Copyright 2013, Sarah Vessels (sarah-vessels.com)
 * Licensed under the MIT license.
 */

function save_options() {
  var openbrace = $('input[name="openbrace"]:checked').val();
  var indent = $('input[name="indent"]:checked').val();
  var autosemicolon = $('#autosemicolon').is(':checked');
  var status_area = $('#status-message');
  var extract_inline = $('#extract_inline').is(':checked') ? 'on' : 'off';
  var options = {openbrace: openbrace, indent: indent,
                 autosemicolon: autosemicolon, extract_inline: extract_inline};
  chrome.storage.sync.set({'extractcss_options': options}, function() {
    status_area.text('Okay, got it!').fadeIn(function() {
      setTimeout(function() {
        status_area.fadeOut();
      }, 2000);
    });
  });
}

function restore_options() {
  chrome.storage.sync.get('extractcss_options', function(opts) {
    opts = opts.extractcss_options || {};
    if (opts.openbrace) {
      var selector = 'input[name="openbrace"][value="' + opts.openbrace + '"]';
      $(selector).attr('checked', 'checked');
    }
    if (opts.indent) {
      var selector = 'input[name="indent"][value="' + opts.indent + '"]';
      $(selector).attr('checked', 'checked');
    }
    if (opts.autosemicolon) {
      $('#autosemicolon').attr('checked', 'checked');
    } else {
      $('#autosemicolon').removeAttr('checked');
    }
    if (opts.extract_inline === 'off') {
      $('#extract_inline').removeAttr('checked');
    } else {
      $('#extract_inline').attr('checked', 'checked');
    }
  });
}

document.addEventListener('DOMContentLoaded', restore_options);

$('input[name="openbrace"], input[name="indent"], #autosemicolon, #extract_inline').on('change', save_options);
