<template>
	<section>
		<div class="parent">
	    	<div class="margin-tops">
	    		<el-button type="primary" size="medium" @click="add.addVisible=true"><i class="el-icon-plus"  ></i>新增</el-button>
	    		<el-button type="danger" size="medium"><i class="el-icon-delete"></i>删除</el-button>
	    		<el-button type="text" @click="setting.settingVisible=true"><i class="el-icon-plus"></i>快速设置近1年周末节假日</el-button>
	    	</div>
				<!-- 添加 -->
				<el-dialog title="添加节假日" :visible="add.addVisible" width="650px" >   
					<form action="" style="font-size:12px">
						<div >
						 <el-row :gutter="24">
		              <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span >节假日名称:</span>
		               </div>
		             </el-col>
								<el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span style="color:red">*</span>
		                <span >时间:</span>
		              </div>
		             </el-col>	              
		         </el-row>
						 <el-row :gutter="24">
		              <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <el-select v-model="add.v_holidayName" filterable >
	                    <el-option
	                      v-for="item in (add.holidayName)"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	                 </el-select>
		               </div>
		             </el-col>
								<el-col :span="11">
		                <div class="grid-content bg-purple">
		                  <div class="block">
													
													<el-date-picker
														v-model="add.v_date"
														type="date"
														placeholder="选择日期">
													</el-date-picker>
												</div>
		                </div>
		             </el-col>	              
		         </el-row>
						 <el-row :gutter="24">
		              <el-col :span="24">
		                <div class="grid-content bg-purple">
		                <span style="color:red">*</span>
		                <span >节假日类型:</span>
		               </div>
		             </el-col>          
		        </el-row>
						<el-row :gutter="24">
		              <el-col :span="24">
		                <div class="grid-content bg-purple">
		                  <el-radio v-model="add.v_holiType" :label="true">普通节假日</el-radio>
  										<el-radio v-model="add.v_holiType" :label="false">特殊节假日</el-radio>
		               </div>
		             </el-col>          
		        </el-row>
						</div>
					</form> 
				<div slot="footer" class="dialog-footer">
          <el-button @click.native="add.addVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="add.isloading">提交</el-button>
        </div>             
        </el-dialog>
				<!-- 快速设置近1年周末节假日 -->
         <el-dialog title="选择节假日" :visible="setting.settingVisible" width="650px" >   
					<form action="" style="font-size:12px">
						<div >
						 <el-row :gutter="24">
		              <el-col :span="24">
		                <div class="grid-content bg-purple">
		                <span >周末日:</span>
										<el-checkbox-group style="display:inline-block" v-model="setting.holidayList">
											<el-checkbox label="周六"></el-checkbox>
											<el-checkbox label="周日"></el-checkbox>
										</el-checkbox-group>
		               </div>
		             </el-col>        
		         </el-row>
						 <el-row :gutter="24">
		            <el-col :span="24">
		                <div class="grid-content bg-purple">
		                
		                <span >工作日:</span>
										<el-checkbox-group style="display:inline-block" v-model="setting.workdayList">
											<el-checkbox label="周一"></el-checkbox>
											<el-checkbox label="周二"></el-checkbox>
											<el-checkbox label="周三"></el-checkbox>
											<el-checkbox label="周四"></el-checkbox>
											<el-checkbox label="周五"></el-checkbox>
										</el-checkbox-group>
		              </div>
		             </el-col>
							           
		         </el-row>
						   		   
						</div>
					</form> 
				<div slot="footer" class="dialog-footer">
          <el-button @click.native="setting.settingVisible = false">取消</el-button>
          <el-button type="primary" @click.native="settingSubmit" :loading="setting.isloading">提交</el-button>
        </div>             
        </el-dialog>
	    	<div class="margin-tops">
	    		<el-select v-model="filters.v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
		        </el-select>
		        <el-select v-model="filters.v_holidayType" filterable placeholder="节假日类型">
	                    <el-option
	                      v-for="item in holidayType"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
		        </el-select>
		        <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
	            <el-button  size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
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
	                    prop="holiday_name"
	                    label="节假日名称"
	                    >
	                  </el-table-column>
	                  <el-table-column
	                    prop="time"
	                    label="时间">
	                  </el-table-column>
	                  <el-table-column
	                    prop="holiday_type"
	                    label="节假日类型">
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
			<!-- <div>
			   <Paging v-bind:total="totals"></Paging>
			</div> -->
			<el-pagination
              
              @current-change="handleCurrentChange"
              :current-page.sync="totals.currentPage"
              :page-size.sync="totals.pageSize"
              layout="total, prev, pager, next"
              :total.sync="totals.totalNum">
            </el-pagination>
	    </div>
	</section>
</template>
<script>
export default {
  data() {
    return {
      setting: {
        settingVisible: false,
        holidayList: "",
        workdayList: ""
      },
      add: {
        addVisible: false,
        v_holidayName: "",
        holidayName: "",
        v_date: "",
        v_holiType: 0,
        isloading: false
      },
      filters: {
        v_park: "",
        v_holidayType: ""
      },
      tableData: [],
      park: [{}],
      holidayType: [{}],
      totals: {
        totalNum: 1,
        pageSize: 1,
        currentPage: 1
      }
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页${val}`);
    }
  }
};
</script>
<style scoped="scoped">
</style>