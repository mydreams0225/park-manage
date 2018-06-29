<template>
	<section>
		<div class="parent">
			<div >
				<el-tabs v-model="activeName" >
			    <el-tab-pane label="按日期统计" name="first">
			    	<div class="margin-tops">
			    		<el-select v-model="v_park" filterable placeholder="所属停车场">
		                    <el-option
		                      v-for="item in park"
		                      :key="item.value"
		                      :label="item.label"
		                      :value="item.value">
		                    </el-option>
	                   </el-select>
	                   <div class="dates block">
		                    <span class="demonstration">入场时间从</span>
		                    <el-date-picker
		                      v-model="start_date1"
		                      type="datetime"
		                      placeholder="选择日期时间">
		                    </el-date-picker>
		                  </div>
		                   <div class="dates block">
		                    <span class="demonstration">到</span>
		                    <el-date-picker
		                      v-model="start_date2"
		                      type="datetime"
		                      placeholder="选择日期时间">
		                    </el-date-picker>

                          </div>
                             <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
			                 <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
			                 <el-checkbox-group v-model="checkList" style="display:inline-block">
							    <el-checkbox label="临时车"></el-checkbox>
							    <el-checkbox label="月票车"></el-checkbox>
							  </el-checkbox-group>
			    	</div>
			    	<div class="margin-tops">
			    		<div class="left">
			    			<div class="l-title">汇总统计</div>
		    				<div id="byDateCchart" style="width:900px;height:400px;"></div>
			    		</div>
			    		<div class="right">
			    			<div class="l-title">各项收费金额占比统计</div>
			    			<div id="byDatePchart" style="width:500px;height:410px;"></div>
			    		</div>
			    	</div>
			    	<div class="margin-tops f">
			    		<el-button  icon="el-icon-upload" type="success" size="medium">导出EXCEL报表</el-button>
			    	</div>
			    	<div class="margin-tops table">
			    	  <template>
						  <el-table
						    :data="tabletab1"
						    show-summary
						    style="width: 100%">
						    <el-table-column
						      prop="date"
						      label="日期"
						      min-width='120'
						      >
						    </el-table-column>
						    <el-table-column label="临时车正常收费">
						      <el-table-column
						        prop="bill"
						        label="应收车次"
						        min-width='50'
						       >
						      </el-table-column>
						      <el-table-column
						        prop="free"
						        label="免费车次"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="fact"
						        label="实收车次"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="dis_freq"
						        label="打折次数"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="bill_sum"
						        label="应收金额"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="dis_sum"
						        label="折扣金额"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="online_pay_sum"
						        label="在线支付金额"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="unconfin_sum"
						        label="未确认金额"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="fact_sum"
						        label="实收金额"
						        min-width='50'
						        >
						      </el-table-column>
						      
						    </el-table-column>
                            <el-table-column label="临时车免费放行">
                                <el-table-column
						        prop="free_release"
						        label="免费放行"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="free_sum"
						        label="免费金额"
						        min-width='50'
						        >
						      </el-table-column>
						    </el-table-column>
                            <el-table-column label="月车票">
                                <el-table-column
						        prop="inout_flow1"
						        label="进/出流量"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="delay_sum1"
						        label="延期金额"
						        min-width='50'
						        >
						      </el-table-column>
						    </el-table-column>
						    <el-table-column label="车位池车">
                                <el-table-column
						        prop="inout_flow2"
						        label="进/出流量"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="delay_sum2"
						        label="延期金额"
						        min-width='50'
						        >
						      </el-table-column>
						    </el-table-column>
						    <el-table-column label="储值票车">
                                <el-table-column
						        prop="inout_flow3"
						        label="进/出流量"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="charge"
						        label="储值收费"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="recharge_amount"
						        label="充值金额"
						        min-width='50'
						        >
						      </el-table-column>
						    </el-table-column>
						    <el-table-column label="月结车">
                                <el-table-column
						        prop="inout_flow4"
						        label="进/出流量"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="monetary"
						        label="消费金额"
						        min-width='50'
						        >
						      </el-table-column>
						      
						    </el-table-column>
						    <el-table-column label="异常开闸">
                                <el-table-column
						        prop="manual"
						        label="手动"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="computer"
						        label="电脑"
						        min-width='50'
						        >
						      </el-table-column>
						      
						    </el-table-column>
						  </el-table>
						</template>
			    	</div>
			    </el-tab-pane>
			    <el-tab-pane label="按收费员统计" name="second">
			    	<div class="margin-tops">
			    		<el-select v-model="v_park" filterable placeholder="所属停车场">
		                    <el-option
		                      v-for="item in park"
		                      :key="item.value"
		                      :label="item.label"
		                      :value="item.value">
		                    </el-option>
	                   </el-select>
	                      <div class="dates block">
		                    <span class="demonstration">入场时间从</span>
		                    <el-date-picker
		                      v-model="start_date1"
		                      type="datetime"
		                      placeholder="选择日期时间">
		                    </el-date-picker>
		                  </div>
		                   <div class="dates block">
		                    <span class="demonstration">到</span>
		                    <el-date-picker
		                      v-model="start_date2"
		                      type="datetime"
		                      placeholder="选择日期时间">
		                    </el-date-picker>
		                    </div>
                            <el-select v-model="v_toll" filterable placeholder="收费员">
		                    <el-option
		                      v-for="item in toll"
		                      :key="item.value"
		                      :label="item.label"
		                      :value="item.value">
		                    </el-option>
	                   </el-select>
                          
                             <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
			                 <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
			                 <el-checkbox-group v-model="checkList" style="display:inline-block">
							    <el-checkbox label="临时车"></el-checkbox>
							    <el-checkbox label="月票车"></el-checkbox>
							  </el-checkbox-group>
			    	</div>
			    	<div class="margin-tops">
			    		<div class="left">
			    			<div class="l-title">汇总统计</div>
		    				<div id="byFeeCchart" style="width:900px;height:400px;"></div>
			    		</div>
			    		<div class="right">
			    			<div class="l-title">各项收费金额占比统计</div>
			    			<div id="byFeePchart" style="width:500px;height:410px;"></div>
			    		</div>
			    	</div>
			    	<div class="margin-tops f">
			    		<el-button  icon="el-icon-upload" type="success" size="medium">导出EXCEL报表</el-button>
			    	</div>
			    	<div class="margin-tops table">
			    	  <template>
						  <el-table
						    :data="tabletab1"
						    show-summary
						    style="width: 100%">
						    <el-table-column
						      prop="date"
						      label="日期"
						      min-width='120'
						      >
						    </el-table-column>
						    <el-table-column label="临时车正常收费">
						      <el-table-column
						        prop="bill"
						        label="应收车次"
						        min-width='50'
						       >
						      </el-table-column>
						      <el-table-column
						        prop="free"
						        label="免费车次"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="fact"
						        label="实收车次"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="dis_freq"
						        label="打折次数"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="bill_sum"
						        label="应收金额"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="dis_sum"
						        label="折扣金额"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="online_pay_sum"
						        label="在线支付金额"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="unconfin_sum"
						        label="未确认金额"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="fact_sum"
						        label="实收金额"
						        min-width='50'
						        >
						      </el-table-column>
						      
						    </el-table-column>
                            <el-table-column label="临时车免费放行">
                                <el-table-column
						        prop="free_release"
						        label="免费放行"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="free_sum"
						        label="免费金额"
						        min-width='50'
						        >
						      </el-table-column>
						    </el-table-column>
                            <el-table-column label="月车票">
                                <el-table-column
						        prop="inout_flow1"
						        label="进/出流量"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="delay_sum1"
						        label="延期金额"
						        min-width='50'
						        >
						      </el-table-column>
						    </el-table-column>
						    <el-table-column label="车位池车">
                                <el-table-column
						        prop="inout_flow2"
						        label="进/出流量"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="delay_sum2"
						        label="延期金额"
						        min-width='50'
						        >
						      </el-table-column>
						    </el-table-column>
						    <el-table-column label="储值票车">
                                <el-table-column
						        prop="inout_flow3"
						        label="进/出流量"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="charge"
						        label="储值收费"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="recharge_amount"
						        label="充值金额"
						        min-width='50'
						        >
						      </el-table-column>
						    </el-table-column>
						    <el-table-column label="月结车">
                                <el-table-column
						        prop="inout_flow4"
						        label="进/出流量"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="monetary"
						        label="消费金额"
						        min-width='50'
						        >
						      </el-table-column>
						      
						    </el-table-column>
						    <el-table-column label="异常开闸">
                                <el-table-column
						        prop="manual"
						        label="手动"
						        min-width='50'
						        >
						      </el-table-column>
						      <el-table-column
						        prop="computer"
						        label="电脑"
						        min-width='50'
						        >
						      </el-table-column>
						      
						    </el-table-column>
						  </el-table>
						</template>
			    	</div>
			    </el-tab-pane>
			    
			  </el-tabs>
			</div>
		</div>
	</section>
</template>
<script>
	export default{
		data(){
			return{
				colors:['#67c23a'],
				colors1:['#5793f3',],
				activeName: 'first',
				v_park:'',
				park:[{}],
				v_toll:'',
				toll:[{}],
				start_date1:'',
                start_date2:'',
                checkList:'',
                 tabletab1: [{
				          date: '2016-05-03',
				          bill: '33',
				          free: '44',
				          fact: '55',
				          address: '上海市普陀区金沙江路 1518 弄',
				          zip: 200333
				        }]
			}
		},
		mounted(){
          this.byDateCcharts();
          this.byDatePchart();
          this.byFeeCcharts();
          this.byFeePchart();
		}
		,
		 methods:{
        	byDateCcharts(){
		    	let myChart = echarts.init(document.getElementById('byDateCchart'))
		        myChart.setOption({
		        	title: { text: '' },
		        	color: this.colors,
                    
				    tooltip: {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                           type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                     }
				    },
				    legend: {
				        //data:[ '临时车实收金额','1',,'2','3','4','5']
				    },
				    grid: {
				         //    left: '3%',
					        // right: '4%',
					        bottom: '3%',
					        containLabel: true
				    },
				    xAxis: [
				        {
				            type: 'category',
				            // axisTick: {
				            //     alignWithLabel: true
				            // },
				            // axisLine: {
				            //     onZero: false,
				            //     lineStyle: {
				            //         color: this.colors[1]
				            //     }
				            // },
				            data: ["6-1", "6-2", "6-3", "6-4", "6-5", "6-6", "6-7"],
				            axisPointer: {
				                label: {
				                    formatter: function (params) {
				                    	console.log(params);
				                        return '总收入  ' + (params.seriesData[0].data +params.seriesData[1].data+params.seriesData[2].data+params.seriesData[3].data+params.seriesData[4].data+params.seriesData[5].data)
				                           ;
				                    }
				                }
				            },
				        },

				    ],
				    yAxis: [
				        {
				            type: 'value'
				        }
				    ],
				    series: [
						    {
					            name:'直接访问',
					            type:'bar',
					            stack: '广告',
					            barWidth : 40,
					            data:[320, 332, 301, 334, 390, 330, 320],
					        },
					        {
					            name:'邮件营销',
					            type:'bar',
					            stack: '广告',
					            barWidth : 40,
					            data:[120, 132, 101, 134, 90, 230, 210]
					        },
					        {
					            name:'联盟广告',
					            type:'bar',
					            stack: '广告',
					            barWidth : 40,
					            data:[220, 182, 191, 234, 290, 330, 310]
					        },
					        {
					            name:'视频广告',
					            type:'bar',
					            stack: '广告',
					            barWidth : 40,
					            data:[150, 232, 201, 154, 190, 330, 410]
					        },
					        {
					            name:'搜索引擎',
					            type:'bar',
					            stack: '广告',
					            barWidth : 40,
					            data:[862, 1018, 964, 1026, 1679, 1600, 1570],
					          
					        },
					        {
					            name:'百度',
					            type:'bar',
					            stack: '广告',
					            barWidth : 40,
					            data:[620, 732, 701, 734, 1090, 1130, 1120]
					        },
				    ]
		        })
		    },
		    byDatePchart(){
		    	let myChart = echarts.init(document.getElementById('byDatePchart'))
		        myChart.setOption({
		        	title: { text: '' },
		        	color: this.colors1,
                    
				   tooltip : {
						        trigger: 'item',
						        formatter: "{a} <br/>{b} : {c} ({d}%)"
						    },
				    legend: {
				        data:[ '入场统计','出场统计']
				    },
				    series : [
					        {
					            name: '总额',
					            type: 'pie',
					            radius : '55%',
					            center: ['50%', '60%'],
					            data:[
					                {value:335, name:'电子支付金额'},
					                {value:310, name:'临时金额总额'},
					                
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
				    
		        })
		    },
		    byFeeCcharts(){
		    	let myChart = echarts.init(document.getElementById('byFeeCchart'))
		        myChart.setOption({
		        	title: { text: '' },
		        	color: this.colors,
                    
				    tooltip: {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                           type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                     }
				    },
				    legend: {
				        //data:[ '临时车实收金额','1',,'2','3','4','5']
				    },
				    grid: {
				         //    left: '3%',
					        // right: '4%',
					        bottom: '3%',
					        containLabel: true
				    },
				    xAxis: [
				        {
				            type: 'category',
				            // axisTick: {
				            //     alignWithLabel: true
				            // },
				            // axisLine: {
				            //     onZero: false,
				            //     lineStyle: {
				            //         color: this.colors[1]
				            //     }
				            // },
				            data: ["6-1", "6-2", "6-3", "6-4", "6-5", "6-6", "6-7"],
				            axisPointer: {
				                label: {
				                    formatter: function (params) {
				                    	console.log(params);
				                        return '总收入  ' + (params.seriesData[0].data +params.seriesData[1].data+params.seriesData[2].data+params.seriesData[3].data+params.seriesData[4].data+params.seriesData[5].data)
				                           ;
				                    }
				                }
				            },
				        },

				    ],
				    yAxis: [
				        {
				            type: 'value'
				        }
				    ],
				    series: [
						    {
					            name:'直接访问',
					            type:'bar',
					            stack: '广告',
					            barWidth : 40,
					            data:[320, 332, 301, 334, 390, 330, 320],
					        },
					        {
					            name:'邮件营销',
					            type:'bar',
					            stack: '广告',
					            barWidth : 40,
					            data:[120, 132, 101, 134, 90, 230, 210]
					        },
					        {
					            name:'联盟广告',
					            type:'bar',
					            stack: '广告',
					            barWidth : 40,
					            data:[220, 182, 191, 234, 290, 330, 310]
					        },
					        {
					            name:'视频广告',
					            type:'bar',
					            stack: '广告',
					            barWidth : 40,
					            data:[150, 232, 201, 154, 190, 330, 410]
					        },
					        {
					            name:'搜索引擎',
					            type:'bar',
					            stack: '广告',
					            barWidth : 40,
					            data:[862, 1018, 964, 1026, 1679, 1600, 1570],
					          
					        },
					        {
					            name:'百度',
					            type:'bar',
					            stack: '广告',
					            barWidth : 40,
					            data:[620, 732, 701, 734, 1090, 1130, 1120]
					        },
				    ]
		        })
		    },
		    byFeePchart(){
		    	let myChart = echarts.init(document.getElementById('byFeePchart'))
		        myChart.setOption({
		        	title: { text: '' },
		        	color: this.colors1,
                    
				   tooltip : {
						        trigger: 'item',
						        formatter: "{a} <br/>{b} : {c} ({d}%)"
						    },
				    legend: {
				        data:[ '入场统计','出场统计']
				    },
				    series : [
					        {
					            name: '总额',
					            type: 'pie',
					            radius : '55%',
					            center: ['50%', '60%'],
					            data:[
					                {value:335, name:'电子支付金额'},
					                {value:310, name:'临时金额总额'},
					                
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
				    
		        })
		    },
        }
	}
</script>
<style scoped="scoped">
	 /*公共属性*/
     .el-input-group{
        width:200px;
      }
	  .el-select{
	    width:130px;
	  }
  /*公共属性*/
   .dates{
   display:inline-block;
}

.left{
	width:60%;
	float:left;
	border:1px solid #ccc; 
	border-radius:3px;
	
    overflow-x:auto
}
 .l-title{
    padding:10px;
    background-color:#f5f5f5;
}
.right{

	width:38%;
	float:right;
	border:1px solid #ccc; 
	border-radius:3px;

}
.f{
	clear:both;
	
}
.fr{
   float:right;
  }
  .table{
  	scroll:auto;
  }
</style>