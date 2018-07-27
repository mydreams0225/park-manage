<template>
	<section>
     <div class="parent">
        <!-- 操作区 -->
       <div class="margin-tops">
         <!-- <el-button  type="danger" icon="el-icon-delete" size="medium" @click="handleDel()">删除</el-button>
         <el-button  type="danger" icon="el-icon-delete" size="medium" @click="handleDel()">删除查询到的记录</el-button> -->
         <el-button  icon="el-icon-circle-check-outline" size="medium" @click="updateStall">根据在场车辆数纠正空车位数</el-button>
         <div class="fr">
           <el-button  icon="el-icon-upload2" type="primary" size="medium"  @click="imports()">批量导入</el-button>
           <el-button  icon="el-icon-upload" type="success" size="medium" @click="outExe()">导出EXCEL报表</el-button>
         </div>
       </div>
       <!-- 查询区 -->
       <div class="margin-tops querys">
         <form :model="filters" class="form-inline" role="form" id="searchForm" name="searchForm" onsubmit="subSearchForm();return false;">
           <span>所属停车场</span>
           <el-select v-model="filters.v_park" filterable placeholder="所属停车场">
                    <el-option
                      v-for="item in park"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
           </el-select>
           <el-input id="s_car_no" name="s_car_no" placeholder="车牌号" v-model="filters.car_no">
                   <template slot="prepend">车牌号</template>   
           </el-input>
           <el-input id="s_regist_no" name="s_regist_no" placeholder="注册号" v-model="filters.regist_no">
                   <template slot="prepend">注册号</template>   
           </el-input>
           <span>计费类型</span>
            <el-select v-model="filters.v_price_type" filterable placeholder="计费类型">
                    <el-option
                      v-for="item in querySels.price_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
           </el-select>
           <span>车类型</span>
           <el-select v-model="filters.v_car_type" filterable placeholder="车类型">
                    <el-option
                      v-for="item in querySels.car_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
           </el-select>
           <div class="dates block">
                    <span class="demonstration">入场时间从</span>
                    <el-date-picker
                      v-model="filters.start_value"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
                   <div class="dates block">
                    <span class="demonstration">到</span>
                    <el-date-picker
                      v-model="filters.end_value"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
           </div>
           <span>所属车库</span>
           <el-select v-model="filters.v_garage" filterable placeholder="所属车库">
                    <el-option
                      v-for="item in querySels.garage"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
           </el-select>
           <span>是否有车牌</span>
           <el-select v-model="filters.v_isplate" filterable placeholder="是否有车牌">
                    <el-option
                      v-for="item in querySels.isplate"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
           </el-select>
           <el-input  :value="filters.plate_value" id="plate_pool" name="plate_pool" placeholder="点击选择" readonly="readonly" v-on:click.native="dialogTableVisible = true">
                  <template slot="prepend">所属车位池</template>   
           </el-input>
           <el-dialog title="选择所属车位池" :visible.sync="dialogTableVisible" width="550px" >
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
           <el-select v-model="filters.v_plateRelia" filterable placeholder="车牌可信度">
                    <el-option
                      v-for="item in querySels.plateRelia"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
           </el-select>
           <el-button type="primary" icon="el-icon-search" size="medium" v-on:click="getAttendCar" >查询</el-button>
           <el-button icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')" size="medium">清除</el-button>
         </form>
       </div>
       <!-- 数据展示区 -->
       <div> 
          <el-row >
             <el-col :span="6" v-for="(item ,index) in carlist" :key=index>
               <el-card  class="fatherImg">
                  <div><el-checkbox @click.native="selsChange(index,item)"></el-checkbox></div>
                  <div class="rf">
                    <a href="#" title="编辑" @click="handleEdit(index, item)"><i class="el-icon-edit"></i></a> 
                    <!-- <a href="#" title="删除" @click="handleDel(index, item)"><i class="el-icon-delete"></i></a> -->
                  </div>
                  <div> 
                      <img :src="item.url" class="image" alt="拍照失败">
                  </div>
                  
                  <div class="info">
                     <p class="l">{{item.car_no}}  <span style="color:rgba(255,255,255,0.6)" >(   {{item.car_type}})</span></p>
                     <p class="r">{{item.entry_time}} {{item.desc}}</p>
                     <span >{{item.flowId}}</span>
                     <span>{{item.park_no}}</span>
                  </div>
               </el-card>
             </el-col>
          </el-row>
       </div>
       <!-- 展示区end -->
      <!--  分页 -->
      <div >
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
    <el-dialog class="diaCommon" title="纠正车牌号" v-model="editFormVisible" :close-on-click-modal="false" :visible="editFormVisible"  width="800px">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm" >
          <el-row :gutter="24">
            <el-col :span="14">
              <div class="grid-content ">
                  <div>
                    <div>
                      <div class="ts">点击图片查看大图</div>
                      <div class="imgBox">
                        <ul><li><a href="#"> <img  :src="editForm.url" /> </a></li></ul>
                      </div>
                      <div class="ts">提示：纠正车牌号之后，对之前车牌的车辆进出会有一定的影响，请谨慎使用</div>
                    </div> 
                  </div>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content ">
                <div>
                  <div>
                        <div>
                            <div >当前车牌号：{{editForm.car_no}}</div>
                            
                        </div>
                      <div class="jzcar_no"> 
                          <div style="display:inline-block;width: 70%;">纠正车牌号：<el-input  v-model="editForm.editCar_no" >  
                            </el-input></div>
                          <div >
                            
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
    
    </div>
	</section>
</template>

<script>
// import { constantRouterMap } from "@/router";
import { requestAttendCar1, requestAttendCar,requestAttendCarEdit,requestAttendCarODelete1 ,reqUpdateStall} from "@/api/api";
export default {
   data() {
    return {
      sels:[],
      clientData: [{ plate_name: "车位一" }, { plate_name: "车位二" }],
      dialogTableVisible: false,
      editFormRules: {
        name: [{ required: true, message: "请输入车牌号", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        desc: "22",
        url: "",
        car_no: "",
        editCar_no:""
      },
      //删除数据格式
      deleteForm:{
      },

      editLoading: false,
      editFormVisible: false,
      editForm: "",
      carlist: [
        {
           url: "../../static/img/car.jpg",
          car_no: "粤A9M33",
          entry_time:"2018--3-3 4：13:4",
          desc: "停车·",
          flowId:"1",
          car_type:"临时车",
          park_no:"1"
        },
        {
          url: "../../static/img/car.jpg",
          car_no: "赣A8888",
          desc: "2018--3-3 4：13:4停车·"
        },
        {
          url: "../../static/img/car.jpg",
          car_no: "赣F6666"
        }
      ],
      totals: {
        currentPage: 1,
        pageSize: 10,
        totalNum: 10
      },

      checked: false,
      currentDate: new Date(),
      park: [],
      filters: {
        plate_value: "",
        v_park: "111",
        v_price_type: "", // 计费类型
        //车类型
        v_car_type: "",
        start_value: "",
        end_value: "",
        //车库
        v_garage: "",
        v_isplate: "",
        v_plateRelia: "",
        car_no: "",
        regist_no: ""
      },
       querySels:{
              price_type: configs.chargeType,
              car_type: configs.carType,
              garage: [
                {
                  value: "",
                  label: "所属车库"
                },
                {
                  value: "1",
                  label: "所属车库1"
                }
              ],
              isplate: configs.isplate,
              plateRelia:configs.plateRelia
       },
     
    };
  },
  created(){
    this.getParkList();
  },
  methods: {
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
      alert( JSON.parse(userInfo)["parks"] )
      if (typeof JSON.parse(userInfo)["parks"]  == "object") {
        JSON.parse(userInfo)["parks"]  .forEach(item => {
          var park1 = {
            value: item["parkNo"],
            label: item["parkName"],
            entryPassway: item["entryPassway"],
            outPassway: item["outPassway"]
          };
          _this.park.push(park1);
          console.log(_this.park);
        });
      }
    },
    updateStall(){
      let para={
        parkNo:this.filters.v_park,
        jwt:window.localStorage.getItem("jwt")
      }
      reqUpdateStall(para).then(res=>{
        if(res.code===1){
            
        }
      })
    },
    imports(){
      this.$router.push({ path: "/import" })
    },
    // 导出excel
    outExe() {
                this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // this.excelData = this.dataList //你要导出的数据list。
                    
                }).catch(() => {
                
                });
            },
            
    selsChange: function (index,row) {
         this.sels.push(row.url) ;
        console.log(row);
        console.log(this.sels);
        var s = [];
        //遍历数组
        for(var i = 0,len=this.sels.length;i<len;i++){
            if(s.indexOf(this.sels[i]) == -1){  //判断在s数组中是否存在，不存在则push到s数组中
                s.push(this.sels[i]);
            }
        }
        console.log(s);
        return false
			},
    getAttendCar() {
      console.log("getAttendCar");
      let para = {
        // plate_value: this.filters.plate_value, //车位池
        park: this.filters.v_park, //停车场
        price_type: this.filters.v_price_type, // 计费类型
        car_type: this.filters.v_car_type, //车类型
        start_timeF: this.filters.start_value, //入场时间从
        end_timeT: this.filters.end_value, //入场时间到
        garage: this.filters.v_garage, //车库
        isplate: this.filters.v_isplate, //是否有车牌
        plateRelia: this.filters.v_plateRelia, //车牌可信度
        car_no: this.filters.car_no, //车牌号
        regist_no: this.filters.regist_no, //注册号
        currentPage: this.totals.currentPage, //当前页
        pageSize: this.totals.pageSize, //每页显示条数
        jwt:window.localStorage.getItem("jwt")
      };
      
      requestAttendCar(para).then(res => {
        // this.$axios.get('../../static/json/park.json',{ para: para }).then((res) => {
        //本地写法
        if(res.code===1){
              var list= eval(res).flowList;
              var dt=this.carlist;
              //  {
              //   url: "../../static/img/car.jpg",
              //   car_no: "粤A9M33",
              //   entry_time:"2018--3-3 4：13:4",
              //   desc: "停车·",
              //   car_type:"临时车"
              // },
              dt.url=list.url;
              dt.car_no=list.licensePlate;
              dt.entry_time=list.enterDate;
              // dt.desc=list.desc;
              // dt.car_type=list.car_type;
              this.totals.totalNum = eval(res).totalNum;
        }else{
              alert("暂无数据")
        }
        
        //请求后端写法
        // this.parkList = res;
        //this.totalnum=(eval(res)).total;
        console.log("fff" + res);
        this.listLoading = false;
        //NProgress.done();
      });
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      console.log("显示编辑界面");
      console.log(row);
    },
    //提交编辑
    editSubmit: function() {
      
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            // let para = Object.assign({}, this.editForm);
            var para={
              desc:this.editForm.desc,
              url:this.editForm.url,
              UfLicenseplate:this.editForm.car_no,
              licensePlate:this.editForm.editCar_no,
              flowId:this.editForm.flowId,
              parkNo:this.editForm.park_no
              // currentPage:this.totals.currentPage,
              // pageSize:this.totals.pageSize
            };
         var user=   window.localStorage.getItem("user");
           para.admin=JSON.parse(user).username
            // para.
             //编辑界面数据
              // editForm: {
              //   desc: "22",
              //   url: "",
              //   car_no: "",
              //   editCar_no:""
              // },
              para.jwt=window.localStorage.getItem("jwt");

            // para.birth =
            //   !para.birth || para.birth == ""
            //     ? ""
            //     : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
           
            requestAttendCarEdit(para).then((res) => {
              if(res.code===1){
                 this.$message({
                message: '提交成功',
                type: 'success'
              });
              }
              this.editLoading = false;
              //NProgress.done();
             
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.getAttendCar();
            });
          });
        }
      });
    },
    //删除
    // handleDel: function(index, row) {
    //   this.$confirm("确认删除该记录吗?", "提示", {
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.listLoading = true;
    //       //NProgress.start();
    //       // let para = { id: row.id };
    //       let para = Object.assign({}, row);
         
    //       requestAttendCarODelete1(para).then((res) => {
    //         this.listLoading = false;
    //         //NProgress.done();
    //         this.$message({
    //           message: '删除成功',
    //           type: 'success'
    //         });
    //         this.getAttendCar();
    //       });
    //     })
    //     .catch(() => {});
    // },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.totals.currentPage = val;
      this.getAttendCar();
      console.log(`当前页: ${val}`);
    },
    callbackSelTenant: function() {
      // var aa = document.getElementsByTagName("input");
      // console.log(aa);
      // for (var i = 0; i < aa.length; i++) {
      //   if (aa[i].type == "text") {
      //     aa[i].value = "";
      //   }
      // }
      for (var item in this.filters) {
        console.log(item);
        if (typeof this.filters[item] == "object") {
          this.filters[item] = [];
        } else {
          this.filters[item] = "";
        }
      }
    },
    clientCheck(row, column) {
      this.dialogFormVisible = false;
      this.dialogTableVisible = false;
      console.log("zlz");
      this.filters.plate_value = row.plate_name;
      // console.log(column)
    }
  },
  mounted() {
    this.getAttendCar();
  },
  created(){
    let data = JSON.parse(window.localStorage.getItem("user"));
    var arr=data.userParkInfos;

    // arr.forEach(item => {
    //   //  this.park.value
     
    // });
  },
 
};
</script>

<style scoped>
.el-card{
  height: 150px;
}
.fatherImg .el-card__body{
  height: 150px;
}
.querys span{
  font-size: 12px;
}
ul > li {
  list-style: none;
}
.ts {
  font-size: 12px;
  margin: 10px 0px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.fr {
  float: right;
}

.el-input-group {
  width: 200px;
}
.el-select {
  width: 130px;
}

.form-inline {
  margin-top: 15px;
}
.dates {
  display: inline-block;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 12px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}
/* .fatherImg {
  min-height:167px;
} */
.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.el-col-6 {
  padding: 10px;
  position: relative;
}
.el-card__body .el-checkbox {
  position: absolute;
  top: 15px;
  left: 15px;
}
.rf i {
  position: absolute;
  top: 15px;
  right: 44px;
  border: 1px solid #428bca;
  background-color: #428bca;
  color: #fff;
  border-radius: 5px;
  padding: 3px;
}
.rf .el-icon-delete {
  position: absolute;
  top: 15px;
  right: 15px;
  border: 1px solid #d9534f;
  background-color: #d9534f;
}

.info {
  width: 100%;
  background-color: rgb(0, 0, 0, 0.8);
  color: #fff;
  font-size: 12px;
  position: absolute;
  height: 25px;
  bottom: 0;
  left: 0;
  /* padding: 5px; */
  /* margin:5px; */
}
.info .r {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 5px ;
}
.info .l {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 5px ;
}
.el-card__body {
  padding: 0 !important;
}
</style>