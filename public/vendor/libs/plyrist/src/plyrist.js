/**
 * 0.0.2
 * playlist for plyr
 * 
 * @ blackui.com All Rights Reserved.
 * Author url: blackui.com
 */

window.Plyrist = {};
window.Plyrists = [];

(function ($, undefined) {
  "use strict";
  
  Plyrist = function(el, items, options){
    var self = this;
    this.active = 0;
    this.repeat = false;
    this.shuffle = false;
    this.items = items || [];
    this.oitems = $.merge([],items);

    this.el = $.extend({}, this._el, el);
    this.options = $.extend(true, {}, this._options, options);

    $.each(this.el, function(key, value) {
      if(key !== 'playlist' && key !=='controls'){
        self.el[key] = self.el.playlist + ' ' + self.el[key];
      }
    });

    this._createControls();
    this._createItems();

    this.player = new Plyr(this.el.player, this.options);
    Plyrists.push(this.player);

    this.player.on('ready', event => {
        self._initEvents();
        self._initState();
    });

    this.player.on('play', event => {
      Plyrists.forEach(function(player) {
          if(player !== self.player){
            player.pause();
          }
      });
    });

    this.player.on('loadedmetadata', event => {
      var duration = $(this.el.playlist + ' .plyr__time--duration');
      this.player.duration == 'Infinity' ? duration.hide() : duration.show();
    });

    this.player.on('ended', function() {
      if(self.repeat){
        self._play(self.active);
      }else{
        if(self.items.length > 1){
          self.next();
        }else{
          self.player.restart();
        }
      }
    });

    this._init();
  }

  Plyrist.prototype = {
    _el: {
      playlist: '#playlist',
      player: "audio",
      items: '.plyr-list',
      item: '.plyr-item',
      itemHtml: '<div class="plyr-item"><div class="plyr-item-poster"></div><div class="flex"><div class="plyr-item-title h-1x"></div><div class="plyr-item-author text-sm text-fade"></div></div><button class="plyr-item-close close text">&times;</button></div>',
      itemTitle: '.plyr-item-title',
      itemAuhtor: '.plyr-item-author',
      itemPoster: '.plyr-item-poster',
      itemClose: '.plyr-item-close',
      poster: '.plyr__poster',
      title: '.plyr__title',
      author: '.plyr__author',
      prev: '[data-plyr="prev"]',
      next: '[data-plyr="next"]',
      like: '[data-plyr="like"]',
      shuffle: '[data-plyr="shuffle"]',
      repeat: '[data-plyr="repeat"]',
      list: '[data-plyr="list"]',
      controls: {
        prev: '<button type="button" class="plyr__control" data-plyr="prev"><svg role="presentation"><use xlink:href="#plyr-prev"></use></svg><span class="plyr__tooltip" role="tooltip">Prev</span></button>',
        play: '<button type="button" class="plyr__control" aria-pressed="false" aria-label="Play, {title}" data-plyr="play"><svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg><svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg><span class="label--pressed plyr__tooltip" role="tooltip">Pause</span><span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span></button>',
        next: '<button type="button" class="plyr__control" data-plyr="next"><svg role="presentation"><use xlink:href="#plyr-next"></use></svg><span class="plyr__tooltip" role="tooltip">Next</span></button>',
        poster: '<div class="plyr__poster"></div>',
        title: '<a class="plyr__title ajax" href="#"></a>',
        author: '<div class="plyr__author"></div>',
        progress: '<div class="plyr__progress"><input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek"><progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress><span role="tooltip" class="plyr__tooltip">00:00</span></div>',
        currentTime: '<div class="plyr__time plyr__time--current" aria-label="Current time">00:00</div>',
        duration: '<div class="plyr__time plyr__time--duration" aria-label="Duration">00:00</div>',
        mute: '<button type="button" class="plyr__control" aria-pressed="false" aria-label="Mute" data-plyr="mute"><svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg><svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg><span class="label--pressed plyr__tooltip" role="tooltip">Unmute</span><span class="label--not-pressed plyr__tooltip" role="tooltip">Mute</span></button>',
        volume: '<div class="plyr__volume"><input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume"></div>',
        like: '<button type="button" class="plyr__control" aria-pressed="false" data-plyr="like"><svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-liked"></use></svg><svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-like"></use></svg><span class="label--pressed plyr__tooltip" role="tooltip">Dislike</span><span class="label--not-pressed plyr__tooltip" role="tooltip">Like</span></button>',
        shuffle: '<button type="button" class="plyr__control" data-plyr="shuffle"><svg role="presentation"><use xlink:href="#plyr-shuffle"></use></svg><span class="plyr__tooltip" role="tooltip">Shuffle</span></button>',
        repeat: '<button type="button" class="plyr__control" data-plyr="repeat"><svg role="presentation"><use xlink:href="#plyr-repeat"></use></svg><span class="plyr__tooltip" role="tooltip">Repeat</span></button>',
        list: '<button type="button" class="plyr__control" data-plyr="list"><svg role="presentation"><use xlink:href="#plyr-list"></use></svg><span class="plyr__tooltip" role="tooltip">Playlist</span></button>'
      }
    },
    _options: {
      theme: 0,
      iconUrl: '../libs/plyrist/src/plyrist.svg',
      autoplay: true,
      hideControls: false,
      fullscreen:{ enabled: false }
    },
    _init: function(){
      var self = this;
      if(self.options.autoplay) {
        self._play(self.active);
      }else{
        self.select(self.active);
      }
    },
    _initState: function(){
      // to fix css when use audio player to play video
      $('.plyr--video', this.el.playlist+'.plyrist_audio').addClass('plyr--audio');
      this.shuffle ? $(this.el.shuffle).addClass('is--shuffle') : $(this.el.shuffle).removeClass('is--shuffle');
      this.repeat ? $(this.el.repeat).addClass('is--repeat') : $(this.el.repeat).removeClass('is--repeat');
    },
    _initEvents: function() {
      var self = this;

      $(this.el.prev).off().on('click', function(){
        self.prev();
      });

      $(this.el.next).off().on('click', function(){
        self.next();
      });

      $(this.el.like).off().on('click', function(){
        $(this).attr('aria-pressed', $(this).attr('aria-pressed') == 'true' ? 'false' : 'true');
      });

      $(this.el.shuffle).off().on('click', function(){
        self.shuffle = ! self.shuffle;
        self._initState();
      });

      $(this.el.repeat).off().on('click', function(){
        self.repeat = ! self.repeat;
        self._initState();
      });

      $(this.el.list).off().on('click', function(){
        $(self.el.playlist).toggleClass('open');
      });
    },
    _createControls: function(){
      if(this.options.controls) return;
      switch(this.options.theme){
        case 0:
            this.options.controls = this._buildControls([
              this.el.controls.prev,
              this.el.controls.play,
              this.el.controls.next,
              this.el.controls.poster,
              '<div class="plyr__col">',
              '<div class="plyr__row">',
              '<div class="plyr__info plyr__row">',
              this.el.controls.title,
              this.el.controls.author,
              '</div>',
              this.el.controls.currentTime,
              this.el.controls.duration,
              '</div>',
              this.el.controls.progress,
              '</div>',
              this.el.controls.mute,
              this.el.controls.volume,
              this.el.controls.like,
              this.el.controls.repeat,
              this.el.controls.shuffle,
              this.el.controls.list
            ]);
            break;
        case 1:
            this.options.controls = this._buildControls([
              this.el.controls.poster,
              '<div class="plyr__col">',
              this.el.controls.title,
              this.el.controls.author,
              '<div class="plyr__row">',
              this.el.controls.play,
              this.el.controls.prev,
              this.el.controls.next,
              '<div class="plyr__row"></div>',
              this.el.controls.mute,
              this.el.controls.volume,
              this.el.controls.like,
              this.el.controls.repeat,
              this.el.controls.shuffle,
              this.el.controls.list,
              '</div>',
              '<div class="plyr__row">',
              this.el.controls.progress,
              this.el.controls.currentTime,
              this.el.controls.duration,
              '</div>',
              '</div>'
            ]);
            break;
        case 2:
            this.options.controls = this._buildControls([
              this.el.controls.progress,
              this.el.controls.poster,
              '<div class="plyr__col plyr__info">',
              this.el.controls.title,
              this.el.controls.author,
              '</div>',
              this.el.controls.repeat,
              this.el.controls.prev,
              this.el.controls.play,
              this.el.controls.next,
              this.el.controls.shuffle,
              this.el.controls.like,
              '<div class="plyr__row"></div>',
              this.el.controls.currentTime,
              this.el.controls.duration,
              this.el.controls.mute,
              this.el.controls.volume,
              this.el.controls.list
            ]);
            break;
        default:
            break;
      }
      $(this.el.playlist).addClass('plyrist-theme-'+this.options.theme);
    },
    _buildControls: function(arr){
      var self = this;
      if(self.options.iconUrl){
        $.each(arr, function(key, value) {
          arr[key] = value.replace(/xlink:href="/g, 'xlink:href="'+self.options.iconUrl);
        });
      }
      return '<div class="plyr__controls">'+arr.join('')+'</div>';
    },
    _createItems: function() {
      var self = this;
      //get items from html
      if($(this.el.item).length > 0){
        $(this.el.item).map(function(i) {
          var item = $(this);
          self._initItemEvent(item);
          self.items.push(
            {
              id: item.attr("data-id"),
              title: item.find(self._el.itemTitle).text(),
              author: item.find(self._el.itemAuhtor).text(),
              type: item.attr("data-type"),
              source: item.attr("data-source"),
              provider: item.attr("data-provider"),
              poster: item.attr("data-poster"),
              el: item
            }
          );
        });
      }

      // build item html from array
      $.each(self.oitems, function(key, item) {
        self._buildItem(item);
      });
    },
    _buildItem: function(item){
      var el = $(this._el.itemHtml);
      el.attr('data-id', item.id);
      el.find(this._el.itemPoster).css('background-image', item.poster);
      el.find(this._el.itemTitle).text(item.title);
      el.find(this._el.itemAuhtor).text(item.author);

      item.el = el;
      $(this.el.items).append(item.el);
      this._initItemEvent(item.el);
      return item;
    },
    _initItemEvent: function(item){
      var self = this;
      $(item).on("click", function(e) {
        var id = $(this).attr('data-id');
        var i = self.getIndex(id);
        if($(e.target).is('.plyr-item-close')){
          e.preventDefault();
          self._removeItem({id: id});
          return;
        }
        if (!$(this).hasClass("active")) {
          self.active = i;
          self._play(i);
        }
      });
    },
    _addItem: function(item){
      var item = this._buildItem(item);
      this.items.push(item);
    },
    _removeItem: function(item){
      var self = this;
      if(item.id == null){
        return;
      }
      var index = this.getIndex(item.id);
      if(index > -1){
        this.items[index].el.remove();
        this.items.splice(index, 1);
        if(this.active == index){
          this.setIndex(self.active, function() {
            self._play(self.active);
          });
        }
      }
    },
    _play: function(index) {
      if(!this.items[index]) return;
      var source = this.items[index] && {
        type: this.items[index]['type'],
        sources: [
          {
            src: this.items[index]["source"],
            provider: this.items[index]["provider"]
          }
        ]
      };
      this.active = index;
      this.player.source = source;
      this.player.play();
      this.select(this.active);
    },
    getItems: function(){
      return this.items;
    },
    setItems: function(items){
      var self = this;
      this.items = items;
      $.each(self.items, function(key, item) {
        self._buildItem(item);
      });
    },
    select: function(index){
      var item = this.items[this.active];
      $(this.el.item).removeClass('active');
      $(this.el.title).html(item.title);
      $(this.el.title).attr('href',item.uri);
      $(this.el.author).html(item.author);
      $(this.el.poster).css('background-image','url('+item.poster+')');
      item.el.addClass('active');
      $(document).trigger('refresh');
    },
    setIndex: function(index, callback) {
      this.active =
        index > this.items.length - 1
          ? 0
          : index < 0 ? this.items.length - 1 : index;

      if(this.shuffle){
        this.active = Math.floor(Math.random() * this.items.length);
      }
      if(callback) {
        callback();
      }
    },
    getIndex: function(id){
      for(var i=0; i<this.items.length; i++){
        if(this.items[i].id===id){
            return i;
        }
      }
      return -1;
    },
    getCurrent: function(){
      return this.items[this.active];
    },
    play: function(item, callback){
      var index = this.getIndex(item.id);
      if(index > -1){
        if(index !== this.active){
          this._play(index);
        }else{
          this.player.togglePlay();
        }
      }else{
        this.add(item, true);
      }
      if(callback) {
        callback();
      }
    },
    prev: function() {
      var self = this;
      this.setIndex(self.active - 1, function() {
        self._play(self.active);
      });
    },
    next: function() {
      var self = this;
      this.setIndex(self.active + 1, function() {
        self._play(self.active);
      });
    },
    add: function(item, play){
      this._addItem(item);
      if(play == true){
        this._play(this.items.length - 1);
      }
    },
    remove: function(id){
      this._removeItem({id: id});
    }
  }

})(jQuery);
