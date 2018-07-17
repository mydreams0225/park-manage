<template>
	<section>
		<div class="parent">
			<div class="margin-tops">
				<el-button type="primary" size="medium" @click="addpark_lotVisible = true"><i class="el-icon-plus"  ></i>新增</el-button>
				<el-dialog 
				  title="添加车位"
				  :visible.sync="addpark_lotVisible"
				  width="30%"
				  >
				   <div class="add">
						  <el-row :gutter="24">
		              <el-col :span="24">
		                <div class="grid-content bg-purple">
		                <span style="color:red">*</span>
		                <span >所属停车场：</span>
		                 
		              </div>
		             </el-col>
									              
		       </el-row>
					  
								<el-row :gutter="24">
		              <el-col :span="24">
		                <div class="grid-content bg-purple">
		                <el-select v-model="add.v_add_park" filterable  >
                      <el-option
                        v-for="item in add.add_park"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>	
		                 
		              </div>
		             </el-col>
									              
		       </el-row>	
					 </div>

				  <span slot="footer" class="dialog-footer">
				    <el-button @click="addpark_lotVisible = false">取 消</el-button>
				    <el-button type="primary" @click="addpark_lotVisible = false">保 存</el-button>
				  </span>
				</el-dialog>
				<el-button type="danger" size="medium"><i class="el-icon-delete"></i>删除</el-button>
				 <el-button type="primary" size="medium"> <i class="el-icon-back rotates"></i>进入车位池缴费页面</el-button>
				 <el-button type="success" size="medium"><strong><i class="el-icon-upload"></i></strong> 导出EXCEL报表</el-button>	
			</div>
			<!-- 查询区 -->
			<div class="margin-tops query" >
				<el-select v-model="filters.v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-input :value="filters.park_lot"  id="park_lot" v-on:click.native="park_lotVisible = true" name="park_lot" placeholder="点击选择" readonly="readonly">
                      <template slot="prepend">所属车位池</template>   
                </el-input>
								<el-dialog title="选择所属车位池" :visible.sync="park_lotVisible" width="550px" >
                      <form class="clientSearch">
                        <el-input   id="s_names" name="s_names" placeholder="名称" :value="filters.name" >
                        <template slot="prepend">名称</template>   
                        </el-input>
                        <el-input   id="s_codes" name="s_codes" placeholder="编码" :value="filters.codes" >
                        <template slot="prepend">编码</template>   
                        </el-input>
                        <el-button size="medium" type="primary" icon="el-icon-search" >查询</el-button>
                      </form>
                      <el-table :data="park_lotData" @row-click="park_lotCheck" ref="park_lotTable">
                        <el-table-column property="park_lotName" label="" ></el-table-column>
                      </el-table>
                    </el-dialog>
			
					<el-select v-model="filters.v_garage" filterable placeholder="所属车库">
			                    <el-option
			                      v-for="item in garage"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			        </el-select>
		            <el-select v-model="filters.v_parkingType" filterable placeholder="车位类型">
			                    <el-option
			                      v-for="item in parkingType"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			        </el-select>
		           <el-input   id="parking_no" name="parking_no" placeholder="车位号" v-model="filters.v_parking_no" >
                     <template slot="prepend">车位号</template>   
                    </el-input>
		            <el-select v-model="filters.v_isOutTime" filterable placeholder="是否过期">
			                    <el-option
			                      v-for="item in isOutTime"
			                      :key="item.value"
			                      :label="item.label"
			                      :value="item.value">
			                    </el-option>
			        </el-select>
			         <div class="dates block">
		                    <span class="demonstration">有效期时间从</span>
		                    <el-date-picker
		                      v-model="filters.start_datefrom"
		                      type="date"
		                      placeholder="选择日期时间">
		                    </el-date-picker>
		                  </div>
		                   <div class="dates block">
		                    <span class="demonstration">到</span>
		                    <el-date-picker
		                      v-model="filters.start_dateto"
		                      type="date"
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
		    <!-- <div class="sendcarManage">
		        <Paging v-bind:total="totals"></Paging>
		    </div> -->
				<div class="block">
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
			totals: {
        totalNum: 2,
        pageSize: 1,
        currentPage: 1
			},
			add:{
				v_add_park:"",
				add_park:[]
			},
		
      filters: {
        v_park: "",
        v_garage: "",
        v_parkingType: "",
        v_isOutTime: "", //是否过期
        v_parking_no: "",
        v_isOutTime: "",
        start_datefrom: "",
				start_dateto: "",
				park_lot:""
			},
			addpark_lotVisible:false,
      park_lotVisible:false,
      park: [{}],
      garage: [{}],
      parkingType: [{}],
      isOutTime: [{}],
			tableData: [],
			park_lotData: [{ park_lotName: "车位池1" }, { park_lotName: "车位池2" }],
      
    };
	},
	methods:{
		callbackSelTenant: function() {
      console.log(this.filters);
      for (var item in this.filters) {
       
          this.filters[item] = "";
        
      }
		},
		park_lotCheck(row, column) {
      this.park_lotVisible = false;
      this.park_lotVisible = false;
      console.log("zlz");
      this.filters.park_lot = row.park_lotName;
      // console.log(column)
    },
		handleCurrentChange(val){
       console.log(`当前页: ${val}`);
       console.log('zzz')
    }
	}
};
</script>
<style scoped="scoped">
.rotates {
  transform: rotate(180deg);
}
.el-button--success {
  float: right;
}
/*公共属性*/
.el-input-group {
  width: 200px;
}
.query .el-select {
  width: 130px;
}
/*公共属性*/
.add .el-input{
	width:100% !important;
}
.dates {
  display: inline-block;
}

</style>