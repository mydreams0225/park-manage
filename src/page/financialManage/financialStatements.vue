<template>
    <section>
        <div class="parent">
            <div class="margin-tops">
               <el-row>
                    <el-col :span="6" v-for="(o, index) in list" :key="index" :offset="index > 0 ? 2 : 0">
                        <el-card :body-style="{ padding: '0px' }" class="card">
                        <!-- <img src="~examples/assets/images/hamburger.png" class="image"> -->
                             <el-row >
                                 <el-col :span="6">
                                     <div class="logos"><span class="el-icon-sold-out"></span></div>
                                     
                                 </el-col>
                                 <el-col :span="18">
                                     <div class="datas">
                                         <div class="mount">{{o.mount}}</div>
                                          <div class="name">{{o.name}}</div>
                                          
                                     </div>
                                 </el-col>
                             </el-row>
                             <el-row>
                               <div class="detail">
                                  <el-col :span="12">
                                    <label for="">View Detail</label>
                                     
                                 </el-col >
                                 <el-col :span="12" class="to">
                                   <span  class="el-icon-back"></span>
                                 </el-col>
                               </div>
                             </el-row>
                        </el-card>
                    </el-col>
                 </el-row>
            </div>
            <div class="margin-tops">
                <div class="showTitle">
                    <el-row>
                        <el-col :span="6"> 
                            <h5>收益产出详情</h5>
                        </el-col>
                        <el-col class="showDate" :span="18">
                            <span >时间：</span>
                            <el-button type="primary" size="mini">7日</el-button>
                            <el-button type="primary" size="mini">10日</el-button>
                            <el-button type="primary" size="mini">15日</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div>
                   <div id="myChart" style="width:100%;height:400px;"></div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
  data() {
    return {
        colors: ["#FFA54F","#63B8FF", "#CD69C9"],
      list: [
        { mount: "1", name: "广告位" },
        { mount: "0元·", name: "今日收益" }
      ],
      mychart: {
          
        legendData: ["曝光", "点击","包日"],
        axxisData: [
          "6-11周一",
          "6-12周二",
          "6-13周三",
          "6-14周四",
          "6-15周五",
          "6-16周六",
          "6-17周日"
        ],
        expData: [2,2,2],
        clickData: [1,1,1],
        dayData: [4,4,4]
      }
    };
  },
  mounted(){
      this.initChart();
  },
  methods: {
    initChart() {
      let myChart = echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        title: { text: "" },
        color: this.colors,

        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
          // axisPointer: {
          //     type: 'cross'
          // }
        },
        legend: {
          data: this.mychart.legendData
        },
        grid: {
          top: 70,
          bottom: 50
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: this.colors[0]
              }
            },
            // axisPointer: {
            //     label: {
            //         formatter: function (params) {
            //         	console.log(params);
            //             return '总车流量数  ' + params.value
            //                 + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
            //         }
            //     }
            // },
            data: this.mychart.axxisData
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: this.mychart.legendData[0], //"入场统计",
            type: "bar",
            smooth: true,
            barWidth: 30, //柱图宽度
            data: this.mychart.expData //[666, 44, 0, 67, 90, 200, 400]
          },
          {
            name: this.mychart.legendData[1], //"出场统计",
            type: "bar",
            smooth: true,
            barWidth: 30, //柱图宽度
            data: this.mychart.clickData //[777, 188, 200, 777, 60, 3, 600]
          },
          {
            name: this.mychart.legendData[2], //"出场统计",
            type: "bar",
            smooth: true,
            barWidth: 30, //柱图宽度
            data: this.mychart.dayData //[777, 188, 200, 777, 60, 3, 600]
          }
        ]
      });
    }
  }
};
</script>
<style>
.card {
  border: 1px solid #ccc;
}
.logos {
  display: inline-block;
  padding: 4px;
  margin: 10px;
  font-size: 4em;
  /* height: 60px; */
  color: rgba(0, 0, 0, 0.8);
}
.datas {
  box-sizing: border-box;
  margin: 10px;
  padding: 4px;
  font-size: 26px;
  text-align: right;
  vertical-align: middle;
  /* height: 60px; */
  color: rgba(0, 0, 0, 0.8);
}
.datas .mount {
  margin-top: 10px;
}
.datas .name {
  font-size: 16px;
}
.card .detail > div {
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.card .detail label {
  font-size: 14px !important;
}
.card .detail .to {
  text-align: right;
}
.showTitle {
  padding: 10px;
  background: #eee;
  box-shadow: 2px 2px 3px #888888;
}
.showDate {
  text-align: right;
}
.showDate span {
  font-size: 14px;
}
</style>


