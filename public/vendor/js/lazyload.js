/**
 * 0.0.1
 * Deferred load js/css file, used for jquery.plugin.js and Lazy Loading.
 *
 */
var lazyload = lazyload || {}

;(function ($, lazyload) {
  'use strict'

  var loaded = [],
    promise = false,
    deferred = $.Deferred()

  /**
   * Chain loads the given sources
   * @param srcs array, script or css
   * @returns {*} Promise that will be resolved once the sources has been loaded.
   */
  lazyload.load = function (srcs) {
    srcs = $.isArray(srcs) ? srcs : srcs.split(/\s+/)
    if (!promise) {
      promise = deferred.promise()
    }

    $.each(srcs, function (index, src) {
      promise = promise.then(function () {
        return loaded[src]
          ? loaded[src].promise()
          : src.indexOf('.css') >= 0
          ? loadCSS(src)
          : loadScript(src)
      })
    })
    deferred.resolve()
    return promise
  }

  lazyload.unload = function (srcs) {
    srcs = $.isArray(srcs) ? srcs : srcs.split(/\s+/)
    $.each(srcs, function (index, src) {
      src.indexOf('.css') >= 0
        ? $('link[href="' + src + '"]').remove()
        : $('script[src="' + src + '"]').remove()
      delete loaded[src]
    })
  }

  /**
   * Dynamically loads the given script
   * @param src The url of the script to load dynamically
   * @returns {*} Promise that will be resolved once the script has been loaded.
   */
  var loadScript = function (src) {
    var deferred = $.Deferred()
    var script = document.createElement('script')
    script.src = src
    script.onload = function (e) {
      deferred.resolve(e)
    }
    script.onerror = function (e) {
      deferred.reject(e)
    }

    document.body.appendChild(script)
    loaded[src] = deferred

    return deferred.promise()
  }

  /**
   * Dynamically loads the given CSS file
   * @param href The url of the CSS to load dynamically
   * @returns {*} Promise that will be resolved once the CSS file has been loaded.
   */
  var loadCSS = function (href) {
    var deferred = $.Deferred()
    var style = document.createElement('link')
    style.rel = 'stylesheet'
    style.type = 'text/css'
    style.href = href
    style.onload = function (e) {
      deferred.resolve(e)
    }
    style.onerror = function (e) {
      deferred.reject(e)
    }

    var head = document.getElementsByTagName('head')[0]
    head.insertBefore(style, head.firstChild)
    loaded[href] = deferred

    return deferred.promise()
  }
})(jQuery, lazyload)
