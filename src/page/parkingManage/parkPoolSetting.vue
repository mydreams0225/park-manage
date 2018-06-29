<template>
	<section>
		<div class="parent">
			<div class="margin-tops">
				<el-button type="primary" size="medium"><i class="el-icon-plus"></i>新增</el-button>
				<a href="" size="medium"><i class="el-icon-circle-check" ></i>车位池功能说明</a>
				 <el-button type="success" size="medium"><strong><i class="el-icon-upload" ></i></strong> 导出EXCEL报表</el-button>	
			</div>
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
                  <el-select v-model="v_feetype" filterable placeholder="车位满时收费方式">
                    <el-option
                      v-for="item in feetype"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="v_countrule" filterable placeholder="车位池满统计规则">
                    <el-option
                      v-for="item in countrule"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input   id="poolname" name="poolname" placeholder="车位池名称">
                      <template slot="prepend">车位池名称</template>   
                  </el-input> 
                  <el-input   id="totalplatenum" name="totalplatenum" placeholder="总车位数">
                      <template slot="prepend">总车位数</template>   
                  </el-input> 
                  <el-input   id="car_no" name="car_no" placeholder="车牌号">
                      <template slot="prepend">车牌号</template>   
                  </el-input> 
                  <el-button size="medium" type="primary" icon="el-icon-search">查询</el-button>
                  <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
			 </form>
			</div>
			<div class="margin-tops">
				 <template>
                    <el-table
                      :data="tableData"
                      border
                      style="width: 100% ;"
                      @selection-change="">
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
                        prop="pool_name"
                        label="车位池名称"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="garage"
                        label="所属车库">
                      </el-table-column>
                      <el-table-column
                        prop="feetype"
                        label="车位满时收费方式">
                      </el-table-column>               
                      <el-table-column
                        prop="countrule"
                        label="车位池满统计规则">
                       
                         
                      </el-table-column>
                      <el-table-column
                        prop="totalplatenum"
                        label="总车位数">
                        
                         
                      </el-table-column>

                      <el-table-column
                        prop="ternpalateNum"
                        label="有效期内车位数">
                      </el-table-column>
                      <el-table-column
                        prop="presentCarNum"
                        label="在场车辆数">
                      </el-table-column>
                      <el-table-column
                        prop="surplusCarNum"
                        label="剩余车辆数">
                      </el-table-column>
                      <el-table-column
                        prop="plate_no"
                        label="绑定的车牌号">
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
		    <div>
		        <Paging v-bind:total="totals"></Paging>
		        
		    </div>
		</div>
	</section>
</template>
<script>
	export default{
           data(){
           	return {
           		v_park:'',
           		park:[{}],
           		v_feetype:'',
           		feetype:[{}],
           		v_countrule:'',
           		countrule:[{}],
                 tableData:[{
                   seri_no:'1',
                   pool_name:'11'
                 }],

           		 totals:{
               	  totalnum:1,
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
           }
	}
</script>
<style scoped>

 
  a{
  	text-decoration:none;
  	color:#1a72c1
  }
    .el-button--success {
  	float:right;
  }
   .el-input-group{
    width:200px;
  }
  .el-select{
    width:130px;
  }
</style>