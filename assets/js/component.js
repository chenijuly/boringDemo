Vue.component('my-label',{
  data:function(){
    return {
      count:0
    }
  },
  template: `<div class="demo-alert-box">
              <button v-on:click="$emit('enlarge-text')"> 
                Click {{count}} times.
              </button>
              <slot></slot>
            </div>`
})

Vue.component('demo-chart',{
  template: `<div class="chart-container">
                <div ref="chart" :style="canvasStyle"></div>
              </div>`,
  props: {
    option: Object,
    yAreaColor: {
      type: Array,
      default () {
        return ["#2C3142", "#292D3E"]
      }
    }
  },
  watch: {
    'option': {
      handler (value) {
        this.startDrawLine(value)
      },
      deep: true
    }
  },
  data() {
    return {
      echart: null,
      canvasStyle: {width: '100%', height: '500px'}
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    startDrawLine (option) {
      if (JSON.stringify(option) === '{}') return
      let _option = this.drawLine(option);
      this.echart.setOption(_option);
    },
    drawLine (option) {
      let _option = {
        color: [
          "#FC8198",
          "#FDD472",
          "rgba(252,129,152,0.6)",
          "rgba(253,212,114,0.6)"
        ],
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderWidth: 1,
          padding: 10,
          textStyle: {
            color: "#DCE6FA"
          },
          formatter: function(params) {
            var str = "";
            if (params.length > 0) {
              str += option.date + "&nbsp;" + params[0].name;
              for (var i = 0; i < params.length; i++) {
                str += "<br>" + params[i].seriesName + "：" + params[i].value;
              }
            }
            return str;
          }
        },
        legend: {
          top: 24,
          data: [
            { name: option.nameList[0] },
            { name: option.nameList[1] },
            { name: option.nameList[2] },
            { name: option.nameList[3] }
          ],
          textStyle: {
            fontSize: 14,
            color: "#8C96AA"
          },
          itemHeight: 8,
          borderRadius: 2
        },
        toolbox: {
          show: true
        },
        calculable: true,
        dataZoom: {
          type: "slider",
          filterMode: "none",
          textStyle: {
            color: "#8C96AA"
          },
          show: true,
          realtime: true,
          start: 0,
          end: 60,
          height: 28,
          handleIcon: "M0,0 v8h2.5 v-8h-5 Z M0.5,4.5H0.8v-1.1h1V4.5z",
          handleSize: "100%",
          borderColor: "#8C96AA",
          fillerColor: "rgba(153,153,153,0.2)",
          dataBackground: {
            areaStyle: {
              color: "#8C96AA"
            },
            lineStyle: {
              opacity: 0.2,
              color: "#292D3E"
            }
          },
          handleStyle: {
            color: "#8C96AA",
            shadowColor: "#292D3E",
            shadowOffsetX: 0,
            shadowOffsetY: 2
          }
        },
        grid: [
          {
            left: 40,
            right: 60,
            bottom: 80
          }
        ],
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLine: {
              lineStyle: {
                color: "#505B6D"
              }
            },
            data: option.xData
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#505B6D"
              }
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: this.yAreaColor
              }
            },
            splitLine: {
              //网格线
              show: false
            }
          },
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#505B6D"
              }
            },
            axisTick: {
              show: false
            },
            name: option.yAxisName,
            // splitArea: {
            //     show: true,
            //     areaStyle:{
            //         color:['#2C3142','#292D3E']
            //     }
            // },
            splitLine: {
              //网格线
              show: false,
              lineStyle: {
                opacity: 0.1
              }
            }
          }
        ],
        series: [
          {
            name: option.nameList[0],
            type: "line",
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#FC8198"
                }
              }
            },
            symbol: "circle",
            data: option.line["first"]
          },
          {
            name: option.nameList[1],
            type: "line",
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#FDD472"
                }
              }
            },
            symbol: "rect",
            data: option.line["second"]
          },
          {
            name: option.nameList[2],
            type: "bar",
            yAxisIndex: 1,
            data: option.bar["first"]
          },
          {
            name: option.nameList[3],
            type: "bar",
            yAxisIndex: 1,
            data: option.bar["second"]
          }
        ]
      };
      return _option;
    },
    init() {
      this.echart = echarts.init(this.$refs.chart)
      console.log(this.option)
    }
  }
})