<template>
   <section>
       <div class="parent">
            <!-- 操作区 -->
              <div class="margin-tops">
                 
                 <el-button type="danger" icon="el-icon-delete" @click="batchRemove" :disabled="this.checkBox.length===0">批量删除</el-button>
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
                              v-for="item in querySels.park"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-select v-model="filters.v_presence_status" filterable placeholder="在场状态">
                            <el-option
                              v-for="item in querySels.presence_status"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-select v-model="filters.v_isoverdue" filterable placeholder="是否过期">
                            <el-option
                              v-for="item in querySels.isoverdue"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <!-- <el-select v-model="filters.v_vld" filterable placeholder="有效期时间">
                            <el-option
                              v-for="item in querySels.vld"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                  <el-date-picker
                              v-model="filters.end_value"
                              type="datetime"
                              placeholder="选择日期时间">
                  </el-date-picker> -->
                  <span>有效期时间从</span>
                  <el-date-picker
                    v-model="filters.start_time"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                  <span>到</span>
                   <el-date-picker
                    v-model="filters.end_time"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                  <el-select v-model="filters.v_price_type" filterable placeholder="计费类型">
                            <el-option
                              v-for="item in querySels.price_type"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   
                  
                   <el-select v-model="filters.v_car_type" filterable placeholder="车类型">
                            <el-option
                              v-for="item in querySels.car_type"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-select v-model="filters.v_car_group" filterable placeholder="车辆分组">
                            <el-option
                              v-for="item in querySels.car_group"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-select v-model="filters.v_parking_type"  filterable placeholder="车位类型">
                            <el-option
                              v-for="item in querySels.parking_type"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-select v-model="filters.v_pay_rule_group" filterable placeholder="缴费规则分组">
                            <el-option
                              v-for="item in querySels.pay_rule_group"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-input :value="filters.plate_value" v-on:click.native="clickPlate"  placeholder="点击选择" readonly="readonly">
                          <template slot="prepend">所属车位池</template>   
                   </el-input>
                   <el-dialog :model="filters.plate_value" title="选择所属车位池" :visible.sync="selects.plateVisible" width="550px" >
                      <form class="plate_poolSearch">
                        <el-input   id="plate_pool" name="plate_pool" placeholder="名称" value="" v-model="selects.plate_pool">
                            <template slot="prepend">名称</template>   
                        </el-input>
                       
                        <el-button size="medium" type="primary" icon="el-icon-search" @click="selectPlate">查询</el-button>
                      </form>
                      <el-table :data="selects.clientData" @row-click="clientCheck" ref="clientTable">
                        <el-table-column property="plate_name" label="" ></el-table-column>
                      </el-table>
                   </el-dialog>
                   <el-select  v-model="filters.v_garage" filterable placeholder="所属车库">
                            <el-option
                              v-for="item in querySels.garage"
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
                              v-for="item in querySels.admin"
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
                   <el-button type="success" @click="outputExcel()">导出EXCEL报表</el-button>
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
                      style="width: 100%" @selection-change="selsChange" >
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
                        prop="parkNo"
                        label=""
                       display="none"
                       v-if="noshow"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="vehicleNO"
                        label=""
                       display="none"
                       v-if="noshow"
                        >
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
                        prop="fee_type"
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
                                <a href="#" >[延期] </a>
                              </template>
                      </el-table-column>
                      <el-table-column
                        label="操作"
                        width="200" >
                         <template scope="scope">
                                <a href="#"  class="editBtn" ><i class="el-icon-document"></i></a>
                                <a href="#" @click="handleEdit(scope.$index, scope.row)" class="editBtn"><i class="el-icon-edit"></i></a>
                                <a href="#" @click="handleDel(scope.$index, scope.row)" class="deleteBtn"><i class="el-icon-delete"></i></a>
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
            <!-- 业主 界面-->
            <el-dialog :model="selects.owner_value" title="选择所属业主" :visible.sync="selects.ownerVisible" width="550px" >
                      <form >
                        <el-input   id="owner" name="owner" placeholder="名称" value="" v-model="selects.owner">
                            <template slot="prepend">名称</template>   
                        </el-input>
                       
                        <el-button size="medium" type="primary" icon="el-icon-search" @click="selectOwner">查询</el-button>
                      </form>
                      <el-table :data="selects.ownerData" @row-click="ownerConfin" ref="clientTable">
                        <el-table-column property="owner_name" label="" ></el-table-column>
                      </el-table>
            </el-dialog>
              <!--编辑界面-->
              <el-dialog  width="850px" :visible.sync="editFormVisible" title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
                   <el-form :model="editDialog.editForm" label-width="80px" :rules="editDialog.editFormRules" ref="editForm">
                   
                        <el-row :gutter="20">
                            <el-col :span="4">
                              <div class="grid-content bg-purple">
                                <div>
                                  <span style="color:rgb(255,0,0)">*</span>停车场
                                </div>
                                <el-select v-model="editDialog.editForm.park" placeholder="请选择">
                                  <el-option
                                    v-for="item in querySels.park"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                            </el-col>
                            <el-col :span="7">
                              <div class="grid-content bg-purple">
                                  <span style="color:rgb(255,0,0)">*</span>车牌号
                                  <el-input v-model="editDialog.editForm.car_no" placeholder=""></el-input>
                              </div>
                            </el-col>
                            <el-col :span="7">
                              <div class="grid-content bg-purple">
                                  注册号
                                  <el-input v-model="editDialog.editForm.car_no" placeholder=""></el-input>
                              </div>
                            </el-col>
                            <el-col :span="6">
                              <div class="grid-content bg-purple">
                                容错车牌
                                  <el-input v-model="editDialog.editForm.easyFplate_no" placeholder=""></el-input>
                              </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="4">
                              <div class="grid-content bg-purple">
                                <span style="color:rgb(255,0,0)">*</span>计费类型
                                <el-select v-model="editDialog.editForm.fee_type" placeholder="请选择">
                                  <el-option
                                    v-for="item in querySels.fee_type"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                            </el-col>
                            <el-col :span="4">
                              <div class="grid-content bg-purple">
                                  <span style="color:rgb(255,0,0)">*</span>车类型
                                  <el-select v-model="editDialog.editForm.car_type" placeholder="请选择">
                                  <el-option
                                    v-for="item in querySels.car_type"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                            </el-col>
                            <el-col :span="4">
                              <div class="grid-content bg-purple">
                                车辆分组
                                <el-select v-model="editDialog.editForm.car_group" placeholder="请选择">
                                  <el-option
                                    v-for="item in querySels.car_group"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                            </el-col>
                            <el-col :span="4">
                              <div class="grid-content bg-purple">
                                  <span style="color:rgb(255,0,0)">*</span>车牌颜色
                                  <el-select v-model="editDialog.editForm.plate_color" placeholder="请选择">
                                  <el-option
                                    v-for="item in querySels.plate_color"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                            </el-col>
                            <el-col :span="4">
                              <div class="grid-content bg-purple">
                                  编号
                                  <el-input v-model="editDialog.editForm.id" placeholder=""></el-input>
                              </div>
                            </el-col>
                            <el-col :span="4">
                              <div class="grid-content bg-purple">
                                缴费规则分组
                                  <el-select v-model="editDialog.editForm.feeRuleGroup" placeholder="请选择">
                                  <el-option
                                    v-for="item in querySels.feeRuleGroup"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                            </el-col>
                        </el-row>    
                          <el-row :gutter="20">
                            <el-col :span="4">
                              <div class="grid-content bg-purple">
                                <div>
                                  卡种类
                                </div>
                                <el-select v-model="editDialog.editForm.card_type" placeholder="请选择">
                                  <el-option
                                    v-for="item in querySels.card_types"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                            </el-col>
                            <el-col :span="7">
                              <div class="grid-content bg-purple">
                                    <div>
                                    <span style="color:rgb(255,0,0)">*</span>车位类型
                                    </div>
                                  <el-select v-model="editDialog.editForm.lot_type" placeholder="请选择">
                                  <el-option
                                    v-for="item in querySels.lot_type"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                            </el-col>
                            <el-col :span="7">
                              <div class="grid-content bg-purple">
                                  有效期开始时间
                                  <el-input v-model="editDialog.editForm.start_time" placeholder="" :disabled="true"></el-input>
                              </div>
                            </el-col>
                            <el-col :span="6">
                              <div class="grid-content bg-purple">
                                有效期结束时间
                                  <el-input v-model="editDialog.editForm.end_time" placeholder="" :disabled="true"></el-input>
                              </div>
                            </el-col>
                        </el-row> 
                        <el-row :gutter="20">
                            <el-col :span="8">
                              <div class="grid-content bg-purple">
                                
                                  车位号
                            
                                
                                  <el-input v-model="editDialog.editForm.lot_no" placeholder=""></el-input>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="grid-content bg-purple">
                                  车品牌
                                  <el-input v-model="editDialog.editForm.car_brand" placeholder=""></el-input>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div class="grid-content bg-purple">
                                  车颜色
                                  <el-input v-model="editDialog.editForm.car_color" placeholder=""></el-input>
                              </div>
                            </el-col>
                          
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                              <div class="grid-content bg-purple">
                                
                                  押金
                            
                                
                                  <el-input v-model="editDialog.editForm.deposit" placeholder="￥0.00"></el-input>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div class="grid-content bg-purple">
                                  余额
                                  <el-input v-model="editDialog.editForm.balance" placeholder="￥0.00" :disabled="true"></el-input>
                              </div>
                            </el-col>
                            
                          
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="24">
                              <div class="grid-content bg-purple">          
                                  备注             
                                  <el-input v-model="editDialog.editForm.memo" placeholder=""></el-input>
                              </div>
                            </el-col>
                        </el-row>
                          <el-row :gutter="20">
                            <el-col :span="12">
                              <div class="grid-content bg-purple">                           
                                  所属业主
                                  <el-input :value="editDialog.editForm.owner" v-on:click.native="editClickOwner" placeholder="点击选择" readonly="readonly"></el-input>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div class="grid-content bg-purple">
                                  所属车位池
                                  <el-input :value="editDialog.editForm.plate_pool" v-on:click.native="editClickPlate"  placeholder="点击选择" readonly="readonly">                        
                                </el-input>
                              </div>
                            </el-col>

                        </el-row>
                  </el-form>
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
import {
  reqCarInfo,//查询
  reqPlateName,//请求车位池
  reqEdit,//编辑
  reqOwnerName,//请求车主
  reqCarInfoDeleteOne,//单行删除
  reqCarInfoDeleteMore,//批量删除
  outExcelCarInfo //导出
} from "@/api/carManage";
export default {
  data() {
    return {

      noshow:false,
      checkBox: [], //选中列表
      totals: {
        currentPage: 1,
        pageSize: 10,
        totalNum: 11
      },
      selects: {
        clientData: [], //[{ plate_name: "车位一" }, { plate_name: "车位二" }],
        plateVisible: false,
        plate_pool: "",
        isQuery: "",
        //业主
        owner: "",
        owner_value: "",
        ownerVisible: false,
        ownerData: [],

        card_types: [{}],
        car_group: [{}],
        plate_color: [{}],
        feeRuleGroup: [{}], //缴费规则分组
        lot_type: [{}]
      },

      editDialog: {
        editFormRules: {
          name: [{ required: true, message: "请输入车牌号", trigger: "blur" }]
        },
        //编辑界面数据
        editForm: {
          park: "",
          car_no: "",
          easyFplate_no: "",
          card_type: "",
          fee_type: "",
          car_type: "",
          car_group: "",
          plate_color: "",
          id: "", //编号
          feeRuleGroup: "",
          lot_type: "",
          start_time: "",
          end_time: "",
          lot_no: "",
          car_brand: "", //车品牌
          car_color: "",
          deposit: "", //押金
          balance: "",
          memo: "", //备注
          plate_pool: ""
        },
        editLoading: false,
        editForm: ""
      },
      editFormVisible: false,

      dt: [
        {
          car_no: "粤A33333",
          regist_no: "粤A88888",
          seat_no: "1518",
          fee_type: "月票车",
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
          status: "离场",
          vehicleNO:"1"
        }
      ],
      isopen: false,
      filters: {
        v_park: "",//停车场编号
        v_presence_status: "",//在场状态
        v_isoverdue: "",//是否过期
        // v_vld: "",
        start_date: "",//有效期结束时间
        end_date:"",//有效期开始时间
        v_price_type: "",//计费类型
        v_car_type: "",//车类型
        v_car_group: "",//车辆分组
        v_parking_type: "",//车位类型
        v_pay_rule_group: "",//缴费规则分组
        v_garage: "",//所属车库
        v_admin: "",//管理员
        plate_value: "",//所属车位池

        car_no: "",//车牌号
        plate_no: "",//车位号
        regist_no: "",//注册号
        carOwner: "",//车主
        phone: ""//手机号
      },

      querySels: {
        price_type: configs.chargeType,
        car_type: configs.carType,
        car_group: [{}],
        parking_type: [{}],
        pay_rule_group: [{}],
        garage: [{}],
        admin: [{}],
        park: [],
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
        ]
      }
    };
  },
  mounted() {
    this.getCarinfo();
    this.selectPlate();
  },
  created() {
    this.getParkList();
  },
  methods: {
    //导出excel
     outputExcel() {
                this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                  outExcelCarInfo(para).then(res=>{
                    if(res.code===1){
                      this.$message({
                        message: "删除成功",
                        type: "success"
                      });
                    }
                  })
                    // this.excelData = this.dataList //你要导出的数据list。
                    
                }).catch(() => {
                
                });
            },
    getParkList() {
      var _this = this;
      var userInfo = window.localStorage.getItem("user");

      // var parks = [
      //   {
      //     parkName: "林芝停车场",
      //     parkNo: "1",
      //     entryPassway: "林芝入口通道1-林芝入口通道2"
      //     // entrychildren : [{  },{  }],
      //     // outChildren:[{},{}]
      //   },
      //   {
      //     parkName: "正佳停车场",
      //     parkNo: "2",
      //     entryPassway: "正佳入口通道"
      //   }
      // ];

      if (typeof JSON.parse(userInfo)["parks"] == "object") {
        JSON.parse(userInfo)["parks"].forEach(item => {
          var park1 = {
            value: item["parkNo"],
            label: item["parkName"],
            entryPassway: item["entryPassway"],
            outPassway: item["outPassway"]
          };
          _this.querySels.park.push(park1);
          console.log(_this.querySels.park);
        });
      }
    },
    selsChange: function(sels) {
      this.checkBox = sels;
      console.log("slsl");
     
    },
    //批量删除
    batchRemove: function() {
      var vehicleNOs = this.checkBox.map(item => item.vehicleNO).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { vehicleNO: vehicleNOs};
          para.jwt = window.localStorage.getItem("jwt");
          reqCarInfoDeleteMore(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getCarinfo();
          });
        })
        .catch(() => {});
    },
      //删除
    handleDel: function(index, row) {
      // this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
      //               confirmButtonText: '确定',
      //               cancelButtonText: '取消',
      //               type: 'warning'
      //           })
      //   .then(() => {
          alert("zlz")
          this.listLoading = true;
          //NProgress.start();
          let para = { vehicleNO: row.vehicleNO };
          para.jwt = window.localStorage.getItem("jwt");
          reqCarInfoDeleteOne(para).then(res => {
            if(res.code===1){
              this.$message({
                  message: "删除成功",
                  type: "success"
                });
            }
            this.listLoading = false;
            //NProgress.done();
            
            this.getCarinfo();
          }).catch(() => {
          alert("111");
        });
        // })
        
    },
    //编辑
    editSubmit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认修改吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editDialog.editForm);
            para.jwt = window.localStorage.getItem("jwt");
            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
            reqEdit(para).then(res => {
              if(res.code===1){
                    this.$message({
                    message: "修改成功",
                    type: "success"
                  });

              }
              this.editLoading = false;
              //NProgress.done();
              
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getCarinfo();
            });
          });
        }
      });
    },
    clickPlate() {
      this.selects.plateVisible = true;
      this.selects.isQuery = "query";
    },
    editClickOwner() {
      this.selects.ownerVisible = true;
    },
    editClickPlate() {
      this.selects.plateVisible = true;
      this.selects.isQuery = "edit";
    },
    //单击选中车位池
    clientCheck(row, column) {
      this.selects.plateVisible = false;
      if (this.selects.isQuery === "query") {
        this.filters.plate_value = row.plate_name;
      } else if (this.selects.isQuery === "edit") {
        this.editDialog.editForm.plate_pool = row.plate_name;
      }
    },
    //单击选中业主信息
    ownerConfin(row, column) {
      this.selects.ownerVisible = false;
      console.log(row.owner_name);
      this.editDialog.editForm.owner = row.owner_name;
      console.log(this.selects.owner_value);
    },
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
    selectPlate() {
      let para = {
        plate_name: this.selects.plate_name
      };
      reqPlateName(para)
        .then(res => {
          this.selects.clientData = eval(res).plateName;
        })
        .catch(() => {});
    },
    selectOwner() {
      let para = {
        plate_name: this.selects.owner_name
      };
      reqOwnerName(para)
        .then(res => {
          this.selects.ownerData = eval(res).ownerName;
        })
        .catch(() => {});
    },
    //获取数据
    getCarinfo() {
      let para ={
          parkNo:this.filters.v_park,
          presence:this.filters.v_presence_status,
          chargeType:this.filters.v_price_type,
          licensePlate:this.filters.car_no,
          registerNo:this.filters.regist_no,
          carOwner:this.filters.carownerName,
          telephone:this.filters.phone,
          remark:this.filters.memo,
          admin:this.filters.v_admin,
          isExpire:this.filters.v_isoverdue,
          // type:this.filters.start_date,

      };
      (para.currentPage = this.totals.currentPage); //当前页
      para.pageSize=this.totals.pageSize;
      para.jwt=window.localStorage.getItem("jwt");
        reqCarInfo(para)
          .then(res => {
            if(res.code===1){
            var list= eval(res).list;
            var dt=this.dt;
            dt.car_no=list.licensePlate;
            dt.fee_type=list.chargeType;
            dt.address=list.address;
            dt.parkNo=list.parkNo;
            dt.regist_no=list.registerNo;
            dt.client=list.carownerName;
            dt.status=list.presence;
            dt.phone=list.telephone;
            dt.vld=list.type;
            // dt.admin=list.admin;
            dt.memo=list.remark;
            this.totals.totalNum = eval(res).totalNum;
            }else{
               this.$message({
              message: res.message,
              type: "error"
            });
            }
           
          })
          .catch(() => {});
    },

    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      console.log(row);
      this.editDialog.editForm = Object.assign({}, row);
      console.log("zlz");
    },
  
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.totals.currentPage=val;
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
.editBtn{
  padding:5px; background-color:#1a72c1;color:#fff; border-radius:5px;
}
.deleteBtn{
  padding:5px; background-color:#d9534f;color:#fff; border-radius:5px;
}
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