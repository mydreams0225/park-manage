<template>
	<section>
		<div class="parent">
			<div class="margin-tops querys" >
				<span>所属停车场</span>
				<el-select v-model="filters.v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
							
	            <el-input v-model="filters.v_dutyAccount"   placeholder="值班员账号" >
                     <template slot="prepend">值班员账号</template>   
                </el-input>
                
	            <div class="dates block">
		                    <span class="demonstration">盘点开始时间从</span>
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
								<div class="dates block">
		                    <span class="demonstration">盘点结束时间从</span>
		                    <el-date-picker
		                      v-model="filters.end_datefrom"
		                      type="datetime"
		                      placeholder="选择日期时间">
		                    </el-date-picker>
		                  </div>
		                   <div class="dates block">
		                    <span class="demonstration">到</span>
		                    <el-date-picker
		                      v-model="filters.end_dateto"
		                      type="datetime"
		                      placeholder="选择日期时间">
		                    </el-date-picker>

                </div>
								<span>盘点状态</span>
								<el-select v-model="filters.v_checkStatus" filterable placeholder="盘点状态">
	                    <el-option
	                      v-for="item in checkStatus"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	              </el-select>
	             <el-button type="primary" icon="el-icon-search" size="medium" class="getCarCheck">查询</el-button>
                 <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
			</div>
			<div class="margin-tops">
				 <template>
                    <el-table
                      :data="tableData"
                      border
                      style="width: 100% ;"
                      >
                      <el-table-column
                        prop="seri_no"
                        label="序号"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="deviceName"
                        label="设备名称"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="dutyAccount"
                        label="值班员账号">
                      </el-table-column>
                      <el-table-column
                        prop="checkStatus"
                        label="盘点状态">
                      </el-table-column>               
                      <el-table-column
                        prop="checkStartTime"
                        label="盘点开始时间">
                      </el-table-column>
                      <el-table-column
                        prop="checkEndTime"
                        label="盘点结束时间">
                      </el-table-column>

                      <el-table-column
                        prop="createTime"
                        label="创建时间">
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
//reqCarCheck
import {reqCarCheck} from '@/api/recordQuery'
export default {
  data() {
    return {
      filters: {
        v_park: "",
        v_dutyAccount: "",
        start_datefrom: "",
        start_dateto: "",
        end_datefrom: "",
        end_dateto: "",
        v_checkStatus: ""
      },
        checkStatus: [],
        park: [{}],
        totals: {
						totalNum: 1,
						pageSize: 1,
						currentPage: 1
        },
        tableData: []
    };
	},
	methods:{
		getCarCheck(){
			let para={};
			reqCarCheck(para).then(res=>{
				if(res.code===1){
					this.totals.totalNum=res.total;
					this.tableData=res.list;
				}
			})
		},
		handleCurrentChange(){
			
		},
		callbackSelTenant(){
			for(var item in this.filters){
				this.filters[item]="";
			}
		}
	},
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
</style>