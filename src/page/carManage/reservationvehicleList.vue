<template>
	<section>
		<div class="parent">
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
                <el-input   id="car_no" name="car_no" placeholder="车牌号">
                   <template slot="prepend">车牌号</template>   
                </el-input>
                <el-input   id="name" name="name" placeholder="姓名">
                   <template slot="prepend">姓名</template>   
                </el-input>
                <el-input   id="phone" name="phone" placeholder="手机号">
                   <template slot="prepend">手机号</template>   
                </el-input>
                <el-select v-model="v_carStatus" filterable placeholder="车辆状态">
                    <el-option
                      v-for="item in carStatus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
                <el-button icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')" size="medium">清除</el-button>
			</form>
		</div>
		<!-- 展示区 -->
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
                        prop="name"
                        label="车主姓名">
                      </el-table-column>
                      <el-table-column
                        prop="phone"
                        label="车主手机">
                      </el-table-column>               
                      <el-table-column
                        prop="end_time"
                        label="最晚到访时间(有效期)">
                       
                         
                      </el-table-column>
                      <el-table-column
                        prop="car_status"
                        label="车辆状态">
                        
                         
                      </el-table-column>

                      <el-table-column
                        prop="pass_time"
                        label="入场时间">
                      </el-table-column>
                      <el-table-column
                        prop="out_time"
                        label="出场时间">
                      </el-table-column>
                      
                    </el-table>
              </template>
        
        </div>
			<!-- 分页区 -->
	    <div>
	        <Paging v-bind:total="totals"></Paging>
	    </div>
		</div>
	</section>
</template>
<script>
	export default{
        data(){
        	return{
               v_park:'',
               park:[{}],
               v_carStatus:'',
               carStatus:[{}],
               tableData:[],
               totals:{
               	  totalnum:3,
               	  pagesize:1,
               	  currentPage1:1
               },
        	}
        },
        methods:{
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
 
  
   .el-input-group{
    width:200px;
  }
  .el-select{
    width:130px;
  }
</style>