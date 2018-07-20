<template>
	<section>
		<div class="parent">
			<el-tabs v-model="activeName" >
		    <el-tab-pane label="地区车辆分析统计（柱状图）" name="first">
		    	<div >
		    		<el-select v-model="filters.park" filterable placeholder="所属停车场">
			                    <el-option
			                      v-for="item in select.park"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="filters.cartype" filterable placeholder="车类型">
			                    <el-option
			                      v-for="item in select.cartype"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="filters.sum_method" filterable placeholder="统计方式">
			                    <el-option
			                      v-for="item in select.sum_method"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="filters.provice" filterable placeholder="省份">
			                    <el-option
			                      v-for="item in select.provice"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-button size="medium" type="primary" icon="el-icon-search">查询</el-button>
                       <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
                       <div >
                       	   <div class="left">
                       	   	  <div class="l-title">区域车流量分析报表</div>
		    				<div id="areacolumnChart" style="width:900px;height:400px;"></div>
                       	   </div>
                           <div class="right">
                           	  <div >
								 <template>
				                    <el-table
				                      :data="areacolumn"
				                      border
				                      show-summary
				                      style="width: 100% ;"
				                      >  
									  <el-table-column
									    label="序号"
										type="index"
										width="50">
										</el-table-column>
				                      <el-table-column
				                        prop="citySimpleName"
				                        label="城市简称">
				                      </el-table-column>
									  <el-table-column
				                        prop="cityName"
				                        label="城市名称">
				                      </el-table-column>
				                      <el-table-column
				                        prop="entrSum"
				                        label="入场流量">
				                      </el-table-column>
				                      <el-table-column
				                        prop="outSum"
				                        label="出场流量">
				                      </el-table-column>               
				                    </el-table>
				                 </template>
			             </div>
			             <div class="margin-tops">
			             	<el-button type="success"><i class="el-icon-printer"></i> 打印报表</el-button>
			             </div>
                           </div>
                       </div>
		    	</div>
		    </el-tab-pane>
		    <el-tab-pane label="地区车辆分析统计（饼状图）" name="second">
		    	<div >
		    		<el-select v-model="filters.park" filterable placeholder="所属停车场">
			                    <el-option
			                      v-for="item in select.park"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="filters.cartype" filterable placeholder="车类型">
			                    <el-option
			                      v-for="item in select.cartype"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="filters.sum_method" filterable placeholder="统计方式">
			                    <el-option
			                      v-for="item in select.sum_method"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="filters.provice" filterable placeholder="省份">
			                    <el-option
			                      v-for="item in select.provice"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-button size="medium" type="primary" icon="el-icon-search" >查询</el-button>
                       <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
                       <div >
                       	   <div class="left">
                       	   	  <div class="l-title">区域车流量分析报表</div>
		    				<div id="areapancakeChart" style="width:900px;height:400px;"></div>
                       	   </div>
                           <div class="right">
                           	  <div >
								 <template>
				                    <el-table
				                      :data="areacolumn"
				                      border
				                      show-summary
				                      style="width: 100% ;"
				                      >  
				                      <el-table-column
									    label="序号"
										type="index"
										width="50">
										</el-table-column>
				                      <el-table-column
				                        prop="citySimpleName"
				                        label="城市简称">
				                      </el-table-column>
									  <el-table-column
				                        prop="cityName"
				                        label="城市名称">
				                      </el-table-column>
				                      <el-table-column
				                        prop="entrSum"
				                        label="入场流量">
				                      </el-table-column>
				                      <el-table-column
				                        prop="outSum"
				                        label="出场流量">
				                      </el-table-column>               
				                    </el-table>
				                 </template>
			             </div>
			             <div class="margin-tops">
			             	<el-button type="success"><i class="el-icon-printer"></i> 打印报表</el-button>
			             </div>
                           </div>
                       </div>
		    	</div>
		    </el-tab-pane>
		        
		  </el-tabs>
		</div>
	</section>
</template>
<script>
export default {
  data() {
    return {
      colors: ["#5793f3", "#d14a61", "#675bba"],
      activeName: "first",
      filters: {
        park: "",
        cartype: "",
        sum_method: "",
        provice: ""
      },
      select: {
        park: [{}],
        cartype: [{}],
        sum_method: [{}],
        provice: [{}]
      },
      areacolumn: [
        {
          citySimpleName: "粤A",
          cityName: "广州市",
          entrSum: 7333,
          outSum: 444
        },
        {
          citySimpleName: "粤b",
          cityName: "广州市",
          entrSum: 7333,
          outSum: 444
        },
        {
          citySimpleName: "粤c",
          cityName: "广州市",
          entrSum: 200,
          outSum: 1
        },
        {
          citySimpleName: "粤d",
          cityName: "广州市",
          entrSum: 1,
          outSum: 1
        }
      ],
      //   areapancakedata: [
      // 	 {
      // 	  citySimpleName:"粤A",
      // 		cityName :"广州市",
      // 		entrSum:"7333",
      // 		 outSum:"444"
      //   }
      //   ],
      mychart: {
        legendData: ["入场统计", "出场统计"],
        axxisData: [
          // "6-11周一",
          // "6-12周二",
          // "6-13周三",
          // "6-14周四",
          // "6-15周五",
          // "6-16周六",
          // "6-17周日"
        ],
        entrysData: [],
        outsData: [],
        pieaxxisData: []
        //   obj:{},
      }
    };
  },
  created() {
		var data = this.areacolumn;
		this.myChartData(data);
  },
  mounted() {
    //this.drawLine_week();
    this.drawcolumn_area();
    this.drawpancake_area();
  },
  methods: {
    myChartData(data) {
      data.forEach(item => {
        this.mychart.axxisData.push(item.citySimpleName);
        this.mychart.entrysData.push(item.entrSum);
        this.mychart.outsData.push(item.outSum);
        //   this.mychart.pieaxxisData.push({value:(item.entrSum+item.outSum)+","+name+":"+item.citySimpleName})
        var obj = {};
        obj.value = item.entrSum - 0 + item.outSum;
        obj.name = item.citySimpleName;
        console.log(obj);

        this.mychart.pieaxxisData.push(obj);
      });
    },
    drawcolumn_area() {
      let myChart = echarts.init(document.getElementById("areacolumnChart"));
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
            data: this.mychart.entrysData //[666, 44, 0, 67, 90, 200, 400]
          },
          {
            name: this.mychart.legendData[1], //"出场统计",
            type: "bar",
            smooth: true,
            barWidth: 30, //柱图宽度
            data: this.mychart.outsData //[777, 188, 200, 777, 60, 3, 600]
          }
        ]
      });
    },
    drawpancake_area() {
      let myChart = echarts.init(document.getElementById("areapancakeChart"));
      myChart.setOption({
        title: { text: "" },
        color: this.colors,

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          data: this.mychart.axxisData // ["入场统计", "出场统计"]
        },
        series: [
          {
            name: ["车流量"],
            type: "pie",
            radius: "55%",
            // center: ["50%", "60%"],
            data: this.mychart.pieaxxisData, // [{ value: 1, name: "其他" }, { value: 2, name: "京P" }],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
.left {
  width: 60%;
  float: left;
  border: 1px solid #ccc;
  border-radius: 5px;

  overflow-x: auto;
}
.left .l-title {
  padding: 10px;
  background-color: #f5f5f5;
}
.right {
  width: 38%;
  float: right;
}
</style>