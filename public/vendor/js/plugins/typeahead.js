(function ($) {
	"use strict";

  var init = function(){
    var el = $('.typeahead'), url = el.attr('data-api');
    
    el.removeAttr('data-plugin').typeahead('destroy').typeahead({
        classNames: {
          menu: 'dropdown-menu mt-3'
        }
      }, {
        display: 'name',
        source: new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            prefetch: url
          })
        ,
        templates: {
          suggestion: function(data) {
              var link = data.link || 'item.detail.html';
              var name = data.name || data.title;
              var desc = data.desc || data.subtitle;
              return '<a class="dropdown-item" href="'+link+'"><span class="d-block font-weight-500">' + name + '</span><small class="text-muted">'+desc+'</small></a>';
          }
        }
      }
    ).on('typeahead:rendered', function(obj, datum) {
        // for ajax
        $(document).trigger('refresh');
    });
  }
  // for ajax to init again
  $.fn.typeahead.init = init;

})(jQuery);
