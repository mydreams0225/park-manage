<template>
	<section>
		<div class="parent">
			<!-- 查询区 -->
      	<div class="carType">
      		<form class="form-inline" role="form" id="searchForm" name="searchForm" onsubmit="subSearchForm();return false;">
	      		<el-select v-model="v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	                  </el-select>
	                   <el-button  type="primary" icon="el-icon-search">查询</el-button>
	                   <el-button icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
              </form>
      	</div>
      	<!-- 操作区 -->
      	<div class="carType">
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
                        prop="type_name"
                        label="类型名称"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="display_info"
                        label="屏显信息">
                      </el-table-column>
                      <el-table-column
                        
                        label="启用状态">
                         <template slot-scope="scope"><span class="backgrounds red">{{ scope.row.enable_status }}</span></template>
                       <!--  <span style='background-color:green;'>{{enable_status}}</span> -->
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
                            <el-button size="small" type="primary" icon="el-icon-edit"></el-button>
                        </template>
                      </el-table-column>
                      
                    </el-table>
              </template>
            </div>
             <!--  分页 -->
         <div class="carType">

            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size="1"
              layout="total, prev, pager, next"
              :total="1">
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
       	  	currentPage1:1,
            v_park:'',
            park:[{value:'',label:'所属停车场'}],
            tableData:[{
            	seri_no:'1',
            	type_name:'小型车',
            	display_info:'小型车',
            	enable_status:'启用',
            	order_by:'',

            }]
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
       }
	}
</script>
<style scoped>
  .parent{
  	 text-align:left;
  }
  .carType{
  	margin-top:15px;
  }
  .backgrounds{
  	color:#fff;
  	padding:3px;
  	border-radius:5px;
  }
  .green{
  	background-color:#5cb85c;
  }
  .red{
  	background-color:#d9534f;
  }
</style>