(function ($) {
	"use strict";

    var init = function(){
        var table = $('#table').bootstrapTable({
            buttonsClass: 'white',
            icons: {
                columns: 'icon-column',
                export: 'icon-export'
            }
        });
        $('#table').on( 'click', '.trash', function () {
            var id = $(this).closest('tr').find('td:first').html();
            console.log(id);
            table.bootstrapTable('remove', {
                field: 'id', 
                values: [id]
            });
        } );
    }

    // for ajax to init again
    $.fn.bootstrapTable.init = init;

})(jQuery);
