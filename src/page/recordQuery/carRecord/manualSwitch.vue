<template>
	<section>
		<div class="parent">
			<div class="margin-tops">
				<el-button type="danger" icon="el-icon-delete" size="medium">删除查询到的记录</el-button>
			</div>
			<div class="margin-tops querys" >
				      <el-select v-model="filters.v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	             <el-select v-model="filters.v_inoutGate" filterable placeholder="出入场闸口">
	                    <el-option
	                      v-for="item in inoutGate"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
							<el-select v-model="filters.v_gateType" filterable placeholder="出入场闸口">
	                    <el-option
	                      v-for="item in gateType"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <div class="dates block">
		                    <span class="demonstration">开闸时间从</span>
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
                <el-input v-model="filters.dutyMan"  id="dutyMan" name="dutyMan" placeholder="值班员" >
                     <template slot="prepend">值班员</template>   
                </el-input>
	             <el-button type="primary" icon="el-icon-search" size="medium" @click="getManualSwitch">查询</el-button>
                 <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
                 <div class="rights"> 
                 	<el-button type="success" size="medium"><strong><i class="el-icon-upload"></i></strong > 导出EXCEL报表</el-button>	
                 </div>
			</div>
			<div class="margin-tops">
				 <template>
                    <el-table
                      :data="tableData"
                      border
                      style="width: 100% ;"
                      >
                
                      <el-table-column
                        type="index"
                        label="序号"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="entrance_gate"
                        label="出入场闸口"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="fee_computer"
                        label="收费电脑">
                      </el-table-column>
                      <el-table-column
                        prop="opening_time"
                        label="开闸时间">
                      </el-table-column>               
                      <el-table-column
                        prop="opening_type"
                        label="开闸类型">
                      </el-table-column>
                      <el-table-column
                        prop="duty_man"
                        label="值班员">
                      </el-table-column>
                      <el-table-column          
                        label="操作"
                        width="250px"
                        type="expand">
                         <template slot-scope="props">    
													      <div class="imgBox">
                                                <ul>
                                                  <li > <img src="" alt="无车牌照片"></li>
                                                  <!-- <li v-show="auxiliaryImgs"><img src="" alt="无辅助照片"></li>
                                                  <li v-show="CertificatesImgs"> <img src="" alt="无证件照片"></li> -->
                                                </ul>  
                             </div>          
                            <div class="wenziBox">
                              <el-row :gutter="20">
                                  <el-col :span="8">
                                      出入场闸口：
                                  </el-col>
                                  <el-col :span="8">
                                    {{props.row.entrance_gate}}
                                  </el-col>
                              </el-row>
                              <el-row :gutter="20">
                                  <el-col :span="8">
                                     开闸时间：
                                  </el-col>
                                  <el-col :span="8">
                                    {{props.row.opening_time}}
                                  </el-col>
                              </el-row>
                              <el-row :gutter="20">
                                  <el-col :span="8">
                                      收费电脑：
                                  </el-col>
                                  <el-col :span="8">
                                    {{props.row.fee_computer}}
                                  </el-col>
                              </el-row>
                               <el-row :gutter="20">
                                  <el-col :span="8">
                                      出入口控制器：
                                  </el-col>
                                  <el-col :span="8">
                                  
                                  </el-col>
                              </el-row>
                              <el-row :gutter="20">
                                  <el-col :span="8">
                                      开闸类型：
                                  </el-col>
                                  <el-col :span="8">
                                    {{props.row.opening_type}}
                                  </el-col>
                              </el-row>
                              <el-row :gutter="20">
                                  <el-col :span="8">
                                      值班员：
                                  </el-col>
                                  <el-col :span="8">
                                    {{props.row.duty_man}}
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
//reqManualSwitch
import {reqManualSwitch} from '@/api/recordQuery'
export default {
  data() {
    return {
			 totals: {
        totalNum: 1,
        pageSize: 1,
        currentPage: 1
      },
      filters: {
        v_park: "",
        v_inoutGate: "",
        v_gateType: "",
        dutyMan: "",
        start_datefrom: "",
        start_dateto: ""
      },
      inoutGate: [],
      gateType: [],

      park: [{}],

      totals: {
        totalnum: 1,
        pagesize: 1,
        currentPage1: 1
      },
      tableData: [{}]
    };
  },
  mounted(){
    this.getManualSwitch();
  },
	methods:{

    getManualSwitch(){
      let para={

      }
      reqManualSwitch(para).then(res=>{
          if(res.code===1){
                console.log(res);
                this.totals.totalNum = res.total;
                this.list=res.admissionRecords;
         
        }else{
           
        }
      })
    },
		callbackSelTenant(){
       for(var item in this.filters){
				 this.filters[item]="";
			 }
		},
		handleCurrentChange(val){
      this.totals.currentPage=val;
      this.getManualSwitch();

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
  top: 45px;
  right: 0;
}
.imgBox {
  height: 100px;
 
}
 ul li {
  height: 100px;
  list-style: none;
}
.wenziBox {
  margin: 10px;
}
.wenziBox .el-row {
  margin-top:10px;
}
</style>