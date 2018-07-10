<template>
	<section>
		<div class="parent">
			<div class="margin-tops">
				<el-select v-model="v_park" filterable placeholder="所属停车场">
		                    <el-option
		                      v-for="item in park"
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
                <el-select v-model="v_statistics_method" filterable placeholder="统计方式">
                    <el-option
                      v-for="item in statistics_method"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
	            </el-select>
	            <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
			    <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
			</div>
			<div class="margin-tops">
				<div class="left">
					<div class="l-title">月结车消费统计</div>
					<div>无相关统计</div>
				</div>
				<div class="right">
					<div class="margin-tops">
        	        <template>
		                    <el-table
		                      :data="tableData"
		                      border
		                      style="width: 100% ;"
		                      >
		                      
		                      <el-table-column
		                        prop="group_name"
		                        label="分组名称"
		                        >
		                      </el-table-column>
		                      <el-table-column
		                        prop="consume_times"
		                        label="消费次数">
		                      </el-table-column>
		                      <el-table-column
		                        prop="receivable_sum"
		                        label="应收总额">
		                      </el-table-column>               
		                      <el-table-column
		                        prop="paid_sum"
		                        label="已付总额">
		                      </el-table-column>
		                      <el-table-column
		                        prop="disc_sum"
		                        label="折扣总额">
		                      </el-table-column>
		                      
		                    </el-table>
                    </template>
                 </div>
                 <div class="margin-tops">
                 	<el-button  icon="el-icon-upload" type="success" size="medium">打印报表</el-button>
                 </div>
                 
				</div>
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
                start_date1:'',
                start_date2:''
			}
		}
	}
</script>
<style scoped="scoped">
	.dates{
		display:inline-block;
	}
	.left{
		margin-top:15px;
	width:60%;
	float:left;
	border:1px solid #ccc; 
	border-radius:3px;
	
    overflow-x:auto
}
 .l-title{
    padding:10px;
    background-color:#f5f5f5;
}
.right{

	width:38%;
	float:right;
	
	border-radius:3px;

}
</style>