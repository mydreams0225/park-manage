<template>
	<section>
		<div class="parent">
				<!-- 操作区 -->
      	<div class="margin-tops">
      	  <el-button size="medium" type="primary" @click="centerDialogVisible = true"><strong><i class="el-icon-plus"></i></strong>新增</el-button>
      	  <el-dialog 
				  title="添加黑名单信息"
				  :visible.sync="centerDialogVisible"
				  width="30%"
				  center>
				  <div class="add">
					 <el-row :gutter="20">
		              <el-col :span="12">
		                <div class="grid-content bg-purple">
		                <span style="color:red">*</span>
		                <span >所属停车场：</span>
		                
		              </div>
		             </el-col>

		              <el-col :span="12"><div class="grid-content bg-purple">
		                <!-- <span style="color:red">*</span> -->
		                <span >车牌号：</span>
		              </div>
		            </el-col>
		       </el-row>
           <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                    <el-select v-model="v_add_park" filterable >
                      <el-option
                        v-for="item in add_park"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>
                    
                  </div>
                 </el-col>              
                  <el-col :span="12"><div class="grid-content bg-purple">
                    <!-- <span style="color:red">*</span> -->
                    <el-input   id="add_plate" name="add_plate" >
                       
                  </el-input>
                  </div>
                </el-col>
           </el-row>
           <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                   <!--  <span style="color:red">*</span> -->
                    <span >车牌颜色：</span>
                    
                  </div>
                 </el-col>
                  <el-col :span="12"><div class="grid-content bg-purple">
                    <!-- <span style="color:red">*</span> -->
                    <span >注册号：</span>
                  </div>
                </el-col>
           </el-row>
           <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                    <el-select v-model="v_add_plateColor" filterable >
                      <el-option
                        v-for="item in add_plateColor"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>
                    
                  </div>
                 </el-col>
                  <el-col :span="12"><div class="grid-content bg-purple">
                    <!-- <span style="color:red">*</span> -->
                    <el-input   id="add_regId" name="add_regId" >
                       
                  </el-input>
                  </div>
                </el-col>
           </el-row>
            <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                   <!--  <span style="color:red">*</span> -->
                    <span >编号：</span>
                    
                  </div>
                 </el-col>
                 
           </el-row>
          <el-row :gutter="20">
                 
                  <el-col :span="12"><div class="grid-content bg-purple">
                    <!-- <span style="color:red">*</span> -->
                    <el-input   id="add_id" name="add_id" >
                       
                  </el-input>
                  </div>
                </el-col>
           </el-row>
				  </div>

				  <span slot="footer" class="dialog-footer">
				    <el-button @click="centerDialogVisible = false">取 消</el-button>
				    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
				  </span>
				</el-dialog>
      	  <el-button type="success" size="medium"><strong><i class="el-icon-upload"></i></strong > 导出EXCEL报表</el-button>	
      	</div>
      	<!-- 查询区 -->
      	<div class="margin-tops query">
      		<form class="form-inline" role="form" id="searchForm" name="searchForm" onsubmit="subSearchForm();return false;">
	      		<el-select v-model="v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-select v-model="v_plate_color" filterable placeholder="车牌颜色">
	                    <el-option
	                      v-for="item in plate_color"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-input   id="plate_no" name="plate_no" placeholder="车牌号" >
                   <template slot="prepend">车牌号</template>   
                </el-input>
                <el-input   id="register_no" name="register_no" placeholder="注册号" >
                   <template slot="prepend">注册号</template>   
                </el-input>
               <el-button  type="primary" icon="el-icon-search" size="medium">查询</el-button>
               <el-button icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')" size="medium">清除</el-button>
              </form>
      	</div>
      	 <div class="margin-tops">
              <template>
                    <el-table
                      :data="tableData"
                      border
                      style="width: 100% ;">
                      <el-table-column
                        prop="seri_no"
                        label="序号"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="plate_no"
                        label="车牌号"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="plate_color"
                        label="车牌颜色">
                      </el-table-column>
                      <el-table-column
                        prop="register_no"
                        label="注册号">
                      </el-table-column>               
                      <el-table-column
                        prop="number"
                        label="编号"
                        width="250px">
                         
                      </el-table-column>
                      <el-table-column
                        prop="create_date"
                        label="创建时间"
                        width="250px">
                         
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
             <!--  分页 -->
         <div>

            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size="1"
              layout="total, prev, pager, next"
              :total="0">
            </el-pagination>
          </div>
             <!-- 分页end -->
		</div>
	</section>
</template>
<script>
    export default{
       data(){
       	  return{
       	  	centerDialogVisible: false,
            v_park:'',
            park:[{}],
            tableData:[],
            currentPage1:1,
            v_plate_color:'',
            plate_color:[{}],

            v_add_park:'',
            add_park:[{}],
            v_add_plateColor:'',
            add_plateColor:[{}]
       	  }
       },
       methods:{
       	handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
          callbackSelTenant:function(){
          var aa=document.getElementsByTagName("input");  
          console.log(aa);
                for(var i=0;i<aa.length;i++){  
                    if (aa[i].type=="text"){  
                        aa[i].value = "";  
                    }  
                }  
      },
       }
    }
</script>
<style scoped>

   .el-input-group{
    width:200px;
  }
  .el-select{
    width:130px;
  }


  .el-button--success {
  	float:right;
  }
</style>