(function (global, $) {
	"use strict";

  var init = function(){
    var p = '<svg width="0" height="0"><defs><pattern id="map-pattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="3" style="stroke: none; fill: rgba(120,130,140, 0.3)"></circle></pattern></defs></svg>';
    // world map
    $('#jqvmap-world').each(function(){
      $(this).css('visibility', 'hidden');
      $(this).append(p);
      $(this).vectorMap(
          {
            map: 'world_en',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderWidth: 0.25,
            borderOpacity: 0.25,
            color: 'url(#map-pattern)',
            enableZoom: false,
            showTooltip: true,
            selectedColor: null,
            hoverColor: null,
            colors: {
              us: Utils.color(theme.color.primary, 0.5),
              ru: Utils.color(theme.color.info, 0.5),
              gb: theme.color.success,
              in: theme.color.warning
            }
          }
      );
      sr.reveal(this, {origin:'bottom', distance: '10vh', scale: 0.3, rotate: {x: 65}});
    })

    // usa map
    $('#jqvmap-usa').each(function(){
      $(this).vectorMap(
        {
          map: 'usa_en',
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0.25,
          borderOpacity: 0.25,
          color: 'rgba(120,130,140, 0.1)',
          enableZoom: false,
          showTooltip: true,
          selectedColor: null,
          hoverColor: null,
          colors: {
              ca: theme.color.primary,
              fl: theme.color.info,
              ny: theme.color.success,
              mo: Utils.color(theme.color.primary, 0.5),
              or: Utils.color(theme.color.warning, 0.5)
          }
        }
      );
    });

    // france map
    $('#jqvmap-france').each(function(){
      $(this).vectorMap(
        {
          map: 'france_fr',
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0.25,
          borderOpacity: 0.25,
          color: 'rgba(120,130,140, 0.1)',
          enableZoom: false,
          showTooltip: true,
          selectedColor: null,
          hoverColor: null,
          colors: {
              'fr-18': theme.color.primary,
              'fr-2b': theme.color.warning
          }
        }
      );
    });

  }

  // for ajax to init again
  global.vectorMap = {init: init};

})(this, jQuery);
