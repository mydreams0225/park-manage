<template>
	<section>
		<div class="parent">
	    	<div class="margin-tops">
	    		<el-button type="primary" size="medium"><i class="el-icon-plus" ></i>新增</el-button>
	    		<el-button type="danger" size="medium"><i class="el-icon-delete"></i>删除</el-button>
	    		<el-button type="text"><i class="el-icon-plus"></i>快速设置近1年周末节假日</el-button>
	    	</div>
	    	<div class="margin-tops">
	    		<el-select v-model="v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
		        </el-select>
		        <el-select v-model="v_holidayType" filterable placeholder="节假日类型">
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
                v_holidayType:'',
                holidayType:[{}],
                 totals:{
               	  totalnum:1,
               	  pagesize:1,
               	  currentPage1:1
               },
         	}
         },

	}
</script>
<style scoped="scoped">
</style>