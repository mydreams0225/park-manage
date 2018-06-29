<template>
	<section>
		<div class="parent">
			<el-tabs v-model="activeName" >
		    <el-tab-pane label="地区车辆分析统计（柱状图）" name="first">
		    	<div >
		    		<el-select v-model="v_park" filterable placeholder="所属停车场">
			                    <el-option
			                      v-for="item in park"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="v_cartype" filterable placeholder="车类型">
			                    <el-option
			                      v-for="item in cartype"
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
			           <el-select v-model="v_provice" filterable placeholder="省份">
			                    <el-option
			                      v-for="item in provice"
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
		    <el-tab-pane label="地区车辆分析统计（饼状图）" name="second">
		    	<div >
		    		<el-select v-model="v_park" filterable placeholder="所属停车场">
			                    <el-option
			                      v-for="item in park"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			           </el-select>
			           <el-select v-model="v_cartype" filterable placeholder="车类型">
			                    <el-option
			                      v-for="item in cartype"
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
			           <el-select v-model="v_provice" filterable placeholder="省份">
			                    <el-option
			                      v-for="item in provice"
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
		    				<div id="areapancakeChart" style="width:900px;height:400px;"></div>
                       	   </div>
                           <div class="right">
                           	  <div >
								 <template>
				                    <el-table
				                      :data="areapancakedata"
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
		</div>
	</section>
</template>
<script>
	export default{
        data(){
        	return{
        		colors:['#5793f3', '#d14a61', '#675bba'],
               v_park:'',
               park:[{}],
               activeName: 'first',
               v_cartype:'',
               cartype:[{}],
               v_sum_method:'',
               sum_method:[],
               v_provice:'',
               provice:[{}],
               areacolumn:[],
               areapancakedata:[]

        	}  
        },
         mounted(){
		    //this.drawLine_week();
		    this.drawcolumn_area();
		    this.drawpancake_area();
		    
		  },
        methods:{
        	drawcolumn_area(){
		    	let myChart = echarts.init(document.getElementById('areacolumnChart'))
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
				            type:'bar',
				            smooth: true,
				            data: [666,44, 0, 67, 90,200, 400, ]
				        },
				         {
				            name:'出场统计',
				            type:'bar',
				            smooth: true,
				            data: [777, 188, 200, 777, 60, 3, 600, ]
				        }
				    ]
		        })
		    },
		    drawpancake_area(){
		    	let myChart = echarts.init(document.getElementById('areapancakeChart'))
		        myChart.setOption({
		        	title: { text: '' },
		        	color: this.colors,
                    
				   tooltip : {
						        trigger: 'item',
						        formatter: "{a} <br/>{b} : {c} ({d}%)"
						    },
				    legend: {
				        data:[ '入场统计','出场统计']
				    },
				    // grid: {
				    //     top: 70,
				    //     bottom: 50
				    // },
				    // xAxis: [
				    //     {
				    //         type: 'category',
				    //         axisTick: {
				    //             alignWithLabel: true
				    //         },
				    //         axisLine: {
				    //             onZero: false,
				    //             lineStyle: {
				    //                 color: this.colors[1]
				    //             }
				    //         },
				    //         // axisPointer: {
				    //         //     label: {
				    //         //         formatter: function (params) {
				    //         //         	console.log(params);
				    //         //             return '总车流量数  ' + params.value
				    //         //                 + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
				    //         //         }
				    //         //     }
				    //         // },
				    //         data: ["6-11周一", "6-12周二", "6-13周三", "6-14周四", "6-15周五", "6-16周六", "6-17周日"]
				    //     },
				    // ],
				    // yAxis: [
				    //     {
				    //         type: 'value'
				    //     }
				    // ],
				    series : [
					        {
					            name: '访问来源',
					            type: 'pie',
					            radius : '55%',
					            center: ['50%', '60%'],
					            data:[
					                {value:335, name:'其他'},
					                {value:310, name:'京P'},
					                
					            ],
					            itemStyle: {
					                emphasis: {
					                    shadowBlur: 10,
					                    shadowOffsetX: 0,
					                    shadowColor: 'rgba(0, 0, 0, 0.5)'
					                }
					            }
					        }
					    ]
				    // series: [
				    //     // {
				    //     //     name:'2015 降水量',
				    //     //     type:'line',
				    //     //     xAxisIndex: 1,
				    //     //     smooth: true,
				    //     //     data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
				    //     // },
				    //     {
				    //         name:'入场统计',
				    //         type:'pie',
				    //         smooth: true,
				    //         data: [666,44, 0, 67, 90,200, 400, ]
				    //     },
				    //      {
				    //         name:'出场统计',
				    //         type:'pie',
				    //         smooth: true,
				    //         data: [0, 188, 200, 777, 60, 3, 600, ]
				    //     }
				    // ]
		        })
		    },
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