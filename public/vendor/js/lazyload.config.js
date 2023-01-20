// lazyload config
var MODULE_CONFIG = {
  chat: [
    '/vendor/libs/list.js/dist/list.js',
    '/vendor/libs/notie/dist/notie.min.js',
    '/vendor/js/plugins/notie.js',
    '/vendor/js/app/chat.js',
  ],
  mail: [
    '/vendor/libs/list.js/dist/list.js',
    '/vendor/libs/notie/dist/notie.min.js',
    '/vendor/js/plugins/notie.js',
    '/vendor/js/app/mail.js',
  ],
  user: [
    '/vendor/libs/list.js/dist/list.js',
    '/vendor/libs/notie/dist/notie.min.js',
    '/vendor/js/plugins/notie.js',
    '/vendor/js/app/user.js',
  ],
  search: ['/vendor/libs/list.js/dist/list.js', '/vendor/js/app/search.js'],
  invoice: [
    '/vendor/libs/list.js/dist/list.js',
    '/vendor/libs/notie/dist/notie.min.js',
    '/vendor/js/app/invoice.js',
  ],
  musicapp: ['/vendor/libs/list.js/dist/list.js', '/vendor/js/plugins/musicapp.js'],
  fullscreen: [
    '/vendor/libs/jquery-fullscreen-plugin/jquery.fullscreen-min.js',
    '/vendor/js/plugins/fullscreen.js',
  ],
  jscroll: ['/vendor/libs/jscroll/dist/jquery.jscroll.min.js'],
  countTo: ['/vendor/libs/jquery-countto/jquery.countTo.js'],
  stick_in_parent: ['/vendor/libs/sticky-kit/dist/sticky-kit.min.js'],
  stellar: ['/vendor/libs/jquery.stellar/jquery.stellar.min.js', '/vendor/js/plugins/stellar.js'],
  masonry: ['/vendor/libs/masonry-layout/dist/masonry.pkgd.min.js'],
  slick: [
    '/vendor/libs/slick-carousel/slick/slick.css',
    '/vendor/libs/slick-carousel/slick/slick-theme.css',
    '/vendor/libs/slick-carousel/slick/slick.min.js',
  ],
  sort: ['/vendor/libs/html5sortable/dist/html.sortable.min.js', '/vendor/js/plugins/sort.js'],
  apexcharts: [
    '/vendor/libs/apexcharts/dist/apexcharts.min.js',
    '/vendor/js/plugins/apexcharts.js',
  ],
  chartjs: [
    '/vendor/libs/moment/min/moment-with-locales.min.js',
    '/vendor/libs/chart.js/dist/Chart.min.js',
    '/vendor/libs/chart.js/dist/chart.ext.js',
    '/vendor/js/plugins/chartjs.js',
  ],
  chartist: [
    '/vendor/libs/chartist/dist/chartist.min.css',
    '/vendor/libs/chartist/dist/chartist.min.js',
    '/vendor/libs/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.min.js',
    '/vendor/libs/chartist/dist/chartist.ext.js',
    '/vendor/js/plugins/chartist.js',
  ],
  dataTable: [
    '/vendor/libs/datatables/media/js/jquery.dataTables.min.js',
    '/vendor/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
    '/vendor/libs/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
    '/vendor/js/plugins/datatable.js',
  ],
  bootstrapTable: [
    '/vendor/libs/bootstrap-table/dist/bootstrap-table.min.js',
    '/vendor/libs/bootstrap-table/dist/extensions/export/bootstrap-table-export.min.js',
    '/vendor/libs/bootstrap-table/dist/extensions/mobile/bootstrap-table-mobile.min.js',
    '/vendor/js/plugins/tableExport.min.js',
    '/vendor/js/plugins/bootstrap-table.js',
  ],
  bootstrapWizard: ['/vendor/libs/twitter-bootstrap-wizard/jquery.bootstrap.wizard.min.js'],
  dropzone: [
    '/vendor/libs/dropzone/dist/min/dropzone.min.js',
    '/vendor/libs/dropzone/dist/min/dropzone.min.css',
  ],
  typeahead: [
    '/vendor/libs/typeahead.js/dist/typeahead.bundle.min.js',
    '/vendor/js/plugins/typeahead.js',
  ],
  datepicker: [
    '/vendor/libs/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
    '/vendor/libs/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css',
  ],
  daterangepicker: [
    '/vendor/libs/daterangepicker/daterangepicker.css',
    '/vendor/libs/moment/min/moment-with-locales.min.js',
    '/vendor/libs/daterangepicker/daterangepicker.js',
  ],
  fullCalendar: [
    '/vendor/libs/moment/min/moment-with-locales.min.js',
    '/vendor/libs/fullcalendar/dist/fullcalendar.min.js',
    '/vendor/libs/fullcalendar/dist/fullcalendar.min.css',
    '/vendor/libs/notie/dist/notie.min.js',
    '/vendor/js/plugins/notie.js',
    '/vendor/js/app/calendar.js',
  ],
  parsley: ['/vendor/libs/parsleyjs/dist/parsley.min.js'],
  select2: [
    '/vendor/libs/select2/dist/css/select2.min.css',
    '/vendor/libs/select2/dist/js/select2.min.js',
    '/vendor/js/plugins/select2.js',
  ],
  summernote: [
    '/vendor/libs/summernote/dist/summernote.css',
    '/vendor/libs/summernote/dist/summernote-bs4.css',
    '/vendor/libs/summernote/dist/summernote.min.js',
    '/vendor/libs/summernote/dist/summernote-bs4.min.js',
  ],
  vectorMap: [
    '/vendor/libs/jqvmap/dist/jqvmap.min.css',
    '/vendor/libs/jqvmap/dist/jquery.vmap.js',
    '/vendor/libs/jqvmap/dist/maps/jquery.vmap.world.js',
    '/vendor/libs/jqvmap/dist/maps/jquery.vmap.usa.js',
    '/vendor/libs/jqvmap/dist/maps/jquery.vmap.france.js',
    '/vendor/js/plugins/jqvmap.js',
  ],
  plyr: [
    '/vendor/libs/plyrist/src/plyrist.css',
    '/vendor/libs/plyr/dist/plyr.polyfilled.min.js',
    '/vendor/libs/wavesurfer.js/dist/wavesurfer.min.js',
    '/vendor/libs/plyrist/src/plyrist.js',
    '/vendor/js/plugins/plyr.js',
  ],
}

var MODULE_OPTION_CONFIG = {
  parsley: {
    errorClass: 'is-invalid',
    successClass: 'is-valid',
    errorsWrapper: '<ul class="list-unstyled text-sm mt-1 text-muted"></ul>',
  },
}
