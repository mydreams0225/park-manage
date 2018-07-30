<template>
	<section>
		<div class="parent">
      <!-- 查询区 -->
			<div class="margin-tops querys" >
        <span>所属停车场</span>
				<el-select  @change="parkChange" v-model="filters.parkNo" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value"
                       >
	                    </el-option>
	            </el-select>
	            <el-input   id="plate_no" name="plate_no" placeholder="车牌号" v-model="filters.licensePlate" >
                     <template slot="prepend">车牌号</template>   
                </el-input>
                <span>通道</span>
                <el-select v-model="filters.entrancePassageway" filterable placeholder="通道" >
	                    <el-option
	                      v-for="item in passageway"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
              <span>计费类型</span>
	            <el-select v-model="filters.chargeType" filterable placeholder="计费类型" >
	                    <el-option
	                      v-for="item in feeType"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <div class="dates block">
		                    <span class="demonstration">入场时间从</span>
		                    <el-date-picker
		                      v-model="filters.startDateFrom"
		                      type="datetime"
		                      placeholder="选择日期时间">
		                    </el-date-picker>
		                  </div>
		                   <div class="dates block">
		                    <span class="demonstration">到</span>
		                    <el-date-picker
		                      v-model="filters.startDateTo"
		                      type="datetime"
		                      placeholder="选择日期时间">
		                    </el-date-picker>

                </div>
                <el-input   id="dutyMan" name="dutyMan" placeholder="值班员"  v-model="filters.admissionWatch">
                     <template slot="prepend">值班员</template>   
                </el-input>
                <span>放行方式</span>
                <el-select v-model="filters.admissionReleaseType" filterable placeholder="放行方式">
	                    <el-option
	                      v-for="item in releaseMethod"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	             <el-button  type="primary" icon="el-icon-search" size="medium" @click="getEntryRecord">查询</el-button>
                 <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
                 <div class="rights"> 
                 	<el-button type="success" size="medium" @click="outExe()"><strong><i class="el-icon-upload"></i></strong > 导出EXCEL报表</el-button>	
                 </div>
			</div>
      <!-- 展示区 -->
			<div class="margin-tops">
				 <template>
                    <el-table
                      :data="list"
                      border
                      v-loading="listLoading">
                    
                      <el-table-column
                        type="index"
                        label="序号"
                        >
                      </el-table-column>

                      <el-table-column
                        prop="flowId"
                        label=""
                       display="none"
                       v-if="noshow"
                        >
                      </el-table-column>
                      <!-- admissionPhotoPath -->
                      <el-table-column
                        prop="admissionPhotoPath"
                        label=""
                       display="none"
                       v-if="noshow"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="licensePlate"
                        label="车牌号"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="registerNo"
                        label="车牌号"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="chargeType"
                        label="计费类型">
                      </el-table-column>
                      <el-table-column
                        prop="carGroup"
                        label="车辆分组">
                      </el-table-column>               
                      <el-table-column
                        prop="entrancePassageway"
                        label="通道">
                      </el-table-column>
                      <el-table-column
                        prop="enterDate"
                        label="入场时间">
                      </el-table-column>

                      <el-table-column
                        prop="admissionReleaseType"
                        label="放行方式">
                      </el-table-column>
                      <el-table-column
                        prop="des"
                        label="描述">
                      </el-table-column>
                      <el-table-column
                        prop="admissionWatch"
                        label="值班员">
                      </el-table-column>
                      <el-table-column          
                        label="操作"
                        type="expand">
                          <template slot-scope="props">
                              <div>
                                <el-button @click="parkImg()">车牌照片</el-button>
                                <el-button  @click="auxiliaryImg()">辅助照片</el-button>
                                 <el-button @click="CertificatesImg()">证件照片</el-button>
                              </div>
                              <div class="main">
                                 <el-row :gutter="20">
                                       <el-col :span="12">
                                          <div class="panel">
                                                
                                              <p class="title">入场记录信息</p>
                                              <div class="imgBox">
                                                <ul>
                                                  <li v-show="parkImgs"> <img :src="props.row.admissionPhotoPath" alt="无车牌照片"></li>
                                                  <li v-show="auxiliaryImgs"><img src="" alt="无辅助照片"></li>
                                                  <li v-show="CertificatesImgs"> <img src="" alt="无证件照片"></li>
                                                </ul>  
                                              </div>
                                              <div class="wenziBox">
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              车牌号：
                                                          </el-col>
                                                          <el-col :span="8">
                                                            {{props.row.licensePlate}}
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              注册号：
                                                          </el-col>
                                                          <el-col :span="8">
                                                            {{props.row.licensePlate}}
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              入场时间：
                                                          </el-col>
                                                          <el-col :span="8">
                                                            {{props.row.enterDate}}
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              入场控制器：
                                                          </el-col>
                                                          <el-col :span="8">
                                                              
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              入场通道：
                                                          </el-col>
                                                          <el-col :span="8">
                                                        
                                                            {{props.row.entrancePassageway}}
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              计费类型：
                                                          </el-col>
                                                          <el-col :span="8">
                                                        
                                                            {{props.row.chargeType}}
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              车类型
                                                          </el-col>
                                                          <el-col :span="8">
                                                        
                                                            
                                                          </el-col>
                                                      </el-row>
                                              </div>
                                          </div>
                                      </el-col>
                                 </el-row>
                                 <el-row :gutter="20">
                                     <el-col :span="12">
                                          <div class="panel">  
                                              <p class="title">访客信息</p>   
                                              <el-row :gutter="20">
                                                  <el-col :span="12">
                                                      访客名称：
                                                  </el-col>
                                              </el-row>
                                              <el-row :gutter="20">
                                                  <el-col :span="12">
                                                      身份证：
                                                  </el-col>
                                              </el-row>
                                          </div>
                                     </el-col>
                                 </el-row>
                                </div>
                              
                          </template>
                      </el-table-column>
                    </el-table>
                 </template>
			</div>
			 <div>
				 <el-pagination    
              @current-change="handleCurrentChange"
              :current-page.sync="totals.currentPage"
              :page-size.sync="totals.pageSize"
              layout="total, prev, pager, next"
              :total.sync="totals.totalNum">
            </el-pagination>
			 </div>
		</div>
	</section>
</template>
<script>
//reqEntryRecord
import { reqEntryRecord } from "@/api/recordQuery";
export default {
  data() {
    return {
      noshow: false,
      listLoading: false,
      totals: {
        totalNum: 1,
        pageSize: 15,
        currentPage: 1
      },
      filters: {
        parkNo: "",
        entrancePassageway: "",
        chargeType: "", //计费类型
        admissionReleaseType: "",
        licensePlate: "",
        startDateFrom: new Date(),
        startDateTo: new Date(),
        admissionWatch: ""
      },
      park: [],
      passageway: [{}],
      feeType: configs.chargeType,
      releaseMethod: configs.admissionreleasetype,
      list: [
        {
          flowId: "11111",
          licensePlate: "粤A33333",
          registerNo: "111",
          chargeType: "", //计费类型
          carGroup: "",
          entrancePassageway: "", //入口通道
          enterDate: "", //入场时间
          admissionReleaseType: "", //放行方式
          des: "", //
          admissionWatch: "" //入场值班员
        }
      ],
      parkImgs: true,
      auxiliaryImgs: false,
      CertificatesImgs: false
    };
  },
  created() {
    this.getParkList();
  },
  methods: {
    parkChange(value) {
      this.passageway = [];
      //1
      var parkObj = this.park;
      for (var item in parkObj) {
        if (parkObj[item]["value"] === value) {
          var entryarr = parkObj[item]["entryPassway"].split("-");
          console.log(entryarr);

          for (var i in entryarr) {
            var temp = { value: entryarr[i], label: entryarr[i] };
            this.passageway.push(temp);
          }
        }
      }
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
    getEntryRecord() {
      var _this = this;
      // let para = new URLSearchParams();
      // filters: {
      //   parkNo: "",
      //   entrancePassageway: "",
      //   chargeType: "", //计费类型
      //   admissionReleaseType: "",
      //   licensePlate: "",
      //   startDateFrom: new Date(),
      //   startDateTo: new Date(),
      //   admissionWatch: ""
      // },
      var filters=this.filters;
      let para = {
          parkNo:filters.parkNo, // 停车场编号
          entrancePassageway:filters.entrancePassageway, // 入口通道
          chargeType:filters.chargeType, // 计费类型
          admissionReleaseType:filters.admissionReleaseType, //放行方式
          licensePlate:filters.licensePlate, // 车牌号
          startDateFrom:filters.startDateFrom, // 入场时间从
          startDateTo:filters.startDateTo, // 到
          admissionWatch:filters.admissionWatch // 值班员
      };
      para.jwt = window.localStorage.getItem("jwt");
      console.log("local");
      console.log(window.localStorage.getItem("jwt"));
      // Object.assign({}, this.filters);
      para.currentPage = this.totals.currentPage; //当前页
      para.pageSize = this.totals.pageSize;
      // para.jwt=window.localStorage.getItem("jwt");
      this.listLoading = true;
      reqEntryRecord(para)
        .then(res => {
          if (res.code === 1) {
            console.log(res);
            this.totals.totalNum = res.totalNum;
            var retpara = res.entryRecords;
            getRetList(retpara,_this);
          } else {
            _this.$message({
              message: "请求数据失败",
              type: "error"
            });
          }

          this.listLoading = false;
        })
        .catch({});
    },
    //获得返回参数并操作
    getRetList(retpara,_this){
          retpara.forEach(item=>{
              var temp={
                       flowId:item.flowId,
                       licensePlate:item.licensePlate,// 车牌号
                       registerNo:item.registerNo,// 注册号
                       chargeType:item.chargeType,// 计费类型
                       carGroup:item.carGroup, //车辆分组
                       entrancePassageway:item.entrancePassageway, //入口通道
                       enterDate:item.enterDate, // 入场时间
                       admissionReleaseType:item.admissionReleaseType, //放行方式
                       des:item.des, //描述
                       admissionWatch:item.admissionWatch, //入场值班员,
                       admissionPhotoPath:item.admissionPhotoPath // 拍照地址
                      };
               _this.list.push(temp);
            });
    },
    parkImg() {
      this.parkImgs = true;
      this.auxiliaryImgs = false;
      this.CertificatesImgs = false;
    },
    auxiliaryImg() {
      this.parkImgs = false;
      this.auxiliaryImgs = true;
      this.CertificatesImgs = false;
    },
    CertificatesImg() {
      this.parkImgs = false;
      this.auxiliaryImgs = false;
      this.CertificatesImgs = true;
    },

    handleCurrentChange(val) {
      console.log(`当前页${val}`), 
      this.totals.currentPage = val;
      this.getEntryRecord();
    },

    callbackSelTenant() {
      var filter = this.filters;
      for (var item in filter) {
        filter[item] = "";
      }
    },
    // 导出excel
    outExe() {
      this.$confirm("此操作将导出excel文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.excelData = this.entryRecords //你要导出的数据list。
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getEntryRecord();
  }
};
</script>
<style scoped>
/*公共属性*/
.el-input-group {
  width: 200px;
}
.el-select {
  width: 130px;
}
/*公共属性*/
.dates {
  display: inline-block;
}
.querys {
  position: relative;
}
.rights {
  position: absolute;
  top: 45px;
  right: 0;
}
.main {
  overflow: auto;
}
.panel {
  border: 1px solid #ddd;
  margin: 15px 10px;
  /* height: 350px; */
  border-radius: 5px;
}
.wenziBox {
  margin: 10px;
}
.panel .title {
  margin-bottom: 10px;
  text-align: left;
  font-weight: bold;
  padding: 10px;
  background-color: #eee;
  border-bottom: 1px solid #ccc;
}
.panel .title .imgBox {
  height: 100px;
  border: 1px solid red;
}
.panel ul li {
  height: 100px;
  list-style: none;
}
.querys  span{
  font-size: 12px;
}
</style>