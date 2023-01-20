/* eslint-disable */
function initTheme() {
  ;(function ($) {
    'use strict'

    window.theme = {
      color: {
        primary: '#448bff',
        info: '#14bae4',
        success: '#31c971',
        warning: '#f4c414',
        danger: '#f54394',
      },
      setting: {
        stickyHeader: true,
        stickyAside: true,
        foldedAside: false,
        hideAside: false,
        bg: '',
        header: 'bg-body',
        aside: 'bg-light',
      },
    }

    // ie
    if (!!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./)) {
      $('body').addClass('ie')
    }

    // iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
    var ua = window['navigator']['userAgent'] || window['navigator']['vendor'] || window['opera']
    if (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/.test(ua)) {
      $('body').addClass('touch')
    }

    // fix z-index on ios safari
    if (/iPhone|iPod|iPad/.test(ua)) {
      $(document, '.modal, .aside').on('shown.bs.modal', function (e) {
        var backDrop = $('.modal-backdrop')
        $(e.target).after($(backDrop))
      })
    }

    //resize
    $(window).on('resize', function () {
      var $w = $(window).width()
      var $lg = 1200
      var $md = 991
      var $sm = 768
      if ($w > $lg) {
        $('.aside-lg').modal('hide')
      }
      if ($w > $md) {
        $('#aside').modal('hide')
        $('.aside-md, .aside-sm').modal('hide')
      }
      if ($w > $sm) {
        $('.aside-sm').modal('hide')
      }
    })

    // mousewheel
    $('body').on('DOMMouseScroll mousewheel', function (e) {
      var $header = $('.scroll-header')
      if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
        $header.removeClass('scroll-up').addClass('scroll-down')
      } else {
        $header.removeClass('scroll-down').addClass('scroll-up')
      }
      if ($(window).scrollTop() == 0) {
        $header.removeClass('scroll-up scroll-down')
      }
    })

    // mousewheel
    $('.swapimg .handler').on('mousemove', function (e) {
      var offset = $(this).parent().offset()
      var X = Math.round(e.pageX - offset.left)
      console.log(X)
      $(this).parent().width(X)
    })

    // nav
    $(document).on('click', '[data-nav] a', function (e) {
      var $this = $(this)
      var $active
      var $li
      var $li_li

      $li = $this.parent()
      $li_li = $li.parents('li')

      $active = $li.closest('[data-nav]').find('.active')

      $li_li.addClass('active')
      ;($this.next().is('ul') && $li.toggleClass('active')) || $li.addClass('active')

      $active.not($li_li).not($li).removeClass('active')

      if ($this.attr('href') && $this.attr('href') != '#') {
        $(document).trigger('Nav:changed')
      }
    })

    // toggleClass
    $(document).on('click', '[data-toggle-class]', function (e) {
      var $self = $(this)
      var attr = $self.attr('data-toggle-class')
      var target = $self.attr('data-toggle-class-target') || $self.attr('data-target')
      var closest = $self.attr('data-target-closest')
      var classes = (attr && attr.split(',')) || ''
      var targets = (target && target.split(',')) || Array($self)
      var key = 0
      $.each(classes, function (index, value) {
        var target = closest
          ? $self.closest(targets[targets.length == 1 ? 0 : key])
          : $(targets[targets.length == 1 ? 0 : key])
        var current = target.attr('data-class')
        var _class = classes[index]
        current != _class && target.removeClass(target.attr('data-class'))
        target.toggleClass(classes[index])
        target.attr('data-class', _class)
        key++
      })
      $self.toggleClass('active')
      $self.attr('href') == '#' ? e.preventDefault() : ''
    })

    var init = function () {
      $('[data-toggle="popover"]').popover()
      $('[data-toggle="tooltip"]').tooltip()

      // init the plugin
      $(document).find('[data-plugin]').plugin()

      sr.reveal(
        '.sr .card, .sr .list-item, .sr .item, .sr .sr-item',
        {
          afterReveal: function (el) {
            $(el).css('transform', 'none').css('transition', 'none')
          },
        },
        50
      )
      sr.sync()

      typeof feather !== 'undefined' && feather.replace({ width: 16, height: 16 })

      // active nav item
      var url = window.location.pathname.split('/')
      if (url.length > 0) url = url[url.length - 1]
      $('[data-nav]:not(.auto-nav) li.active').removeClass('active')
      $('[data-nav]:not(.auto-nav) a')
        .filter(function () {
          return url == $(this).attr('href') && $(this).attr('href') !== '#'
        })
        .parents('li')
        .addClass('active')
    }

    window.sr = ScrollReveal()

    init()

    $(document).on('pjaxEnd', function () {
      init()
    })

    $(document).on('pjaxAddEl', function () {
      typeof feather !== 'undefined' && feather.replace({ width: 16, height: 16 })
    })

    // theme setting
    var namespace = theme.color.primary + '-setting'

    if (!store(namespace)) {
      store(namespace, theme.setting)
    } else {
      theme.setting = store(namespace)
    }

    var v = window.location.search.substring(1).split('&')

    for (var i = 0; i < v.length; i++) {
      var n = v[i].split('=')
      theme.setting[n[0]] = n[1] == 'true' || n[1] == 'false' ? n[1] == 'true' : n[1]
      store(namespace, theme.setting)
    }

    $(document).on('click.setting', '.setting input', function (e) {
      var $this = $(this)
      var $attr = $this.attr('name')
      theme.setting[$attr] = $this.is(':checkbox') ? $this.prop('checked') : $(this).val()
      store(namespace, theme.setting)
      setTheme(theme.setting)
    })

    setTheme()

    // set theme
    function setTheme() {
      var that = $('.setting')
      var body = $('html')
      var header = $('#header')
      var aside = $('#aside')
      // bg
      body
        .removeClass(body.attr('data-class'))
        .addClass(theme.setting.bg)
        .attr('data-class', theme.setting.bg)
      // header
      header
        .removeClass(header.attr('data-class'))
        .addClass(theme.setting.header)
        .attr('data-class', theme.setting.header)
      // aside
      aside
        .removeClass(aside.attr('data-class'))
        .addClass(theme.setting.aside)
        .attr('data-class', theme.setting.aside)
      // folded
      theme.setting.foldedAside ? aside.addClass('folded') : aside.removeClass('folded')
      theme.setting.hideAside ? aside.addClass('hide') : aside.removeClass('hide')
      // sticky header
      theme.setting.stickyHeader ? header.addClass('sticky') : header.removeClass('sticky')
      // sticky aside
      theme.setting.stickyAside ? aside.addClass('sticky') : aside.removeClass('sticky')

      that.find('input[name="foldedAside"]').prop('checked', theme.setting.foldedAside)
      that.find('input[name="hideAside"]').prop('checked', theme.setting.hideAside)
      that.find('input[name="stickyHeader"]').prop('checked', theme.setting.stickyHeader)
      that.find('input[name="stickyAside"]').prop('checked', theme.setting.stickyAside)

      that.find('input[name="bg"][value="' + theme.setting.bg + '"]').prop('checked', true)
    }

    // save setting to localstorage
    function store(namespace, data) {
      try {
        if (arguments.length > 1) {
          return localStorage.setItem(namespace, JSON.stringify(data))
        } else {
          var store = localStorage.getItem(namespace)
          return (store && JSON.parse(store)) || false
        }
      } catch (err) {}
    }
  })(jQuery)
}

initTheme()
