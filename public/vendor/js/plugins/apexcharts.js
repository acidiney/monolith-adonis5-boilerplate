(function (global) {
  "use strict";
  Apex.colors = [theme.color.primary, theme.color.success, theme.color.info, theme.color.warning, theme.color.danger];

  var init = function(){
  	
  	// line
  	var options = {
        chart: {
            height: 240,
            type: 'line',
            shadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 1
            },
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        series: [{
                name: "High - 2013",
                data: [28, 29, 33, 36, 32, 32, 33]
            },
            {
                name: "Low - 2013",
                data: [12, 11, 14, 18, 17, 13, 13]
            }
        ],
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['rgba(130,140,150,0.1)', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        markers: {
            
            size: 6
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: {
                text: 'Month'
            }
        },
        yaxis: {
            title: {
                text: 'Temperature'
            },
            min: 5,
            max: 40
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    }

    var chart = new ApexCharts(
        document.querySelector("#a-c-1"),
        options
    );

    chart.render();

    // Area 
    var options = {
    	chart: {
	        height: 240,
	        type: 'area',
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        series: [{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
        }, {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41]
        }],

        xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00", "2018-09-19T01:30:00", "2018-09-19T02:30:00", "2018-09-19T03:30:00", "2018-09-19T04:30:00", "2018-09-19T05:30:00", "2018-09-19T06:30:00"],                
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        }
    };

    var chart = new ApexCharts(
        document.querySelector("#a-c-2"),
        options
    );

    chart.render();

    // column
	var options = {
        chart: {
            height: 240,
            type: 'bar',
            toolbar: { 
                show: false
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'	
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        series: [{
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }],
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
            title: {
                text: '$ (thousands)'
            }
        },
        fill: {
            opacity: 1

        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    }

    var chart = new ApexCharts(
        document.querySelector("#a-c-3"),
        options
    );

    chart.render();

    // bar
    var options = {
        chart: {
            height: 240,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top',
            },
        }  
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff']
            }
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['transparent']
        },
        series: [{
            data: [44, 55, 41, 64]
        },{
            data: [53, 32, 33, 52]
        }],
        xaxis: {
            categories: [2001, 2002, 2003, 2004],
        },
    }

    var chart = new ApexCharts(
        document.querySelector("#a-c-4"),
        options
    );
    
    chart.render();

    // pie
    var options = {
        chart: {
            height: 240,
            type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C'],
        series: [44, 35, 13],
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }

    var chart = new ApexCharts(
        document.querySelector("#a-c-5"),
        options
    );

    chart.render();

    // donut
    var options = {
        chart: {
        	height: 240,
            type: 'donut',
        },
        series: [44, 55, 41],
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }

    var chart = new ApexCharts(
        document.querySelector("#a-c-6"),
        options
    );
    
    chart.render();

    // radar
    var options = {
        chart: {
            height: 293,
            type: 'radar',
            toolbar: { 
                show: false
            },
        },
        series: [{
            name: 'Series 1',
            data: [80, 50, 30, 40, 100, 20],
        }],
        plotOptions: {
          radar: {
            polygons: {
              strokeColors: ['rgba(130,140,150,0.1)','rgba(130,140,150,0.1)','rgba(130,140,150,0.1)','rgba(130,140,150,0.1)','rgba(130,140,150,0.1)'],
              connectorColors: 'rgba(130,140,150,0.1)',
              fill: {
                  colors: ['rgba(130,140,150,0.05)', 'transparent']
              }
            }
          }
        },
        labels: ['January', 'February', 'March', 'April', 'May', 'June']
    }

    var chart = new ApexCharts(
        document.querySelector("#a-c-7"),
        options
    );

    chart.render();

    // radarbars
    var options = {
        chart: {
            height: 320,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: '22px',
                    },
                    value: {
                        fontSize: '16px',
                    },
                    total: {
                        show: true,
                        label: 'Total',
                        formatter: function (w) {
                            // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                            return 249
                        }
                    }
                },
                track: {
                  background: 'rgba(130,140,150,0.1)'
                }
            }
        },
        series: [44, 55, 67, 83],
        labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
    }

    var chart = new ApexCharts(
        document.querySelector("#a-c-8"),
        options
    );
    
    chart.render();

    // Bubble
    function generateData(baseval, count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

            series.push([x, y, z]);
            baseval += 86400000;
            i++;
        }
        return series;
    }

    var options = {
        chart: {
            height: 350,
            type: 'bubble',
            foreColor: 'inherit',
            toolbar: {
                show: false
            },
        },
        dataLabels: {
            enabled: false
        },
        series: [{
                name: 'Bubble1',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Bubble2',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Bubble3',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Bubble4',
                data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            }
        ],
        fill: {
            opacity: 0.8
        },
        xaxis: {
            tickAmount: 12,
            type: 'category',
        },
        yaxis: {
            max: 70
        }
    }

    var chart = new ApexCharts(
        document.querySelector("#a-c-9"),
        options
    );

    chart.render();

    // scatter
    var options = {
        chart: {
            height: 350,
            type: 'scatter',
            foreColor: 'inherit',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: true,
                type: 'xy'
            }
        },
        
        series: [{
            name: "A",
            data: [
            [16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2], [10.9, 7.4], [10.9, 0], [10.9, 8.2], [16.4, 0], [16.4, 1.8], [13.6, 0.3], [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7], [10.9, 5.2], [16.4, 6.5], [10.9, 0], [24.5, 7.1], [10.9, 0], [8.1, 4.7], [19, 0], [21.7, 1.8], [27.1, 0], [24.5, 0], [27.1, 0], [29.9, 1.5], [27.1, 0.8], [22.1, 2]]
        },{
            name: "B",
            data: [
            [36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [1.9, 13.2], [1.4, 7], [6.4, 8.8], [3.6, 4.3], [1.6, 10], [9.9, 2], [7.1, 15], [1.4, 0], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [0.1, 14.7], [9, 10], [12.7, 11.8], [2.1, 10], [2.5, 10], [27.1, 10], [2.9, 11.5], [7.1, 10.8], [2.1, 12]]
        },{
            name: "C",
            data: [
            [21.7, 3], [23.6, 3.5], [24.6, 3], [29.9, 3], [21.7, 20], [23, 2], [10.9, 3], [28, 4], [27.1, 0.3], [16.4, 4], [13.6, 0], [19, 5], [22.4, 3], [24.5, 3], [32.6, 3], [27.1, 4], [29.6, 6], [31.6, 8], [21.6, 5], [20.9, 4], [22.4, 0], [32.6, 10.3], [29.7, 20.8], [24.5, 0.8], [21.4, 0], [21.7, 6.9], [28.6, 7.7], [15.4, 0], [18.1, 0], [33.4, 0], [16.4, 0]]
        }],
        xaxis: {
            tickAmount: 10,
            labels: {
                formatter: function(val) {
                    return parseFloat(val).toFixed(1)
                }
            }
        },
        yaxis: {
            tickAmount: 7
        }
    }

    var chart = new ApexCharts(
        document.querySelector("#a-c-10"),
        options
    );
    
    chart.render();

    // heatmap
    function geneData(count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = (i + 1).toString();
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push({
          x: x,
          y: y
        });
        i++;
      }
      return series;
    }
    var options = {
      chart: {
        height: 240,
        type: 'heatmap',
        toolbar: {
            show: false
        }
      },
      stroke: {
        width: 0
      },
      plotOptions: {
        heatmap: {
          radius: 30,
          enableShades: false,
          colorScale: {
            ranges: [{
                from: 0,
                to: 50,
                color: '#008FFB'
              },
              {
                from: 51,
                to: 100,
                color: '#00E396'
              },
            ],
          },

        }
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#fff']
        }
      },
      series: [{
          name: 'Metric1',
          data: geneData(15, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric2',
          data: geneData(15, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric3',
          data: geneData(15, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric4',
          data: geneData(15, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric5',
          data: geneData(15, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric6',
          data: geneData(15, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric7',
          data: geneData(15, {
            min: 0,
            max: 90
          })
        }
      ],

      xaxis: {
        type: 'category',
      },

    }

    var chart = new ApexCharts(
      document.querySelector("#a-c-11"),
      options
    );

    chart.render();

    // sparkline
    window.Apex = {
      stroke: {
        width: 2
      },
      markers: {
        size: 0
      },
      tooltip: {
        fixed: {
          enabled: true,
        }
      }
    };
    var randomizeArray = function (arg) {
      var array = arg.slice();
      var currentIndex = array.length,
        temporaryValue, randomIndex;

      while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
    var sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];
    var options1 = {
      chart: {
        type: 'area',
        height: 120,
        foreColor: 'currentColor',
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.3,
      },
      series: [{
        data: randomizeArray(sparklineData)
      }],
      yaxis: {
        min: 0
      },
      colors: ['#DCE6EC'],
      title: {
        text: '$24,652',
        offsetX: 0,
        style: {
          fontSize: '18px',
          cssClass: 'apexcharts-yaxis-title'
        }
      },
      subtitle: {
        text: 'Sales',
        offsetX: 0,
        style: {
          fontSize: '11px',
          cssClass: 'apexcharts-yaxis-title'
        }
      }
    }

    var options2 = {
      chart: {
        type: 'area',
        height: 120,
        foreColor: 'currentColor',
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.3
      },
      series: [{
        data: randomizeArray(sparklineData)
      }],
      xaxis: {
        crosshairs: {
          width: 1
        },
      },
      yaxis: {
        min: 0
      },
      title: {
        text: '$35,965',
        offsetX: 0,
        style: {
          fontSize: '18px',
          cssClass: 'apexcharts-yaxis-title'
        }
      },
      subtitle: {
        text: 'Profits',
        offsetX: 0,
        style: {
          fontSize: '11px',
          cssClass: 'apexcharts-yaxis-title'
        }
      }
    }

    var options3 = {
      chart: {
        type: 'line',
        height: 120,
        sparkline: {
          enabled: true
        }
      },
      series: [{
        data: randomizeArray(sparklineData)
      }],
      title: {
        text: '$25,655',
        offsetX: 0,
        style: {
          fontSize: '18px',
          cssClass: 'apexcharts-yaxis-title'
        }
      },
      subtitle: {
        text: 'Sale',
        offsetX: 0,
        style: {
          fontSize: '11px',
          cssClass: 'apexcharts-yaxis-title'
        }
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

    var options4 = {
      chart: {
        type: 'bar',
        height: 120,
        foreColor: 'currentColor',
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      series: [{
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54, 23, 45, 63, 13]
      }],
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      xaxis: {
        crosshairs: {
          width: 1
        },
      },
      title: {
        text: '$65,345',
        offsetX: 0,
        style: {
          fontSize: '18px',
          cssClass: 'apexcharts-yaxis-title'
        }
      },
      subtitle: {
        text: 'Expenses',
        offsetX: 0,
        style: {
          fontSize: '11px',
          cssClass: 'apexcharts-yaxis-title'
        }
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

    new ApexCharts(document.querySelector("#a-c-12-1"), options1).render();
    new ApexCharts(document.querySelector("#a-c-12-2"), options2).render();
    new ApexCharts(document.querySelector("#a-c-12-3"), options3).render();
    new ApexCharts(document.querySelector("#a-c-12-4"), options4).render();

  }

  global.apexcharts = {init: init};

})(this);
