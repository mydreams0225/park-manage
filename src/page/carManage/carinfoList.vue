<template>
   <section>
       <div class="parent">
            <!-- 操作区 -->
              <div class="margin-tops">
                 <el-button type="primary" icon="el-icon-edit">编辑</el-button>
                 <el-button type="danger" icon="el-icon-delete">删除</el-button>
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
                 <form class="form-inline" role="form" id="searchForm" name="searchForm" onsubmit="subSearchForm();return false;">
                   <el-select v-model="v_park" filterable placeholder="所属停车场">
                            <el-option
                              v-for="item in park"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-select v-model="v_presence_status" filterable placeholder="在场状态">
                            <el-option
                              v-for="item in presence_status"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-select v-model="v_isoverdue" filterable placeholder="是否过期">
                            <el-option
                              v-for="item in isoverdue"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-select v-model="v_vld" filterable placeholder="有效期时间">
                            <el-option
                              v-for="item in vld"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                  <el-date-picker
                              v-model="end_value"
                              type="datetime"
                              placeholder="选择日期时间">
                  </el-date-picker>
                  <el-select v-model="v_price_type" filterable placeholder="计费类型">
                            <el-option
                              v-for="item in price_type"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   
                  
                   <el-select v-model="v_car_type" filterable placeholder="车类型">
                            <el-option
                              v-for="item in car_type"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-select v-model="v_car_group" filterable placeholder="车辆分组">
                            <el-option
                              v-for="item in car_group"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-select v-model="v_parking_type" filterable placeholder="车位类型">
                            <el-option
                              v-for="item in parking_type"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-select v-model="v_pay_rule_group" filterable placeholder="缴费规则分组">
                            <el-option
                              v-for="item in pay_rule_group"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-input   id="seat_pool" name="seat_pool" placeholder="点击选择" readonly="readonly">
                          <template slot="prepend">所属车位池</template>   
                   </el-input>
                   <el-select v-model="v_garage" filterable placeholder="所属车库">
                            <el-option
                              v-for="item in garage"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-input   id="car_no" name="car_no" placeholder="车牌号">
                           <template slot="prepend">车牌号</template>   
                   </el-input>
                   <el-input   id="seat_no" name="seat_no" placeholder="车位号">
                           <template slot="prepend">车位号</template>   
                   </el-input>
                   <el-input   id="regist_no" name="regist_no" placeholder="注册号">
                           <template slot="prepend">注册号</template>   
                   </el-input>
                   <el-input   id="client" name="client" placeholder="车主">
                           <template slot="prepend">车主</template>   
                   </el-input>
                   <el-input   id="phone" name="phone" placeholder="手机号">
                           <template slot="prepend">手机号</template>   
                   </el-input>
                   <el-select v-model="v_admin" filterable placeholder="管理员">
                            <el-option
                              v-for="item in admin"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                    <el-input   id="memo" name="memo" placeholder="备注">
                           <template slot="prepend">备注</template>   
                   </el-input>
                   <el-button type="primary" icon="el-icon-search">查询</el-button>
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
                      style="width: 100%"
                      @selection-change="">
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
                         <template slot-scope="scope">
                                <a href=""style="padding:5px; background-color:#1a72c1;color:#fff; border-radius:5px;" ><i class="el-icon-document"></i></a>
                                <a href=""  style="padding:5px; background-color:#1a72c1;color:#fff; border-radius:5px;"><i class="el-icon-edit"></i></a>
                                <a href="" style="padding:5px; background-color:#d9534f;color:#fff; border-radius:5px;"><i class="el-icon-delete"></i></a>
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
                    :current-page.sync="currentPage1"
                    :page-size="1"
                    layout="total, prev, pager, next"
                    :total="1">
                  </el-pagination>
                </div>
                 <!-- 分页end -->
   </div>
     
  </section>
</template>

<script>
  export default {
    data(){
       return{
        currentPage1: 1,
        dt: [{
          car_no: '粤A33333',
          regist_no: '粤A88888',
          seat_no: '1518',
          price_type:'月票车',
          car_type:'小型车',
          car_group:'',
          client:'',
          phone:'',
          address:'',
          vld:'',
          balance:'$1',
          role_park:'主车库',
          end_r_time:'2018-3-3',
          end_c_time:'2018-3-4',
          end_edit_person:'技术部',
          memo:'cs',
          status:'离场',

        }],
         isopen:false,
         v_park:'',
         park:[{}],
         v_presence_status:'',
         presence_status:[{}],
         v_isoverdue:'',
         isoverdue:[{}],
        v_vld:'',
        vld:[{
          value:'',
          label:'有效期时间'
        },{
          value:'1',
          label:'小于等于（<=）'
        },{
          value:'2',
          label:'大于等于（>=）'
        },{
          value:'3',
          label:'等于（=）'
        }],
        v_price_type:'',
        price_type:[{}],
        v_car_type:'',
        car_type:[{}],
        v_car_group:'',
        car_group:[{}],
        v_parking_type:'',
        parking_type:[{}],
        v_pay_rule_group:'',
        pay_rule_group:[{}],
        v_garage:'',
        garage:[{}],
        v_admin:'',
        admin:[{}],
        end_value:''
       }
    },
    methods:{
      
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      callbackSelTenant:function(){
          var aa=document.getElementsByTagName("input");  
          console.log(aa);
                for(var i=0;i<aa.length;i++){  
                    if (aa[i].type=="text"){  
                        aa[i].value = "";  
                    }  
                }  
      },
   
      callbackSelTenant:function(){
          var aa=document.getElementsByTagName("input");  
          console.log(aa);
                for(var i=0;i<aa.length;i++){  
                    if (aa[i].type=="text"){  
                        aa[i].value = "";  
                    }  
                }  
      },
      operate:function(){
        console.log(this.isopen);
        // var dropdownmenu=document.getElementsByClassName('dropdown-menu')[0];
          if(!this.isopen){
            
            document.getElementsByClassName("dropdown-menu")[0].classList.add("open");
            this.isopen=true;
          }else{
             document.getElementsByClassName("dropdown-menu")[0].classList.remove("open");
             this.isopen=false;
          }
      }
    }
  }
</script>

<style scoped>

 

 .el-icon-caret-bottom:before{
  content:""
 }
 .after::after{
  content:"\e60b"
 }
 .t1{
  display:inline-block;
  position:relative;
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
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 4px;
    -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
    height:40px;
    line-height:40px;
}
 .open{
  display:block;
}
.dropdown-menu:hover{
    background-color:#eee;
    cursor:pointer;
}

   .el-input-group{
    width:200px;
  }
  .el-select{
    width:130px;
  }
  .dates{
    display:inline-block;
  }
  .el-table_1_column_18 .el-tooltip{
    background-color:red;
  }
</style>