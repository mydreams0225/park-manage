<template>
	<section>
		<div class="parent">
			<div class="margin-tops">
				<el-button type="danger" icon="el-icon-delete" size="medium">删除查询到的记录</el-button>
			</div>
			<div class="margin-tops querys" >
				<el-select v-model="v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-input   id="plate_no" name="plate_no" placeholder="车牌号" >
                     <template slot="prepend">车牌号</template>   
                </el-input>
                <el-select v-model="v_passageway" filterable placeholder="通道">
	                    <el-option
	                      v-for="item in passageway"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-select v-model="v_fee_type" filterable placeholder="计费类型">
	                    <el-option
	                      v-for="item in fee_type"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <div class="dates block">
		                    <span class="demonstration">入场时间从</span>
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
                <el-input   id="dutyMan" name="dutyMan" placeholder="值班员" >
                     <template slot="prepend">值班员</template>   
                </el-input>
                <el-select v-model="v_releaseMethod" filterable placeholder="放行方式">
	                    <el-option
	                      v-for="item in releaseMethod"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	             <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
                 <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
                 <div class="rights"> 
                 	<el-button type="success"><strong><i class="el-icon-upload"></i></strong size="medium"> 导出EXCEL报表</el-button>	
                 </div>
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
                        prop="plate_no"
                        label="车牌号"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="fee_type"
                        label="计费类型">
                      </el-table-column>
                      <el-table-column
                        prop="car_group"
                        label="车辆分组">
                      </el-table-column>               
                      <el-table-column
                        prop="passageway"
                        label="通道">
                      </el-table-column>
                      <el-table-column
                        prop="start_date1"
                        label="入场时间">
                      </el-table-column>

                      <el-table-column
                        prop="release_method"
                        label="放行方式">
                      </el-table-column>
                      <el-table-column
                        prop="des"
                        label="描述">
                      </el-table-column>
                      <el-table-column
                        prop="duty_man"
                        label="值班员">
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
			v_passageway:'',
			passageway:[{}],
			v_fee_type:'',
			fee_type:[{}],
			start_date1:'',
			start_date2:'',
			releaseMethod:[{}],
			v_releaseMethod:'',
             totals:{
               	  totalnum:1,
               	  pagesize:1,
               	  currentPage1:1
               },
               tableData:[]

		}
	}

	}
</script>
<style scoped>
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
.querys{
	position:relative;
}
.rights{
	position:absolute;
	top:45px;
	right:0;
}
</style>