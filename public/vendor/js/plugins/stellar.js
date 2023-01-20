(function ($) {
	"use strict";

  var init = function(){
    $.stellar( 'destroy' );
    $.stellar({
      horizontalScrolling: false,
      verticalOffset: 60
    });
  }

  // for ajax to init again
  $.fn.stellar.init = init;

})(jQuery);
