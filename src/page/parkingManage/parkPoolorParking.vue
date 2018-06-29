<template>
	<section>
		<div class="parent">
			<div class="margin-tops">
				<el-button type="primary" size="medium"><i class="el-icon-plus" ></i>新增</el-button>
				<el-button type="danger" size="medium"><i class="el-icon-delete"></i>删除</el-button>
				 <el-button type="primary" size="medium"> <i class="el-icon-back rotates"></i>进入车位池缴费页面</el-button>
				 <el-button type="success" size="medium"><strong><i class="el-icon-upload"></i></strong> 导出EXCEL报表</el-button>	
			</div>
			<!-- 查询区 -->
			<div class="margin-tops">
				<el-select v-model="v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-input   id="client" name="client" placeholder="点击选择" readonly="readonly">
                      <template slot="prepend">所属车位池</template>   
                </el-input>
			
					<el-select v-model="v_garage" filterable placeholder="所属车库">
			                    <el-option
			                      v-for="item in garage"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			        </el-select>
		            <el-select v-model="v_parkingType" filterable placeholder="车位类型">
			                    <el-option
			                      v-for="item in parkingType"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			        </el-select>
		           <el-input   id="parking_no" name="parking_no" placeholder="车位号" >
                     <template slot="prepend">车位号</template>   
                    </el-input>
		            <el-select v-model="v_isOutTime" filterable placeholder="是否过期">
			                    <el-option
			                      v-for="item in isOutTime"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			        </el-select>
			         <div class="dates block">
		                    <span class="demonstration">有效期时间</span>
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
                    <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
                    <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
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
                        label="所属车位池"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="garage"
                        label="所属车库">
                      </el-table-column>
                      <el-table-column
                        prop="parking_no"
                        label="车位号">
                      </el-table-column>               
                      <el-table-column
                        prop="parking_type"
                        label="车位类型">
                      </el-table-column>
                      <el-table-column
                        prop="termStart_time"
                        label="有效期开始时间">
                      </el-table-column>

                      <el-table-column
                        prop="termEnd_time"
                        label="有效期结束时间">
                      </el-table-column>
                      <el-table-column
                        prop="pay_rule_group"
                        label="缴费规则分组">
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
<script>
	export default{
          data(){
          	return{
          		v_park:'',
          		park:[{}],
                v_garage:'',
                garage:[{}],
                v_parkingType:'',
                parkingType:[{}],
                v_isOutTime:'',//是否过期
                isOutTime:[{}],
                  start_date1:'',
			        start_date2:'',
			        tableData:[],
                totals:{
               	  totalnum:1,
               	  pagesize:1,
               	  currentPage1:1
               },
          	}
          }
	}
</script>
<style scoped="scoped">
	.rotates{
		transform:rotate(180deg)
	}
	.el-button--success {
  	    float:right;
     }
     /*公共属性*/
     .el-input-group{
     width:200px;
    }
	  .el-select{
	    width:130px;
	  }
  /*公共属性*/
   .dates{
   display:inline-block;
 }
</style>