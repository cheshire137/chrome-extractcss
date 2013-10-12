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
    if (opts.extract_inline === 'off') {
      $('#extract_inline').removeAttr('checked');
    } else {
      $('#extract_inline').attr('checked', 'checked');
    }
    if (opts.extract_children === 'off') {
      $('#extract_children').removeAttr('checked');
    } else {
      $('#extract_children').attr('checked', 'checked');
    }
    if (typeof(opts.extract_ids) === 'undefined' || opts.extract_ids) {
      $('#extract_ids').attr('checked', 'checked');
    } else {
      $('#extract_ids').removeAttr('checked');
    }
    if (typeof(opts.extract_classes) === 'undefined' || opts.extract_classes) {
      $('#extract_classes').attr('checked', 'checked');
    } else {
      $('#extract_classes').removeAttr('checked');
    }
    if (typeof(opts.autosemicolon) === 'undefined' || opts.autosemicolon) {
      $('#autosemicolon').attr('checked', 'checked');
    } else {
      $('#autosemicolon').removeAttr('checked');
    }
  });
}

document.addEventListener('DOMContentLoaded', restore_options);

$('input[name="openbrace"], input[name="indent"], #autosemicolon, #extract_inline, #extract_children, #extract_ids, #extract_classes').on('change', save_options);
