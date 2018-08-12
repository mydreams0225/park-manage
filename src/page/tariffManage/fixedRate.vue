<template>
	<section>
		 <div class="parent">
			 
		 	<div class="margin-tops">
			 	<el-tabs type="border-card"> 
				  <el-tab-pane label="缴费规则分组">
				  	<div class="font">
					  	 <div >是否启用固定车辆在线支付：
					  	 	<template>
							  <el-radio v-model="show.used" label="启用"></el-radio>
							  <el-radio v-model="show.used" label="不启用"></el-radio>
							</template>
						</div>
						<div >
							可延期的最大期限：
							<el-date-picker
						      v-model="show.maxDate"
						      type="date"
						      placeholder="选择日期">
						    </el-date-picker>
						    <el-button type="primary" size="medium">保存</el-button>
						</div>
						<div >
							如果没有限制，则为空
						</div>
						<div class="margin-tops">
							<el-button type="primary" size="medium"><i class="el-icon-plus"></i> 新增</el-button>
							<el-button type="danger"  size="medium" icon="el-icon-delete" >删除</el-button>
						</div>
						<div class="margin-tops">
							<form class="form-inline" role="form" id="searchForm" name="searchForm" onsubmit="subSearchForm();return false;">
                                <el-select v-model="filters.v_park" filterable placeholder="所属停车场">
				                    <el-option
				                      v-for="item in park"
				                      :key="item.value"
				                      :label="item.label"
				                      :value="item.value">
				                    </el-option>
			                    </el-select>
			                    <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
			                    <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
							</form>
						</div>
						<!-- 展示区 -->
						<div class="margin-tops">
						 <template>
			                <el-table
			                  :data="tableData"
			                  border
			                  style="width: 100% ;"
			                  >
			                  <el-table-column
				                  type="selection"
				                  width="55">
			                  </el-table-column>
			                  <el-table-column
			                    prop="seri_no"
			                    label="序号"
			                    >
			                  </el-table-column>
			                  <el-table-column
			                    prop="create_time"
			                    label="创建时间"
			                    >
			                  </el-table-column>
			                  <el-table-column
			                    prop="lastEditTime"
			                    label="最后修改时间">
			                  </el-table-column>
			                  <el-table-column  
			                    label="操作"
			                    width="250px">
			                     <template slot-scope="scope">     
			                    </template>
			                  </el-table-column>
			                </el-table>
	                     </template>
						</div>
						<!-- <div>
						   <Paging v-bind:total="totals"></Paging>
						</div> -->
						<div>
							<el-pagination
              
              @current-change="handleCurrentChange"
              :current-page.sync="totals.currentPage"
              :page-size.sync="totals.pageSize"
              layout="total, prev, pager, next"
              :total.sync="totals.totalNum">
            </el-pagination>
						</div>

					</div>
				  </el-tab-pane>
				  <el-tab-pane label="缴费规则">
				  	<div class="font">
				  		
				  	
					  	 <div >是否启用固定车辆在线支付：
					  	 	<template>
							  <el-radio v-model="show.used" label="启用"></el-radio>
							  <el-radio v-model="show.used" label="不启用"></el-radio>
							</template>
						</div>
						<div >
							可延期的最大期限：
							<el-date-picker
						      v-model="show.maxDate"
						      type="date"
						      placeholder="选择日期">
						    </el-date-picker>
						    <el-button type="primary" size="medium">保存</el-button>
						</div>
						<div >
							如果没有限制，则为空
						</div>
						<div class="margin-tops">
							<el-button type="primary" size="medium"><i class="el-icon-plus"></i> 新增</el-button>
							<el-button type="danger"  size="medium" icon="el-icon-delete" >删除</el-button>
						</div>
						<div class="margin-tops">
							<form class="form-inline" role="form" id="searchForm" name="searchForm" onsubmit="subSearchForm();return false;">
                                <el-select v-model="filters.v_park" filterable placeholder="所属停车场">
				                    <el-option
				                      v-for="item in filters.park"
				                      :key="item.value"
				                      :label="item.label"
				                      :value="item.value">
				                    </el-option>
			                    </el-select>
			                    <el-select v-model="filters.v_pay_rule_group" filterable placeholder="缴费规则分组">
				                    <el-option
				                      v-for="item in pay_rule_group"
				                      :key="item.value"
				                      :label="item.label"
				                      :value="item.value">
				                    </el-option>
			                    </el-select>
			                    <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
			                    <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
							</form>
						</div>
						<!-- 展示区 -->
						<div class="margin-tops">
						 <template>
			                <el-table
			                  :data="tablegroup"
			                  border
			                  style="width: 100% ;"
			                  >
			                  <el-table-column
				                  type="selection"
				                  width="55">
			                  </el-table-column>
			                  <el-table-column
			                    prop="seri_no"
			                    label="序号"
			                    >
			                  </el-table-column>
			                  <el-table-column
			                    prop="rule_name"
			                    label="规则名称"
			                    >
			                  </el-table-column>
			                  <el-table-column
			                    prop="rule_group"
			                    label="所属规则分组">
			                  </el-table-column>
			                  <el-table-column
			                    prop="money"
			                    label="金额">
			                  </el-table-column>
			                  <el-table-column
			                    prop="delayMonth"
			                    label="延期月数">
			                  </el-table-column>
			                  <el-table-column
			                    prop="is_use"
			                    label="是否启用">
			                  </el-table-column>
			                  <el-table-column
			                    prop="create_time"
			                    label="创建时间">
			                  </el-table-column>
			                  <el-table-column
			                    prop="lastEditTime"
			                    label="最后修改时间">
			                  </el-table-column>
			                  <el-table-column  
			                    label="操作"
			                    width="250px">
			                     <template slot-scope="scope">     
			                    </template>
			                  </el-table-column>
			                </el-table>
	                     </template>
						</div>
						<!-- <div>
						   <Paging v-bind:total="total3"></Paging>
						</div> -->
						<el-pagination
              
              @current-change="handleCurrentChange"
              :current-page.sync="totals.currentPage"
              :page-size.sync="totals.pageSize"
              layout="total, prev, pager, next"
              :total.sync="totals.totalNum">
            </el-pagination>
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
      filters: {
				v_park: "",
				v_pay_rule_group: "",
      },
      show: {
        used: "",
        maxDate: ""
      },
      park: [{}],
     
      totals: {
        totalNum: 1,
        pageSize: 1,
        currentPage: 1
      },
      tableData: [],
      pay_rule_group: [],
      
      tablegroup: []
    };
	},
	methods:{
		handleCurrentChange(val){
			console.log(`当前页${val}`)
		},
		callbackSelTenant(){
			for(var item in this.filters){
				this.filters[item]="";
			}
		}
	}
};
</script>
<style scoped="scoped">
.font {
  font-size: 12px;
}
</style>