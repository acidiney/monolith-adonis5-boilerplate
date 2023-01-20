(function (global) {
  "use strict";

  var init = function(){
    $(document).on('mouseenter', '.feather-plus', function(){
      
    });
  }

  // for ajax to init again
  global.feathericon = {init: init};

  init();

})(this);
