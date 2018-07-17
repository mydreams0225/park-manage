<template>
	<section>
		<div class="parent">
			<div class="margin-tops">
				<el-button type="primary" size="medium"  @click.native="addBtn"> <i class="el-icon-plus"></i>新增</el-button>
        
				<el-button type="primary" size="medium" icon="el-icon-edit">编辑</el-button>
				<el-button type="danger" size="medium" icon="el-icon-delete" >删除</el-button>
			</div>
      <!-- 添加 -->
      <el-dialog title="添加车库" :visible="add.addTableVisible" width="650px" >  
        <form action="" style="font-size:12px">
          <div >
						<el-row :gutter="24">
		              <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span style="color:red">*</span>
		                <span >车库名称:</span>
		               </div>
		             </el-col>
								<el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span style="color:red">*</span>
		                <span >属性:</span>
		              </div>
		             </el-col>	              
		        </el-row>
            <el-row :gutter="24">
		              <el-col :span="11">
		                <div class="grid-content bg-purple">
                       <el-input   id="parking_no" name="parking_no" v-model="add.v_garageName">
                       </el-input>         
		               </div>
		             </el-col>
								<el-col :span="11">
		                <div class="grid-content bg-purple">	                
		                 <el-select v-model="add.v_attr" filterable >
	                    <el-option
	                      v-for="item in (add.attr)"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	                 </el-select>
		              </div>
		             </el-col>	              
		        </el-row>
            <el-row :gutter="24">
		              <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span style="color:red">*</span>
		                <span >临停总车位:</span>
		               </div>
		             </el-col>
								<el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span style="color:red">*</span>
		                <span >月租总车位数:</span>
		              </div>
		             </el-col>	              
		        </el-row>
            <el-row :gutter="24">
		              <el-col :span="11">
		                <div class="grid-content bg-purple">
		                   <el-input   id="parking_no" name="parking_no" v-model="add.v_tempSum">
                       </el-input>  
		               </div>
		             </el-col>
								<el-col :span="11">
		                <div class="grid-content bg-purple">
		                  <el-input   id="parking_no" name="parking_no" v-model="add.v_monthSum">
                       </el-input>  
		              </div>
		             </el-col>	              
		         </el-row>
             <el-row :gutter="24">
		              <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span >收费模式:</span>
		               </div>
		             </el-col>
								<el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span >车位池满放行方式:</span>
		              </div>
		             </el-col>	              
		        </el-row>
            <el-row :gutter="24">
		              <el-col :span="11">
		                <div class="grid-content bg-purple">
		                 <el-select v-model="add.v_feeMode" filterable >
                        <el-option
                          v-for="item in (add.feeMode)"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
	                  </el-select>
		               </div>
		             </el-col>
								<el-col :span="11">
		                <div class="grid-content bg-purple">
		                <el-select v-model="add.v_releaseMethod" filterable >
                        <el-option
                          v-for="item in (add.releaseMethod)"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
	                  </el-select> 
		              </div>
		             </el-col>	              
		        </el-row>
            <el-row :gutter="24">
		              <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span >车辆过期处理方式:</span>
		               </div>
		             </el-col>            
		        </el-row>
            <el-row :gutter="24">
		              <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <el-select v-model="add.v_outTimeMethod" filterable >
                        <el-option
                          v-for="item in (add.outTimeMethod)"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
	                  </el-select> 
		               </div>
		             </el-col>            
		        </el-row>
            <el-row :gutter="24">
		              <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span >临时车车位是否统计:</span>
                    <el-radio-group v-model="add.rd_tempIS">
                      <el-radio :label="1" >统计</el-radio>
                      <el-radio :label="2">不统计</el-radio>
                    </el-radio-group>
		               </div>
		             </el-col>
								<el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span >月票车车位是否统计:</span>
                    <el-radio-group v-model="add.rd_MonthIS">
                      <el-radio :label="1" >统计</el-radio>
                      <el-radio :label="2">不统计</el-radio>
                    </el-radio-group>
		              </div>
		             </el-col>	              
		        </el-row>
            <el-row :gutter="24">
		              <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span >储值票车车位是否统计:</span>
                    <el-radio-group v-model="add.rd_storeIS">
                      <el-radio :label="1" >统计</el-radio>
                      <el-radio :label="2">不统计</el-radio>
                    </el-radio-group>
		               </div>
		             </el-col>
								<el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span >时租车车位是否统计:</span>
                    <el-radio-group v-model="add.rd_hourIS">
                      <el-radio :label="1" >统计</el-radio>
                      <el-radio :label="2">不统计</el-radio>
                    </el-radio-group>
		              </div>
		             </el-col>	              
		        </el-row>
					 </div>
        </form>    
        <div slot="footer" class="dialog-footer">
          
          <el-button @click.native="add.addTableVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="add.addLoading">提交</el-button>
        </div>             
        </el-dialog>
			<!-- 查询区 -->
			<div class="margin-tops">
				<el-select v-model="filters.v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-button type="primary" size="medium" icon="el-icon-search">查询</el-button>
                <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
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
                        prop="garage_name"
                        label="车库名称"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="garage_no"
                        label="车库编号">
                      </el-table-column>
                      <el-table-column
                        prop="attribute"
                        label="属性">
                      </el-table-column>               
                      <el-table-column
                        prop="totalplatenum"
                        label="总车位数">   
                      </el-table-column>
                      <el-table-column
                        prop="emptyplatenum"
                        label="空车位数">                         
                      </el-table-column>

                      <el-table-column
                        prop="parkSpaceDivideTotal"
                        label="临停空车位/总车位">
                      </el-table-column>
                      <el-table-column
                        prop="monthDivideTotal"
                        label="月空车位/总车位">
                      </el-table-column>
                      <el-table-column
                        prop="releaseMethod"
                        label="车位池满放行方式">
                      </el-table-column>
                      <el-table-column
                        prop="out_timeMethod"
                        label="车辆过期处理方式">
                      </el-table-column>
                      <el-table-column
                        prop="charging_mode"
                        label="收费模式">
                      </el-table-column>
                     <el-table-column
                        prop="use_status"
                        label="使用状态">
                      </el-table-column>
                      <el-table-column
                        prop="create_time"
                        label="创建时间">
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
			<!-- 分页 -->
			<!-- <div class="margin-tops">
				<Paging v-bind:total="totals"></Paging>
			</div> -->
      <div class="block">

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
export default {
  data() {
    return {
      filters: {
        v_park: ""
      },
      tableData: [],

      add: {
        addTableVisible: false,
        addLoading: false,
        v_garageName:"",
        v_attr:"",
        attr:"",
        v_tempSum:"",
        v_monthSum:"",
        v_feeMode:"",
        v_releaseMethod:"",
        feeMode:"",
        releaseMethod:"",
        v_outTimeMethod:"",
        outTimeMethod:"",
        rd_tempIS:"1",
        rd_MonthIS:"1",
        rd_storeIS:"1",
        rd_hourIS:"1"
      },

      park: [{}],
      totals: {
        totalNum: 3,
        pageSize: 1,
        currentPage: 1
      }
    };
  },
  methods: {
    addBtn: function() {
      console.log("zlzlzlz");
      this.add.addTableVisible = true;
    },
    handleCurrentChange(val) {
      console.log(`当前页${val}`);
    },
    callbackSelTenant: function() {
      console.log(this.filters);
      for (var item in this.filters) {
        this.filters[item] = "";
      }
    }
  }
};
</script>
<style scoped>

</style>