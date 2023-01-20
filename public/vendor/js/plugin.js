;(function ($, MODULE_CONFIG, MODULE_OPTION_CONFIG) {
  'use strict'

  $.fn.plugin = function () {
    return this.each(function () {
      var self = $(this)
      var loading = self.find('.loading')
      var opts = self.attr('data-option') || self.attr('data-plugin-option')
      var plugin = self.attr('data-plugin')

      // check if the plugin loaded and has option in the attribute
      if (self[plugin] && opts) {
        // init plugin with the potion on it's attribute
        self[plugin].apply(self, getOpts(opts, plugin))
        loading.remove()
      } else {
        // load the plugin
        lazyload.load(MODULE_CONFIG[plugin]).then(function () {
          // init plugin with the potion on it's attribute
          opts && self[plugin].apply(self, getOpts(opts, plugin))
          // call the plugin init()
          self[plugin] && self[plugin].init && self[plugin].init()
          // call other init()
          window[plugin] && window[plugin].init && window[plugin].init()
          loading.remove()
        })
      }
      self.removeAttr('data-plugin').removeAttr('data-option')
    })

    function getOpts(opts, plugin) {
      var options = opts && eval('[' + opts + ']')
      if (options && $.isPlainObject(options[0])) {
        options[0] = $.extend({}, MODULE_OPTION_CONFIG[plugin], options[0])
      }
      return options
    }
  }
})(jQuery, MODULE_CONFIG, MODULE_OPTION_CONFIG)
