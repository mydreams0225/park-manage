<template>
	<section>
	 
	
        <!-- <div class="titles"><span>集团分级管理</span></div>
        <div class="head_r">
           <p>提示：新增停车场统一进入“我的项目列表”进行添加,<a href="#" class="btn btn-sm btn-info white" > <el-button type="primary" size="mini"><i class="el-icon-back"></i>点击进入</el-button></a>。</p>
           <div class="tenet-btnd-r">
              <a href="javascript:;" title="看板形式浏览" class=""><i class="el-icon-menu"></i></a>
              <a href="javascript:;" title="表格形式浏览" class="on"><i class="el-icon-date"></i></a>

           </div>
        </div>

        <div> -->
        <div class="parent">
          <div class="margin-tops">
             <el-button type="primary" @click="openAddPark()" size="medium" icon="el-icon-plus">新增停车场</el-button>
             <el-dialog
                title="添加停车场"
                :visible.sync="addVisible"
                width="500px"
                :before-close="handleClose">
                
                  <el-form  :model="add" :rules="rules" ref="add" class="form-inline" >
                    <el-row :gutter="20">
                      <el-col :span="12">
                                  <el-form-item prop="parkNo" label="停车场编号">
                                      <!-- <label for=""><span style="color:red">*</span> 停车场编号</label> -->
                                      <el-input v-model="add.parkNo"></el-input>    
                                  </el-form-item>
                                
                        </el-col>        
                        <el-col :span="12">
                                <el-form-item prop="parkName" label="停车场名称">
                                  <el-input v-model="add.parkName" ></el-input>

                                </el-form-item>
                        </el-col>
                        <el-col :span="12">
                                <el-form-item prop="area" label="选择地区">
                                  <div style="display:block">
                                  
                                  <el-cascader class="areaCascader" 

                                      :options="area"
                                      expand-trigger="hover"
                                      v-model="add.area"
                                      @change="handleChange">
                                    </el-cascader>
                                  </div>
                                       

                                </el-form-item>
                                    
                        </el-col>        
                        <el-col :span="12">
                               <el-form-item prop="detailArea" label="具体地址">
                                  <el-input v-model="add.detailArea" ></el-input>

                                </el-form-item>
                                  
                        </el-col>
                    </el-row>
                  </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addVisible = false">取 消</el-button>
              <el-button type="primary" @click="savePark('add')">保 存</el-button>
            </span> 
        </el-dialog>
          </div>
          <form :model="filters" class="form-inline" role="form" id="searchForm" name="searchForm" onsubmit="subSearchForm();return false;">
                    
                    <el-input clearable :value="filters.clientValue"   id="client" name="client" placeholder="点击选择" readonly="readonly"  v-on:click.native="dialogTableVisible = true" style="cursor:pointer" >
                      <template slot="prepend"> 所属客户</template>   
                    </el-input>
                    <el-dialog title="选择所属客户" :visible.sync="dialogTableVisible" width="550px" >
                      <form class="clientSearch">
                        <el-input   placeholder="名称" :value="filters.name" >
                        <template slot="prepend">名称</template>   
                        </el-input>
                        <el-input    placeholder="编码" :value="filters.codes" >
                        <template slot="prepend">编码</template>   
                        </el-input>
                        <el-button size="medium" type="primary" icon="el-icon-search" >查询</el-button>
                      </form>
                      <el-table :data="clientData" @row-click="clientCheck" ref="clientTable">
                        <el-table-column property="clientName" label="" ></el-table-column>
                      </el-table>
                    </el-dialog>
                    <span>系统类型</span>
                    <el-select v-model="filters.sysType" id="types"  filterable placeholder="系统类型">
                      <!-- <el-option selected="selected">全部</el-option> -->
                        <el-option
                          v-for="item in types"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    <el-input   id="names" name="names" placeholder="名称" v-model="filters.name" >
                     <template slot="prepend">名称</template>   
                    </el-input>
                    <el-input   id="codes" name="codes" placeholder="编码" v-model="filters.codes">
                     <template slot="prepend">编码</template>   
                    </el-input>
                    <el-input   id="address" name="address" placeholder="地址" v-model="filters.address">
                     <template slot="prepend">地址</template>   
                    </el-input>
                    <span>在线状态</span>
                    <el-select v-model="filters.online_status" filterable placeholder="在线状态">
                      <el-option
                        v-for="item in online"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                         <div class="areas">
                      <span class="demonstration">地区</span>
                      <el-cascader class="areaCascader"  

                        :options="area"
                        expand-trigger="hover"
                        v-model="filters.area"
                        @change="handleChange">
                      </el-cascader>
                    </div>
                    <span>工程状态</span>
                     <el-select v-model="filters.projectStatus" filterable placeholder="工程状态">
                      <el-option
                        v-for="item in projectStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-button id="query" size="medium" type="primary" icon="el-icon-search" v-on:click="getPark" >查询</el-button>
                    <el-button id="edit" size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')" >清除</el-button>
           </form>
        </div>
        <!-- gridview -->
        <div class="margin-tops"  >
              <template>
                    <el-table
                      :loading="listLoading"
                      element-loading-text="拼命加载中"
                      :data="parkList"
                      border
                      style="width: 100% ;">
                      <el-table-column
                        prop="date"
                        label="序号"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="名称"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="types"
                        label="系统类型">
                      </el-table-column>
                      <el-table-column
                        prop="codes"
                        label="编码">
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="地址">
                      </el-table-column>
                      <el-table-column
                        prop="unit"
                        label="运营单位">
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="工程状态">
                      </el-table-column>
                      <el-table-column
                        prop="online"
                        label="在线状态">
                        <template slot-scope="scope"><span class="backgrounds green">{{ scope.row.online }}</span></template>
                      </el-table-column>
                      <el-table-column
                        prop="info"
                        label="实时信息">
                      </el-table-column>
                      <el-table-column 
                        prop="price"
                        label="操作"
                        width="250px">
                         <template slot-scope="scope">
                          <div class="operates">
                             <a href="#" class="el-icon-upload operate green"></a>
                             <a href="#" class="el-icon-setting operate blue" @click="$router.push('/deviceManage/parkingandEntryequi')">设备管理</a>
                          </div >                       
                        </template>
                      </el-table-column>
                      
                    </el-table>
              </template>
              </div>
         <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="totals.currentPage"
              :page-size.sync="totals.pageSize"
              layout="total, prev, pager, next"
              :total.sync="totals.totalNum">
            </el-pagination>
          </div>
             <!-- 分页end -->
        </section>
      </template>
<script>
import { getParklist1, reqSavePark } from "@/api/api";
export default {
  methods: {
    openAddPark() {
      //  add: {
      //     parkNo: "",
      //     parkName: "",
      //     area:"",
      //     detailArea:""
      //   },
      this.addVisible = true;
      this.add.parkNo ="";
    },
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
      done();
    },
    savePark(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        } else {
          this.addVisible = false;
          let para = {
            parkNo: this.add.parkNo,
            parkName: this.add.parkName,
            area: this.add.area,
            detailArea: this.add.detailArea,
            jwt: window.localStorage.getItem("jwt")
          };
          //停车场请求
          reqSavePark(para).then(res => {
            if (res.code === 1) {
              this.$message({
                message: "添加成功！",
                type: "success"
              });
            } else {
              this.$message({
                message: res.message,
                type: "error"
              });
            }
          });
        }
      });
    },
    handleChange(value) {
      console.log(value);
    },
    clientsearch() {},
    clientCheck(row, column) {
      this.dialogFormVisible = false;
      this.dialogTableVisible = false;
      this.filters.clientValue = row.clientName;
    },
    getPark() {
      let para = {
        name: this.filters.name,
        code: this.filters.codes,
        type: this.filters.types,
        address: this.filters.address,
        area: this.filters.area[2],
        sys_type: this.filters.sysType,
        online_status: this.filters.online_status,
        clientValue: this.filters.clientValue,
        projectStatus: this.filters.projectStatus,
        currentPage: this.totals.currentPage,
        pageSize: this.totals.pageSize,
        jwt: window.localStorage.getItem("jwt")
      };
      this.listLoading = true;
      //NProgress.start();
      console.log("para", para);

      getParklist1(para).then(res => {
        if (res.code === 1) {
          this.parkList = res.data;
          this.totals.totalNum = res.total;
          console.log("fff" + res);
        } else {
          console.log("暂无数据");
        }

        this.listLoading = false;
      });
    },

    handleCurrentChange(val) {
      this.totals.currentPage = val;
      this.getPark();
      console.log(`当前页: ${val}`);
    },
    callbackSelTenant: function() {
      var $filter = this.filters;
      for (var item in $filter) {
        if (typeof $filter[item] == "object") {
          $filter[item] = [];
        } else {
          $filter[item] = "";
        }
      }
    },
    getUrl() {
      for (item in $router.options.routes) {
        console.log(item);
      }
    }
  },
  mounted() {
    //获取停车场列表
    this.getPark();
  },
  data() {
    return {
      rules: {
        parkNo: [
          { required: true, message: "请输入停车场编号", trigger: "blur" }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        parkName: [
          { required: true, message: "请输入停车场名称", trigger: "blur" }
        ],
        area: [{ required: true, message: "请选择地区", trigger: "blur" }],
        detailArea: [{ required: true, message: "请选择地区", trigger: "blur" }]
      },

      addVisible: false,
      add: {
        parkNo: "",
        parkName: "",
        area: [],
        detailArea: ""
      },
      clientValue: "",
      //客户数据
      clientData: [{ clientName: "酒店一" }, { clientName: "酒店二" }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      area: configs.options,
      outerVisible: false,
      innerVisible: false,
      listLoading: false,
      filters: {
        name: "",
        types: "",
        codes: "",
        address: "",
        online_status: "",
        area: [],
        sysType: "",
        projectStatus: ""
      },
      totals: {
        totalNum: 15,
        currentPage: 2,
        pageSize: 10
      },
      //停车场列表
      parkList: configs.parkList,
      //类型
      types: configs.parksys,
      //在线状态
      online: configs.online,
      //工程状态
      projectStatus: configs.projectStatus
    };
  }
};
</script>

<style scoped>
* {
  text-align: left;
  font-size: 14px;
}
.titles {
  padding-top: 10px;
}
span {
  color: #666;
  font-size: 18px;
}
el-button {
  padding: 0px;
  font-size: 12px;
}

i {
  transform: rotateY(180deg);
}
.head_r {
  position: relative;
}
.tenet-btnd-r {
  position: absolute;
  top: 0;
  right: 0;
  transform: scale(1.5);
}
.tenet-btnd-r a {
  color: #000;
}
.tenet-btnd-r a:hover {
  color: #46b8da;
}

.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
  border-color: #fff;
}
.el-input-group {
  width: 250px;
}
.clientSearch .el-input-group {
  width: 200px;
}
.form-inline {
  margin-top: 15px;
}
.sel {
  border: 1px solid #eee;
  height: 32px;
  width: 250px;
  line-height: 32px;
  border-radius: 5px;

  border-collapse: separate;
}
.sel .span {
  display: inline-block;
  padding: 0px 10px;
  background-color: #eee;
  border: 1px solid #eee;
  color: #909399;

  height: 32px;
}
.sel select {
  height: 30px;
  width: 167px;
  border-radius: 5px;
  border-width: 0px;
}
.w {
  width: 184px;
}
.sel .wm {
  width: 100px;
}
.address {
  width: 362px;
}
.address select {
  width: 100px;
}
a {
  text-decoration: none;
}
a:hover {
  background-color: "#357ebd";
}
.operate {
  border: 1px solid #1a72c1;

  color: #fff;
  padding: 5px;
  border-radius: 5px;
}
.blue {
  background-color: #31b0d5;
  border: 1px solid #31b0d5;
}
.green {
  background-color: #5cb85c;
}
.el-icon-caret-bottom:before {
  content: "";
}
.after::after {
  content: "\e60b";
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 999;
  background-color: #fff;
  overflow: visible;
}
.backgrounds {
  color: #fff;
  padding: 3px;
  border-radius: 2px;
  font-size: 12px;
}
.green {
  background-color: #5cb85c;
  border: 1px solid #5cb85c;
}
.red {
  background-color: #d9534f;
}
.form-inline span {
  font-size: 12px;
}
.operates {
  display: inline-block;
  vertical-align: top;
}
.areas {
  display: inline-block;
  font-size: 14px;
}
.areaCascader {
  font-size: 12px;
  text-align: center;
}
</style>