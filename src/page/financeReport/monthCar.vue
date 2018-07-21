<template>
	<section>
		<div class="parent">
			<div class="margin-tops">
				<el-select v-model="filters.park" filterable placeholder="所属停车场">
		                    <el-option
		                      v-for="item in select.park"
		                      :key="item.value"
		                      :label="item.label"
		                      :value="item.value">
		                    </el-option>
	            </el-select>
	            <div class="dates block">
	                <span class="demonstration">入场时间从</span>
	                <el-date-picker
	                  v-model="filters.entry_datefrom"
	                  type="datetime"
	                  placeholder="选择日期时间">
	                </el-date-picker>
               </div>
               <div class="dates block">
	                <span class="demonstration">到</span>
	                <el-date-picker
	                  v-model="filters.entry_dateto"
	                  type="datetime"
	                  placeholder="选择日期时间">
	                </el-date-picker>
                </div>
                <el-select v-model="filters.statistics_method" filterable placeholder="统计方式">
                    <el-option
                      v-for="item in select.statistics_method"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
	            </el-select>
	            <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
			    <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
			</div>
			<div class="margin-tops">
				<div class="left">
					<div class="l-title">月结车消费统计</div>
					<div id="monthpayChart" style="width:900px;height:400px;"></div>
				</div>
				<div class="right">
					<div class="margin-tops">
        	        <template>
		                    <el-table
		                      :data="dtMonthsum"
		                      border
		                      style="width: 100% ;"
		                      >
		                      
		                      <el-table-column
		                        prop="group_name"
		                        label="分组名称"
		                        >
		                      </el-table-column>
		                      <el-table-column
		                        prop="consume_times"
		                        label="消费次数">
		                      </el-table-column>
		                      <el-table-column
		                        prop="receivable_sum"
		                        label="应收总额">
		                      </el-table-column>               
		                      <el-table-column
		                        prop="paid_sum"
		                        label="已付总额">
		                      </el-table-column>
		                      <el-table-column
		                        prop="disc_sum"
		                        label="折扣总额">
		                      </el-table-column>
		                      
		                    </el-table>
                    </template>
                 </div>
                 <div class="margin-tops">
                 	<el-button  icon="el-icon-upload" type="success" size="medium">打印报表</el-button>
                 </div>
                 
				</div>
			</div>
			
		</div>
	</section>
</template>
<script>
export default {
  data() {
    return {
			 colors: ["#67c23a", "#5793f3", "orange"],
      filters: {
        park: "",
        entry_datefrom: "",
        entry_dateto: "",
        statistics_method: ""
      },
      select: {
        statistics_method: [],
        park: []
      },
      dtMonthsum: [
        {
          group_name: "组一",
          consume_times: "3",
          receivable_sum: "3",
          paid_sum: "33",
          disc_sum: "3"
        },{
          group_name: "组一",
          consume_times: "3",
          receivable_sum: "3",
          paid_sum: "33",
          disc_sum: "3"
        }
      ],
      mychart: {
        axxisData: [],
        legendData: ["应收总额", "应付总额", "折扣总额"],
        receivable_sum: [], //应收金额
        paid_sum: [], //应付金额
        disc_sum: [] //折扣总额
      }
    };
  },
  created() {
    var arr = this.dtMonthsum;
    arr.forEach(item => {
      this.mychart.axxisData.push(item.group_name) ;
      this.mychart.receivable_sum.push(item.receivable_sum) ;
      this.mychart.paid_sum.push(item.paid_sum);
      this.mychart.disc_sum .push(item.disc_sum) ;
		});

  },
  mounted() {
    this.drawLine_monthpay();
  },
  methods: {
    drawLine_monthpay() {
      let myChart = echarts.init(document.getElementById("monthpayChart"));
      myChart.setOption({
        title: { text: "" },
        color: this.colors,

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
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
            name: "应收总额",
            type: "line",
           
            barWidth: 35,
            smooth: true,
            data: this.mychart.receivable_sum //[666, 44, 0, 67, 90, 200, 400]
          },
          {
            name: "应付总额",
            type: "line",
           
            barWidth: 35,
            smooth: true,
            data: this.mychart.receivable_sum //[666, 44, 0, 67, 90, 200, 400]
          },
          {
            name: "折扣总额",
           
            barWidth: 35,
            type: "line",
            smooth: true,
            data: this.mychart.paid_sum //[777, 188, 200, 777, 60, 3, 600]
          }
        ]
      });
    }
  }
};
</script>
<style scoped="scoped">
.dates {
  display: inline-block;
}
.left {
  margin-top: 15px;
  width: 60%;
  float: left;
  border: 1px solid #ccc;
  border-radius: 3px;

  overflow-x: auto;
}
.l-title {
  padding: 10px;
  background-color: #f5f5f5;
}
.right {
  width: 38%;
  float: right;

  border-radius: 3px;
}
</style>