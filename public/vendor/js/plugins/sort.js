(function (global) {
  "use strict";

  var init = function(){
    sortable('#sortable', 
      {
        forcePlaceholderSize: true,
        placeholderClass: 'list-item',
      }
    );

    // with handle
    sortable('#sortable-handle',
      {
        forcePlaceholderSize: true,
        placeholderClass: 'list-item',
        handle: '.js-handle'
      }
    );

    // sortable table
    sortable('#sortable-table');
  }

  // for ajax to init again
  global.sort = {init: init};

})(this);
