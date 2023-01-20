;(function (global, $) {
  'use strict'

  var list_el = '#search-list'
  var list

  var init = function () {
    $(document).trigger('refresh')

    // list
    if ($(list_el).length) {
      list = new List(list_el.substr(1), {
        valueNames: ['item-feed'],
        page: 10,
        pagination: true,
      })
    }

    list.on('updated', function (list) {
      if (list.matchingItems.length > 0) {
        $(list_el).find('.no-result').addClass('hide')
      } else {
        $(list_el).find('.no-result').removeClass('hide')
      }
    })
  }

  global.search = { init: init }
})(this, jQuery)
