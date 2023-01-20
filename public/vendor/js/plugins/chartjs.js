(function (global, theme) {
	"use strict";
  Chart.defaults.global.defaultColor = 'rgba(130,140,155,0.1)';
  Chart.defaults.global.defaultFontColor = 'rgba(130,140,155,0.65)';
  Chart.defaults.scale.gridLines.color = 
  Chart.defaults.scale.gridLines.zeroLineColor = 'rgba(130,140,155,0.05)';
  Chart.defaults.global.tooltips.cornerRadius = 3;
  Chart.defaults.global.maintainAspectRatio = false;
  
  var charted = function( target ) {
    return new RegExp('(\\s|^)' + 'chartjs-render-monitor' + '(\\s|$)').test(target.className);
  }

  var init = function(){
    var d_l = {
        labels: Utils.labels({count: 6, prefix: 's'}),
        datasets: [
            {
                label: 'Sales',
                data: Utils.numbers({count: 6, decimals: 2}),
                fill: false,
                borderWidth: 2,
                borderColor: theme.color.primary,
                pointBackgroundColor: '#fff',
                tension: 0.4
            }
        ]
    };
    var ctx = document.getElementById('chart-line');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'line',
          data: d_l
        }
      );
    }

    var d_b = {
        labels: Utils.months({count: 7, section: 3}),
        datasets: [
            {
                label: 'Sales',
                data: Utils.numbers({count: 7, decimals: 2}),
                fill: true,
                backgroundColor: Utils.color(theme.color.info, 1),
                borderColor: theme.color.info,
                borderWidth: 1
            }
        ]
    };
    var ctx = document.getElementById('chart-bar');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'bar',
          data: d_b,
          options: {
            scales: {
              xAxes: [{
                barPercentage: 0.5,
                categoryPercentage: 0.5,
              }]
            }
          }
        }
      );
    }

    var d_r = {
        labels: Utils.labels({count: 7, prefix: 'R'}),
        datasets: [
            {
                label: 'R1',
                data: Utils.numbers({count: 7, decimals: 2}),
                fill: true,
                lineTension: 0,
                backgroundColor: Utils.color(theme.color.primary, 0.4),
                borderColor: theme.color.primary,
                borderWidth: 1,
                borderJoinStyle: 'miter',
                pointBorderColor: theme.color.primary,
                pointBackgroundColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 2,
                pointHoverBackgroundColor: theme.color.primary,
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
                pointRadius: 2
            },
            {
                label: 'R2',
                data: Utils.numbers({count: 7, decimals: 2}),
                backgroundColor: Utils.color(theme.color.success, 0.4),
                borderColor: theme.color.success,
                borderWidth: 1,
                borderJoinStyle: 'miter',
                pointBorderColor: theme.color.success,
                pointBackgroundColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 2,
                pointHoverBackgroundColor: theme.color.success,
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
                pointRadius: 2
            }
        ]
    };
    var ctx = document.getElementById('chart-radar');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'radar',
          data: d_r,
          options: {
            scale:{
              angleLines: {
                color: 'rgba(120,130,140,0.1)',
                lineWidth: 2
              }
            }
          }
        }
      );
    }

    var d_po = {
        labels: ['A', 'B', 'C'],
        datasets: [
          {
              data: Utils.numbers({count: 3, decimals: 2}),
              borderColor: 'transparent',
              backgroundColor: [
                  Utils.color(theme.color.primary, 0.3),
                  Utils.color(theme.color.info, 0.5),
                  Utils.color(theme.color.success, 0.7)
              ],
              label: 'Sales'
          }
        ]
    };
    var ctx = document.getElementById('chart-polar');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'polarArea',
          data: d_po,
          options: {
            startAngle: 0,
            responsive: true,
            legend: {
                position: 'right',
            },
            scale:{
              angleLines: {
                color: 'rgba(120,130,140,0.1)',
                lineWidth: 2
              }
            }
          }
        }
      );
    }

    var d_p = {
        labels: ['A', 'B'],
        datasets: [
          {
              data: Utils.numbers({count: 2, decimals: 2}),
              borderColor: 'transparent',
              backgroundColor: [
                  theme.color.primary,
                  'rgba(255,255,255,0)'
              ]
          },
          {
              data: Utils.numbers({count: 2, decimals: 2}),
              borderColor: 'transparent',
              backgroundColor: [
                  Utils.color(theme.color.primary, 0.6),
                  'rgba(255,255,255,0)'
              ]
          },
          {
              data: Utils.numbers({count: 2, decimals: 2}),
              borderColor: 'transparent',
              backgroundColor: [
                  Utils.color(theme.color.primary, 0.4),
                  'rgba(255,255,255,0)'
              ]
          },
          {
              data: Utils.numbers({count: 2, decimals: 2}),
              borderColor: 'transparent',
              backgroundColor: [
                  Utils.color(theme.color.primary, 0.2),
                  'rgba(255,255,255,0)'
              ]
          }
        ]
    };
    var ctx = document.getElementById('chart-pie');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'pie',
          data: d_p,
          options: {
            legend: {
              labels:{
                boxWidth: 12
              }
            },
            cutoutPercentage: 65
          }
        }
      );
    }
     
    var d_d = {
        labels: ['Search engine', 'Social media', 'Direct'],
        datasets: [
          {
              data: Utils.numbers({count: 3, decimals: 2}),
              borderColor: 'transparent',
              backgroundColor: [
                  theme.color.primary,
                  Utils.color(theme.color.primary, 0.6),
                  Utils.color(theme.color.primary, 0.2)
              ],
              label: 'Trafic'
          }
        ]
    };
    var ctx = document.getElementById('chart-doughnut');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'doughnut',
          data: d_d,
          options: {
            legend: {
              position: 'left',
              labels:{
                boxWidth: 12
              }
            },
            cutoutPercentage: 85
          }
        }
      );
    }

    var d_bu = {
        labels: ['A', 'B'],
        datasets: [
          {
              label: 'Sales',
              data: [
                {
                    x: Utils.rand(0, 100),
                    y: Utils.rand(0, 100),
                    r: Utils.rand(0, 100)/5
                },
                {
                    x: Utils.rand(0, 100),
                    y: Utils.rand(0, 100),
                    r: Utils.rand(0, 100)/5
                },
                {
                    x: Utils.rand(0, 100),
                    y: Utils.rand(0, 100),
                    r: Utils.rand(0, 100)/5
                },
                {
                    x: Utils.rand(0, 100),
                    y: Utils.rand(0, 100),
                    r: Utils.rand(0, 100)/5
                },
                {
                    x: Utils.rand(0, 100),
                    y: Utils.rand(0, 100),
                    r: Utils.rand(0, 100)/5
                }
              ],
              backgroundColor: [
                  theme.color.primary,
                  theme.color.info,
                  theme.color.success,
                  theme.color.warning,
                  theme.color.danger
              ]
          }
        ]
    };
    var ctx = document.getElementById('chart-bubble');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'bubble',
          data: d_bu
        }
      );
    }

    var d_l_l = {
        labels: ['A', 'B', 'C', 'D', 'E', 'F'],
        datasets: [
          {
              label: 'Sales1',
              data: Utils.numbers({count: 6, decimals: 2}),
              fill: true,
              backgroundColor: Utils.color(theme.color.primary, 0.2),
              borderColor: Utils.color(theme.color.primary, 1),
              borderWidth: 2,
              borderJoinStyle: 'miter',
              pointBorderColor: Utils.color(theme.color.primary, 1),
              pointBackgroundColor: '#fff',
              pointBorderWidth: 2,
              pointHoverRadius: 2,
              pointHoverBackgroundColor: Utils.color(theme.color.primary, 1),
              pointHoverBorderColor: '#fff',
              pointHoverBorderWidth: 1,
              pointRadius: 3
          },
          {
              label: 'Sales2',
              data: Utils.numbers({count: 6, decimals: 2}),
              fill: false,
              borderDash: [3, 3],
              backgroundColor: Utils.color(theme.color.success, 0.2),
              borderColor: Utils.color(theme.color.success, 1),
              borderWidth: 2,
              borderJoinStyle: 'miter',
              pointBorderColor: '#fff',
              pointBackgroundColor: Utils.color(theme.color.success, 1),
              pointBorderWidth: 2,
              pointHoverRadius: 2,
              pointHoverBackgroundColor: Utils.color(theme.color.success, 1),
              pointHoverBorderColor: '#fff',
              pointHoverBorderWidth: 1,
              pointRadius: 3
          }
        ]
    };
    var ctx = document.getElementById('chart-line-line');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'line',
          data: d_l_l,
          options: {
          }
        }
      );
    }
    
    var d_l_b = {
        labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        datasets: [
          {
              label: 'Sales1',
              type: 'line',
              data: Utils.numbers({count: 7, decimals: 2, min: 20, max: 50}),
              fill: true,
              backgroundColor: Utils.color(theme.color.success, 0.2),
              borderColor: Utils.color(theme.color.success, 1),
              borderWidth: 2,
              borderJoinStyle: 'miter',
              pointBorderColor: Utils.color(theme.color.success, 1),
              pointBackgroundColor: Utils.color(theme.color.success, 1),
              pointBorderWidth: 2,
              pointRadius: 3
          },
          {
              label: 'Sales2',
              type: 'bar',
              data: Utils.numbers({count: 7, decimals: 2, min: 10, max: 100}),
              backgroundColor: Utils.color(theme.color.primary, 1),
              borderColor: Utils.color(theme.color.primary, 1),
              borderWidth: 2,
              borderJoinStyle: 'miter',
          }
        ]
    };
    var ctx = document.getElementById('chart-line-bar');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'bar',
          data: d_l_b,
          options: {
            scales: {
              xAxes: [{
                barPercentage: 0.5,
                categoryPercentage: 0.5
              }]
            }
          }
        }
      );
    }

    var d_b_b = {
        labels: ['March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset',
                data: Utils.numbers({count: 5, decimals: 2}),
                fill: true,
                backgroundColor: Utils.color(theme.color.warning, 0.9),
                borderColor: 'transparent',
            },
            {
                label: 'Dataset',
                data: Utils.numbers({count: 5, decimals: 2}),
                fill: true,
                backgroundColor: Utils.color(theme.color.info, 0.5),
                borderColor: 'transparent',
            }
        ]
    };
    var ctx = document.getElementById('chart-bar-bar');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'bar',
          data: d_b_b,
          options: {
            scales: {
              xAxes:[
                {
                  barPercentage: 0.5,
                  categoryPercentage: 0.5
                }
              ]
            }
          }
        }
      );
    }
    
    var d_b_b_h = {
        labels: ['March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset',
                data: Utils.numbers({count: 5, decimals: 2}),
                fill: true,
                backgroundColor: Utils.color(theme.color.primary, 0.9),
                borderColor: 'transparent',
            },
            {
                label: 'Dataset',
                data: Utils.numbers({count: 5, decimals: 2}),
                fill: true,
                backgroundColor: Utils.color(theme.color.success, 0.5),
                borderColor: 'transparent',
            }
        ]
    };
    var ctx = document.getElementById('chart-bar-bar-h');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'horizontalBar',
          data: d_b_b_h,
          options: {
            scales: {
              yAxes:[
                {
                  barPercentage: 0.6,
                  categoryPercentage: 0.6
                }
              ]
            }
          }
        }
      );
    }
    
    var d_l_l_l = {
        labels: Utils.labels({count: 7, prefix:'l'}),
        datasets: [
            {
                label: 'A',
                data: Utils.numbers({count: 7, decimals: 2, min: 10, max: 30}),
                fill: true,
                backgroundColor: Utils.color(theme.color.primary, 0.35),
                pointRadius: 0,
                tension: 0.35,
                borderWidth: 1,
                borderColor: 'transparent'
            },
            {
                label: 'B',
                data: Utils.numbers({count: 7, decimals: 2, min: 10, max: 50}),
                fill: true,
                backgroundColor: Utils.color(theme.color.primary, 0.25),
                pointRadius: 0,
                tension: 0.35,
                borderWidth: 1,
                borderColor: 'transparent'
            },
            {
                label: 'C',
                data: Utils.numbers({count: 7, decimals: 2, min: 20, max: 90}),
                fill: true,
                backgroundColor: Utils.color(theme.color.primary, 0.1),
                pointRadius: 0,
                tension: 0.35,
                borderWidth: 1,
                borderColor: 'transparent'
            }
        ]
    };

    var ctx = document.getElementById('chart-line-line-line');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'line',
          data: d_l_l_l
        }
      );
    }

    var ctx = document.getElementById('chart-pie-1');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'easypie',
          data: {
              datasets: [
                  {
                      data: [55],
                      backgroundColor: 'rgba(100,100,100,0.1)',
                      borderColor: [theme.color.primary, theme.color.success],
                      borderWidth: 6
                  }
              ]
          }
        }
      );
    }

    var ctx = document.getElementById('chart-pie-2');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'easypie',
          data: {
              datasets: [
                  {
                      data: [35],
                      backgroundColor: 'rgba(100,100,100,0.1)',
                      borderColor: [theme.color.success, theme.color.warning],
                      borderWidth: 4
                  }
              ]
          }
        }
      );
    }

    var ctx = document.getElementById('chart-pie-3');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'easypie',
          data: {
              datasets: [
                  {
                      data: [25],
                      backgroundColor: 'rgba(100,100,100,0.1)',
                      borderColor: [theme.color.warning, theme.color.danger],
                      borderWidth: 4
                  }
              ]
          }
        }
      );
    }

    var ctx = document.getElementById('chart-pie-4');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'easypie',
          data: {
              datasets: [
                  {
                      data: [35],
                      backgroundColor: 'rgba(100,100,100,0.1)',
                      borderColor: [theme.color.success, theme.color.info],
                      borderWidth: 6
                  }
              ]
          }
        }
      );
    }

    var o_l_1 = {
      gradient: true,
      tooltips: {
        enabled: false
      },
      scales: {
        xAxes:[
          {
            display: false
          }
        ],
        yAxes:[
          {
            display: false
          }
        ]
      },
      legend: {
        display: false
      }
    };

    var d_l_1 = {
        labels: ['M', 'T', 'T', 'S', 'F', 'S', 'S'],
        datasets: [
          {
              label: '',
              data: [15, 12, 20, 14, 30, 12, 16],
              fill: false,
              borderWidth: 2,
              borderColor: [theme.color.primary, theme.color.success],
              pointRadius: 0,
          }
        ]
    };

    var ctx = document.getElementById('chart-line-1');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'line',
          data: d_l_1,
          options: o_l_1
        }
      );
    }

    var d_l_2 = {
        labels: ['M', 'T', 'T', 'S', 'F', 'S', 'S'],
        datasets: [
          {
              label: '',
              data: [12, 16, 12, 22, 9, 17, 13],
              fill: false,
              borderWidth: 2,
              borderColor: [theme.color.success, theme.color.warning],
              pointRadius: 0,
          }
        ]
    };

    var ctx = document.getElementById('chart-line-2');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'line',
          data: d_l_2,
          options: o_l_1
        }
      );
    }

    var d_l_3 = {
        labels: ['M', 'T', 'T', 'S', 'F', 'S', 'S'],
        datasets: [
          {
              label: '',
              data: [13, 9, 25, 9, 17, 10, 11],
              fill: false,
              borderWidth: 2,
              borderColor: [theme.color.warning, theme.color.danger],
              pointRadius: 0,
          }
        ]
    };
    
    var ctx = document.getElementById('chart-line-3');
    if( ctx && !charted(ctx) ){
      new Chart(ctx.getContext('2d'),
        {
          type: 'line',
          data: d_l_3,
          options: o_l_1
        }
      );
    }

    var d_l_4 = {
        labels: Utils.months({count: 12, section: 3}),
        datasets: [
            {
                label: 'Income',
                data: [20, 35, 72, 70, 76, 65, 66, 63, 70, 68, 100, 120],
                pointRadius: 5,
                pointBorderWidth: 0,
                pointBackgroundColor: 'rgba(0,0,0,0)',
                pointBorderColor: 'rgba(0,0,0,0)',
                tension: 0.35,
                fill: false,
                borderColor: [Utils.color(theme.color.primary, 0),theme.color.primary, theme.color.success, theme.color.warning],
                pointHoverRadius: 5,
                pointHoverBorderColor: Utils.color(theme.color.primary, 0.2),
                pointHoverBackgroundColor: theme.color.primary,
                pointHoverBorderWidth: 15,
                borderWidth: 3
            },
            {
                label: 'Expence',
                data: [50, 45, 65, 68, 70, 60, 76, 50, 68, 73, 105, 110],
                pointRadius: 0,
                pointBorderWidth: 5,
                tension: 0.35,
                fill: false,
                borderColor: theme.color.danger,
                pointHoverRadius: 3,
                pointHoverBorderColor: Utils.color(theme.color.danger, 0.2),
                pointHoverBackgroundColor: theme.color.danger,
                pointHoverBorderWidth: 10,
                borderWidth: 2
            },
            {
                label: 'Saving',
                data: [30, 50, 70, 75, 65, 55, 70, 60, 75, 65, 70, 90],
                pointRadius: 5,
                pointBorderWidth: 0,
                pointBackgroundColor: 'rgba(0,0,0,0)',
                pointBorderColor: 'rgba(0,0,0,0)',
                tension: 0.35,
                fill: false,
                borderColor: Utils.color(theme.color.info, 0.5),
                pointHoverRadius: 2,
                pointHoverBorderColor: Utils.color(theme.color.info, 0.2),
                pointHoverBackgroundColor: theme.color.info,
                pointHoverBorderWidth: 5,
                borderWidth: 1
            }
        ]
    };
    var ctx = document.getElementById('chart-line-4');
    if( ctx && !charted(ctx) ){
      var c_l_4 = new Chart(ctx.getContext('2d'),
        {
          type: 'line',
          data: d_l_4,
          options: {
            gradient: true,
            legend: {
              display: false
            },
            scales: {
              yAxes:[
                {
                  ticks: {
                    min: 0,
                    max: 120,
                    stepSize: 20
                  }
                }
              ]
            }
          }
        }
      );
      document.getElementById('btn_l_4').addEventListener('click', function() {
        d_l_4.datasets.forEach(function(dataset) {
          dataset.data = Utils.numbers({count: 12, decimals: 2, min: 50, max: 75});
        });
        d_l_4.labels = Utils.labels({count: 12, min: 0, max: 12});
        c_l_4.update();
      });
    }
  }

  // for ajax to init again
  global.chartjs = {init: init};

})(this, theme);
