<template>
	<section>
		<div class="parent">
		
			<div class="margin-tops querys" >
        <span> 所属停车场</span>
				<el-select v-model="filters.v_park" filterable placeholder="所属停车场">
                     
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-input id="plate_no" name="plate_no" placeholder="车牌号" v-model="filters.v_plate_no" >
                     <template slot="prepend">车牌号</template>   
              </el-input>
              <span>通道</span>
              <el-select v-model="filters.v_passageway" filterable placeholder="通道">
	                    <el-option
	                      v-for="item in passageway"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
              <span>计费类型</span>
	            <el-select v-model="filters.v_fee_type" filterable placeholder="计费类型">
	                    <el-option
	                      v-for="item in fee_type"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <div class="dates block">
		                    <span class="demonstration">出场时间从</span>
		                    <el-date-picker
		                      v-model="filters.start_datefrom"
		                      type="datetime"
		                      placeholder="选择日期时间">
		                    </el-date-picker>
		                  </div>
		                   <div class="dates block">
		                    <span class="demonstration">到</span>
		                    <el-date-picker
		                      v-model="filters.start_dateto"
		                      type="datetime"
		                      placeholder="选择日期时间">
		                    </el-date-picker>

                </div>
                <el-input   id="dutyMan" name="dutyMan" placeholder="值班员"  v-model="filters.v_dutyMan">
                     <template slot="prepend">值班员</template>   
                </el-input>
                <span>放行方式</span>
                <el-select v-model="filters.v_releaseMethod" filterable placeholder="放行方式">
	                    <el-option
	                      v-for="item in releaseMethod"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
              <span>停车时长</span>
	            <el-select v-model="filters.v_parkingTime" filterable placeholder="停车时长">
	                    <el-option
	                      v-for="item in parkingTime"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-input  v-model="filters.value" placeholder="请输入值" >
	            	 <template slot="prepend">请输入值</template>   
                </el-input>
                <el-select v-model="filters.v_min" filterable placeholder="分钟">
	                    <el-option
	                      v-for="item in min"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	             <el-button type="primary" icon="el-icon-search" size="medium" @click="getOutRecord">查询</el-button>
                 <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
                 <div class="rights"> 
                 	<el-button type="success" size="medium"><strong><i class="el-icon-upload"></i></strong > 导出EXCEL报表</el-button>	
                 </div>
			</div>
			<div class="margin-tops">
				 <template>
                    <el-table
                      :data="list"
                      border
                      style="width: 100% ;"
                      >
                     <el-table-column
                        type="index"
                        label="序号"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="flowId"
                        label=""
                       display="none"
                       v-if="noshow"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="licensePlate"
                        label="车牌号"
                        
                        >
                      </el-table-column>
                      <el-table-column
                        prop="chargeType"
                        label="计费类型">
                      </el-table-column>
                      <el-table-column
                        prop="car_group"
                        label="车辆分组">
                      </el-table-column>               
                      <el-table-column
                        prop="entrancePassageway"
                        label="通道">
                      </el-table-column>
                      <el-table-column
                        prop="enterDate"
                        label="入场时间">
                      </el-table-column>
                      <el-table-column
                        prop="outDate"
                        label="出场时间">
                      </el-table-column>
                      <el-table-column
                        prop="admissionReleaseType"
                        label="放行方式">
                      </el-table-column>
                      <el-table-column
                        prop="des"
                        label="描述">
                      </el-table-column>
                      <el-table-column
                        prop="admissionWatch"
                        label="值班员">
                      </el-table-column>
                      <el-table-column          
                        label="操作"
                        width="250px"
                        type="expand">
                         <template slot-scope="props">
                              <div>
                                <el-button>车牌照片</el-button>
                                <el-button>辅助照片</el-button>
                                 <el-button>证件照片</el-button>
                              </div>
                              <div class="main">
                                 <el-row :gutter="20">
                                       <el-col :span="12">
                                          <div class="panel">
                                                
                                              <p class="title">入场记录信息</p>
                                              <div class="imgBox">
                                                <ul>
                                                  <li> <img src="" alt="无图片"></li>
                                                  <!-- <li></li>
                                                  <li></li> -->
                                                </ul>  
                                              </div>
                                              <div class="wenziBox">
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              车牌号：
                                                          </el-col>
                                                          <el-col :span="8">
                                                            {{props.row.licensePlate}}
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              注册号：
                                                          </el-col>
                                                          <el-col :span="8">
                                                            {{props.row.licensePlate}}
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              入场时间：
                                                          </el-col>
                                                          <el-col :span="8">
                                                            {{props.row.enterDate}}
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              入场控制器：
                                                          </el-col>
                                                          <el-col :span="8">
                                                          
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              入场通道：
                                                          </el-col>
                                                          <el-col :span="8">
                                                        
                                                            {{props.row.entrancePassageway}}
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              计费类型：
                                                          </el-col>
                                                          <el-col :span="8">
                                                        
                                                            {{props.row.chargeType}}
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              车类型
                                                          </el-col>
                                                          <el-col :span="8">
                                                        
                                                            
                                                          </el-col>
                                                      </el-row>
                                              </div>
                                          </div>
                                      </el-col>

                                      <el-col :span="12">
                                          <div class="panel">
                                         <p class="title">出场记录信息</p>
                                          <div class="imgBox">
                                                <ul>
                                                  <li> <img src="" alt="无图片"></li>
                                                  <!-- <li></li>
                                                  <li></li> -->
                                                </ul>  
                                          </div>
                                          <div class="wenziBox">
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              车牌号：
                                                          </el-col>
                                                          <el-col :span="8">
                                                            {{props.row.licensePlate}}
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              注册号：
                                                          </el-col>
                                                          <el-col :span="8">
                                                            {{props.row.licensePlate}}
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              出场时间：
                                                          </el-col>
                                                          <el-col :span="8">
                                                            {{props.row.enterDate}}
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              出场控制器：
                                                          </el-col>
                                                          <el-col :span="8">
                                                          
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              出场通道：
                                                          </el-col>
                                                          <el-col :span="8">
                                                        
                                                            {{props.row.entrancePassageway}}
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              计费类型：
                                                          </el-col>
                                                          <el-col :span="8">
                                                        
                                                            {{props.row.chargeType}}
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              车类型
                                                          </el-col>
                                                          <el-col :span="8">
                                                        
                                                            
                                                          </el-col>
                                                      </el-row>
                                              </div>
                                      </div>
                                      </el-col>
                                 </el-row>
                                 <el-row :gutter="20">
                                     <el-col :span="12">
                                          <div class="panel">  
                                              <p class="title">收费记录信息</p>   
                                                  <el-row :gutter="20">
                                                      <el-col :span="12">
                                                          停车应缴金额：
                                                      </el-col>
                                                      <el-col :span="12">
                                                        
                                                      </el-col>
                                                  </el-row>
                                                  <el-row :gutter="20">
                                                      <el-col :span="12">
                                                         折扣金额：
                                                      </el-col>
                                                      <el-col :span="12">
                                                        
                                                      </el-col>
                                                  </el-row>
                                                   <el-row :gutter="20">
                                                      <el-col :span="12">
                                                         值班员实收：
                                                      </el-col>
                                                      <el-col :span="12">
                                                        
                                                      </el-col>
                                                  </el-row>
                                                  <el-row :gutter="20">
                                                      <el-col :span="12">
                                                         在线支付金额：
                                                      </el-col>
                                                      <el-col :span="12">
                                                        
                                                      </el-col>
                                                  </el-row>
                                                   <el-row :gutter="20">
                                                      <el-col :span="12">
                                                         停车时长：
                                                      </el-col>
                                                      <el-col :span="12">
                                                        
                                                      </el-col>
                                                  </el-row>
                                                  <el-row :gutter="20">
                                                      <el-col :span="12">
                                                         缴费方式：
                                                      </el-col>
                                                      <el-col :span="12">
                                                        
                                                      </el-col>
                                                  </el-row>
                                                  <el-row :gutter="20">
                                                      <el-col :span="12">
                                                         收费电脑：
                                                      </el-col>
                                                      <el-col :span="12">
                                                        
                                                      </el-col>
                                                  </el-row>
                                                  <el-row :gutter="20">
                                                      <el-col :span="12">
                                                         收费人：
                                                      </el-col>
                                                      <el-col :span="12">
                                                        
                                                      </el-col>
                                                  </el-row>
                                                   <el-row :gutter="20">
                                                      <el-col :span="12">
                                                         收费时间：
                                                      </el-col>
                                                      <el-col :span="12">
                                                        
                                                      </el-col>
                                                  </el-row>
                                                  <el-row :gutter="20">
                                                      <el-col :span="12">
                                                         备注：
                                                      </el-col>
                                                      <el-col :span="12">
                                                        
                                                      </el-col>
                                                  </el-row>
                                          </div>
                                     </el-col>
                                     <el-col :span="12">
                                          <div class="panel">  
                                              <p class="title">访客信息</p>   
                                              <el-row :gutter="20">
                                                  <el-col :span="12">
                                                      访客名称：
                                                  </el-col>
                                              </el-row>
                                              <el-row :gutter="20">
                                                  <el-col :span="12">
                                                      身份证：
                                                  </el-col>
                                              </el-row>
                                          </div>
                                     </el-col>
                                 </el-row>
                                </div>
                              
                          </template>
                      </el-table-column>
                    </el-table>
                 </template>
			</div>
			<div>
		        <!-- <Paging v-bind:total="totals"></Paging>		         -->
						<el-pagination
              
              @current-change="handleCurrentChange"
              :current-page.sync="totals.currentPage"
              :page-size.sync="totals.pageSize"
              layout="total, prev, pager, next"
              :total.sync="totals.totalNum">
            </el-pagination>
		   </div>
		</div>
	</section>
</template>
<script>
//reqOutRecord
import { reqOutRecord } from "@/api/recordQuery";
export default {
  data() {
    return {
      noshow:false,
      filters: {
              v_park: "",
              v_passageway: "",
              v_fee_type: "",
              v_releaseMethod: "",
              v_plate_no: "",
              v_fee_type: "",
              start_datefrom: "",
              start_dateto: "",
              v_dutyMan: "",
              v_parkingTime: "",
              value: "",
              v_min: ""
      },
      parkingTime: [],
      min: [],
      park: [{}],
      passageway: [{}],
      fee_type: [{}],
      releaseMethod: [{}],

      totals: {
              totalNum: 4,
              pageSize: 1,
              currentPage: 1
      },
      list: [{},{},{},{},{},{}]
    };
  },
  mounted(){
    this.getOutRecord();
  },
  methods: {
    getOutRecord(){
      var para={
            park:this.filters.v_park
      }
      reqOutRecord(para).then(res=>{
        if(res.code===1){
                console.log(res);
                this.totalNum = res.total;
                this.list=res.admissionRecords;
         
        }else{
           
        }
      })
    },
		callbackSelTenant(){
			var filter=this.filters;
       for(var item in filter){
				 filter[item]="";
			 }
		},
    handleCurrentChange(val) {
        this.totals.currentPage=val;
        this.getOutRecord();
    }
  }
};
</script>
<style scoped>
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
.querys {
  position: relative;
}
.rights {
  position: absolute;
  top: 50px;
  right: 0;
}
.main {
  overflow: auto;
}
.panel {
  border: 1px solid #ddd;
  margin: 15px 10px;
  /* height: 350px; */
  border-radius: 5px;
}
.wenziBox {
  margin: 10px;
}
.panel .title {
  margin-bottom: 10px;
  text-align: left;
  font-weight: bold;
  padding: 10px;
  background-color: #eee;
  border-bottom: 1px solid #ccc;
}
.panel .title .imgBox {
  height: 100px;
  border: 1px solid red;
}
.panel ul li {
  height: 100px;
  list-style: none;
}
.querys span{
  font-size: 12px;

}
</style>