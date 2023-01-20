;(function (global, $) {
  'use strict'

  var nav_el = '#mail-nav',
    list_el = '#mail-list',
    tagFilter = '',
    link = 'app.mail.html#',
    navList,
    list,
    noticed = false
  $(document).on('click', nav_el + ' a', function (e) {
    tagFilter = $.trim($(this).find('.nav-text').text())
    if (tagFilter == 'Inbox') tagFilter = ''
    $('input.search').attr('placeholder', 'Search ' + tagFilter)
    update(list)
    $('#content-aside').modal('hide')
  })

  $(document).on('click', list_el + ' .pager-prev, ' + list_el + ' .pager-next', function (e) {
    var list = $('.pagination').find('li')
    var i = 0
    $(this).hasClass('pager-prev') ? i-- : i++
    $.each(list, function (position, element) {
      if ($(element).is('.active')) {
        $(list[position + i]).trigger('click')
      }
    })
  })

  $(document).on('click', list_el + ' #btn-trash', function (e) {
    $('input[name="id"]:checked').each(function () {
      list.remove('id', $(this).val())
    })
  })

  $(document).on('click', '#btn-new-mail, #btn-reply-mail', function (e) {
    var deck = $('#mail-deck'),
      card = deck.find('.card-origin').clone().removeClass('card-origin hide')
    if ($(this).is($('#btn-reply-mail'))) {
      card.find('.mail-to').text('Reply')
    }
    if (deck.find('> .card').not('.hide').length > 2) {
      deck.find('> .card:last-child').remove()
    }

    deck.removeClass('hide').append(card)
    var option = {
      height: 150,
      toolbar: [
        ['style', ['bold', 'italic']],
        ['insert', ['link', 'picture']],
        ['para', ['ul', 'ol']],
      ],
    }
    lazyload.load(MODULE_CONFIG['summernote']).then(function () {
      card.find('.summernote').removeClass('summernote').summernote(option)
    })
  })

  $(document).on('click', nav_el + ' #newBtn', function (e) {
    var newField = $('#newField'),
      str = $.trim(newField.val()),
      label = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    if (label == '') {
      return
    }

    navList.add({
      name: label,
      link: link + label,
    })
    newField.val('')

    notie.confirm({
      text: 'Label "' + label + '" added',
      submitText: '',
      cancelText: 'Undo',
      cancelCallback: function () {
        navList.items.pop()
        navList.update()
        notie.alert({ type: 3, text: 'New label removed...' })
      },
    })

    $(document).trigger('refresh')
  })

  function update(list) {
    if (!list) return
    list.filter(function (item) {
      if (item.values().tag.indexOf(tagFilter) >= 0) {
        return true
      } else {
        return false
      }
    })

    list.update()
    $(list_el + ' .list').removeClass('hide')
    sr.reveal(
      list_el + ' .list-item',
      {
        origin: 'bottom',
        scale: 1,
        distance: '50px',
        afterReveal: function (el) {
          $(el).css('transform', 'none')
          if (!noticed) {
            notie.alert({ text: 'Try add some labels' })
            noticed = true
          }
        },
      },
      50
    )
  }

  function updateCount(count) {
    $('#count').text(count)
  }

  var init = function () {
    $(document).trigger('refresh')
    // nav
    navList = new List(nav_el.substr(1), {
      listClass: 'nav',
      item: '<li><a href class="link"><span class="nav-badge"><b class="badge badge-circle text-secondary mx-1"></b></span><span class="nav-text name"></span></a></li>',
      valueNames: ['name', 'badge', { name: 'link', attr: 'href' }],
    })

    // list
    if ($(list_el).length) {
      list = new List(list_el.substr(1), {
        valueNames: [{ data: ['id'] }, 'item-title', 'item-except', 'tag'],
        page: 10,
        pagination: true,
      })

      list.on('updated', function (list) {
        updateCount(list.matchingItems.length)
        if (list.matchingItems.length > 0) {
          $('.no-result').addClass('hide')
        } else {
          $('.no-result').removeClass('hide')
        }
      })

      updateCount(list.items.length)
      update(list)
    }
  }

  global.mail = { init: init }
})(this, jQuery)
