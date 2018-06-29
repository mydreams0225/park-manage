<template>
	<section>
      <div class="parent">
      	<!-- 操作区 -->
      	<div class="margin-tops">
      	  <el-button type="primary"><strong><i class="el-icon-plus"></i></strong>新增</el-button>	
      	</div>
      	<!-- 查询区 -->
      	<div class="margin-tops">
      		<form class="form-inline" role="form" id="searchForm" name="searchForm" onsubmit="subSearchForm();return false;">
	      		<el-select v-model="v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	                  </el-select>
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
                        prop="group_name"
                        label="分组名称"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="fee_types"
                        label="计费类型">
                      </el-table-column>
                      <el-table-column
                        prop="order_by"
                        label="排序">
                      </el-table-column>               
                      <el-table-column
                        prop="operate"
                        label="操作"
                        width="250px">
                         <template slot-scope="scope">
                          
                        </template>
                      </el-table-column>
                      
                    </el-table>
              </template>
            </div>
             <!--  分页 -->
         <div class="block">

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
 			 currentPage1: 1,
            v_park:'',//停车场
            park:[{value:'',label:'所属停车场'}],
            tableData:[]
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
      }
    },

 }
</script>
<style scoped>


</style>