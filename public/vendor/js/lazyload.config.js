// lazyload config
var MODULE_CONFIG = {
  fullscreen: [
    '/vendor/libs/jquery-fullscreen-plugin/jquery.fullscreen-min.js',
    '/vendor/js/plugins/fullscreen.js',
  ],
  chartist: [
    '/vendor/libs/chartist/dist/chartist.min.css',
    '/vendor/libs/chartist/dist/chartist.min.js',
    '/vendor/libs/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.min.js',
    '/vendor/libs/chartist/dist/chartist.ext.js',
    '/vendor/js/plugins/chartist.js',
  ],
  vectorMap: [
    '/vendor/libs/jqvmap/dist/jqvmap.min.css',
    '/vendor/libs/jqvmap/dist/jquery.vmap.js',
    '/vendor/libs/jqvmap/dist/maps/jquery.vmap.world.js',
    '/vendor/libs/jqvmap/dist/maps/jquery.vmap.usa.js',
    '/vendor/libs/jqvmap/dist/maps/jquery.vmap.france.js',
    '/vendor/js/plugins/jqvmap.js',
  ],
}

var MODULE_OPTION_CONFIG = {
  parsley: {
    errorClass: 'is-invalid',
    successClass: 'is-valid',
    errorsWrapper: '<ul class="list-unstyled text-sm mt-1 text-muted"></ul>',
  },
}
