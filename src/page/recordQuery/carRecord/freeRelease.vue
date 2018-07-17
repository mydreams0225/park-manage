<template>
	<section>
		<div class="parent">
			<div class="margin-tops">
				<el-button type="danger" icon="el-icon-delete" size="medium">删除查询到的记录</el-button>
			</div>
			<div class="margin-tops querys" >
				    <el-select v-model="filters.v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-input   id="plate_no" name="plate_no" placeholder="车牌号"  v-model="filters.v_plate_no">
                     <template slot="prepend">车牌号</template>   
                </el-input>
                <el-select v-model="filters.v_passageway" filterable placeholder="通道">
	                    <el-option
	                      v-for="item in passageway"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-select v-model="filters.v_fee_type" filterable placeholder="计费类型">
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
		                      v-model="filters.start_datefrom"
		                      type="datetime"
		                      placeholder="选择日期时间">
		                    </el-date-picker>
		                  </div>
		                   <div class="dates block">
		                    <span class="demonstration">到</span>
		                    <el-date-picker
		                      v-model="filters.start_dateto"
		                      type="datetime"
		                      placeholder="选择日期时间">
		                    </el-date-picker>

                </div>
                <el-input v-model="filters.v_dutyMan"  id="dutyMan" name="dutyMan" placeholder="值班员" >
                     <template slot="prepend">值班员</template>   
                </el-input>
                
							<el-input   id="plate_no" name="plate_no" placeholder="车牌号" v-model="filters.v_memo">
                     <template slot="prepend">备注</template>   
                </el-input>
	             <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
                 <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
                 <div class="rights"> 
                 	<el-button type="success" size="medium"><strong><i class="el-icon-upload"></i></strong > 导出EXCEL报表</el-button>	
                 </div>
			</div>
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
													 <el-button type="primary" icon="el-icon-document" circle size="mini"></el-button>                      
                        </template>
                      </el-table-column>
                    </el-table>
                 </template>
			</div>
			<div>
		        <!-- <Paging v-bind:total="totals"></Paging>		         -->
						<el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="totals.currentPage"
              :page-size.sync="totals.pageSize"
              layout="total, prev, pager, next"
              :total.sync="totals.totalNum">
            </el-pagination>
		   </div>
		</div>
	</section>
</template>
<script>
export default {
  data() {
    return {
      filters: {
        v_park: "",
        v_plate_no: "",
        v_passageway: "",
        v_fee_type: "",
        start_datefrom: "",
        start_dateto: "",
        v_dutyMan: "",

        v_memo: ""
      },

      park: [{}],
      passageway: [{}],
      fee_type: [{}],
      releaseMethod: [{}],
       totals: {
        totalNum: 1,
        pageSize: 1,
        currentPage: 1
      },
      tableData: [{}]
    };
	},
	methods:{
		callbackSelTenant(){
			var filter=this.filters
			for(var item in filter){
         filter[item]="";
			}
		},

		handleCurrentChange(){

		}
	}
};
</script>
<style scoped>
/*公共属性*/
.el-input-group {
  width: 200px;
}
.el-select {
  width: 130px;
}
/*公共属性*/
.dates {
  display: inline-block;
}
.querys {
  position: relative;
}
.rights {
  position: absolute;
  top: 45px;
  right: 0;
}
</style>