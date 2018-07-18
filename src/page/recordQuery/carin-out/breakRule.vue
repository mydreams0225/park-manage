<template>
	<section>
		<div class="parent">
			<div class="margin-tops querys" >
				<el-select v-model="filters.v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-input   id="plate_no" name="plate_no" placeholder="车牌号" v-model="filters.v_plate_no">
                     <template slot="prepend">车牌号</template>   
              </el-input>
							<el-input placeholder="车主" v-model="filters.v_carOwner">
                     <template slot="prepend">车主</template>   
              </el-input>
               <el-input placeholder="手机号" v-model="filters.v_phone">
                     <template slot="prepend">手机号</template>   
              </el-input>
							<el-input placeholder="违规行为" v-model="filters.v_Irregularities">
                     <template slot="prepend">违规行为</template>   
              </el-input>
               
                <el-select v-model="filters.v_disposeMethod" filterable placeholder="处理方式">
	                    <el-option
	                      v-for="item in disposeMethod"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
							 <el-select v-model="filters.v_disposeStatus" filterable placeholder="处理状态" >
	                    <el-option
	                      v-for="item in disposeStatus"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
                <el-input   id="dutyMan" name="dutyMan" placeholder="值班员" v-model="filters.v_dutyMan" >
                     <template slot="prepend">值班员</template>   
                </el-input>
	             <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
                 <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
			</div>
			<div class="margin-tops">
				 <template>
                    <el-table
                      :data="tableData"
                      border
                      style="width: 100% ;"
                     >
                      <el-table-column
                        prop="seri_no"
                        label="序号"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="deviceName"
                        label="设备名称"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="carOwner"
                        label="值班员账号">
                      </el-table-column>
                      <el-table-column
                        prop="phone"
                        label="手机号">
                      </el-table-column>               
                      <el-table-column
                        prop="Irregularities"
                        label="违规行为">
                      </el-table-column>
                      <el-table-column
                        prop="disposeMethod"
                        label="处理方式">
                      </el-table-column>

                      <el-table-column
                        prop="penaltyMoney"
                        label="罚款金额">
                      </el-table-column>
                      <el-table-column
                        prop="disposeStatus"
                        label="处理状态">
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
        v_carOwner: "",
        v_phone: "",
        v_Irregularities: "",
        v_disposeMethod: "",
        v_disposeStatus: "",
        v_dutyMan: ""
      },
      park: [{}],
      disposeMethod: [],
      disposeStatus: [],
      totals: {
        totalNum: 1,
        pageSize: 1,
        currentPage: 1
      },
      tableData: []
    };
  },
  methods: {
		callbackSelTenant(){
			for(var item in this.filters){
				 this.filters[item]="";
			}
		},
    handleCurrentChange() {},
    callbackSelTenant() {
      for (var item in this.filters) {
        this.filters[item] = "";
      }
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