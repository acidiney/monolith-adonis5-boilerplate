(function (global, $) {
  "use strict";

  var list_el = "#invoice-list"
      ,link = "page.invoice.detail.html#"
      ,list
      ,noticed = false
      ;

  $(document).on('click', list_el+' #btn-trash', function(e){
    $('input[name="id"]:checked').each(function(){
      list.remove('id', $(this).val());
    });
  });

  $(document).on('click', '#save', function(e){
    notie.alert({
      text: 'New invoice added'
    });
  });

  function updateCount(count){
    $('#count').text(count);
  }

  var init = function(){
    $(document).trigger('refresh');

    // list
    if( $(list_el).length ){
      list = new List(list_el.substr(1), {
          valueNames: [
            { data: ['id'] },
            'item-company',
            'item-mail',
            'item-date',
            'item-amount',
            'item-badge'
          ],
          page: 10,
          pagination: true
      });

      list.on('updated', function (list) {
        updateCount(list.matchingItems.length);
        if (list.matchingItems.length > 0) {
          $('.no-result').addClass('hide');
        } else {
          $('.no-result').removeClass('hide');
        }
      });

      updateCount(list.items.length);
    }

    if(!noticed){
      notie.alert({text: 'Try input keyword to search invoice', position: 'top'});
      noticed = true;
    }

  }

  global.invoice = {init: init};

})(this, jQuery);
