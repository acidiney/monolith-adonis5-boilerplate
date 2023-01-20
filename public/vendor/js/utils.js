;(function (global) {
  'use strict'
  var Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  global.Utils = {
    // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
    srand: function (seed) {
      this._seed = seed
    },

    rand: function (min, max) {
      var seed = this._seed
      min = min === undefined ? 0 : min
      max = max === undefined ? 1 : max
      this._seed = (seed * 9301 + 49297) % 233280
      return min + (this._seed / 233280) * (max - min)
    },

    numbers: function (config) {
      var cfg = config || {}
      var min = cfg.min || 0
      var max = cfg.max || 1
      var from = cfg.from || []
      var count = cfg.count || 8
      var decimals = cfg.decimals || 8
      var continuity = cfg.continuity || 1
      var dfactor = Math.pow(10, decimals) || 0
      var data = []
      var i, value

      for (i = 0; i < count; ++i) {
        value = (from[i] || 0) + this.rand(min, max)
        if (this.rand() <= continuity) {
          data.push(Math.round(dfactor * value) / dfactor)
        } else {
          data.push(null)
        }
      }

      return data
    },

    labels: function (config) {
      var cfg = config || {}
      var min = cfg.min || 0
      var max = cfg.max || 100
      var count = cfg.count || 8
      var step = (max - min) / count
      var decimals = cfg.decimals || 0
      var dfactor = Math.pow(10, decimals) || 0
      var prefix = cfg.prefix || ''
      var values = []
      var i

      for (i = min; i < max; i += step) {
        values.push(prefix + Math.round(dfactor * i) / dfactor)
      }

      return values
    },

    months: function (config) {
      var cfg = config || {}
      var count = cfg.count || 12
      var section = cfg.section
      var values = []
      var i, value

      for (i = 0; i < count; ++i) {
        value = Months[Math.ceil(i) % 12]
        values.push(value.substring(0, section))
      }

      return values
    },

    color: function (color, opacity) {
      var r = parseInt(color.slice(1, 3), 16),
        g = parseInt(color.slice(3, 5), 16),
        b = parseInt(color.slice(5, 7), 16)
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')'
    },
  }

  global.Utils.srand(Date.now())
})(this)
