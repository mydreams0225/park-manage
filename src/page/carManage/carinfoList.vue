<template>
   <section>
       <div class="parent">
            <!-- 操作区 -->
              <div class="margin-tops">
                 
                 <el-button type="danger" icon="el-icon-delete" >批量删除</el-button>
                 <el-button type="success"  icon="el-icon-check">授权车库</el-button>
                 <el-button type="success"  icon="el-icon-check">设置分组</el-button>
                 <div class="menus" style="position:relative ;display:inline-block">
                   
                    <el-button class="after el-icon-caret-bottom" type="success" v-on:click="operate" v-model="isopen" >操作</el-button>
                    <ul class="dropdown-menu">
                      <li>强制出场</li>
                    </ul>
                 </div>  
              </div>

              <!-- 查询区 -->
              <div class="margin-tops">
                 <form :model="filters" class="form-inline" role="form"  onsubmit="subSearchForm();return false;">
                   <el-select v-model="filters.v_park" filterable placeholder="所属停车场">
                            <el-option
                              v-for="item in park"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-select v-model="filters.v_presence_status" filterable placeholder="在场状态">
                            <el-option
                              v-for="item in presence_status"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-select v-model="filters.v_isoverdue" filterable placeholder="是否过期">
                            <el-option
                              v-for="item in isoverdue"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-select v-model="filters.v_vld" filterable placeholder="有效期时间">
                            <el-option
                              v-for="item in vld"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                  <el-date-picker
                              v-model="filters.end_value"
                              type="datetime"
                              placeholder="选择日期时间">
                  </el-date-picker>
                  <el-select v-model="filters.v_price_type" filterable placeholder="计费类型">
                            <el-option
                              v-for="item in price_type"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   
                  
                   <el-select v-model="filters.v_car_type" filterable placeholder="车类型">
                            <el-option
                              v-for="item in car_type"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-select v-model="filters.v_car_group" filterable placeholder="车辆分组">
                            <el-option
                              v-for="item in car_group"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-select v-model="filters.v_parking_type"  filterable placeholder="车位类型">
                            <el-option
                              v-for="item in parking_type"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-select v-model="filters.v_pay_rule_group" filterable placeholder="缴费规则分组">
                            <el-option
                              v-for="item in pay_rule_group"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-input :value="filters.plate_value" v-on:click.native="selects.plateVisible = true"  placeholder="点击选择" readonly="readonly">
                          <template slot="prepend">所属车位池</template>   
                   </el-input>
                   <el-dialog :model="filters.plate_value" title="选择所属车位池" :visible.sync="selects.plateVisible" width="550px" >
                      <form class="plate_poolSearch">
                        <el-input   id="plate_pool" name="plate_pool" placeholder="名称" value="" >
                        <template slot="prepend">名称</template>   
                        </el-input>
                       
                        <el-button size="medium" type="primary" icon="el-icon-search" >查询</el-button>
                      </form>
                      <el-table :data="selects.clientData" @row-click="clientCheck" ref="clientTable">
                        <el-table-column property="plate_name" label="" ></el-table-column>
                      </el-table>
                   </el-dialog>
                   <el-select  v-model="filters.v_garage" filterable placeholder="所属车库">
                            <el-option
                              v-for="item in garage"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-input  id="s_car_no" name="s_car_no"  placeholder="车牌号" v-model="filters.car_no">
                           <template slot="prepend">车牌号</template>   
                   </el-input>
                   <el-input    placeholder="车位号" v-model="filters.plate_no">
                           <template slot="prepend">车位号</template>   
                   </el-input>
                   <el-input   placeholder="注册号" v-model="filters.regist_no">
                           <template slot="prepend">注册号</template>   
                   </el-input>
                   <el-input  placeholder="车主" v-model="filters.carOwner">
                           <template slot="prepend">车主</template>   
                   </el-input>
                   <el-input    placeholder="手机号" v-model="filters.phone">
                           <template slot="prepend">手机号</template>   
                   </el-input>
                   <el-select v-model="filters.v_admin" filterable placeholder="管理员">
                            <el-option
                              v-for="item in admin"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                    <el-input  placeholder="备注" :value="filters.memo">
                           <template slot="prepend">备注</template>   
                   </el-input>
                   <el-button type="primary" icon="el-icon-search"  v-on:click="getCarinfo" >查询</el-button>
                   <el-button icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
                 </form>
              </div>
      
               <!-- 展示区 -->
              <div  class="margin-tops" style="padding-top:10px; ">
              
                <template>
                    <el-table
                      ref="multipleTable"
                      :data="dt"
                      border
                      tooltip-effect="dark"
                      style="width: 100%">
                      <el-table-column
                        type="selection"
                        width="55">
                      </el-table-column>
                      <el-table-column
                        label="车牌号"
                        width="120">
                        <template slot-scope="scope"><a href="#">{{ scope.row.car_no }}</a></template>
                      </el-table-column>
                      <el-table-column
                        prop="regist_no"
                        label="注册号"
                        width="120">
                        <template slot-scope="scope"><a href="#">{{ scope.row.regist_no }}</a></template>
                      </el-table-column>
                      <el-table-column
                        prop="seat_no"
                        label="车位号"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="price_type"
                        label="计费类型"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="car_type"
                        label="车类型"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="car_group"
                        label="车辆分组"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="client"
                        label="车主"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="phone"
                        label="手机号"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="住址"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="vld"
                        label="有效期时间"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="balance"
                        label="余额"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="role_park"
                        label="授权车库"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="end_r_time"
                        label="最后入场时间"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="end_c_time"
                        label="最后出场时间"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="end_edit_person"
                        label="最后修改人"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="memo"
                        label="备注"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="状态"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="businessOpera"
                        label="业务操作"
                        width="200"
                        show-overflow-tooltip>
                         <template slot-scope="scope">
                                <a href="" >[授权车库]</a>
                                <a href="" >[延期]</a>
                              </template>
                      </el-table-column>
                      <el-table-column
                        prop="businessOpera"
                        label="操作"
                        width="200"
                        show-overflow-tooltip>
                         <template  scope="scope">
                                <a href="#" style="padding:5px; background-color:#1a72c1;color:#fff; border-radius:5px;" ><i class="el-icon-document"></i></a>
                                <a href="#" @click="handleEdit(scope.$index, scope.row)"  style="padding:5px; background-color:#1a72c1;color:#fff; border-radius:5px;" ><i class="el-icon-edit"></i></a>
                                <a href="#" @click="handleDel(scope.$index, scope.row)" style="padding:5px; background-color:#d9534f;color:#fff; border-radius:5px;"><i class="el-icon-delete"></i></a>
                              </template>
                      </el-table-column>
                    </el-table>
                    
                  </template>
              </div>
              <!-- 分页 -->
               
              <div class="block">

                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="totals.currentPage"
                    :page-size.sync="totals.pageSize"
                    layout="total, prev, pager, next"
                    :total.sync="totals.totalNum">
                  </el-pagination>
              </div>
                 <!-- 分页end -->
            
              <!--编辑界面-->
              <el-dialog :visible.sync="editFormVisible" title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
                
                  <div slot="footer" class="dialog-footer">
                    <el-button @click.native="editFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="editSubmit" :loading="editDialog.editLoading">提交</el-button>
                  </div>
                </el-dialog>
      </div>
  </section>
</template>

<script>
import editdialog from "@/components/carInfo_editForm.vue";
import {reqCarInfo } from "@/api/carManage";
export default {
  data() {
    return {
      totals: {
        currentPage: 1,
        pageSize: 10,
        totalNum: 11
      },
      selects: {
        clientData: [{ plate_name: "车位一" }, { plate_name: "车位二" }],
        plateVisible: false
      },

      editFormRules: {
        name: [{ required: true, message: "请输入车牌号", trigger: "blur" }]
      },
      editDialog: {
        //编辑界面数据
        editForm: {
          name: "22"
        },
        editLoading: false,

        editForm: ""
      },
      editFormVisible: false,

      editFormRules: {
        name: [{ required: true, message: "请输入车牌号", trigger: "blur" }]
      },

      dt: [
        {
          car_no: "粤A33333",
          regist_no: "粤A88888",
          seat_no: "1518",
          price_type: "月票车",
          car_type: "小型车",
          car_group: "1",
          client: "2",
          phone: "2",
          address: "2",
          vld: "2",
          balance: "$1",
          role_park: "主车库",
          end_r_time: "2018-3-3",
          end_c_time: "2018-3-4",
          end_edit_person: "技术部",
          memo: "cs",
          status: "离场"
        }
      ],
      isopen: false,
      filters: {
        v_park: "",
        v_presence_status: "",
        v_isoverdue: "",
        v_vld: "",
        end_value: "",
        v_price_type: "",
        v_car_type: "",
        v_car_group: "",
        v_parking_type: "",
        v_pay_rule_group: "",
        v_garage: "",
        v_admin: "",
        plate_value: "",

        car_no: "",
        plate_no: "",
        regist_no: "",
        carOwner: "",
        phone: ""
      },
      park: [{}],
      presence_status: [{}],
      isoverdue: [{}],
      vld: [
        {
          value: "",
          label: "有效期时间"
        },
        {
          value: "1",
          label: "小于等于（<=）"
        },
        {
          value: "2",
          label: "大于等于（>=）"
        },
        {
          value: "3",
          label: "等于（=）"
        }
      ],
      price_type: [{}],
      car_type: [{}],
      car_group: [{}],
      parking_type: [{}],
      pay_rule_group: [{}],
      garage: [{}],
      admin: [{}]
    };
  },
  mounted(){
    this.getCarinfo();
  },

  methods: {
    callbackSelTenant: function() {
      for (var item in this.filters) {
        console.log(item);
        if (typeof this.filters[item] == "object") {
          this.filters[item] = [];
        } else {
          this.filters[item] = "";
        }
      }
    },
    //获取数据
    getCarinfo() {
        let para = {
        plate_value: this.filters.plate_value, //车位池
        park: this.filters.v_park, //停车场
        currentPage: this.totals.currentPage, //当前页
        pageSize: this.totals.pageSize //每页显示条数

      };
      reqCarInfo(para).then(res=>{

          this.dt = eval(res).list;
        this.totals.totalNum = eval(res).total;

      }).catch(()=>{

      })

    },
    clientCheck(row, column) {
      this.selects.plateVisible = false;
      console.log("zlz");
      this.filters.plate_value = row.plate_name;
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editDialog.editForm = Object.assign({}, row);
      console.log("zlz");
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          console.log(para);
          // removeUser(para).then((res) => {
          // 	this.listLoading = false;
          // 	//NProgress.done();
          // 	this.$message({
          // 		message: '删除成功',
          // 		type: 'success'
          // 	});
          // 	this.getUsers();
          // });
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getCarinfo();
    },

    operate: function() {
      console.log(this.isopen);
      // var dropdownmenu=document.getElementsByClassName('dropdown-menu')[0];
      if (!this.isopen) {
        document
          .getElementsByClassName("dropdown-menu")[0]
          .classList.add("open");
        this.isopen = true;
      } else {
        document
          .getElementsByClassName("dropdown-menu")[0]
          .classList.remove("open");
        this.isopen = false;
      }
    }
  }
};
</script>

<style scoped>
.el-icon-caret-bottom:before {
  content: "";
}
.after::after {
  content: "\e60b";
}
.t1 {
  display: inline-block;
  position: relative;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 160px;
  padding: 5px 0px 5px 17px;
  margin: 2px 0 0;
  font-size: 14px;
  text-align: left;
  list-style: none;
  background-color: #fff;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  height: 40px;
  line-height: 40px;
}
.open {
  display: block;
}
.dropdown-menu:hover {
  background-color: #eee;
  cursor: pointer;
}

.el-input-group {
  width: 200px;
}
.el-select {
  width: 130px;
}
.dates {
  display: inline-block;
}
.el-table_1_column_18 .el-tooltip {
  background-color: red;
}
</style>