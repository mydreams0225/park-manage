<template>
	<section>
	 <div class="parent">
    <template >
       <el-tabs :tab-position="tabPosition" style="margin-top:15px" type="border-card" >
        <el-tab-pane  label="新车登记注册">
          <!-- 读卡操作 -->
           <div class="margin-tops">
             <el-row :gutter="20">
              <el-col :span="6">
                <div >
                <span style="color:red">*</span>
                <span >所属停车场：</span>
                <template>
                  <el-select v-model="tab1.park" placeholder="请选择">
                    <el-option
                      v-for="item in sels.park"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </div>
             </el-col>
              <el-col :span="6"><div >
                <template>
                     <!-- `checked` 为 true 或 false -->
                  <el-checkbox  v-model="tab1.readCard" :checked="tab1.readCard">开启读卡操作</el-checkbox>
                </template>
              </div>
            </el-col>
            </el-row>
          </div>
           
           <!-- 授权车库 -->
           <div class="newCar">
             <el-card class="box-card" >
              <div slot="header" class="clearfix" >
                <span >授权车库</span>
               
              </div>
              <div class="sq_body">
                <el-checkbox checked="checked" >主车库</el-checkbox>
              </div>
            </el-card>
           </div>
          <div class="newCar carinfo">
             <el-card class="box-card" >
              <div slot="header" class="clearfix" >
                <span >录入车辆信息</span>
               
              </div>
              <div >
               <el-row :gutter="24">
                  <el-col :span="4">
                    <div >
                     <span style="color:red;">*</span>
                     <span>车牌号码：</span>
                      <span v-show="valid.carNo"><font style="color:red"> 注册号和车牌号必须输入一个</font></span>
                     <el-input @change="carNoChange" v-model="tab1.carNo" placeholder="请输入车牌号" ></el-input>
                  </div>
                </el-col>
                  <el-col :span="6">
                    <div >
                    <span style="color:red;">*</span>
                     <span>注册号</span>
                     <el-checkbox  @change="sameCarNo" v-model="tab1.checkCarNo"  style="font-size:12px;">与车牌号一样</el-checkbox>
                     <el-input v-model="tab1.registNo" :disabled="tab1.registDisable" ></el-input>
                  </div>
                </el-col>
                  <el-col :span="4">
                    <div >
                      <span style="color:red;">*</span>
                     <span>计费类型：</span>
                     <el-select v-model="tab1.priceType" placeholder="请选择">
                      <el-option
                        v-for="item in sels.priceType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div >
                      <span style="color:red;">*</span>
                     <span>车类型：</span>
                     <el-select v-model="tab1.carType" placeholder="请选择">
                      <el-option
                        v-for="item in sels.carType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div >
                    <span style="color:red;">*</span>
                     <span>缴费规则分组：</span>
                     <el-select v-model="tab1.payRuleGroup" placeholder="请选择">
                      <el-option
                        v-for="item in sels.payRuleGroup"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div >
                   <el-row :gutter="24">
                      <el-col :span="4">
                        <div >
                         <span>容错车牌</span>
                         <el-input v-model="tab1.errorCar" placeholder="请输入内容" ></el-input>
                       </div>
                    </el-col>
                      <el-col :span="4">
                        <div >
                       
                         <span>车牌颜色</span>
                         
                          <el-select v-model="tab1.plateColor" placeholder="请选择">
                          <el-option
                            v-for="item in sels.plateColor"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </el-col>
                      <el-col :span="4">
                        <div >
                         <span>车位类型：</span>
                         <el-select v-model="tab1.seatType" placeholder="请选择">
                          <el-option
                            v-for="item in sels.seatType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        </div>
                      </el-col>
                      <el-col :span="4">
                        <div >
                        
                         <span>车辆分组：</span>
                         <el-select v-model="tab1.carGroup" placeholder="请选择">
                          <el-option
                            v-for="item in sels.carGroup"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        </div>
                      </el-col>
                      <el-col :span="4">
                        <div >
                        
                         <span>车位号：</span>
                         <el-input  v-model="tab1.plateNo"></el-input>
                        </div>
                      </el-col>
                      <el-col :span="4">
                        <div >
                       
                         <span>编号</span>
                         <el-input v-model="tab1.id" ></el-input>
                        </div>
                      </el-col>
                    </el-row>
              </div>
               <div class="newcardate">
                    <el-row :gutter="24">
                          <el-col :span="12">
                            <div >
                             <span>有效期开始时间</span>
                            <el-date-picker
                                v-model="tab1.startDate"
                                type="date"
                                placeholder="">
                              </el-date-picker>
                           </div>
                        </el-col>
                        <el-col :span="12">
                          <div >
                         
                           <span>有效期结束时间</span>
                           
                           <el-date-picker
                                v-model="tab1.endDate"
                                type="date"
                                placeholder="">
                              </el-date-picker>
                        </div>
                      </el-col>
                     
                    </el-row>
               </div>
               <div >
                    <el-row :gutter="24">
                          <el-col :span="8">
                            <div >
                             <span>车品牌：</span>
                             <el-input v-model="tab1.carLogo" ></el-input>
                           </div>
                        </el-col>
                        <el-col :span="8">
                          <div >
                         
                           <span>车颜色：</span>
                           <el-input  v-model="tab1.carColor"></el-input>
                           
                        </div>
                      </el-col>
                     <el-col :span="8">
                          <div >
                         
                           <span>收费：</span>
                           <el-input  v-model="tab1.fee">￥1</el-input>
                           
                        </div>
                      </el-col>
                    </el-row>
               </div>
               <div class="memo">
                    <el-row :gutter="24">
                          <el-col :span="24">
                            <div >
                             <span>备注：</span>
                             <el-input v-model="tab1.memo" placeholder="选填" ></el-input>
                           </div>
                        </el-col>
                        
                    </el-row>
               </div>
               <div class="memo sshy">
                    <el-row :gutter="24">
                          <el-col :span="12">
                            <div >
                             <span>所属业主：（点击选择，x清除）[点击添加业主信息]</span>
                             <el-input :value="tab1.carOwnerValue" v-on:click.native="carOwnerVisible = true"  placeholder="点击选择" readonly="readonly" ></el-input>
                                 <el-dialog title="选择所属业主"  :visible.sync="carOwnerVisible" width="550px" >
                                        <form class="plate_poolSearch">
                                          <el-input   id="plate_pool" name="plate_pool" placeholder="名称" value="" >
                                          <template slot="prepend">名称</template>   
                                          </el-input>
                                        
                                          <el-button size="medium" type="primary" icon="el-icon-search" >查询</el-button>
                                        </form>
                                        <el-table :data="carOwnerData" @row-click="carOwnerCheck" ref="clientTable">
                                          <el-table-column property="carOwner_name" label="" ></el-table-column>
                                        </el-table>
                            </el-dialog>
                           </div>
                        </el-col>
                         <el-col :span="12">
                            <div >
                             <span>所属车位池：（点击选择，x清除）</span>
                             <el-input :value="tab1.plate_value" v-on:click.native="dialogTableVisible = true" placeholder="点击选择" readonly="readonly" ></el-input>
                             <el-dialog title="选择所属车位池"  :visible.sync="dialogTableVisible" width="550px" >
                                        <form class="plate_poolSearch">
                                          <el-input   id="plate_pool" name="plate_pool" placeholder="名称" value="" >
                                          <template slot="prepend">名称</template>   
                                          </el-input>
                                        
                                          <el-button size="medium" type="primary" icon="el-icon-search" >查询</el-button>
                                        </form>
                                        <el-table :data="clientData" @row-click="clientCheck" ref="clientTable">
                                          <el-table-column property="plate_name" label="" ></el-table-column>
                                        </el-table>
                            </el-dialog>
                           </div>
                        </el-col>
                    </el-row>
               </div>
               <div class="submit">
                    <el-button type="primary" @click.native="addSubmit" >保存</el-button> 
               </div>
            </el-card>
           </div>
        </el-tab-pane>
        <el-tab-pane label="批量导入">
          <!-- 所属停车场 -->
           <div class="font" style="margin-top:15px">
              <el-row :gutter="20">
                <el-col :span="6">
                  <div >
                  <span style="color:red">*</span>
                  <span >所属停车场：</span>
                 
                  <template>
                    <el-select v-model="v_tab2_park" placeholder="请选择">
                      <el-option
                        v-for="item in sels.park"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </div>
               </el-col>
            </el-row>
           </div>
           <div class="font upload" style="margin-top:30px">
            <input type="file" id="upLoad"  style="display:none" @change="fn()" @click="fn">
             <a href="#" @click="go()" ><strong ><i class="el-icon-document" ></i> 选择批量导入Excel文件...</strong></a>{{file.name}}
             <div style="margin-top:15px">
               <el-button size="small" type="primary" @click="submitForm($event)"><i class="el-icon-upload2"></i>上传并保存</el-button>
               <el-button size="small" type="primary"><i class="el-icon-download"></i>下载模板</el-button>
             </div>
           </div>
        </el-tab-pane>
      
      </el-tabs>
    </template>
   </div>
	</section>
</template>

<script>
import $axios from "axios";
import { postFile ,reqEdit} from "@/api/carManage";
export default {
  data() {
    return {
      clientData: [{ plate_name: "车位一" }, { plate_name: "车位二" }],
      dialogTableVisible: false,
      carOwnerVisible: false,
      carOwnerData: [{ carOwner_name: "业主1" }, { carOwner_name: "业主2" }],
      valid:{
        car_no:false
      },
      tab1: {
        readCard: false,
        park: "",
        carNo: "",
        registNo:"",
        endDate: "",
        startDate: "",
        priType: "",
        carType: "",
        payRuleGroup: "",
        platColor: "",
        seatType: "",
        carGroup: "",
        errorCar: "",
        plateNo: "",
        id: "",
        carLogo: "",
        carColor: "",
        fee: "",
        carOwnerValue: "",
        memo: "",
        plateValue: "",
        checkCarNo:true,
        registDisable:true
      },
      tabPosition: "top",
      sels:{
          priceType:configs.chargeType,
          carType: configs.carType,
          payRuleGroup: [{value:"1",label:"3"}],
          park:[],//停车场
          plateColor: [{}],
          seatType: [{}],
          carGroup: [{}],
      },
      
      file: {
        name: ""
      },
      
      v_tab2_park: "",
      tab2_park: [
        {
          value: "选项1",
          label: "停车场一"
        }
      ]
    };
  },
  created(){
    this.getParkList();
  },

  methods: {
    carNoChange(value){
     var checkBox= this.tab1.checkCarNo;
      if(checkBox==true){
       this.tab1.registNo=this.tab1.carNo;
     }
    },
    sameCarNo(val){
      if(!val){
       
        this.tab1.registDisable=false;
      }else{
        this.tab1.registDisable=true;
      }
        
    },
     getParkList() {
      var _this = this;
      var userInfo = window.localStorage.getItem("user");

      var parks = [
        {
          parkName: "林芝停车场",
          parkNo: "1",
          entryPassway: "林芝入口通道1-林芝入口通道2"
          // entrychildren : [{  },{  }],
          // outChildren:[{},{}]
        },
        {
          parkName: "正佳停车场",
          parkNo: "2",
          entryPassway: "正佳入口通道"
        }
      ];
      
      // if (typeof JSON.parse(userInfo)["parks"]  == "object") {
       parks.forEach(item => {
          var park1 = {
            value: item["parkNo"],
            label: item["parkName"],
            entryPassway: item["entryPassway"],
            outPassway: item["outPassway"]
          };
          _this.sels.park.push(park1);
          console.log(_this.park);
        });
      // }
    },
    valids(){
      var tab1=this.tab1;
      if(tab1.carNo===""){
         this.valid.carNo=true;
         return false;
      }else{
        alert('dd')
        return true;
      }
    },
    addSubmit(){
        if(this.valids()){      
      	this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
              let para={
                licensePlate:this.tab1.carNo,
                registerNo:this.tab1.carNo,
                licenseColor:this.tab1.plateColor,//车位颜色
                carColor:this.tab1.carColor,
                // telephone:this.tab1.telephone,
                parkingType:this.tab1.seatType,
               chargeType:this.tab1.priceType,
               effectiveStart:this.tab1.startDate,
               remark:this.tab1.memo,
               vehicleType:this.tab1.carType,
               effectiveEnd:this.tab1.endDate,
               parkNo:this.tab1.park,
               vehicleBrand:this.tab1.carLogo
              }
               para.jwt = window.localStorage.getItem("jwt");
							// para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							reqEdit(para).then((res) => {
                this.editLoading = false;
                if(res.code===1){
                  	//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
                }
							
								
								this.editFormVisible = false;
                this.getCarinfo();
							});
						});
    }
    },
    go() {
      var upLoad = document.getElementById("upLoad");
      upLoad.click();
    },

    fn() {
      this.file = event.target.files[0];
      console.log(this.file);
      if (event.type == "change") {
        var req = /xlsx|.xls$/g;
        if (this.file.name && !req.exec(this.file.name)) {
          alert("请上传xlsx或xls后缀的Excel");
        }
      }

      //   var req=/xlsx|.xls$/g;
      // if( this.file.name && !req.exec(this.file.name)){
      //    alert('请上传xlsx或xls后缀的Excel')
      // }
    },

    clientCheck(row, column) {
      this.dialogFormVisible = false;
      this.dialogTableVisible = false;
      console.log("zlz");
      this.tab1.plateValue = row.plateName;
      // console.log(column)
    },
    carOwnerCheck(row, column) {
      this.dialogFormVisible = false;
      this.carOwnerVisible = false;
      console.log("zlz");
      this.tab1.carOwnerValue = row.carOwnerName;
      // console.log(column)
    },
    getFile(event) {
      this.file = event.target.files[0];
      console.log(this.file);
    },
    submitForm(event) {
      event.preventDefault();
      // let formData = new FormData();
      let formData = new URLSearchParams();
      formData.append("name", this.sels.park[0].label);

      formData.append("file", this.file);

      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      console.log(formData);
      postFile(formData).then(data => {
        //this.$axios.post('', formData, config).then(function (res) {
        console.log(res);
        if (res.status === 200) {
          /*这里做处理*/
        }
      });
      // getParklist(para).then((res) => {
      //       // this.$axios.get('../../static/json/park.json',{ para: para }).then((res) => {
      //          //本地写法
      //          this.parkList = (eval(res)).data;
      //         this.totalnum=(eval(res)).total;
      //         //请求后端写法
      //            // this.parkList = res;
      //         //this.totalnum=(eval(res)).total;
      //         console.log("fff"+res)

      //        this.listLoading = false;
      //         //NProgress.done();
      // });
    }
  }
};
</script>

<style scoped>
.sq_body {
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
}
.carinfo {
  font-size: 12px;
}
.memo .el-input {
  width: 100%;
}
.font {
  font-size: 12px;
}
</style>