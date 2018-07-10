<template>
	<section>
		<div class="parent">
			<div class="margin-tops">
				<el-button type="primary" size="medium"> <i class="el-icon-plus"></i>新增</el-button>
				<el-button type="primary" size="medium" icon="el-icon-edit">编辑</el-button>
				<el-button type="danger" size="medium" icon="el-icon-delete" >删除</el-button>
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
	            <el-button type="primary" size="medium" icon="el-icon-search">查询</el-button>
                <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
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
                        label="车库名称"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="garage_no"
                        label="车库编号">
                      </el-table-column>
                      <el-table-column
                        prop="attribute"
                        label="属性">
                      </el-table-column>               
                      <el-table-column
                        prop="totalplatenum"
                        label="总车位数">   
                      </el-table-column>
                      <el-table-column
                        prop="emptyplatenum"
                        label="空车位数">                         
                      </el-table-column>

                      <el-table-column
                        prop="parkSpaceDivideTotal"
                        label="临停空车位/总车位">
                      </el-table-column>
                      <el-table-column
                        prop="monthDivideTotal"
                        label="月空车位/总车位">
                      </el-table-column>
                      <el-table-column
                        prop="releaseMethod"
                        label="车位池满放行方式">
                      </el-table-column>
                      <el-table-column
                        prop="out_timeMethod"
                        label="车辆过期处理方式">
                      </el-table-column>
                      <el-table-column
                        prop="charging_mode"
                        label="收费模式">
                      </el-table-column>
                     <el-table-column
                        prop="use_status"
                        label="使用状态">
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
			<!-- 分页 -->
			<div class="margin-tops">
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
            totals:{
               	  totalnum:1,
               	  pagesize:1,
               	  currentPage1:1
               },
      	}
      }
 }
</script>
<style scoped>
	
</style>