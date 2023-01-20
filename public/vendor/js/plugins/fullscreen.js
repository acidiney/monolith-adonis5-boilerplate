(function ($) {
	"use strict";

	$(document).on('click', '[data-toggle="fullscreen"]', function (e) {
	    e.preventDefault();
	    $(document).toggleFullScreen();
	});

  	function fullscreenchange() {
		if ($(document).fullScreen() !== false) {
			$('body').addClass('is-fullscreen');
			$('[data-toggle="fullscreen"]').addClass('active');
		}else{
			$('body').removeClass('is-fullscreen');
			$('[data-toggle="fullscreen"]').removeClass('active');
		}
	}

	$(document).bind('fullscreenchange', fullscreenchange);

})(jQuery);
