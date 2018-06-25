<template>
	<section>
	  <div class="parent">
	  	<!-- 操作区 -->
	  	<div class="sendcarManage">
	  		<el-button type="primary" @click="centerDialogVisible = true"><strong><i class="el-icon-plus"></i></strong>我要派车</el-button>
	  	</div>
	     <!-- 查询区 -->
         <div class="sendcarManage">
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
                <el-input   id="req_person" name="req_person" placeholder="车牌号">
                   <template slot="prepend">申请人</template>   
                </el-input>
                <div class="dates block">
                    <span class="demonstration">开始时间从</span>
                    <el-date-picker
                      v-model="start_date1"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
                   <div class="dates block">
                    <span class="demonstration">到</span>
                    <el-date-picker
                      v-model="start_date2"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
                 <div class="dates block">
                    <span class="demonstration">结束时间从</span>
                    <el-date-picker
                      v-model="end_date1"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
                   <div class="dates block">
                    <span class="demonstration">到</span>
                    <el-date-picker
                      v-model="end_date2"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
           <el-button type="primary" icon="el-icon-search">查询</el-button>
           <el-button icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
            </form>
        </div>
        <!-- 数据展示区 -->
        <div class="sendcarManage">
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
                        prop="req_person"
                        label="申请人">
                      </el-table-column>
                      <el-table-column
                        prop="use_startTime"
                        label="用车开始时间">
                      </el-table-column>               
                      <el-table-column
                        prop="use_endTime"
                        label="用车结束时间">
                       
                         
                      </el-table-column>
                      <el-table-column
                        prop="mileage"
                        label="预计行驶公路数">
                        
                         
                      </el-table-column>

                      <el-table-column
                        prop="driver"
                        label="驾驶员">
                      </el-table-column>
                      <el-table-column
                        prop="driver_phone"
                        label="驾驶员电话">
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
        <!-- 分页区 -->
	    <div class="sendcarManage">
	        <Paging v-bind:total="totals"></Paging>
	        
	    </div>
		
	  </div>
	</section>
</template>

<script type="text/javascript">
    
	export default{
		
       data (){
       	 return{
       	 // 	   currentPage1: 1,
		       // //total:3,
		       // pagesize:1,
		       //查询区
		       v_park:'',
		       park:[{}],
               start_date1:'',
               start_date2:'',
               end_date1:'',
               end_date2:'',
               tableData:[],
               //totals:1,
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
      // props:["total"],
	}
</script>
<style scoped>
   .parent{
   	  text-align:left;
   }
   .sendcarManage{
   	  margin-top:15px;
   }

   .el-input-group{
    width:200px;
  }
  .el-select{
    width:130px;
  }
  .dates{
  display:inline-block;
}
</style>