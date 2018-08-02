<template>
	<section>
		<div class="parent">
			<div >
				<el-tabs v-model="activeName" >
			    <el-tab-pane label="按日期统计" name="first">
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
                             <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
			                 <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
			                 <el-checkbox-group v-model="filters.checkList" style="display:inline-block">
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
						    :data="dtbyDate"
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
                            <el-table-column label="月票车">
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
                            <el-select v-model="filters.toll" filterable placeholder="收费员">
		                    <el-option
		                      v-for="item in select.toll"
		                      :key="item.value"
		                      :label="item.label"
		                      :value="item.value">
		                    </el-option>
	                   </el-select>
                          
                             <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
			                 <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
			                 <el-checkbox-group v-model="filters.checkList" style="display:inline-block">
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
						    :data="dtbyFeeMan"
						    show-summary
						    style="width: 100%">
						    <el-table-column
						      prop="toll"
						      label="收费员"
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
                            <el-table-column label="月票车">
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
export default {
  data() {
    return {
      colors:  ["#67c23a", "#5793f3", "orange","#B0E2FF","#F08080","#FFBBFF"],
      colors1: ["#67c23a", "#5793f3", "orange","#B0E2FF","#F08080","#FFBBFF"],

      activeName: "first",
      filters: {
        park: "",
        entry_datefrom: "",
        entry_dateto: "",
        toll: "",
        checkList: []
      },
      select: {
        park: configs.park,
        toll: []
      },
      dtbyDate: [
        {
          date: "2016-05-03", //日期
          bill: "33", //应收车次
          free: "44", //免费车次
          fact: "55", //实收车次
          dis_freq: "1", // 打折次数
          bill_sum: "54", //应收金额
          dis_sum: "4", //折扣金额
          online_pay_sum: "1", //在线支付金额
          unconfin_sum: "3", //未确认金额
          fact_sum: "44", //实收金额
          //临时车免费放行
          free_release: "1", //免费放行
          free_sum: "3", //免费金额,
          //月票车
          inout_flow1: "333", //进/出流量
          delay_sum1: "333", //延期金额
          //车位池车
          inout_flow2: "333", //进/出流量
          delay_sum2: "444", //延期金额
          //储值票车
          inout_flow3: "555", //进/出流量
          charge: "444", //储值收费
          recharge_amount: "12345", //充值金额
          //月结车
          inout_flow4: "666", //进/出流量
          monetary: "453", //消费金额
          //异常开闸
          manual: "333", //手动,
          computer: "45654" //电脑
        }
      ],
      dtbyFeeMan: [
        {
          // date: "2016-05-03",
          toll: "收费员",
          bill: "33", //应收车次
          free: "44", //免费车次
          fact: "55", //实收车次
          dis_freq: "1", // 打折次数
          bill_sum: "54", //应收金额
          dis_sum: "4", //折扣金额
          online_pay_sum: "1", //在线支付金额
          unconfin_sum: "3", //未确认金额
          fact_sum: "44", //实收金额
          //临时车免费放行
          free_release: "1", //免费放行
          free_sum: "3", //免费金额,
          //月票车
          inout_flow1: "333", //进/出流量
          delay_sum1: "333", //延期金额
          //车位池车
          inout_flow2: "333", //进/出流量
          delay_sum2: "444", //延期金额
          //储值票车
          inout_flow3: "555", //进/出流量
          charge: "444", //储值收费
          recharge_amount: "12345", //充值金额
          //月结车
          inout_flow4: "666", //进/出流量
          monetary: "453", //消费金额
          //异常开闸
          manual: "333", //手动,
          computer: "45654" //电脑
        },{
          // date: "2016-05-03",
          toll: "收费员1",
          bill: "33", //应收车次
          free: "44", //免费车次
          fact: "55", //实收车次
          dis_freq: "1", // 打折次数
          bill_sum: "54", //应收金额
          dis_sum: "4", //折扣金额
          online_pay_sum: "1", //在线支付金额
          unconfin_sum: "3", //未确认金额
          fact_sum: "44", //实收金额
          //临时车免费放行
          free_release: "1", //免费放行
          free_sum: "3", //免费金额,
          //月票车
          inout_flow1: "333", //进/出流量
          delay_sum1: "333", //延期金额
          //车位池车
          inout_flow2: "333", //进/出流量
          delay_sum2: "444", //延期金额
          //储值票车
          inout_flow3: "555", //进/出流量
          charge: "444", //储值收费
          recharge_amount: "12345", //充值金额
          //月结车
          inout_flow4: "666", //进/出流量
          monetary: "453", //消费金额
          //异常开闸
          manual: "333", //手动,
          computer: "45654" //电脑
        }
      ],
      mychart: {
        byDate: {
          xaxisData: [], //date
          fact_sum: [], //临时车实收金额
          online_pay_sum: [], //在线支付金额
          delay_sum1: [], //月票车延期金额
          delay_sum2: [], //车位池车延期金额
          charge: [], //储值票车实收金额
          recharge_amount: [], //储值票车充值金额
          allmoney: [], //总额
          allfact_sum: "",
          allonline_pay_sum: "",
					alldelay_sum1: "",
					alldelay_sum2:"",
					allcharge:"",
					allrecharge_amount:""
				},
				byToll:{
          xaxisData: [], //date
          fact_sum: [], //临时车实收金额
          online_pay_sum: [], //在线支付金额
          delay_sum1: [], //月票车延期金额
          delay_sum2: [], //车位池车延期金额
          charge: [], //储值票车实收金额
          recharge_amount: [], //储值票车充值金额
          allmoney: [], //总额
          allfact_sum: "",
          allonline_pay_sum: "",
					alldelay_sum1: "",
					alldelay_sum2:"",
					allcharge:"",
					allrecharge_amount:""
				}
      }
    };
  },
  mounted() {
    this.byDateCcharts();
    this.byDatePchart();
    this.byFeeCcharts();
    this.byFeePchart();
  },
  created() {
		this.mycharts(this.dtbyDate,"byDate","date");
		this.mycharts(this.dtbyFeeMan,"byToll","toll");
    //临时车实收金额
    this.mychart.byDate.allfact_sum = this.sum(this.mychart.byDate.fact_sum);
    // online_pay_sum: [], //在线支付金额
    this.mychart.byDate.allonline_pay_sum = this.sum(
      this.mychart.byDate.online_pay_sum
    );
    // delay_sum1: [], //月票车延期金额
    this.mychart.byDate.alldelay_sum1 = this.sum(
      this.mychart.byDate.delay_sum1
    );
		// delay_sum2: [], //车位池车延期金额
		 this.mychart.byDate.alldelay_sum2 = this.sum(
      this.mychart.byDate.delay_sum2
    );
		// charge: [], //储值票车实收金额
		 this.mychart.byDate.allcharge = this.sum(
      this.mychart.byDate.charge
    );
		// recharge_amount: [], //储值票车充值金额
			 this.mychart.byDate.allrecharge_amount = this.sum(
			this.mychart.byDate.recharge_amount
			
		);
		
		//临时车实收金额
    this.mychart.byToll.allfact_sum = this.sum(this.mychart.byToll.fact_sum);
    // online_pay_sum: [], //在线支付金额
    this.mychart.byToll.allonline_pay_sum = this.sum(
      this.mychart.byToll.online_pay_sum
    );
    // delay_sum1: [], //月票车延期金额
    this.mychart.byToll.alldelay_sum1 = this.sum(
      this.mychart.byToll.delay_sum1
    );
		// delay_sum2: [], //车位池车延期金额
		 this.mychart.byToll.alldelay_sum2 = this.sum(
      this.mychart.byToll.delay_sum2
    );
		// charge: [], //储值票车实收金额
		 this.mychart.byToll.allcharge = this.sum(
      this.mychart.byToll.charge
    );
		// recharge_amount: [], //储值票车充值金额
			 this.mychart.byToll.allrecharge_amount = this.sum(
			this.mychart.byToll.recharge_amount
			
		);

  },
  methods: {
    mycharts(Data,byType,dateOrToll) {
			
        Data.forEach(item => {
        this.mychart[byType].xaxisData.push(item[dateOrToll]);
        this.mychart[byType].fact_sum.push(item.fact_sum);
        this.mychart[byType].online_pay_sum.push(item.online_pay_sum);
        this.mychart[byType].delay_sum1.push(item.delay_sum1);
        this.mychart[byType].delay_sum2.push(item.delay_sum2);
        this.mychart[byType].charge.push(item.charge);
        this.mychart[byType].recharge_amount.push(item.recharge_amount);
        var allmoney =
          item.fact_sum +
          item.online_pay_sum +
          item.delay_sum1 +
          item.delay_sum2 +
          item.charge +
          item.recharge_amount;
        this.mychart[byType].allmoney.push(allmoney);
      });
			
			
      
    },
    //重复调用的方法算出饼图总额
    sum(val) {
      var sum = 0;
      val.forEach(item => {
        sum += parseInt(item);
      });
      return sum;
      //	this.mychart.byDate.allfact_sum=allfact_sum;
      console.log("allfact_sum");
    },
    byDateCcharts() {
      let myChart = echarts.init(document.getElementById("byDateCchart"));
      myChart.setOption({
        title: { text: "" },
        color: this.colors,

        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          //data:[ '临时车实收金额','1',,'2','3','4','5']
        },
        grid: {
          //    left: '3%',
          // right: '4%',

          top: 70,
          bottom: 50

          //bottom: "3%",
          //containLabel: true
        },
        xAxis: [
          {
            type: "category",
            // axisTick: {
            //     alignWithLabel: true
            // },
            // axisLine: {
            //     onZero: false,
            //     lineStyle: {
            //         color: this.colors[1]
            //     }
            // },
            data: this.mychart.byDate.xaxisData, //["6-1", "6-2", "6-3", "6-4", "6-5", "6-6", "6-7"],
            axisPointer: {
              label: {
                formatter: function(params) {
                  console.log(params);
                  return (
                    "总收入  " +
                    (parseInt(params.seriesData[0].data) +
                      parseInt(params.seriesData[1].data) +
                      parseInt(params.seriesData[2].data) +
                      parseInt(params.seriesData[3].data) +
                      parseInt(params.seriesData[4].data) +
                      parseInt(params.seriesData[5].data))
                  );
                }
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "临时车实收金额",
            type: "bar",
            stack: "广告",
            barWidth: 40,
            data: this.mychart.byDate.fact_sum //[320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "在线支付金额",
            type: "bar",
            stack: "广告",
            barWidth: 40,
            data: this.mychart.byDate.online_pay_sum //[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "月票车延期金额",
            type: "bar",
            stack: "广告",
            barWidth: 40,
            data: this.mychart.byDate.delay_sum1 //[220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "车位池车延期金额",
            type: "bar",
            stack: "广告",
            barWidth: 40,
            data: this.mychart.byDate.delay_sum2 //[150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "储值票车实收金额",
            type: "bar",
            stack: "广告",
            barWidth: 40,
            data: this.mychart.byDate.charge // [862, 1018, 964, 1026, 1679, 1600, 1570]
          },
          {
            name: "储值票车充值金额",
            type: "bar",
            stack: "广告",
            barWidth: 40,
            data: this.mychart.byDate.recharge_amount // [620, 732, 701, 734, 1090, 1130, 1120]
          }
        ]
      });
    },
    byDatePchart() {
      let myChart = echarts.init(document.getElementById("byDatePchart"));
      myChart.setOption({
        title: { text: "" },
        color: this.colors1,

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          data: ["入场统计", "出场统计"]
        },
        series: [
          {
            name: "总额",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              {
                value: this.mychart.byDate.allfact_sum,
                name: "临时车实收金额"
              },
              {
                value: this.mychart.byDate.allonline_pay_sum,
                name: "在线支付金额"
              },
              { value: this.mychart.byDate.alldelay_sum1, name: "月票车延期金额" },
							{ value: this.mychart.byDate.alldelay_sum2, name: "车位池车延期金额" },
							{ value: this.mychart.byDate.allcharge, name: "储值票车实收金额" },
							{ value: this.mychart.byDate.allrecharge_amount, name: "储值票车充值金额" },
            ],
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
    },
    byFeeCcharts() {
      let myChart = echarts.init(document.getElementById("byFeeCchart"));
      myChart.setOption({
        title: { text: "" },
        color: this.colors,

        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          //data:[ '临时车实收金额','1',,'2','3','4','5']
        },
        grid: {
          //    left: '3%',
          // right: '4%',
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            // axisTick: {
            //     alignWithLabel: true
            // },
            // axisLine: {
            //     onZero: false,
            //     lineStyle: {
            //         color: this.colors[1]
            //     }
            // },
            data: this.mychart.byToll.xaxisData ,// ["6-1", "6-2", "6-3", "6-4", "6-5", "6-6", "6-7"],
            axisPointer: {
              label: {
                formatter: function(params) {
                  console.log(params);
                  return (
                    "总收入  " +
                    (parseInt(params.seriesData[0].data) +
                      parseInt(params.seriesData[1].data) +
                      parseInt(params.seriesData[2].data) +
                      parseInt(params.seriesData[3].data) +
                      parseInt(params.seriesData[4].data) +
                      parseInt(params.seriesData[5].data))
                  );
                }
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
         {
            name: "临时车实收金额",
            type: "bar",
            stack: "广告",
            barWidth: 40,
            data: this.mychart.byToll.fact_sum //[320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "在线支付金额",
            type: "bar",
            stack: "广告",
            barWidth: 40,
            data: this.mychart.byToll.online_pay_sum //[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "月票车延期金额",
            type: "bar",
            stack: "广告",
            barWidth: 40,
            data: this.mychart.byToll.delay_sum1 //[220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "车位池车延期金额",
            type: "bar",
            stack: "广告",
            barWidth: 40,
            data: this.mychart.byToll.delay_sum2 //[150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "储值票车实收金额",
            type: "bar",
            stack: "广告",
            barWidth: 40,
            data: this.mychart.byToll.charge // [862, 1018, 964, 1026, 1679, 1600, 1570]
          },
          {
            name: "储值票车充值金额",
            type: "bar",
            stack: "广告",
            barWidth: 40,
            data: this.mychart.byToll.recharge_amount // [620, 732, 701, 734, 1090, 1130, 1120]
          }
        ]
      });
    },
    byFeePchart() {
      let myChart = echarts.init(document.getElementById("byFeePchart"));
      myChart.setOption({
        title: { text: "" },
        color: this.colors1,

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          data: ["入场统计", "出场统计"]
        },
        series: [
          {
            name: "总额",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              {
                value: this.mychart.byToll.allfact_sum,
                name: "临时车实收金额"
              },
              {
                value: this.mychart.byToll.allonline_pay_sum,
                name: "在线支付金额"
              },
              { value: this.mychart.byToll.alldelay_sum1, name: "月票车延期金额" },
							{ value: this.mychart.byToll.alldelay_sum2, name: "车位池车延期金额" },
							{ value: this.mychart.byToll.allcharge, name: "储值票车实收金额" },
							{ value: this.mychart.byToll.allrecharge_amount, name: "储值票车充值金额" },
            ],
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
<style scoped="scoped">
/*公共属性*/
.el-input-group {
  width: 200px;
}
.el-select {
  width: 130px;
}
/*公共属性*/
.dates {
  display: inline-block;
}

.left {
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
  border: 1px solid #ccc;
  border-radius: 3px;
}
.f {
  clear: both;
  position: relative;
}
.fr {
  float: right;
}
.table {
  /* scroll:auto; */
}
.el-button--success {
  margin-top: 10px;
}
</style>