(function (global, $) {
  "use strict";

  var list_el = "#list"
      ,tagStr = "all"
      ,catStr = "all"
      ,link = "single.html#"
      ,list
      ;
  $(document).on('click', '#filter-tag a', function(e){
      e.preventDefault();
      tagStr = $.trim($(this).text());
      select(this);
      if(tagStr.indexOf("All") >=0 ) tagStr="all";
      update(list);
  });

  $(document).on('click', '#filter-category a', function(e){
      e.preventDefault();
      catStr = $.trim($(this).text());
      select(this);
      if(catStr.indexOf("All") >=0 ) catStr="all";
      update(list);
  });

  $(document).on('click', '.dropdown-menu a', function(e){
      select(this);
  });

  function select(that){
    $(that).addClass('active text-primary').siblings().removeClass('active text-primary');
    $(that).parent().is('.dropdown-menu') && $(that).parent().siblings('button').find('span').text($(that).text());
  }

  function update(list){
    if(!list) return;
    list.filter(function (item) {
      var catFilter = false;
      var tagFilter = false;
      if(catStr == "all"){ 
        catFilter = true;
      } else {
        catFilter = item.values().category.indexOf(catStr) >= 0;
      }
      if(tagStr == "all"){
        tagFilter = true;
      } else {
        tagFilter = item.values().tag.indexOf(tagStr) >= 0;
      }
      return catFilter && tagFilter
    });

    list.update();
    $('.list', list_el).removeClass('hide');
    sr.sync();
  }

  var init = function(){
    $(document).trigger('refresh');
    tagStr = "all";
    catStr = "all";

    // list
    if( $(list_el).length ){
      list = new List(list_el.substr(1), {
          valueNames: [
            { data: ['id', 'tag', 'category'] },
            'author',
            'title',
            'num'
          ],
          page: $(list_el).attr('data-page') || 18,
          pagination: true
      });

      list.on('updated', function (list) {
        if (list.matchingItems.length > 0) {
          $('.no-result').addClass('hide');
        } else {
          $('.no-result').removeClass('hide');
        }
        sr.sync();
      });

      update(list);
    }

  }
  
  global.musicapp = {init: init};

})(this, jQuery);
