<template>
	<section>
	    <div class="parent">
	    	<div class="margin-tops">
	    		<el-button @click="add.addVisible=true" type="primary" size="medium"><i class="el-icon-plus" ></i>新增</el-button>
	    		<el-button type="danger" size="medium"><i class="el-icon-delete"></i>删除</el-button>
	    	</div>
				 <!-- 添加 -->
         <el-dialog 
				  title="添加费率"
				  :visible.sync="add.addVisible"
				  width="30%"
					@change="addChange">
				   <div class="add">
						  <el-row :gutter="24">
		              <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span style="color:red">*</span>
		                <span >选择车库：</span>
		              </div>
		             </el-col>
							   <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span style="color:red">*</span>
		                <span >计费类型：</span>
		              </div>
		             </el-col>		              
		          </el-row>
								<el-row :gutter="24">
		              <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <el-select v-model="add.v_park" filterable  >
                      <el-option
                        v-for="item in add.park"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>	        
		              </div>
		             </el-col>	
								 <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <el-select v-model="add.v_feetype" filterable  >
                      <el-option
                        v-for="item in add.feetype"
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
		                <span >车类型：</span>
		              </div>
		             </el-col>
							   <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span style="color:red">*</span>
		                <span >收费类型：</span>
		              </div>
		             </el-col>		              
		          </el-row>
							<el-row :gutter="24">
		              <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <el-select v-model="add.v_carType" filterable  >
                      <el-option
                        v-for="item in add.carType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>	        
		              </div>
		             </el-col>	
								 <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <el-select v-model="add.v_collectFee" filterable  >
                      <el-option
                        v-for="item in add.collectFee"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>	        
		              </div>
		             </el-col>			              
		       </el-row>
					 </div>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="add.addVisible = false">取 消</el-button>
				    <el-button type="primary" @click="add.addVisible = false">保 存</el-button>
				  </span>
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
	                    prop="garage_name"
	                    label="车库"
	                    >
	                  </el-table-column>
	                  <el-table-column
	                    prop="fee_type"
	                    label="计费类型">
	                  </el-table-column>
	                  <el-table-column
	                    prop="car_type"
	                    label="车类型">
	                  </el-table-column>               
	                  <el-table-column
	                    prop="charge_type"
	                    label="收费类型">
	                   
	                     
	                  </el-table-column>
	                  <el-table-column
	                    prop="lastEditTime"
	                    label="最后修改时间">  
	                  </el-table-column>
	                  <el-table-column     
	                    label="费率设置/批量复制"
											width="280px">
                       <template slot-scope="scope">
	                        <el-button type="success" icon="el-icon-setting" size="mini" @click="setting.settingVisible=true">设置费率</el-button>
                          <el-button type="primary" icon="el-icon-document" size="mini">复制该费率到...</el-button>
	                    </template>
	                  </el-table-column>
	                  <el-table-column
	                    width="120px"
	                    label="测试"
											>
											 <template slot-scope="scope">
													<el-button   size="mini"> <span>$</span> 设置费率</el-button>
													</template>
	                  </el-table-column>

	                  <el-table-column
	                   
	                    label="操作"
	                    width="130px">
	                     <template slot-scope="scope">
	                        <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
                          <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
	                    </template>
	                  </el-table-column>
	                </el-table>
	               </template>
			</div>
			<!-- 设置费率 -->
         <el-dialog 
				  title="设置费率"
				  :visible.sync="setting.settingVisible">
				   <div></div>
					 <div></div>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="setting.settingVisible= false">取 消</el-button>
				    <el-button type="primary" @click="setting.settingVisible = false">保 存</el-button>
				  </span>
				</el-dialog>
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
	</section>
</template>
<script>
export default {
  data() {
    return {
			add:{
				addVisible:false,
				v_park:"",
				park:"",
				v_feetype:"",
				feetype:"",
				v_carType:"",
				carType:"",
				v_collectFee:"",
				collectFee:""
			},
			setting:{
				settingVisible:false
			},
      tableData: [
        {
          garage_name: "1",
          fee_type: "3"
        }
      ],
      filters: {
        v_park: ""
      },
      park: [{}],
      totals: {
        totalNum: 1,
        pageSize: 1,
        currentPage: 1
      }
    };
  },
  methods: {
    callbackSelTenant() {
      for (var item in this.filters) {
        this.filters[item] = "";
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页${val}`);
		},
		addChange(val){
			console.log(`当前值${val}`)
			console.log('zlz')
		}
  }
};
</script>
<style scoped="scoped"></style>