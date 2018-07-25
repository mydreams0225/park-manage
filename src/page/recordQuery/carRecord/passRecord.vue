<template>
	<section>
		<div class="parent">
			<!-- <div class="margin-tops">
				<el-button type="danger" icon="el-icon-delete" size="medium">删除查询到的记录</el-button>
			</div> -->
			<div class="margin-tops querys" >
				<el-select v-model="filters.parkNo" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-input   id="plate_no" name="plate_no" placeholder="车牌号" v-model="filters.licensePlate" >
                     <template slot="prepend">车牌号</template>   
                </el-input>
                <el-select v-model="filters.entrancePassageway" filterable placeholder="通道" >
	                    <el-option
	                      v-for="item in passageway"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-select v-model="filters.chargeType" filterable placeholder="计费类型" >
	                    <el-option
	                      v-for="item in fee_type"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <div class="dates block">
		                    <span class="demonstration">入场时间从</span>
		                    <el-date-picker
		                      v-model="filters.start_datefrom"
		                      type="datetime"
		                      placeholder="选择日期时间">
		                    </el-date-picker>
		                  </div>
		                   <div class="dates block">
		                    <span class="demonstration">到</span>
		                    <el-date-picker
		                      v-model="filters.start_dateto"
		                      type="datetime"
		                      placeholder="选择日期时间">
		                    </el-date-picker>

                </div>
                <el-input   id="dutyMan" name="dutyMan" placeholder="值班员"  v-model="filters.admissionWatch">
                     <template slot="prepend">值班员</template>   
                </el-input>
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
                        prop="chargeType"
                        label="计费类型">
                      </el-table-column>
                      <el-table-column
                        prop="car_group"
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

                                      <!-- <el-col :span="12">
                                          <div class="panel">
                                         <p class="title">出场记录信息</p>
                                          <div class="imgBox">
                                                <ul>
                                                  <li> <img src="" alt="无图片"></li>
                                                </ul>  
                                          </div>
                                          <div class="wenziBox">
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              车牌号：
                                                          </el-col>
                                                          <el-col :span="8">
                                                           
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              注册号：
                                                          </el-col>
                                                          <el-col :span="8">
                                                            
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              出场时间：
                                                          </el-col>
                                                          <el-col :span="8">
                                                            
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              出场控制器：
                                                          </el-col>
                                                          <el-col :span="8">
                                                          
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              出场通道：
                                                          </el-col>
                                                          <el-col :span="8">
                                                        
                                                            
                                                          </el-col>
                                                      </el-row>
                                                      <el-row :gutter="20">
                                                          <el-col :span="8">
                                                              计费类型：
                                                          </el-col>
                                                          <el-col :span="8">
                                                        
                                                            
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
                                      </el-col> -->

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
        chargeType: "",//计费类型
        admissionReleaseType: "",
        licensePlate: "",
        start_datefrom: new Date(),
        start_dateto: new Date(),
        admissionWatch: ""
      },
      park: [{}],
      passageway: [{}],
      fee_type: configs.chargeType,
      releaseMethod: configs.admissionreleasetype,
      list: [
            {flowId:"11111", 
            licensePlate: "粤A33333", 
            licensePlate:"车牌号",
            chargeType:"",//计费类型
            car_group:"",
            entrancePassageway:"",//入口通道
            enterDate:"",//入场时间
            admissionReleaseType:"",//放行方式
            des:"",//
            admissionWatch:""//入场值班员
            }
        ],
      parkImgs:true,
      auxiliaryImgs:false,
      CertificatesImgs:false

    };
  },

  methods: {
        getEntryRecord() {
      let para = Object.assign({}, this.filters);
        para.currentPage=this.totals.currentPage; //当前页
        para.pageSize=this.totals.pageSize;
      this.listLoading = true;
      reqEntryRecord(para).then(res=>{
        if(res.code===1){
          console.log(res);
         this.totals.totalNum = res.total;
         this.list=res.entryRecords;
         
        }else{
           
        }
        
      	  this.listLoading = false;
      })
    },
    parkImg(){
      this.parkImgs=true;
      this.auxiliaryImgs=false;
      this.CertificatesImgs=false;
    },
    auxiliaryImg(){
      this.parkImgs=false;
      this.auxiliaryImgs=true;
      this.CertificatesImgs=false;
    },
    CertificatesImg(){
       this.parkImgs=false;
      this.auxiliaryImgs=false;
      this.CertificatesImgs=true;
    },
    

    handleCurrentChange(val) {
      console.log(`当前页${val}`),
      this.totals.currentPage=val;
       this.getEntryRecord();
    },

    callbackSelTenant() {
      var filter = this.filters;
      for (var item in filter) {
        filter[item] = "";
      }
    }
    ,
      // 导出excel
    outExe() {
                this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   // this.excelData = this.entryRecords //你要导出的数据list。
                   
                }).catch(() => {
                
                });
            },
           
  },
    mounted() {
    this.getEntryRecord();
  },
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
</style>