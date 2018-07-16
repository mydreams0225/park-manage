<template>
	<section>
	  <div class="parent">
	  	<!-- 操作区 -->
	  	<div class="margin-tops">
	  		<el-button size="medium" type="primary" @click="openSender"><strong><i class="el-icon-plus"></i></strong>我要派车</el-button>
        <!-- 派车添加 -->
        <el-dialog :visible.sync="senderDialogVisible" title="我要派车" v-model="senderDialogVisible" :close-on-click-modal="false" width="600px">
                  <form  >
                     <el-row :gutter="20">
                          <el-col :span="10"><div class="grid-content bg-purple">
                            <div><label for=""><span style="color:red">*</span> 所属停车场</label></div>
                              <el-select class="edit" v-model="edit.v_park" placeholder="请选择">
                                <el-option
                                  v-for="item in park"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                            </div>

                          </el-col>
                          <el-col :span="10"><div class="grid-content bg-purple">
                            <div><label for=""><span style="color:red">*</span> 选择公务车：</label></div>
                                <el-input v-model="edit.v_vehicle" placeholder="点击选择" v-on:click.native="edit.dialogCarVisible = true" ></el-input>
                                
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :span="10"><div class="grid-content bg-purple">
                            <div><label for="">申请人</label></div>
                              <el-input v-model="edit.v_reqPerson"></el-input>
                            </div>

                          </el-col>
                          <el-col :span="10"><div class="grid-content bg-purple">
                            <div><label for="">预计行驶公里数</label></div>
                            <el-input v-model="edit.v_travel" ></el-input>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :span="10"><div class="grid-content bg-purple">
                            <div><label for=""><span style="color:red">*</span>用车开始时间：</label></div>
                              <div class="block" >
                              
                              <el-date-picker
                                v-model="edit.v_useStartTime"
                                type="datetime"
                                placeholder="选择日期时间">
                              </el-date-picker>
                            </div>
                            </div>

                          </el-col>
                          <el-col :span="10"><div class="grid-content bg-purple">
                            <div><label for=""><span style="color:red">*</span>用车结束时间：</label></div>
                            <div class="block">
                              
                              <el-date-picker
                                v-model="edit.v_useEndTime"
                                type="datetime"
                                placeholder="选择日期时间">
                              </el-date-picker>
                            </div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :span="10">
                            <div class="grid-content bg-purple">
                                <div><label for="">驾驶员</label></div>
                                <el-input v-model="edit.v_driver"></el-input>
                            </div>

                          </el-col>
                          <el-col :span="10">
                            <div class="grid-content bg-purple">

                                <div><label for=""> 驾驶员电话：</label></div>
                                <el-input v-model="edit.v_driverPhone" ></el-input>
                            </div>
                          </el-col>
                        </el-row>
                    </form>
                            <div slot="footer" class="dialog-footer">
                              <el-button @click.native="senderDialogVisible = false">取消</el-button>
                              <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
                            </div>
              </el-dialog>
              <el-dialog title="选择车辆（双击选中）" :visible.sync="edit.dialogCarVisible" width="600px" >
                                  <form class="clientSearch">
                                      <el-row :gutter="20">
                                      <el-col :span="10">
                                        <div class="grid-content bg-purple">
                                              <el-input   id="s_names" name="s_names"  :value="edit.vehicle.car_no" >
                                                <template slot="prepend">车牌号</template>   
                                            </el-input>
                                      </div>
                                      </el-col>
                                      <el-col :span="10">
                                          <div class="grid-content bg-purple">
                                        <el-button size="medium" type="primary" icon="el-icon-search" >查询</el-button>
                                      </div>
                                      </el-col>
                                    </el-row>
                                    
                                   
                                  
                                  </form>
                                  <el-table :data="edit.vehicleData" @row-click="vehicleChecked" ref="clientTable">
                                    <el-table-column property="vehicle_name" label="" ></el-table-column>
                                  </el-table>
                                </el-dialog>
	  	</div>
	     <!-- 查询区 -->
         <div class="margin-tops">
         	<form class="form-inline" role="form" id="searchForm" name="searchForm" onsubmit="subSearchForm();return false;">
         		<el-select v-model="filters.v_park" filterable placeholder="所属停车场">
                    <el-option
                      v-for="item in park"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
                <el-input   id="car_no" name="car_no" placeholder="车牌号" v-model="filters.car_no">
                   <template slot="prepend">车牌号</template>   
                </el-input>
                <el-input   id="req_person" name="req_person" placeholder="车牌号" v-model="filters.req_person">
                   <template slot="prepend">申请人</template>   
                </el-input>
                <div class="dates block">
                    <span class="demonstration">开始时间从</span>
                    <el-date-picker
                      v-model="filters.start_from"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
                   <div class="dates block">
                    <span class="demonstration">到</span>
                    <el-date-picker
                      v-model="filters.start_to"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
                 <div class="dates block">
                    <span class="demonstration">结束时间从</span>
                    <el-date-picker
                      v-model="filters.end_from"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
                   <div class="dates block">
                    <span class="demonstration">到</span>
                    <el-date-picker
                      v-model="filters.end_to"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
           <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
           <el-button icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')" size="medium">清除</el-button>
            </form>
        </div>
        <!-- 数据展示区 -->
        <div class="margin-tops">
              <template>
                    <el-table
                      :data="tableData"
                      border
                      style="width: 100% ;">
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
                        prop="req_person"
                        label="申请人">
                      </el-table-column>
                      <el-table-column
                        prop="use_startTime"
                        label="用车开始时间">
                      </el-table-column>               
                      <el-table-column
                        prop="use_endTime"
                        label="用车结束时间">
                       
                         
                      </el-table-column>
                      <el-table-column
                        prop="mileage"
                        label="预计行驶公路数">
                        
                         
                      </el-table-column>

                      <el-table-column
                        prop="driver"
                        label="驾驶员">
                      </el-table-column>
                      <el-table-column
                        prop="driver_phone"
                        label="驾驶员电话">
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
	    <div >
	        <Paging v-bind:total="totals"></Paging>
	        
	    </div>
		
	  </div>
	</section>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      // 	   currentPage1: 1,
      // //total:3,
      // pagesize:1,
      //查询区
      senderDialogVisible: false,
      editLoading: false,

      park: [{ value: "1", label: "fff" }],
      edit: {
        v_park: "",
        v_vehicle: "",
        v_reqPerson: "",
        v_travel: "",
        v_useStartTime: "",
        v_useEndTime: "",
        v_driver: "",
        v_driverPhone: "",
        dialogCarVisible: false,
        vehicle: { name: "" },
        vehicleData: [
          { vehicle_name: "公务车一" },
          { vehicle_name: "公务车二" },
          { vehicle_name: "公务车一" },
          { vehicle_name: "公务车二" },
          { vehicle_name: "公务车一" },
          { vehicle_name: "公务车二" },
          { vehicle_name: "公务车一" },
          { vehicle_name: "公务车二" }
        ]
      },
      filters: {
        v_park: "",
        car_no: "",
        req_person: "",
        start_from: "",
        start_to: "",
        end_from: "",
        end_to: ""
      },

      tableData: [],
      //totals:1,
      totals: {
        totalnum: 3,
        pagesize: 1,
        currentPage1: 1
      }
    };
  },
  methods: {
    //
    vehicleChecked(row, column) {
      this.edit.dialogCarVisible = false;

      console.log("zlz");
      this.edit.v_vehicle = row.vehicle_name;
      // console.log(column)
    },
    openSender() {
      this.senderDialogVisible = true;
      //  this.editLoading=true;
    },
    callbackSelTenant: function() {
      console.log(this.filters);
      for (var item in this.filters) {
        this.filters[item] = "";
      }
    }
  }
  // props:["total"],
};
</script>
<style scoped>
.el-input-group {
  width: 200px;
}
.el-select {
  width: 130px;
}
.edit {
  width: 100% !important;
}
.dates {
  display: inline-block;
}
</style>