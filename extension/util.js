var extractcss_util = {
  load_default_options: function() {
    var me = this;
    chrome.storage.sync.get('extractcss_options', function(opts) {
      opts = opts.extractcss_options || {};
      me.set_openbrace_option(opts);
      me.set_indent_option(opts);
      me.set_extract_inline_option(opts);
      me.set_extract_children_option(opts);
      me.set_extract_ids_option(opts);
      me.set_extract_classes_option(opts);
      me.set_autosemicolon_option(opts);
    });
  },

  set_openbrace_option: function(opts) {
    if (opts.openbrace) {
      var selector = 'input[name="openbrace"][value="' + opts.openbrace + '"]';
      $(selector).attr('checked', 'checked');
    }
  },

  set_indent_option: function(opts) {
    if (opts.indent) {
      var selector = 'input[name="indent"][value="' + opts.indent + '"]';
      $(selector).attr('checked', 'checked');
    }
  },

  set_extract_inline_option: function(opts) {
    if (opts.extract_inline === 'off') {
      $('#extract_inline').removeAttr('checked');
    } else {
      $('#extract_inline').attr('checked', 'checked');
    }
  },

  set_extract_children_option: function(opts) {
    if (opts.extract_children === 'off') {
      $('#extract_children').removeAttr('checked');
    } else {
      $('#extract_children').attr('checked', 'checked');
    }
  },

  set_extract_ids_option: function(opts) {
    if (typeof(opts.extract_ids) === 'undefined' || opts.extract_ids) {
      $('#extract_ids').attr('checked', 'checked');
    } else {
      $('#extract_ids').removeAttr('checked');
    }
  },

  set_extract_classes_option: function(opts) {
    if (typeof(opts.extract_classes) === 'undefined' || opts.extract_classes) {
      $('#extract_classes').attr('checked', 'checked');
    } else {
      $('#extract_classes').removeAttr('checked');
    }
  },

  set_autosemicolon_option: function(opts) {
    if (typeof(opts.autosemicolon) === 'undefined' || opts.autosemicolon) {
      $('#autosemicolon').attr('checked', 'checked');
    } else {
      $('#autosemicolon').removeAttr('checked');
    }
  }
};
