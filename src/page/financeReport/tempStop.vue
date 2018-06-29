<template>
	<section>
		<el-tabs :tab-position="tabPosition" style="height: 200px;">
		    <el-tab-pane label="周报表">
		    	<div class="parent">
		    		<div class="margin-tops">
		    			<el-select v-model="v_park" filterable placeholder="所属停车场">
			                    <el-option
			                      v-for="item in park"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="v_week" filterable placeholder="选择周数的任意日期">
			                    <el-option
			                      v-for="item in week"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="v_fee_type" filterable placeholder="计费类型">
			                    <el-option
			                      v-for="item in fee_type"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="v_sum_method" filterable placeholder="统计方式">
			                    <el-option
			                      v-for="item in sum_method"
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
				                      @selection-change="">  
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
		    			<el-select v-model="v_park" filterable placeholder="所属停车场">
			                    <el-option
			                      v-for="item in park"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="v_week" filterable placeholder="选择周数的任意日期">
			                    <el-option
			                      v-for="item in week"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="v_fee_type" filterable placeholder="计费类型">
			                    <el-option
			                      v-for="item in fee_type"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="v_sum_method" filterable placeholder="统计方式">
			                    <el-option
			                      v-for="item in sum_method"
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
				                      @selection-change="">  
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
		    			<el-select v-model="v_park" filterable placeholder="所属停车场">
			                    <el-option
			                      v-for="item in park"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="v_week" filterable placeholder="选择周数的任意日期">
			                    <el-option
			                      v-for="item in week"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="v_fee_type" filterable placeholder="计费类型">
			                    <el-option
			                      v-for="item in fee_type"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="v_sum_method" filterable placeholder="统计方式">
			                    <el-option
			                      v-for="item in sum_method"
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
				                      @selection-change="">  
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
		    <el-tab-pane label="日报表">
		    	<div class="parent">
		    		<div class="margin-tops">
		    			<el-select v-model="v_park" filterable placeholder="所属停车场">
			                    <el-option
			                      v-for="item in park"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="v_week" filterable placeholder="选择周数的任意日期">
			                    <el-option
			                      v-for="item in week"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="v_fee_type" filterable placeholder="计费类型">
			                    <el-option
			                      v-for="item in fee_type"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="v_sum_method" filterable placeholder="统计方式">
			                    <el-option
			                      v-for="item in sum_method"
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
				                      @selection-change="">  
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
		  </el-tabs>
		
	</section>
</template>
<script>
	export default {
		  name: 'hello',
		  data () {
		    return {
		     colors:['#67c23a','#5793f3','orange'],
		      tabPosition:'top',
              v_park:'',
              park:[{}],
              v_week:'',
              week:'',
              v_fee_type:'',
              fee_type:[{}],
              sum_method:[],
              v_sum_method:'',
              weeksumData:[{
              	date:'2016-6-11',
              	entrSum:'577',
              	outSum:'777'
              }],
              monthsumData:[],
              yearsumData:[],
              daysumData:[],

		    }
		  },
		  mounted(){
		    //this.drawLine_week();
		    this.drawLine_week1();
		    this.drawLine_month();
		    this.drawLine_year();
		    this.drawLine_day();
		  },
		  methods: {
		    drawLine_week1(){
		    	let myChart = echarts.init(document.getElementById('weekChart'))
		        myChart.setOption({
		        	title: { text: '' },
		        	color: this.colors,
                    
				    tooltip: {
				        trigger: 'axis',
				        // axisPointer: {
				        //     type: 'cross'
				        // }
				    },
				    legend: {
				        data:[ '现金收费','折扣金额']
				    },
				    grid: {
				        top: 70,
				        bottom: 50
				    },
				    xAxis: [
				        {
				            type: 'category',
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
				            data: ["6-11周一", "6-12周二", "6-13周三", "6-14周四", "6-15周五", "6-16周六", "6-17周日"]
				        },
				    ],
				    yAxis: [
				        {
				            type: 'value'
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
				            name:'现金收费',
				            type:'bar',
				            stack: '广告',
				            barWidth : 35,
				            smooth: true,
				            data: [666,44, 0, 67, 90,200, 400, ]
				        },
				         {
				            name:'折扣金额',
				            stack: '广告',
				            barWidth : 35,
				            type:'bar',
				            smooth: true,
				            data: [777, 188, 200, 777, 60, 3, 600, ]
				        },
				        {
				            name:'在线支付金额',
				            stack: '广告',
				            barWidth : 35,
				            type:'bar',
				            smooth: true,
				            data: [777, 188, 200, 777, 60, 3, 600, ]
				        }
				    ]
		        })
		    },
		    drawLine_month(){
		    	let myChart = echarts.init(document.getElementById('monthChart'))
		        myChart.setOption({
		        	title: { text: '' },
		        	color: this.colors,
                    
				    tooltip: {
				        trigger: 'axis',
				        // axisPointer: {
				        //     type: 'cross'
				        // }
				    },
				    legend: {
				        data:[ '入场统计','出场统计']
				    },
				    grid: {
				        top: 70,
				        bottom: 50
				    },
				    xAxis: [
				        {
				            type: 'category',
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
				            data: ["6-11周一", "6-12周二", "6-13周三", "6-14周四", "6-15周五", "6-16周六", "6-17周日"]
				        },
				    ],
				    yAxis: [
				        {
				            type: 'value'
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
				            name:'入场统计',
				            type:'line',
				            smooth: true,
				            data: [577, 188, 0, 0, 0, 0, 400, ]
				        },
				         {
				            name:'出场统计',
				            type:'line',
				            smooth: true,
				            data: [777, 188, 200, 777, 60, 3, 600, ]
				        }
				    ]
		        })
		    },
		    drawLine_year(){
		    	let myChart = echarts.init(document.getElementById('yearChart'))
		        myChart.setOption({
		        	title: { text: '' },
		        	color: this.colors,
                    
				    tooltip: {
				        trigger: 'axis',
				        // axisPointer: {
				        //     type: 'cross'
				        // }
				    },
				    legend: {
				        data:[ '入场统计','出场统计']
				    },
				    grid: {
				        top: 70,
				        bottom: 50
				    },
				    xAxis: [
				        {
				            type: 'category',
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
				            data: ["6-11周一", "6-12周二", "6-13周三", "6-14周四", "6-15周五", "6-16周六", "6-17周日"]
				        },
				    ],
				    yAxis: [
				        {
				            type: 'value'
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
				            name:'入场统计',
				            type:'line',
				            smooth: true,
				            data: [577, 555, 222, 0, 444, 99, 400, ]
				        },
				         {
				            name:'出场统计',
				            type:'line',
				            smooth: true,
				            data: [0, 188, 200, 777, 60, 3, 600, ]
				        }
				    ]
		        })
		    },
		    drawLine_day(){
		    	let myChart = echarts.init(document.getElementById('dayChart'))
		        myChart.setOption({
		        	title: { text: '' },
		        	color: this.colors,
                    
				    tooltip: {
				        trigger: 'axis',
				        // axisPointer: {
				        //     type: 'cross'
				        // }
				    },
				    legend: {
				        data:[ '入场统计','出场统计']
				    },
				    grid: {
				        top: 70,
				        bottom: 50
				    },
				    xAxis: [
				        {
				            type: 'category',
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
				            data: ["00h", "01h", "02h", "03h", "04h", "05h", "06h"]
				        },
				    ],
				    yAxis: [
				        {
				            type: 'value'
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
				            name:'入场统计',
				            type:'line',
				            smooth: true,
				            data: [577, 555, 222, 0, 444, 99, 400, ]
				        },
				         {
				            name:'出场统计',
				            type:'line',
				            smooth: true,
				            data: [0, 188, 200, 777, 60, 3, 600, ]
				        }
				    ]
		        })
		    }
		  }
}
	  
</script>
<style scoped>


.left{
	width:60%;
	float:left;
	border:1px solid #ccc; 
	border-radius:5px;
	
    overflow-x:auto
}
.left .l-title{
    padding:10px;
    background-color:#f5f5f5;
}
.right{

	width:38%;
	float:right;

}
</style>