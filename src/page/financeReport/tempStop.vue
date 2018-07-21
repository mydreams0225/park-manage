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
							v-model="filters.week.week"
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
			           <el-select v-model="filters.week.fee_place" filterable placeholder="收费处">
			                    <el-option
			                      v-for="item in select.week.fee_place"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
					   <el-select v-model="filters.week.duty_man" filterable placeholder="值班员">
			                    <el-option
			                      v-for="item in select.week.duty_man"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-button size="medium" type="primary" icon="el-icon-search" @click="getWeekReport">查询</el-button>
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
				                        prop="sumCarFlow"
				                        label="总车流">
				                      </el-table-column>
									  <el-table-column
				                        prop="freeCarFlow"
				                        label="免费车流">
				                      </el-table-column>
									  <el-table-column
				                        prop="feeCarFlow"
				                        label="收费车流">
				                      </el-table-column>
									  <el-table-column
				                        prop="cashCharge"
				                        label="现金收费">
				                      </el-table-column>
									  
									  <el-table-column
				                        prop="onlinePay"
				                        label="在线支付金额">
				                      </el-table-column>
				                      <el-table-column
				                        prop="discMoney"
				                        label="折扣金额	">
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
			            <el-select v-model="filters.month.fee_place" filterable placeholder="收费处">
			                    <el-option
			                      v-for="item in select.month.fee_place"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
					   <el-select v-model="filters.month.duty_man" filterable placeholder="值班员">
			                    <el-option
			                      v-for="item in select.month.duty_man"
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
				                        prop="sumCarFlow"
				                        label="总车流">
				                      </el-table-column>
									  <el-table-column
				                        prop="freeCarFlow"
				                        label="免费车流">
				                      </el-table-column>
									  <el-table-column
				                        prop="feeCarFlow"
				                        label="收费车流">
				                      </el-table-column>
									  <el-table-column
				                        prop="cashCharge"
				                        label="现金收费">
				                      </el-table-column>
									  
									  <el-table-column
				                        prop="onlinePay"
				                        label="在线支付金额">
				                      </el-table-column>
				                      <el-table-column
				                        prop="discMoney"
				                        label="折扣金额	">
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
							<span class="demonstration">选择年份</span>
							<el-date-picker
							v-model="filters.year.year"
							type="year"
							placeholder="选择年">
							</el-date-picker>
						</div>

			           <el-select v-model="filters.year.fee_type" filterable placeholder="计费类型">
			                    <el-option
			                      v-for="item in filters.year.fee_type"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="filters.year.fee_place" filterable placeholder="收费处">
			                    <el-option
			                      v-for="item in select.year.fee_place"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
					   <el-select v-model="filters.year.duty_man" filterable placeholder="值班员">
			                    <el-option
			                      v-for="item in select.year.duty_man"
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
				                        label="日期">
				                      </el-table-column>
				                      <el-table-column
				                        prop="sumCarFlow"
				                        label="总车流">
				                      </el-table-column>
									  <el-table-column
				                        prop="freeCarFlow"
				                        label="免费车流">
				                      </el-table-column>
									  <el-table-column
				                        prop="feeCarFlow"
				                        label="收费车流">
				                      </el-table-column>
									  <el-table-column
				                        prop="cashCharge"
				                        label="现金收费">
				                      </el-table-column>
									  
									  <el-table-column
				                        prop="onlinePay"
				                        label="在线支付金额">
				                      </el-table-column>
				                      <el-table-column
				                        prop="discMoney"
				                        label="折扣金额	">
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
			           <div style="display:inline-block">
							<span class="demonstration">选择日期</span>
							<el-date-picker
							v-model="filters.day.day"
							type="date"
							placeholder="选择年">
							</el-date-picker>
						</div>

			           <el-select v-model="filters.day.fee_type" filterable placeholder="计费类型">
			                    <el-option
			                      v-for="item in filters.day.fee_type"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="filters.day.fee_place" filterable placeholder="收费处">
			                    <el-option
			                      v-for="item in select.day.fee_place"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
					   <el-select v-model="filters.day.duty_man" filterable placeholder="值班员">
			                    <el-option
			                      v-for="item in select.day.duty_man"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-button size="medium" type="primary" icon="el-icon-search">查询</el-button>
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
				                        label="日期">
				                      </el-table-column>
				                      <el-table-column
				                        prop="sumCarFlow"
				                        label="总车流">
				                      </el-table-column>
									  <el-table-column
				                        prop="freeCarFlow"
				                        label="免费车流">
				                      </el-table-column>
									  <el-table-column
				                        prop="feeCarFlow"
				                        label="收费车流">
				                      </el-table-column>
									  <el-table-column
				                        prop="cashCharge"
				                        label="现金收费">
				                      </el-table-column>
									  
									  <el-table-column
				                        prop="onlinePay"
				                        label="在线支付金额">
				                      </el-table-column>
				                      <el-table-column
				                        prop="discMoney"
				                        label="折扣金额	">
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
      colors: ["#67c23a", "#5793f3", "orange"],
      tabPosition: "top",
      filters: {
        week: {
          park: "",
          week: "",
          fee_type: "",
          fee_place: "",
          duty_man: ""
        },
        month: {
          park: "",
          month: "",
          fee_type: "",
          fee_place: "",
          duty_man: ""
        },
        year: {
          park: "",
          year: "",
          fee_type: "",
          fee_place: "",
          duty_man: ""
        },
        day: {
          park: "",
          day: "",
          fee_type: "",
          fee_place: "",
          duty_man: ""
        }
      },
      select: {
        week: {
          park: [],
          fee_type: [],
          fee_place: [],
          duty_man: []
        },
        month: {
          park: [],
          fee_type: [],
          fee_place: [],
          duty_man: []
        },
        year: {
          park: [],
          fee_type: [],
          fee_place: [],
          duty_man: []
        },
        day: {
          park: [],
          fee_type: [],
          fee_place: [],
          duty_man: []
        }
      },
      weeksumData: [
        {
          date: "2016-6-11",
          sumCarFlow: "577",
          freeCarFlow: "777",
          feeCarFlow: "44",
          cashCharge: "33",
          onlinePay: "4456",
		  discMoney: "33"
        }
      ],
      monthsumData: [{
          date: "2016-6-11",
          sumCarFlow: "577",
          freeCarFlow: "777",
          feeCarFlow: "44",
          cashCharge: "33",
          onlinePay: "4456",
		  discMoney: "33"
        },{
          date: "2016-6-12",
          sumCarFlow: "577",
          freeCarFlow: "777",
          feeCarFlow: "44",
          cashCharge: "33",
          onlinePay: "4456",
		  discMoney: "33"
        }],
      yearsumData: [{
          date: "2016-6",
          sumCarFlow: "577",
          freeCarFlow: "777",
          feeCarFlow: "44",
          cashCharge: "33",
          onlinePay: "4456",
		  discMoney: "33"
        },{
          date: "2016-7",
          sumCarFlow: "577",
          freeCarFlow: "777",
          feeCarFlow: "44",
          cashCharge: "33",
          onlinePay: "4456",
		  discMoney: "33"
        },{
          date: "2016-8",
          sumCarFlow: "577",
          freeCarFlow: "777",
          feeCarFlow: "44",
          cashCharge: "33",
          onlinePay: "4456",
		  discMoney: "33"
        },{
          date: "2016-1",
          sumCarFlow: "577",
          freeCarFlow: "777",
          feeCarFlow: "44",
          cashCharge: "33",
          onlinePay: "4456",
		  discMoney: "33"
        }],
	  daysumData: [{
          date: "00:00~01:00",
          sumCarFlow: "577",
          freeCarFlow: "777",
          feeCarFlow: "44",
          cashCharge: "33",
          onlinePay: "4456",
		  discMoney: "33"
        },{
          date: "01:00~02:00",
          sumCarFlow: "577",
          freeCarFlow: "777",
          feeCarFlow: "44",
          cashCharge: "33",
          onlinePay: "4456",
		  discMoney: "33"
        }],
	  mychart:{
		  legendData: ["现金收费", "折扣金额","在线支付金额"],
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
          cashCharge: [],
		  discMoney: [],
		  onlinePay:[],
		},
		month:{
		  axxisData: [],
          cashCharge: [],
		  discMoney: [],
		  onlinePay:[],
		},
		year:{
			 axxisData: [],
          cashCharge: [],
		  discMoney: [],
		  onlinePay:[],
		},
		day:{
		  axxisData: [],
          cashCharge: [],
		  discMoney: [],
		  onlinePay:[],
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
  },
  created(){
	  
	  this.getChartData(this.weeksumData,"week");
	  this.getChartData(this.monthsumData,"month");
	  this.getChartData(this.yearsumData,"year");
	  this.getChartData(this.daysumData,"day");
  },
  methods: {
	  
		getWeekReport(){},
		getMonthReport(){},
		getYearReport(){},
	   getChartData(arr,dateType){
          arr.forEach(item=>{
		   this.mychart[dateType].axxisData.push(item.date);
		   this.mychart[dateType].cashCharge.push(item.cashCharge);
		   this.mychart[dateType].discMoney.push(item.discMoney);
		   this.mychart[dateType].onlinePay.push(item.onlinePay);
	  })
	  },
    drawLine_week1() {
      let myChart = echarts.init(document.getElementById("weekChart"));
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
          data: this.mychart.legend
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
            data:this.mychart.week.axxisData
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "现金收费",
            type: "bar",
            stack: "广告",
            barWidth: 35,
            smooth: true,
            data: this.mychart.week.cashCharge //[666, 44, 0, 67, 90, 200, 400]
          },
          {
            name: "折扣金额",
            stack: "广告",
            barWidth: 35,
            type: "bar",
            smooth: true,
            data: this.mychart.week.discMoney  //[777, 188, 200, 777, 60, 3, 600]
          },
          {
            name: "在线支付金额",
            stack: "广告",
            barWidth: 35,
            type: "bar",
            smooth: true,
            data: this.mychart.week.onlinePay  //[777, 188, 200, 777, 60, 3, 600]
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
		  trigger: "axis",
		  axisPointer:{
			  type:"shadow"
		  }
          // axisPointer: {
          //     type: 'cross'
          // }
        },
        legend: {
          data:  this.mychart.legendData //["入场统计", "出场统计"]
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
            name: "现金收费",
            type: "bar",
            stack: "广告",
            barWidth: 35,
            smooth: true,
            data: this.mychart.month.cashCharge //[666, 44, 0, 67, 90, 200, 400]
          },
          {
            name: "折扣金额",
            stack: "广告",
            barWidth: 35,
            type: "bar",
            smooth: true,
            data: this.mychart.month.discMoney  //[777, 188, 200, 777, 60, 3, 600]
          },
          {
            name: "在线支付金额",
            stack: "广告",
            barWidth: 35,
            type: "bar",
            smooth: true,
            data: this.mychart.month.onlinePay  //[777, 188, 200, 777, 60, 3, 600]
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
		  trigger: "axis",
		  axisPointer:{
			  type:"shadow"
		  }
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
         {
            name: "现金收费",
            type: "bar",
            stack: "广告",
            barWidth: 35,
            smooth: true,
            data: this.mychart.year.cashCharge //[666, 44, 0, 67, 90, 200, 400]
          },
          {
            name: "折扣金额",
            stack: "广告",
            barWidth: 35,
            type: "bar",
            smooth: true,
            data: this.mychart.year.discMoney  //[777, 188, 200, 777, 60, 3, 600]
          },
          {
            name: "在线支付金额",
            stack: "广告",
            barWidth: 35,
            type: "bar",
            smooth: true,
            data: this.mychart.year.onlinePay  //[777, 188, 200, 777, 60, 3, 600]
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
		  trigger: "axis",
		  axisPointer:{
			  type:"shadow"
		  }
          // axisPointer: {
          //     type: 'cross'
          // }
        },
        legend: {
          data: this.mychart.legendData  //["入场统计", "出场统计"]
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
            data:  this.mychart.day.axxisData  //["00h", "01h", "02h", "03h", "04h", "05h", "06h"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "现金收费",
            type: "bar",
            stack: "广告",
            barWidth: 35,
            smooth: true,
            data: this.mychart.day.cashCharge //[666, 44, 0, 67, 90, 200, 400]
          },
          {
            name: "折扣金额",
            stack: "广告",
            barWidth: 35,
            type: "bar",
            smooth: true,
            data: this.mychart.day.discMoney  //[777, 188, 200, 777, 60, 3, 600]
          },
          {
            name: "在线支付金额",
            stack: "广告",
            barWidth: 35,
            type: "bar",
            smooth: true,
            data: this.mychart.day.onlinePay  //[777, 188, 200, 777, 60, 3, 600]
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