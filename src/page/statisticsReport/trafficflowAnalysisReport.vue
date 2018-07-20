<template>
	<section>
		<el-tabs :tab-position="tabPosition" style="height: 200px;">
		    <el-tab-pane label="周报表">
		    	<div class="parent">
		    		<div class="margin-tops">
		    			<el-select v-model="filters.week.park" filterable placeholder="所属停车场">
			                    <el-option
			                      v-for="item in select.week.park"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
					   <div style="display:inline-block" >
							<span class="demonstration">选择周数的任意日期</span>
							<el-date-picker
							v-model="filters.week.week_date"
							type="date"
							placeholder="选择日期">
							</el-date-picker>
						</div>
			           <el-select v-model="filters.week.fee_type" filterable placeholder="计费类型">
			                    <el-option
			                      v-for="item in select.week.fee_type"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="filters.week.sum_method" filterable placeholder="统计方式">
			                    <el-option
			                      v-for="item in select.week.sum_method"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-button size="medium" type="primary" icon="el-icon-search" v-on:click="getWeekReport">查询</el-button>
                       <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
		    		</div>
		    		<div class="margin-tops">
		    			<div class="left">
                            <div class="l-title">周总车流量统计</div>
		    				<div id="weekChart" style="width:900px;height:400px;"></div>
		    			</div>
		    			<div class="right">
		    				<div >
								 <template>
				                    <el-table
				                      :data="weeksumData"
				                      border
				                      show-summary
				                      style="width: 100% ;"
				                      >  
				                      <el-table-column
				                        prop="date"
				                        label="日期">
				                      </el-table-column>
				                      <el-table-column
				                        prop="entrSum"
				                        label="入场总数">
				                      </el-table-column>
				                      <el-table-column
				                        prop="outSum"
				                        label="出场总数">
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
		    <el-tab-pane label="月报表">
		    	<div class="parent">
		    		<div class="margin-tops">
		    			<el-select v-model="filters.month.park" filterable placeholder="所属停车场">
			                    <el-option
			                      v-for="item in select.month.park"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
					   <div style="display:inline-block">
							<span class="demonstration">选择月份</span>
							<el-date-picker
							v-model="filters.month.year"
							type="year"
							placeholder="选择年">
							</el-date-picker>
						</div>
						<div style="display:inline-block">
								<span class="demonstration">月</span>
								<el-date-picker
								v-model="filters.month.month"
								type="month"
								placeholder="选择月">
								</el-date-picker>
							</div>
			           <el-select v-model="filters.month.fee_type" filterable placeholder="计费类型">
			                    <el-option
			                      v-for="item in select.month.fee_type"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="filters.month.sum_method" filterable placeholder="统计方式">
			                    <el-option
			                      v-for="item in select.month.sum_method"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-button size="medium" type="primary" icon="el-icon-search" @click="getMonthReport">查询</el-button>
                       <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
		    		</div>
		    		<div class="margin-tops">
		    			<div class="left">
                            <div class="l-title">月总车流量统计</div>
		    				<div id="monthChart" style="width:900px;height:400px;"></div>
		    			</div>
		    			<div class="right">
		    				<div >
								 <template>
				                    <el-table
				                      :data="monthsumData"
				                      border
				                      show-summary
				                      style="width: 100% ;"
				                      >  
				                      <el-table-column
				                        prop="date"
				                        label="日期">
				                      </el-table-column>
				                      <el-table-column
				                        prop="entrSum"
				                        label="入场总数">
				                      </el-table-column>
				                      <el-table-column
				                        prop="outSum"
				                        label="出场总数">
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
		    <el-tab-pane label="年报表">
		    	<div class="parent">
		    		<div class="margin-tops">
		    			<el-select v-model="filters.year.park" filterable placeholder="所属停车场">
			                    <el-option
			                      v-for="item in select.year.park"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <div style="display:inline-block">
							<span class="demonstration">选择年</span>
							<el-date-picker
							v-model="filters.year.year"
							type="year"
							placeholder="选择年">
							</el-date-picker>
						</div>
			           <el-select v-model="filters.year.fee_type" filterable placeholder="计费类型">
			                    <el-option
			                      v-for="item in select.year.fee_type"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="filters.year.sum_method" filterable placeholder="统计方式">
			                    <el-option
			                      v-for="item in select.year.sum_method"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-button size="medium" type="primary" icon="el-icon-search" @click="getYearReport">查询</el-button>
                       <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
		    		</div>
		    		<div class="margin-tops">
		    			<div class="left">
                            <div class="l-title">年总车流量统计</div>
		    				<div id="yearChart" style="width:900px;height:400px;"></div>
		    			</div>
		    			<div class="right">
		    				<div >
								 <template>
				                    <el-table
				                      :data="yearsumData"
				                      border
				                      show-summary
				                      style="width: 100% ;"
				                      >  
				                      <el-table-column
				                        prop="date"
				                        label="月份">
				                      </el-table-column>
				                      <el-table-column
				                        prop="entrSum"
				                        label="入场总数">
				                      </el-table-column>
				                      <el-table-column
				                        prop="outSum"
				                        label="出场总数">
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
		    <el-tab-pane label="日报表">
		    	<div class="parent">
		    		<div class="margin-tops">
		    			<el-select v-model="filters.day.park" filterable placeholder="所属停车场">
			                    <el-option
			                      v-for="item in select.day.park"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <div  style="display:inline-block">
							<span class="demonstration">选择日期</span>
							<el-date-picker
							v-model="filters.day.date"
							type="date"
							placeholder="选择日期">
							</el-date-picker>
						</div>
			           <el-select v-model="filters.day.fee_type" filterable placeholder="计费类型">
			                    <el-option
			                      v-for="item in select.day.fee_type"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="filters.day.sum_method" filterable placeholder="统计方式">
			                    <el-option
			                      v-for="item in select.day.sum_method"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-button size="medium" type="primary" icon="el-icon-search" @click="getDayReport">查询</el-button>
                       <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
		    		</div>
		    		<div class="margin-tops">
		    			<div class="left">
                            <div class="l-title">每日总车流量统计</div>
		    				<div id="dayChart" style="width:900px;height:400px;"></div>
		    			</div>
		    			<div class="right">
		    				<div >
								 <template>
				                    <el-table
				                      :data="daysumData"
				                      border
				                      show-summary
				                      style="width: 100% ;"
				                      >  
				                      <el-table-column
				                        prop="date"
				                        label="时间">
				                      </el-table-column>
				                      <el-table-column
				                        prop="entrSum"
				                        label="入场总数">
				                      </el-table-column>
				                      <el-table-column
				                        prop="outSum"
				                        label="出场总数">
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
		
	</section>
</template>
<script>
export default {
  name: "hello",
  data() {
    return {
      select: {
        week: {
          park: configs.park,
          fee_type: configs.fee_type,
          sum_method: [{}]
        },
        month: {
          park: configs.park,
          fee_type: [{}],
          sum_method: [{}]
        },
        year: {
          park: configs.park,
          year: [{}],
          fee_type: [{}],
          sum_method: [{}]
        },
        day: {
          park: configs.park,
          date: [{}],
          fee_type: [{}],
          sum_method: [{}]
        }
      },
      filters: {
        week: {
          park: "",
          week_date: "",
          fee_type: "",
          sum_method: ""
        },
        month: {
          park: "",
          year: "",
          month: "",
          fee_type: "",
          sum_method: ""
        },
        year: {
          park: "",
          fee_type: "",
          sum_method: ""
        },
        day: {
          park: "",
          fee_type: "",
          sum_method: ""
        }
      },
      colors: ["#5793f3", "#d14a61", "#675bba"],
      tabPosition: "top",

      weeksumData: [
        {
          date: "2016-6-11",
          entrSum: "577",
          outSum: "777"
        },
        {
          date: "2016-6-12",
          entrSum: "577",
          outSum: "33"
        },
        {
          date: "2016-6-13",
          entrSum: "577",
          outSum: "777"
        }
      ],
      monthsumData: [
        {
          date: "2016-6-11",
          entrSum: "577",
          outSum: "777"
        },
        {
          date: "2016-6-12",
          entrSum: "577",
          outSum: "777"
        }
      ],
      yearsumData: [
        {
          date: "2018-1",
          entrSum: "577",
          outSum: "777"
        },
        {
          date: "2018-2",
          entrSum: "577",
          outSum: "777"
        },
        {
          date: "2018-3",
          entrSum: "577",
          outSum: "777"
        }
      ],
      daysumData: [
        {
          date: "00:00~01:00",
          entrSum: "577",
          outSum: "777"
        },
        {
          date: "01:00~02:00",
          entrSum: "577",
          outSum: "777"
        },
        {
          date: "02:00~03:00",
          entrSum: "577",
          outSum: "777"
        },
        {
          date: "03:00~04:00",
          entrSum: "577",
          outSum: "777"
        },
        {
          date: "04:00~05:00",
          entrSum: "577",
          outSum: "777"
        },
        {
          date: "05:00~06:00",
          entrSum: "577",
          outSum: "777"
        },
        {
          date: "06:00~07:00",
          entrSum: "577",
          outSum: "777"
        },
        {
          date: "06:00~07:00",
          entrSum: "577",
          outSum: "777"
        },
        {
          date: "02:00~03:00",
          entrSum: "577",
          outSum: "777"
        },
        {
          date: "03:00~04:00",
          entrSum: "577",
          outSum: "777"
        },
        {
          date: "04:00~05:00",
          entrSum: "577",
          outSum: "777"
        },
        {
          date: "05:00~06:00",
          entrSum: "577",
          outSum: "777"
        }
      ],
      //   周折线图数据
      mychart: {
        legendData: ["入场统计", "出场统计"],
        week: {
          //["入场统计", "出场统计"]
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
          outsData: []
        },
        month: {
          axxisData: [],
          entrysData: [],
          outsData: []
        },
        year: {
          axxisData: [],
          entrysData: [],
          outsData: []
        },
        day: {
          axxisData: [],
          entrysData: [],
          outsData: []
        }
      }
    };
  },
  mounted() {
    //this.drawLine_week();
    this.drawLine_week1();
    this.drawLine_month();
    this.drawLine_year();
    this.drawLine_day();
    this.getweekvalue();
    this.getWeekReport();
  },
  created() {
    var data = this.weeksumData;
    data.forEach(item => {
      this.mychart.week.axxisData.push(item.date);
      this.mychart.week.entrysData.push(item.entrSum);
      this.mychart.week.outsData.push(item.outSum);
    });
    // return this.mychart.week.axxisData;
    console.log(this.mychart.week.axxisData);
    ///month
    var monthData = this.monthsumData;
    monthData.forEach(item => {
      this.mychart.month.axxisData.push(item.date);
      this.mychart.month.entrysData.push(item.entrSum);
      this.mychart.month.outsData.push(item.outSum);
    });
    var yearData = this.yearsumData;
    yearData.forEach(item => {
      this.mychart.year.axxisData.push(item.date);
      this.mychart.year.entrysData.push(item.entrSum);
      this.mychart.year.outsData.push(item.outSum);
    });
    var dayData = this.daysumData;
    dayData.forEach(item => {
      var date = item.date.substring(0, 2);
      this.mychart.day.axxisData.push(date + "h");
      this.mychart.day.entrysData.push(item.entrSum);
      this.mychart.day.outsData.push(item.outSum);
    });
  },

  methods: {
    //清除

    callbackSelTenant() {
		
		var week=this.filters.week,
			month=this.filters.month,
			year=this.filters.year,
			day=this.filters.day;
		console.log(this.filters)
	    for (var items in week){
			week[items]="";
		}
		for (var items in month){
			month[items]="";
		}
		for (var items in year){
			year[items]="";
		}
		for (var items in day){
			day[items]="";
		}
		
	},
    getweekvalue() {
      ///week
      var data = this.weeksumData;
      data.forEach(item => {
        this.mychart.week.axxisData.push(item.date);
        this.mychart.week.entrysData.push(item.entrSum);
        this.mychart.week.outsData.push(item.outSum);
      });
      return this.mychart.week.axxisData;
    },
    getWeekReport() {},
    getMonthReport() {},
    getYearReport() {},
    getDayReport() {},

    drawLine_week1() {
      let myChart = echarts.init(document.getElementById("weekChart"));
      myChart.setOption({
        title: { text: "" },
        color: this.colors,

        tooltip: {
          trigger: "axis"
          // axisPointer: {
          //     type: 'cross'
          // }
        },
        legend: {
          data: this.mychart.legendData //["入场统计", "出场统计"]
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
                color: this.colors[1]
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
            data: this.mychart.week.axxisData // [
            //   "6-11周一",
            //   "6-12周二",
            //   "6-13周三",
            //   "6-14周四",
            //   "6-15周五",
            //   "6-16周六",
            //   "6-17周日"
            // ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          // {
          //     name:'2015 降水量',
          //     type:'line',
          //     xAxisIndex: 1,
          //     smooth: true,
          //     data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          // },
          {
            name: this.mychart.legendData[0], //"入场统计"
            type: "line",
            smooth: true,
            data: this.mychart.week.entrysData // [666, 44, 0, 67, 90, 200, 400]
          },
          {
            name: this.mychart.legendData[1], //"出场统计"
            type: "line",
            smooth: true,
            data: this.mychart.week.outsData //[777, 188, 200, 777, 60, 3, 600]
          }
        ]
      });
    },
    drawLine_month() {
      let myChart = echarts.init(document.getElementById("monthChart"));
      myChart.setOption({
        title: { text: "" },
        color: this.colors,

        tooltip: {
          trigger: "axis"
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
                color: this.colors[1]
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
            data: this.mychart.month.axxisData
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          // {
          //     name:'2015 降水量',
          //     type:'line',
          //     xAxisIndex: 1,
          //     smooth: true,
          //     data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          // },
          {
            name: this.mychart.legendData[0], //"入场统计",
            type: "line",
            smooth: true,
            data: this.mychart.month.entrysData
          },
          {
            name: this.mychart.legendData[1], //"出场统计",
            type: "line",
            smooth: true,
            data: this.mychart.month.outsData
          }
        ]
      });
    },
    drawLine_year() {
      let myChart = echarts.init(document.getElementById("yearChart"));
      myChart.setOption({
        title: { text: "" },
        color: this.colors,

        tooltip: {
          trigger: "axis"
          // axisPointer: {
          //     type: 'cross'
          // }
        },
        legend: {
          data: this.mychart.legendData //["入场统计", "出场统计"]
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
                color: this.colors[1]
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
            data: this.mychart.year.axxisData
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          // {
          //     name:'2015 降水量',
          //     type:'line',
          //     xAxisIndex: 1,
          //     smooth: true,
          //     data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          // },
          {
            name: this.mychart.legendData[0], // "入场统计",
            type: "line",
            smooth: true,
            data: this.mychart.year.entrysData //[577, 555, 222, 0, 444, 99, 400]
          },
          {
            name: this.mychart.legendData[1], //"出场统计",
            type: "line",
            smooth: true,
            data: this.mychart.year.outsData //[0, 188, 200, 777, 60, 3, 600]
          }
        ]
      });
    },
    drawLine_day() {
      let myChart = echarts.init(document.getElementById("dayChart"));
      myChart.setOption({
        title: { text: "" },
        color: this.colors,

        tooltip: {
          trigger: "axis"
          // axisPointer: {
          //     type: 'cross'
          // }
        },
        legend: {
          data: this.mychart.legendData //["入场统计", "出场统计"]
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
                color: this.colors[1]
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
            data: this.mychart.day.axxisData //["00h", "01h", "02h", "03h", "04h", "05h", "06h"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          // {
          //     name:'2015 降水量',
          //     type:'line',
          //     xAxisIndex: 1,
          //     smooth: true,
          //     data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          // },
          {
            name: this.mychart.legendData[0], //"入场统计",
            type: "line",
            smooth: true,
            data: this.mychart.day.entrysData //[577, 555, 222, 0, 444, 99, 400]
          },
          {
            name: this.mychart.legendData[1], //"出场统计",
            type: "line",
            smooth: true,
            data: this.mychart.day.outsData //[0, 188, 200, 777, 60, 3, 600]
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