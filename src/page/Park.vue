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
          <form :model="filters" class="form-inline" role="form" id="searchForm" name="searchForm" onsubmit="subSearchForm();return false;">
                    <el-input   id="client" name="client" placeholder="点击选择" readonly="readonly" v-on:click="clientsearch ()" style="cursor:pointer" >
                      <template slot="prepend"> 所属客户</template>   
                    </el-input>
                    
  

                    <el-select v-model="v_sys_type" filterable placeholder="系统类型">
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
                    <el-input   id="codes" name="codes" placeholder="编码" >
                     <template slot="prepend">编码</template>   
                    </el-input>
                    <el-input   id="address" name="address" placeholder="地址">
                     <template slot="prepend">地址</template>   
                    </el-input>
                    <el-select v-model="online_status" filterable placeholder="在线状态">
                      <el-option
                        v-for="item in online"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                   <!--  <div class="demo" v-on:click="areaLists">hhda1</div> -->
                         <div style="display:inline-block ;font-size:14px;">
                      <span class="demonstration">地区</span>
                      <el-cascader style="font-size:14px; text-align:center;"    
                        :options="options"
                        expand-trigger="hover"
                        v-model="selectedOptions"
                        @change="handleChange">
                      </el-cascader>
                    </div>
                   <!--  <el-select v-model="v_provice" filterable placeholder="--选择省份--">
                      <el-option
                        v-for="item in provice"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-select v-model="v_city" filterable placeholder="--选择城市--" disabled="disabled">
                      <el-option
                        v-for="item in city"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-select v-model="v_area" filterable placeholder="--区/县--" disabled="disabled">
                      <el-option
                        v-for="item in area"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> -->
                     <el-select v-model="v_project_statu" filterable placeholder="工程状态">
                      <el-option
                        v-for="item in project_status"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-button size="medium" type="primary" icon="el-icon-search" v-on:click="getPark">查询</el-button>
                    <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
           </form>
        </div>
        <!-- gridview -->
        <div class="margin-tops" style="font-size:12px;" >
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
                          <div style="display:inline-block;vertical-align:top ">
                             <a href="#" class="el-icon-upload operate green"></a>
                             <a href="#" class="el-icon-setting operate blue" @click="$router.push('/parkingandEntryequi')">设备管理</a>
                          </div >
                         
                          <div style="display:inline-block;position:relative">
                            <!-- <a href="#" class="el-icon-caret-bottom operate blue after" >操作更多</a> -->
                           
                           <!--  <ul class="dropdown-menu">
                             <li>强制出场</li>
                             <li>强制出场</li>
                             <li>强制出场</li>
                              
                           </ul> -->
                           
                          
                          </div>
                          
                        </template>
                      </el-table-column>
                      
                    </el-table>
              </template>
              </div>

       <!--  分页 -->
        <!-- 分页 -->
        <!-- <div>
            <Paging v-bind:total="totals"  v-on:btn-click="handleCurrentChange"></Paging>           
        </div> -->
         <div class="block">

            <el-pagination
              
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size=3
              layout="total, prev, pager, next"
              :total.sync="totalnum">
            </el-pagination>
          </div>
             <!-- 分页end -->
        </section>

      </template>

<script>
import { getParklist } from "../api/api";
export default {
  methods: {
    handleChange(value) {
      console.log(value);
    },
    clientsearch() {
      console.log("client");
    },

    getPark() {
      let para = {
        name: this.filters.name,
        currentPage1: this.currentPage1
      };
      this.listLoading = true;
      //NProgress.start();
      console.log("para", para);

      getParklist(para).then(res => {
        // this.$axios.get('../../static/json/park.json',{ para: para }).then((res) => {
        //本地写法
        this.parkList = eval(res).data;
        this.totalnum = eval(res).total;
        //请求后端写法
        // this.parkList = res;
        //this.totalnum=(eval(res)).total;
        console.log("fff" + res);

        this.listLoading = false;
        //NProgress.done();
      });
    },
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    handleCurrentChange(val) {
      this.getPark();
      console.log(`当前页: ${val}`);
    },
    callbackSelTenant: function() {
      var aa = document.getElementsByTagName("input");
      console.log(aa);
      for (var i = 0; i < aa.length; i++) {
        if (aa[i].type == "text") {
          aa[i].value = "";
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
    this.getPark();
  },
  // watch:{
  //   $('.demo').areaCon()
  // },

  data() {
    return {
      options: configs.options,
      selectedOptions: [],
      outerVisible: false,
      innerVisible: false,
      listLoading: false,
      filters: {
        name: "",
        types: "",
        codes: ""
      },

      totalnum: 15,
      currentPage1: 2,
      totals: {
        totalnum: 3,
        pagesize: 1,
        currentPage1: 1
      },
      parkList: configs.parkList,
      types: configs.parksys,
      v_sys_type: "",
      online: configs.online,
      online_status: "",
      project_status: configs.project_status,
      v_project_statu: ""
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
</style>