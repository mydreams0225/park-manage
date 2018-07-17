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
							<el-input clearable :value="filters.clientValue"   id="client" name="client"
							           placeholder="点击选择" readonly="readonly"  
							           v-on:click.native="choose.clientVisible = true" style="cursor:pointer" >
                      <template slot="prepend"> 所属商户</template>   
              </el-input>
							<el-dialog  title="选择所属商户" :visible.sync="choose.clientVisible" width="550px" >
                      <form >
                        <el-input    placeholder="商户名称" :value="choose.name" >
                        <template slot="prepend">商户名称</template>   
                        </el-input>
                        <el-input   placeholder="商户账号" :value="choose.account" >
                        <template slot="prepend">商户账号</template>   
                        </el-input>
                        <el-button size="medium" type="primary" icon="el-icon-search" >查询</el-button>
                      </form>
                      <el-table :data="clientData" @row-click="clientCheck" ref="clientTable">
                        <el-table-column property="clientName" label="" ></el-table-column>
                      </el-table>
                    </el-dialog>
	             <el-input   id="plate_no" name="plate_no" placeholder="车牌号" v-model="filters.v_plate_no" >
                     <template slot="prepend">车牌号</template>   
                </el-input>
							    <el-select v-model="filters.v_discMoney" filterable placeholder="折扣金额">
	                    <el-option
	                      v-for="item in discMoney"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <div class="dates block">
		                    <span class="demonstration">收费时间从</span>
		                    <el-date-picker
		                      v-model="filters.fee_datefrom"
		                      type="datetime"
		                      placeholder="选择日期时间">
		                    </el-date-picker>
		                  </div>
		                   <div class="dates block">
		                    <span class="demonstration">到</span>
		                    <el-date-picker
		                      v-model="filters.fee_dateto"
		                      type="datetime"
		                      placeholder="选择日期时间">
		                    </el-date-picker>

                </div>
								<div class="dates block">
		                    <span class="demonstration">折扣时间从</span>
		                    <el-date-picker
		                      v-model="filters.disc_datefrom"
		                      type="datetime"
		                      placeholder="选择日期时间">
		                    </el-date-picker>
		                  </div>
		                   <div class="dates block">
		                    <span class="demonstration">到</span>
		                    <el-date-picker
		                      v-model="filters.disc_dateto"
		                      type="datetime"
		                      placeholder="选择日期时间">
		                    </el-date-picker>

                </div>
								<el-select v-model="filters.v_disctype" filterable placeholder="折扣类型">
	                    <el-option
	                      v-for="item in disctype"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>

                <el-input   id="discMan" name="discMan" placeholder="折扣人" v-model="filters.v_discMan">
                     <template slot="prepend">折扣人</template>   
                </el-input>
								<el-input   id="dutyMan" name="dutyMan" placeholder="值班人" v-model="filters.v_dutyMan" >
                     <template slot="prepend">值班人</template>   
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
      choose: {
        clientVisible: false,
        name: "",
        account: ""
			},
			clientData:[],
      filters: {
				v_plate_no:"",
        disc_datefrom: "",
        disc_dateto: "",
        v_dutyMan: "",
        v_discMan: "",
        v_disctype: "",
        fee_dateto: "",
        fee_datefrom: "",
        v_discMoney: "",
        clientValue: "",
        v_park: ""
      },
      disctype:[],
      park: [{}],  
      passageway: [{}],    
      fee_type: [{}],
      releaseMethod: [{}],
     discMoney:[],
      totals: {
        totalNum: 1,
        pageSize: 1,
        currentPage: 1
      },
      tableData: []
    };
  },
  methods: {
		handleCurrentChange(){},
    clientCheck(row, column) {
      this.clientVisible = false;
      console.log("zlz");
      this.filters.clientValue = row.clientName;
      // console.log(column)
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