;(function ($) {
  'use strict'

  var calendar
  var e
  var noticed = false
  var option = {
    header: {
      left: 'title, prev, next',
      center: '',
      right: '',
    },
    contentHeight: 'auto',
    defaultView: 'agendaWeek',
    defaultDate: moment().format('YYYY-MM-DD'),
    editable: false,
    locale: 'pt',
    eventLimit: false,
    viewRender: function (view, element) {
      // style
      element.find('th.fc-day-header.fc-widget-header').each(function () {
        if ($(this).data('date')) {
          var date = moment($(this).data('date'))
          $(this).html(
            '<span>' +
              date.format('D') +
              '</span><span class="fc-week-title">' +
              date.format('dddd') +
              '</span>'
          )
        }
      })
    },
    eventRender: function (event, element) {
      // render
      element
        .find('.fc-content')
        .append('<div class="mt-1 text-muted">' + event.description + '</div>')
      element
        .find('.fc-content')
        .append('<div class="d-flex my-3 avatar-group">' + getParticipant(event, 24) + '</div>')
    },
  }

  function setupEvents() {
    $(document).on('click', '#dayview', function () {
      calendar.fullCalendar('changeView', 'agendaDay')
      sr.sync()
    })

    $(document).on('click', '#weekview', function () {
      calendar.fullCalendar('changeView', 'agendaWeek')
      sr.sync()
    })

    $(document).on('click', '#monthview', function () {
      calendar.fullCalendar('changeView', 'month')
      sr.sync()
    })

    $(document).on('click', '#todayview', function () {
      calendar.fullCalendar('today')
      sr.sync()
    })

    $(document).on('click', '#btn-save', function () {
      var e = getEvent()
      if (e.id) {
        calendar.fullCalendar('updateEvent', e)
      } else {
        e.id = moment().toDate()
        calendar.fullCalendar('renderEvent', e)
      }
      $('#newEvent').modal('hide')
    })
  }

  function getParticipant(event, size) {
    var participant = ''
    var size = size || 24
    $.each(event.participant.split(','), function (index, value) {
      participant +=
        '<a href="#" class="avatar w-' + size + '"><img src="/vendor/img/a' + value + '.jpg"></a>'
    })
    return participant
  }

  var init = function () {
    $.ajax('/vendor/api/fullcalendar.json').done(function (data) {
      // make up the start / end date
      $.each(data, function (index, item) {
        item.start = moment()
          .startOf('week')
          .add(index, 'd')
          .add(Math.floor(Math.random() * 10 + 1) - index, 'h')
          .add(index * 5, 'm')
        item.end = moment(item.start).add(Math.floor(Math.random() * 10 + 3) + index / 3, 'h')
      })
      option.events = data
      calendar = $('#fullcalendar').fullCalendar(option)

      sr.reveal('#fullcalendar', {
        viewFactor: 0,
        delay: 10,
        origin: 'left',
        distance: '100vw',
        scale: 1,
      })

      setupEvents()
    })
  }

  // for ajax to init again
  $.fn.fullCalendar.init = init
})(jQuery)
