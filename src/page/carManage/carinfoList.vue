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
                   <span>所属停车场</span>
                   <el-select v-model="filters.park" filterable placeholder="所属停车场">
                            <el-option
                              v-for="item in querySels.park"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <span>在场状态</span>
                   <el-select v-model="filters.presenceStatus" filterable placeholder="在场状态">
                            <el-option
                              v-for="item in querySels.presenceStatus"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <span>是否过期</span>
                   <el-select v-model="filters.isOverdue" filterable placeholder="是否过期">
                            <el-option
                              v-for="item in querySels.isoverdue"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                  <span>有效期时间从</span>
                  <el-date-picker
                    v-model="filters.startTime"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                  <span>到</span>
                   <el-date-picker
                    v-model="filters.endTime"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                  <span>计费类型</span>
                  <el-select v-model="filters.priceType" filterable placeholder="计费类型">
                            <el-option
                              v-for="item in querySels.priceType"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   
                  <span>车类型</span>
                   <el-select v-model="filters.carType" filterable placeholder="车类型">
                            <el-option
                              v-for="item in querySels.caType"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <span>车辆分组</span>
                   <el-select v-model="filters.carGroup" filterable placeholder="车辆分组">
                            <el-option
                              v-for="item in querySels.carGroup"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <span>车位类型</span>
                   <el-select v-model="filters.parkingType"  filterable placeholder="车位类型">
                            <el-option
                              v-for="item in querySels.parkingType"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <span>缴费规则分组</span>
                   <el-select v-model="filters.payRuleGroup" filterable placeholder="缴费规则分组">
                            <el-option
                              v-for="item in querySels.payRuleGroup"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                   </el-select>
                   <el-input :value="filters.plateValue" v-on:click.native="clickPlate"  placeholder="点击选择" readonly="readonly">
                          <template slot="prepend">所属车位池</template>   
                   </el-input>
                   <el-select  v-model="filters.garage" filterable placeholder="所属车库">
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
                   <el-input    placeholder="车位号" v-model="filters.plateNo">
                           <template slot="prepend">车位号</template>   
                   </el-input>
                   <el-input   placeholder="注册号" v-model="filters.registNo">
                           <template slot="prepend">注册号</template>   
                   </el-input>
                   <el-input  placeholder="车主" v-model="filters.carOwner">
                           <template slot="prepend">车主</template>   
                   </el-input>
                   <el-input    placeholder="手机号" v-model="filters.phone">
                           <template slot="prepend">手机号</template>   
                   </el-input>
                   <span>管理员</span>
                   <el-select v-model="filters.admin" filterable placeholder="管理员">
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
                        prop="registNo"
                        label="注册号"
                        width="120">
                        <template slot-scope="scope"><a href="#">{{ scope.row.regist_no }}</a></template>
                      </el-table-column>
                      <el-table-column
                        prop="seatNo"
                        label="车位号"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="feeType"
                        label="计费类型"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="carType"
                        label="车类型"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="carGroup"
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
                        prop="rolePark"
                        label="授权车库"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="endRtime"
                        label="最后入场时间"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="endCtime"
                        label="最后出场时间"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="endEditperson"
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
                         <template slot-scope="scopes">
                                <a href="#"  class="editBtn" @click="handlequery(scopes.$index,scopes.row)"><i class="el-icon-document"></i></a>
                                <!-- <a href="#" @click="handleEdit(scopes.$index, scopes.row)" class="editBtn"><i class="el-icon-edit"></i></a> -->
                                <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="handleEdit(scopes.$index, scopes.row)"></el-button>
                                <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="handleDel(scopes.$index, scopes.row)"></el-button>
                                <!-- <a href="#" @click="handleDel(scopes.$index, scopes.row)" class="deleteBtn"><i class="el-icon-delete"></i></a> -->
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
            <!-- 所属车位池 -->
            <el-dialog :model="filters.plateValue" title="选择所属车位池" :visible.sync="selects.plateVisible" width="550px" >
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
            <!-- 业主 界面-->
            <el-dialog :model="selects.ownerValue" title="选择所属业主" :visible.sync="selects.ownerVisible" width="550px" >
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
              <el-dialog  width="850px" :visible.sync="editFormVisible" title="编辑" v-model="editFormVisible" :close-on-click-modal="true">
                   <el-form  v-show="editShow" :model="editDialog.editForm" label-width="80px" :rules="editDialog.editFormRules" ref="editForm">
                        <el-row :gutter="20">
                            <el-col :span="4">
                              <div >
                                <div>
                                  <span style="color:rgb(255,0,0)">*</span>停车场
                                </div>
                                <el-select  v-model="editDialog.editForm.park" placeholder="请选择">
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
                              <div >
                                  <span style="color:rgb(255,0,0)">*</span>车牌号
                                  <el-input v-model="editDialog.editForm.carNo" placeholder=""></el-input>
                              </div>
                            </el-col>
                            <el-col :span="7">
                              <div >
                                  注册号
                                  <el-input  v-model="editDialog.editForm.registNo" placeholder=""></el-input>
                              </div>
                            </el-col>
                            <el-col :span="6">
                              <div >
                                容错车牌
                                  <el-input v-model="editDialog.editForm.easyFplateNo" placeholder=""></el-input>
                              </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="4">
                              <div >
                                <span style="color:rgb(255,0,0)">*</span>计费类型
                                <el-select v-model="editDialog.editForm.feeType" placeholder="请选择">
                                  <el-option
                                    v-for="item in querySels.feeType"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                            </el-col>
                            <el-col :span="4">
                              <div >
                                  <span style="color:rgb(255,0,0)">*</span>车类型
                                  <el-select v-model="editDialog.editForm.carType" placeholder="请选择">
                                  <el-option
                                    v-for="item in querySels.carType"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                            </el-col>
                            <el-col :span="4">
                              <div >
                                车辆分组
                                <el-select v-model="editDialog.editForm.carGroup" placeholder="请选择">
                                  <el-option
                                    v-for="item in querySels.carGroup"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                                
                              </div>
                            </el-col>
                            <el-col :span="4">
                              <div >
                                  <span style="color:rgb(255,0,0)">*</span>车牌颜色
                                  <el-select v-model="editDialog.editForm.plateColor" placeholder="请选择">
                                  <el-option
                                    v-for="item in querySels.plateColor"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                            </el-col>
                            <el-col :span="4">
                              <div >
                                  编号
                                  <el-input v-model="editDialog.editForm.id" placeholder=""></el-input>
                              </div>
                            </el-col>
                            <el-col :span="4">
                              <div >
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
                              <div >
                                <div>
                                  卡种类
                                </div>
                                <el-select v-model="editDialog.editForm.cardType" placeholder="请选择">
                                  <el-option
                                    v-for="item in querySels.cardTypes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                            </el-col>
                            <el-col :span="7">
                              <div >
                                    <div>
                                    <span style="color:rgb(255,0,0)">*</span>车位类型
                                    </div>
                                  <el-select v-model="editDialog.editForm.lotType" placeholder="请选择">
                                  <el-option
                                    v-for="item in querySels.lotType"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </div>
                            </el-col>
                            <el-col :span="7">
                              <div >
                                  有效期开始时间
                                  <el-input v-model="editDialog.editForm.startTime" placeholder="" :disabled="true"></el-input>
                              </div>
                            </el-col>
                            <el-col :span="6">
                              <div >
                                有效期结束时间
                                  <el-input v-model="editDialog.editForm.endTime" placeholder="" :disabled="true"></el-input>
                              </div>
                            </el-col>
                        </el-row> 
                        <el-row :gutter="20">
                            <el-col :span="8">
                              <div >
                                  车位号
                            
                                
                                  <el-input v-model="editDialog.editForm.lotNo" placeholder=""></el-input>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div >
                                  车品牌
                                  <el-input v-model="editDialog.editForm.carBrand" placeholder=""></el-input>
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div >
                                  车颜色
                                  <el-input v-model="editDialog.editForm.carColor" placeholder=""></el-input>
                              </div>
                            </el-col>
                          
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                              <div >
                                
                                  押金
                            
                                
                                  <el-input v-model="editDialog.editForm.deposit" placeholder="￥0.00"></el-input>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div >
                                  余额
                                  <el-input v-model="editDialog.editForm.balance" placeholder="￥0.00" :disabled="true"></el-input>
                              </div>
                            </el-col>
                            
                          
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="24">
                              <div >          
                                  备注             
                                  <el-input v-model="editDialog.editForm.memo" placeholder=""></el-input>
                              </div>
                            </el-col>
                        </el-row>
                          <el-row :gutter="20">
                            <el-col :span="12">
                              <div >                           
                                  所属业主
                                  <el-input :value="editDialog.editForm.owner" v-on:click.native="editClickOwner" placeholder="点击选择" readonly="readonly"></el-input>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div >
                                  所属车位池
                                  <el-input :value="editDialog.editForm.platePool" v-on:click.native="editClickPlate"  placeholder="点击选择" readonly="readonly">                        
                                </el-input>
                              </div>
                            </el-col>

                        </el-row>
                  </el-form>
                  <el-form class="queryFont" v-show="queryShow" :model="editDialog.editForm" label-width="80px" :rules="editDialog.editFormRules" ref="editForm">
                   
                        <el-row :gutter="20">
                            <el-col :span="12">
                              <div >
                                <div>
                                  <span >停车场:</span>
                                </div>
                                <span>{{editDialog.editForm.park}}</span>
                              </div>
                            </el-col>
                            
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :span="12">
                              <div >
                                  <span >车牌号: </span>
                                  {{editDialog.editForm.carNo}}
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div >
                                 <span>注册号:</span> 
                                  {{editDialog.editForm.registNo}}
                              </div>
                            </el-col>
                            
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :span="12">
                              <div >
                                <span>容错车牌:</span>   
                                  {{editDialog.editForm.easyFplateNo}}
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div >
                                <span>计费类型:</span>
                                {{editDialog.editForm.feeType}}
                              </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            
                            
                            <el-col :span="12">
                              <div >
                                <span>车辆分组:</span>
                                {{editDialog.editForm.carGroup}}
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div >
                                <span> 所属车位池:</span> 
                                  {{editDialog.editForm.platePool}}
                                
                              </div>
                            </el-col>
                            
                        </el-row>    
                        <el-row :gutter="20">
                          <el-col :span="12">
                              <div >
                                <span>有效期开始时间:</span>  
                                  {{editDialog.editForm.startTime}}
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div >
                               <span>有效期结束时间:</span> 
                                  {{editDialog.editForm.endTime}}
                              </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :span="12">
                              <div >
                                 <span>余额:</span> 
                                  {{editDialog.editForm.balance}}
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div >
                                    <div>
                                    <span>车位类型:</span>
                                    </div>
                                  {{editDialog.editForm.lotType}}
                              </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :span="12">
                              <div >
                                 <SPAN>编号:</SPAN> 
                                  {{editDialog.editForm.id}}
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div >
                              <span>缴费规则分组:</span>  
                                 {{editDialog.editForm.feeRuleGroup}}
                              </div>
                            </el-col>
                        </el-row>
                          <el-row :gutter="20">
                            <el-col :span="12">
                              <div >
                                <div>
                                 <span>卡种类:</span> 
                                </div>
                                {{editDialog.editForm.cardType}}
                              </div>
                            </el-col>
                            
                            
                        </el-row> 
                        <el-row :gutter="20">
                            <el-col :span="8">
                              <div >                             
                               <span> 车位号:</span>  
                              </div>
                              {{editDialog.editForm.lotNo}}
                            </el-col>
                            <el-col :span="8">
                              <div >
                                  <span>车品牌:</span>  
                                  
                              </div>
                              {{editDialog.editForm.carBrand}}
                            </el-col>
                            <el-col :span="8">
                              <div >
                                 <span>车颜色:</span> 
                                  {{editDialog.editForm.carColor}}
                              </div>
                            </el-col>
                          
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                              <div >
                                
                                 <span>押金:</span> 
                            
                                
                                  {{editDialog.editForm.deposit}}
                              </div>
                            </el-col>
                            
                            
                          
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="24">
                              <div >          
                                 <span>备注 :   </span>          
                                  {{editDialog.editForm.memo}}
                              </div>
                            </el-col>
                        </el-row>
                          <el-row :gutter="20">
                            <el-col :span="12">
                              <div >                           
                               <span>所属业主:</span>   
                                  {{editDialog.editForm.owner}}
                              </div>
                            </el-col>
                          

                        </el-row>
                  </el-form>
                  <div v-show="queryShow" slot="footer" class="dialog-footer">
                    <el-button @click.native="editFormVisible = false">返回</el-button>
                    
                  </div>
                  <div v-show="editShow" slot="footer" class="dialog-footer">
                    <el-button @click.native="editFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="editSubmit">保存</el-button>
                  </div>
              </el-dialog>
              

      </div>
  </section>
</template>

<script>
import editdialog from "@/components/carInfo_editForm.vue";
import {
  reqCarInfo, //查询
  reqPlateName, //请求车位池
  reqEdit, //编辑
  reqOwnerName, //请求车主
  reqCarInfoDeleteOne, //单行删除
  reqCarInfoDeleteMore, //批量删除
  outExcelCarInfo //导出
} from "@/api/carManage";
export default {
  data() {
    return {
      noshow: false,
      editShow: false,
      queryShow: false,
      checkBox: [], //选中列表
      totals: {
        currentPage: 1,
        pageSize: 10,
        totalNum: 11
      },
      selects: {
        clientData: configs.plateName, //[{ plate_name: "车位一" }, { plate_name: "车位二" }],
        plateVisible: false,
        plate_pool: "",
        isQuery: "",
        //业主
        owner: "",
        ownerValue: "",
        ownerVisible: false,
        ownerData: [],

        cardTypes: configs.carType,
        carGroup: configs.carGroup,
        plateColor: [],
        feeRuleGroup: [{}], //缴费规则分组
        lotType: [{}]
      },

      editDialog: {
        editFormRules: {
          name: [{ required: true, message: "请输入车牌号", trigger: "blur" }]
        },
        //编辑界面数据
        editForm: {
          park: "",
          carNo: "",
          easyFplateNo: "",
          cardType: "",
          feeType: "",
          carType: "",
          carGroup: "",
          plateColor: "",
          id: "", //编号
          feeRuleGroup: "",
          lotType: "",
          startTime: "",
          endTime: "",
          lotNo: "111",
          carBrand: "", //车品牌
          carColor: "",
          deposit: "", //押金
          balance: "",
          memo: "", //备注
          platePool: ""
        },
        editLoading: false,
        editForm: ""
      },
      editFormVisible: false,

      dt: [
        {
          carNo: "粤A33333",
          park: "1",
          registNo: "粤A88888",
          seatNo: "1518",
          feeType: "月票车",
          carType: "小型车",
          carGroup: "1",
          client: "2",
          phone: "2",
          address: "2",
          vld: "2",
          balance: "$1",
          rolePark: "主车库",
          endRtime: "2018-3-3",
          endCtime: "2018-3-4",
          endEditRerson: "技术部",
          memo: "cs",
          status: "离场",
          vehicleNO: "1",
          lotNo: "111"
        }
      ],
      isopen: false,
      filters: {
        park: "", //停车场编号
        presenceStatus: "", //在场状态
        isOverdue: "", //是否过期
        // v_vld: "",
        startDate: "", //有效期结束时间
        endDate: "", //有效期开始时间
        priceType: "", //计费类型
        carType: "", //车类型
        carGroup: "", //车辆分组
        parkingType: "", //车位类型
        payRuleGroup: "", //缴费规则分组
        garage: "", //所属车库
        admin: "", //管理员
        plateValue: "", //所属车位池

        carNo: "", //车牌号
        plateNo: "", //车位号
        registNo: "", //注册号
        carOwner: "", //车主
        phone: "" //手机号
      },

      querySels: {
        priceType: configs.chargeType,
        carType: configs.carType,
        carGroup: configs.carGroup,
        parkingType: configs.plateType,
        payRuleGroup: configs.payRuleGroup,
        garage: configs.garage,
        admin: [],
        park: [],
        presenceStatus: configs.presenceStatus,
        isoverdue: configs.isOverdue,
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
      this.$confirm("此操作将导出excel文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          outExcelCarInfo(para).then(res => {
            if (res.code === 1) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
            }
          });
          // this.excelData = this.dataList //你要导出的数据list。
        })
        .catch(() => {});
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
          let para = { vehicleNO: vehicleNOs };
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
      var vehicleNOs = this.checkBox.map(item => item.vehicleNO).toString();
      this.$confirm("确认删除该记录吗？", "提示", {
        type: "warning"
      }).then(() => {
        this.listLoading = true;
        //NProgress.start();
        let para = { vehicleNO: row.vehicleNO };
        para.jwt = window.localStorage.getItem("jwt");
        reqCarInfoDeleteOne(para)
          .then(res => {
            if (res.code === 1) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
            }
            this.listLoading = false;
            //NProgress.done();

            this.getCarinfo();
          })
          .catch(() => {
            alert("111");
          });
      });
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
              if (res.code === 1) {
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
        this.filters.plateValue = row.plate_name;
      } else if (this.selects.isQuery === "edit") {
        this.editDialog.editForm.plate_pool = row.plate_name;
      }
    },
    //单击选中业主信息
    ownerConfin(row, column) {
      this.selects.ownerVisible = false;
      console.log(row.owner_name);
      this.editDialog.editForm.owner = row.owner_name;
      console.log(this.selects.ownerValue);
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
      let para = {
        parkNo: this.filters.park,
        presence: this.filters.presenceStatus,
        chargeType: this.filters.priceType,
        licensePlate: this.filters.carNo,
        registerNo: this.filters.registNo,
        carOwner: this.filters.carownerName,
        telephone: this.filters.phone,
        remark: this.filters.memo,
        admin: this.filters.admin,
        isExpire: this.filters.isOverdue
        // type:this.filters.start_date,
      };
      para.currentPage = this.totals.currentPage; //当前页
      para.pageSize = this.totals.pageSize;
      para.jwt = window.localStorage.getItem("jwt");
      reqCarInfo(para)
        .then(res => {
          if (res.code === 1) {
            var list = eval(res).list;
            var dt = this.dt;
            dt.car_no = list.licensePlate;
            dt.fee_type = list.chargeType;
            dt.address = list.address;
            dt.parkNo = list.parkNo;
            dt.regist_no = list.registerNo;
            dt.client = list.carownerName;
            dt.status = list.presence;
            dt.phone = list.telephone;
            dt.vld = list.type;
            // dt.admin=list.admin;
            dt.memo = list.remark;
            this.totals.totalNum = eval(res).totalNum;
          } else {
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
      this.editDialog.editForm = Object.assign({}, row);
      this.editShow = true;
      this.queryShow = false;
      console.log("zlz");
    },
    handlequery: function(index, row) {
      this.editFormVisible = true;
      console.log(row);
      this.editDialog.editForm = Object.assign({}, row);
      this.editShow = false;
      this.queryShow = true;
      console.log("zlz");
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.totals.currentPage = val;
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
.editBtn {
  padding: 5px;
  background-color: #1a72c1;
  color: #fff;
  border-radius: 5px;
}
.deleteBtn {
  padding: 5px;
  background-color: #d9534f;
  color: #fff;
  border-radius: 5px;
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
.form-inline span {
  font-size: 12px;
}
 queryFont .el-row {
  height: 30px 
  !important;
}
.queryFont span {
  font-weight: bold;
}
</style>style>