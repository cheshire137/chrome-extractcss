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
  var extract_children = $('#extract_children').is(':checked') ? 'on' : 'off';
  var extract_ids = $('#extract_ids').is(':checked');
  var extract_classes = $('#extract_classes').is(':checked');
  var options = {openbrace: openbrace, indent: indent, extract_ids: extract_ids,
                 autosemicolon: autosemicolon, extract_inline: extract_inline,
                 extract_children: extract_children,
                 extract_classes: extract_classes};
  chrome.storage.sync.set({'extractcss_options': options}, function() {
    status_area.text('Okay, got it!').fadeIn(function() {
      setTimeout(function() {
        status_area.fadeOut();
      }, 2000);
    });
  });
}

function restore_options() {
  extractcss_util.load_default_options();
}

document.addEventListener('DOMContentLoaded', restore_options);

$('input[name="openbrace"], input[name="indent"], #autosemicolon, #extract_inline, #extract_children, #extract_ids, #extract_classes').on('change', save_options);
