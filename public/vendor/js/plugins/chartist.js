(function (global) {
  "use strict";
  var init = function(){
  	var c_l = document.querySelector('#chartist-line');
    c_l && new Chartist.Line(c_l, {
	  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
	  series: [
	  	{value: [12, 9, 7, 8, 5], className: 'ct-series-a ct-stroke-3', meta: 'Google'},
	  	{value: [3, 1.5, 3.5, 6, 3], className: 'ct-series-e ct-stroke-4', meta: 'Facebook'},
	  	{value: [1, 3, 4, 5, 6], className: 'ct-series-h ct-stroke-5', meta: 'Twitter'}
	  ]
	}, {
	  fullWidth: true,
	  chartPadding: {
	    right: 40
	  },
	  plugins: [
	    Chartist.plugins.tooltip(),
	    Chartist.plugins.animate({grid: true, label: true})
	  ]
	});

    var c_l_a = document.querySelector('#chartist-line-area');
	c_l_a && new Chartist.Line(c_l_a, {
	  labels: [1, 2, 3, 4, 5, 6, 7, 8],
	  series: [
	    {value: [1, 2, 3, 1, -2, 0, 1, 0], className: 'ct-series-a', meta: 'Google'},
	    {value: [-2, -1, -2, -1, -2.5, -1, -2, -1], className: 'ct-series-b', meta: 'Apple'},
	    {value: [0, 0, 0, 1, 2, 2.5, 2, 1], className: 'ct-series-c', meta: 'Microsoft'},
	    {value: [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5], className: 'ct-series-h', meta: 'Tesla'}
	  ]
	}, {
  	  showArea: true,
  	  showPoint: true,
  	  showLine: false,
  	  fullWidth: true,
	  axisX: {
	    showLabel: false,
	    showGrid: false
	  },
  	  lineSmooth: Chartist.Interpolation.simple({
	    divisor: 2
	  }),
	  plugins: [
	  	Chartist.plugins.tooltip(),
	    Chartist.plugins.animate()
	  ]
	});

	var c_b = document.querySelector('#chartist-bar');
	c_b && new Chartist.Bar(c_b, {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		series: [
		    {value: [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8], className: 'ct-series-a ct-stroke-4', meta: 'Facebook'},
		    {value: [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4], className: 'ct-series-g ct-stroke-4', meta: 'Twitter'}
		]
	},{
		seriesBarDistance: 8,
		plugins: [
		    Chartist.plugins.tooltip(),
	    	Chartist.plugins.animate()
		]
	});
	var c_h_b = document.querySelector('#chartist-h-bar');
	c_h_b && new Chartist.Bar(c_h_b, {
	  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	  series: [
	    {value: [5, 4, 3, 7, 5, 10, 3], className: 'ct-series-c ct-stroke-3', meta: 'Google'},
	    {value: [3, 2, 9, 5, 4, 6, 4], className: 'ct-series-h ct-stroke-3', meta: 'Bing'}
	  ]
	}, {
	  seriesBarDistance: 6,
	  horizontalBars: true,
	  axisY: {
	    offset: 70
	  },
	  plugins: [
	    Chartist.plugins.tooltip(),
	    Chartist.plugins.animate()
	  ]
	});

	var c_p = document.querySelector('#chartist-pie');
	c_p && new Chartist.Pie(c_p, {
		labels: ['Bananas', 'Apples', 'Grapes'],
		  series: [{
		     value: 4,
		     className: 'ct-series-a'
		   }, {
		     value: 3,
		     className: 'ct-series-b'
		   },{
		     value: 5,
		     className: 'ct-series-g'
		   }]
		}
	  , {
	  donut: true,
	  donutWidth: 80,
	  chartPadding: 40,
	  labelOffset: 60,
	  labelDirection: 'explode',
	  labelInterpolationFnc: function(value) {
	      return value;
	  },
	  plugins: [
	    Chartist.plugins.tooltip(),
	    Chartist.plugins.animate()
	  ]
	});

	var c_d = document.querySelector('#chartist-dougnut');
	c_d && new Chartist.Pie(c_d, {
	  series: [{
	     value: 20,
	     className: 'ct-series-k',
	     meta: 'Apples'
	   }, {
	     value: 10,
	     className: 'ct-series-l',
	     meta: 'Grapes'
	   }, {
	     value: 70,
	     className: 'ct-series-g',
	     meta: 'Bananas'
	   }]
	}, {
	  donut: true,
	  donutWidth: 20,
	  startAngle: 270,
	  showLabel: true,
	  chartPadding: 45,
	  labelOffset: 30,
   	  labelDirection: 'explode',
	  plugins: [
	    Chartist.plugins.tooltip(),
	    Chartist.plugins.animate()
	  ]
	});

	var c_g = document.querySelector('#chartist-gauge');
	c_g && new Chartist.Pie(c_g, {
		labels: ['Directly', 'AD', 'Referral'],
		series: [{
	     value: 40,
	     className: 'ct-series-a'
	   }, {
	     value: 50,
	     className: 'ct-series-f'
	   }, {
	     value: 70,
	     className: 'ct-series-n'
	   }]
	}, {
		donut: true,
		donutWidth: 8,
		startAngle: 280,
		showLabel: true,
		chartPadding: 30,
		labelOffset: 20,
	    labelDirection: 'explode',
	    labelInterpolationFnc: function(value) {
	      return value;
	    },
	  plugins: [
	    Chartist.plugins.tooltip(),
	    Chartist.plugins.animate()
	  ]
	});

  }

  global.chartist = {init: init};

})(this);
