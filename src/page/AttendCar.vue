<template>
	<section>
     <div class="parent">
        <!-- 操作区 -->
       <div class="margin-tops">
         <!-- <el-button  type="danger" icon="el-icon-delete" size="medium" @click="handleDel()">删除</el-button>
         <el-button  type="danger" icon="el-icon-delete" size="medium" @click="handleDel()">删除查询到的记录</el-button> -->
         <el-button  icon="el-icon-circle-check-outline" size="medium" @click="updatestall">根据在场车辆数纠正空车位数</el-button>
         <div class="fr">
           <el-button  icon="el-icon-upload2" type="primary" size="medium"  @click="imports()">批量导入</el-button>
           <el-button  icon="el-icon-upload" type="success" size="medium" @click="outexe()">导出EXCEL报表</el-button>
         </div>
       </div>
       <!-- 查询区 -->
       <div class="margin-tops querys">
         <form :model="filters" class="form-inline" role="form" id="searchForm" name="searchForm" onsubmit="subSearchForm();return false;">
           <span>所属停车场</span>
           <el-select v-model="filters.park" filterable placeholder="所属停车场">
                    <el-option
                      v-for="item in park"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
           </el-select>
           <el-input id="s_car_no" name="s_car_no" placeholder="车牌号" v-model="filters.carNo">
                   <template slot="prepend">车牌号</template>   
           </el-input>
           <el-input id="s_regist_no" name="s_regist_no" placeholder="注册号" v-model="filters.registNo">
                   <template slot="prepend">注册号</template>   
           </el-input>
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
                      v-for="item in querySels.carType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
           </el-select>
           <div class="dates block">
                    <span class="demonstration">入场时间从</span>
                    <el-date-picker
                      v-model="filters.startValue"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
                   <div class="dates block">
                    <span class="demonstration">到</span>
                    <el-date-picker
                      v-model="filters.endValue"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
           </div>
           <span>所属车库</span>
           <el-select v-model="filters.garage" filterable placeholder="所属车库">
                    <el-option
                      v-for="item in querySels.garage"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
           </el-select>
           <span>是否有车牌</span>
           <el-select v-model="filters.isplate" filterable placeholder="是否有车牌">
                    <el-option
                      v-for="item in querySels.isplate"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
           </el-select>
           <el-input  :value="filters.plateValue" id="plate_pool" name="plate_pool" placeholder="点击选择" readonly="readonly" v-on:click.native="dialogTableVisible = true">
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
           <el-select v-model="filters.plateRelia" filterable placeholder="车牌可信度">
                    <el-option
                      v-for="item in querySels.plateRelia"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
           </el-select>
           <el-button type="primary" icon="el-icon-search" size="medium" v-on:click="getattendcar" >查询</el-button>
           <el-button icon="el-icon-delete" v-on:click="callbackseltenant(null,'')" size="medium">清除</el-button>
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
                  <div class="showImgBox"> 
                      <img :src="item.url" class="image" alt="图片加载失败">
                  </div>
                  
                  <div class="info">
                     <p class="l">{{item.carNo}}  <span style="color:rgba(255,255,255,0.6)" >(   {{item.carType}})</span></p>
                     <p class="r">{{item.entryTime}} {{item.desc}}</p>
                     <span style="display:none">{{item.flowId}}</span>
                     <span style="display:none">{{item.parkNo}}</span>
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
    <el-dialog class="diaCommon" title="纠正车牌号" v-model="editFormVisible" :close-on-click-modal="true" :visible.sync="editFormVisible"  width="800px">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm" >
          <el-row :gutter="24">
            <el-col :span="14">
              <div class="grid-content ">
                  <div>
                    <div>
                      <div class="ts">点击图片查看大图</div>
                      <div class="imgBox">
                        <ul><li><a href="#"> <img  :src="editForm.url" alt="图片加载失败"/> </a></li></ul>
                      </div>
                      <div class="ts">提示：纠正车牌号之后，对之前车牌的车辆进出会有一定的影响，请谨慎使用</div>
                    </div> 
                  </div>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content ">
                <!-- <div>
                  <div> -->
                        <div>
                          <el-form-item  label="当前车牌：" label-width="120px">
                                  {{editForm.carNo}}
                                </el-form-item>
                            <!-- <div > 当前车牌：{{editForm.carNo}}</div> -->
                        </div>
                        <div class="jzcar_no" > 
                                <el-form-item prop="editCarNo" label="纠正车牌：" label-width="120px">
                                 
                                  <el-input v-model="editForm.editCarNo" ></el-input>
                                </el-form-item>
                          <!-- <div style="display:inline-block;width: 70%;">纠正车牌号：<el-input  v-model="editForm.editCarNo" >  
                            </el-input></div> -->
                          <div >
                    <!-- </div>
                 </div> -->
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit('editForm')" :loading="editLoading">保存</el-button>
      </div>
    </el-dialog>
    </div>
	</section>
</template>

<script>
// import { constantRouterMap } from "@/router";
import {
  requestAttendCar1,
  requestAttendCar,
  requestAttendCarEdit,
  requestAttendCarODelete1,
  reqUpdateStall
} from "@/api/api";
export default {
  data() {
    return {
      sels: [],
      clientData: configs.plateName,
      dialogTableVisible: false,
      editFormRules: {
        editCarNo: [
          { required: true, message: "请输入车牌号", trigger: "blur" }
        ]
      },
      //编辑界面数据
      editForm: {
        desc: "22",
        url: "",
        carNo: "",
        editCarNo: ""
      },
      //删除数据格式
      deleteForm: {},
      editLoading: false,
      editFormVisible: false,
      editForm: "",
      carlist: [
        {
          url: "../../static/img/car.jpg",
          carNo: "粤A9M33",
          entryTime: "2018--3-3 4：13:4",
          desc: "停车·",
          flowId: "1",
          carType: "临时车",
          parkNo: "1"
        },
        {
          url: "../../static/img/car.jpg",
          carNo: "赣A8888",
          desc: "2018--3-3 4：13:4停车·"
        },
        {
          url: "../../static/img/car.jpg",
          carNo: "赣F6666"
        },
        {
          url: "../../static/img/car.jpg",
          carNo: "赣F6666"
        },
        {
          url: "",
          carNo: "赣F6666"
        }
      ],
      totals: {
        currentPage: 1,
        pageSize: 10,
        totalNum: 5
      },

      checked: false,
      currentDate: new Date(),
      park: [],
      filters: {
        plateValue: "",
        park: "111",
        priceType: "", // 计费类型
        //车类型
        carType: "",
        startValue: "",
        endValue: "",
        //车库
        garage: "",
        isplate: "",
        plateRelia: "",
        carNo: "",
        registNo: ""
      },
      querySels: {
        priceType: configs.chargeType,
        carType: configs.carType,
        garage: configs.garage,
        isplate: configs.isplate,
        plateRelia: configs.plateRelia
      }
    };
  },
  created() {
    //获取停车场列表
    this.park = this.common.getParkList();
  },
  methods: {
    updatestall() {
      let para = {
        parkNo: this.filters.park,
        jwt: window.localStorage.getItem("jwt")
      };
      reqUpdateStall(para).then(res => {
        if (res.code === 1) {
        }
      });
    },
    imports() {
      this.$router.push({ path: "/import" });
    },
    selsChange: function(index, row) {
      this.sels.push(row.url);
      console.log(row);
      console.log(this.sels);
      var s = [];
      //遍历数组
      for (var i = 0, len = this.sels.length; i < len; i++) {
        if (s.indexOf(this.sels[i]) == -1) {
          //判断在s数组中是否存在，不存在则push到s数组中
          s.push(this.sels[i]);
        }
      }
      console.log(s);
      return false;
    },
    getattendcar() {
      console.log("getattendcar");
      let para = {
        // plateValue: this.filters.plateValue, //车位池
        park: this.filters.park, //停车场
        priceType: this.filters.priceType, // 计费类型
        carType: this.filters.carType, //车类型
        start_timeF: this.filters.startValue, //入场时间从
        end_timeT: this.filters.endValue, //入场时间到
        garage: this.filters.garage, //车库
        isplate: this.filters.isplate, //是否有车牌
        plateRelia: this.filters.plateRelia, //车牌可信度
        carNo: this.filters.carNo, //车牌号
        registNo: this.filters.registNo, //注册号
        currentPage: this.totals.currentPage, //当前页
        pageSize: this.totals.pageSize, //每页显示条数
        jwt: window.localStorage.getItem("jwt")
      };

      requestAttendCar(para).then(res => {
        // this.$axios.get('../../static/json/park.json',{ para: para }).then((res) => {
        //本地写法
        if (res.code === 1) {
          var list = res.flowList;
          list.forEach(item => {
            var temp = {
              url: item["url"],
              carNo: item["carNo"],
              entryTime: item["entryTime"]
            };
            this.carlist.push(temp);
          });
          this.totals.totalNum = res.totalNum;
        } else {
          alert("暂无数据");
        }
        this.listLoading = false;
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
    editSubmit: function(formName) {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            var para = {
              desc: this.editForm.desc,
              url: this.editForm.url,
              UfLicenseplate: this.editForm.carNo,
              licensePlate: this.editForm.editCarNo,
              flowId: this.editForm.flowId,
              parkNo: this.editForm.parkNo
            };
            var user = window.localStorage.getItem("user");
            para.admin = JSON.parse(user).username;
            para.jwt = window.localStorage.getItem("jwt");
            requestAttendCarEdit(para).then(res => {
              if (res.code === 1) {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
              }
              this.editLoading = false;
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getattendcar();
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
    //         this.getattendcar();
    //       });
    //     })
    //     .catch(() => {});
    // },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.totals.currentPage = val;
      this.getattendcar();
      console.log(`当前页: ${val}`);
    },
    callbackseltenant: function() {
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
      this.filters.plateValue = row.plate_name;
      // console.log(column)
    }
  },
  mounted() {
    this.getattendcar();
  },
  created() {
    // let data = JSON.parse(window.localStorage.getItem("user"));
    // var arr = data.userParkInfos;
  }
};
</script>

<style scoped>
.el-card {
  height: 230px;
}
.fatherImg .el-card__body {
  height: 230px;
}
.fatherImg .showImgBox img {
  height: 230px;
}
.querys span {
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
  text-align: center;
  line-height: 200px;
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
  top: 2px;
  left: 2px;
}
/* 编辑 */
.el-card__body .rf a {
  position: absolute;
  top: -13px;
  right: -42px;
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
  height: 230px;
  background-color: rgb(0, 0, 0, 0.8);
  color: #fff;
  font-size: 12px;
  position: absolute;
  height: 25px;
  bottom: -80px;
  left: 0;
  /* padding: 5px; */
  /* margin:5px; */
}
.info .r {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 5px;
}
.info .l {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 5px;
}
.el-card__body {
  padding: 0 !important;
}


</style>