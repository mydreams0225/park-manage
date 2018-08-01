<template>
    <section>
        <div class="parent">
            <!-- 操作区 -->
            <div class="margin-tops">
                <el-button type="primary" size="medium" @click="addbusiness"><i class="el-icon-plus"></i> 发行优惠券 </el-button>
                <el-button type="danger" size="medium" @click="batchdelete"><i class="el-icon-delete"></i> 删除</el-button>

            </div>
            <!-- 查询区 -->
            <div class="margin-tops querys">
                <span>所属停车场</span>
                <el-select v-model="filters.park" >
                    <el-option
                        v-for="item in park"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                </el-select>
                <span>所属商户</span>
                <el-select v-model="filters.merchant" >
                    <el-option
                        v-for="item in merchant"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                </el-select>
                <span>优惠类型</span>
                <el-select v-model="filters.preferentialType" >
                    <el-option
                        v-for="item in preferentialType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                </el-select>
                <span class="demonstration">有效期时间从</span>
                    <el-date-picker
                    v-model="filters.duringDateTimeFrom"
                    type="datetime"
                    placeholder="选择日期时间">
                    </el-date-picker>
                <span class="demonstration">到</span>
                    <el-date-picker
                    v-model="filters.duringDateTimeTo"
                    type="datetime"
                    placeholder="选择日期时间">
                    </el-date-picker>
                    <span class="demonstration">创建时间从</span>
                    <el-date-picker
                    v-model="filters.createDataTimeFrom"
                    type="datetime"
                    placeholder="选择日期时间">
                    </el-date-picker>
                <span class="demonstration">到</span>
                    <el-date-picker
                    v-model="filters.createDataTimeTo"
                    type="datetime"
                    placeholder="选择日期时间">
                    </el-date-picker>
                 <span>使用状态</span>
                <el-select v-model="filters.useState" >
                    <el-option
                        v-for="item in useState"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                </el-select>
                <el-button type="primary" size="medium" @click="querybusinessqrcode"><i class="el-icon-search" ></i>查询</el-button>
                <el-button size="medium" @click="clearquery"><i class="el-icon-delete"></i> 清除</el-button>
            </div>
            <!-- 展示区 -->
            <div class="margin-tops showarea">
               <el-table
               :data="businessQRcode"
               tool-tip-effect="dark"
               style="100%"
               border
               @selection-change="handleselectchange">
                   <el-table-column
                        
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="couponId"
                        label="编号">
                    </el-table-column>
                    <el-table-column
                        prop="businessName"
                        label="商户名称">
                    </el-table-column>
                    <el-table-column
                        prop="preferentialInformation"
                        label="优惠信息">
                    </el-table-column>
                     
                     <el-table-column
                        prop="duringDateTime"
                        label="有效期">
                    </el-table-column>                  
                    <el-table-column
                        prop="useState"
                        label="使用状态">
                        <template slot-scope="scoped">
                            <span v-if="scoped.row.useState==1" class="showStatus2">未使用</span>
                            <span v-if="scoped.row.useState==2" class="showStatus1">使用</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="publisher"
                        label="发布人">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建时间">
                    </el-table-column>
                    <el-table-column
                        prop="useDateTime"
                        label="使用时间">
                    </el-table-column>
                    <el-table-column
                        prop="operation"
                        label="操作"
                        width="120px">
                        <template slot-scope="scopes">
                            <!-- <el-button 
                                type="primary"
                                icon="el-icon-edit" 
                                circle 
                                size="mini" 
                                @click="handleedit(scopes.$index, scopes.row)">
                            </el-button> -->
                            <el-button 
                                type="danger" 
                                icon="el-icon-delete" 
                                circle 
                                size="mini" 
                                @click="handledel(scopes.$index, scopes.row)">
                            </el-button>
                        </template>      
                    </el-table-column>
               </el-table>
            </div>
            <div>
                 <el-pagination
              
                    @current-change="handlecurrentchange"
                    :current-page.sync="totals.currentPage"
                    :page-size.sync="totals.pageSize"
                    layout="total, prev, pager, next"
                    :total.sync="totals.totalNum">
                 </el-pagination>
            </div>
            	<!-- 添加或修改 界面-->
         <el-dialog 
				  :title="save.titles"
				  :visible.sync="save.saveVisible"
				  width="40%">
				     <div class="saveShow">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <span style="color:red">*</span><span>所属停车场:</span>
                                <div>
                               <el-select v-model="save.obj.park" filterable >
                                <el-option
                                    v-for="item in park"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                                </el-select>
                                </div>
                            </el-col>
                            
                        </el-row>
                        
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <span>发行方式：</span>
                                <el-radio-group @change="distributionModechange" v-model="save.obj.distributionMode">
                                        <el-radio :label="1">单张发行</el-radio>
                                        <el-radio :label="2">批量发行</el-radio>
                                    </el-radio-group>
                            </el-col>
                        </el-row>
                         <el-row :gutter="20">
                            <el-col :span="12">
                                <span style="color:red">*</span><span>所属商户:</span>
                                <div>
                               <el-select v-model="save.obj.merchant" filterable >
                                <el-option
                                    v-for="item in merchant"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                                </el-select>
                                </div>
                            </el-col>
                            
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <span style="color:red">*</span><span>有效期开始时间:</span>
                                <div>
                                   <el-date-picker
                                    v-model="save.obj.duringDateTimeStart"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyyMMddHHmmss"
                                    >
                                    </el-date-picker> 
                                </div>
                            </el-col>
                             <el-col :span="12">
                                <span style="color:red">*</span><span>有效期结束时间:</span>
                                <div>
                                  <el-date-picker
                                    v-model="save.obj.duringDateTimeEnd"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyyMMddHHmmss"
                                    >
                                    </el-date-picker> 
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <span>优惠类型:</span>
                                <div>
                                     <el-radio-group @change="freetypechange" v-model="save.obj.preferentialType">
                                        <el-radio :label="1">免单</el-radio>
                                        <el-radio :label="2">免时常</el-radio>
                                        <el-radio :label="3">免金额</el-radio>
                                        <el-radio :label="4">按比例</el-radio>
                                        <el-radio :label="5">有效期内多次免单</el-radio>
                                    </el-radio-group>
                                </div>
                              
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col  v-show="show.freelist" :span="24">
                                <span style="color:red">*</span> <span>{{save.obj.freeListTitle}}</span>
                                  <el-input v-model="save.obj.freeList"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col  v-show="show.batchNum" :span="24">
                                <span>发行打印数量:</span>
                                  <el-input v-model="save.obj.printCount"></el-input>
                            </el-col>
                        </el-row>
					 </div>

				  <span slot="footer" class="dialog-footer">
				    <el-button @click="save.saveVisible=false">取 消</el-button>
				    <el-button type="primary" @click="savebusiness">发行并打印</el-button>
				  </span>
				</el-dialog>
        </div>
    </section>
</template>
<script>
import {
  reqbusinessqrcode,
  batchDeletebusinessqrcode,
  reqSavebusinessQrcode,
  reqDeleteOnebusinessQrcode,
  reqmerchant
} from "@/api/businessManage";
export default {
  data() {
    return {
        sels:{
            discountCycle:[],
            // useState: business.useState,
        },
        useState: business.useState,
        checkBoxs: [],
        merchant:[],
        bussinessStatus:[],
        preferentialType:[],
        dialogVisible: false,
      // park:[],
      filters: {
        park: "",
        merchant: "",
        preferentialType:"",
        duringDateTimeFrom:"",
        duringDateTimeTo:"",
        createDataTimeFrom:"",
        createDataTimeTo:"",
        useState:""
      },
      
      businessQRcode: [
        {
          couponId:"1",//couponId,
          businessName: "shanhu", //商户名称
          preferentialInformation:"",//商户信息
          duringDateTime:"",//有效期
          useState:1,//使用状态
          publisher:"",//发行人
          createTime:"2018-8-8",//创建时间
          useDateTime:"2018-9-9",//使用时间,
          
        }
      ],
      totals: {
        currentPage: 1,
        pageSize: 10,
        totalNum: 1
      },
      save: {
        saveVisible: false,
        titles: "",
        obj: {
            discountCycle:"",
            duringMoreFree:"1",
            freeConsumption:1,
            customOption:"",
            preferentialType:1,
            distributionMode:1
        }
      },
      show:{
          batchNum:false,
          freelist:false
      },
      user:window.localStorage.getItem("user")
    };
  },
  created() {
    var park = this.common.getParkList();
    this.park = park;
    console.log("333" + this.park);
  },
  mounted() {
    this.querybusinessqrcode();
    this.getmerchant();
  },
  methods: {
      //商户列表请求
    getmerchant() {
      var _this = this;
      var para = {
        jwt: window.localStorage.getItem("jwt")
      };
      reqmerchant(para)
        .then(res => {
          console.log(res);
          if (res.code === 1) {
            var list = res.shopNameList;
            list.forEach(item => {
              var temp = { value: item["shopId"], label: item["shopName"] };
              _this.merchant.push(temp);
            });
          } else {
          }
        })
        .catch(() => {});
    },
      distributionModechange(val){
         if(val==2){
             this.show.batchNum=true;
         }else{
              this.show.batchNum=false;
         }
      },

    //添加商户信息展示
    addbusiness() {
      var obj = this.save.obj;

      this.save.saveVisible = true;
      this.save.titles = "商户二维码的优惠券";
    //   for (var item in obj) {
    //     obj[item] = "";
    //   }
    //   obj.preferentialType=1;
    //   obj.distributionMode=1;

    },
    // //编辑商户信息展示
    // handleedit(index, row) {
    //   this.save.saveVisible = true;
    //   this.save.titles = "编辑商户";
    //   this.save.obj = Object.assign({}, row);
    // },
    //多选框选中
    handleselectchange(sels) {
      console.log(sels);
      this.checkBoxs = sels;
    },
    //添加列表
    savebusiness() {
      var save = this.save.obj;
    //   var start= new Date(save["duringDateTimeStart"]).getFullYear;
      let para = {
        jwt: window.localStorage.getItem("jwt"),
        parkNo:save["park"],
        distribution: save["distributionMode"],
        merchantNo: save["merchant"],
        startDate:save["duringDateTimeStart"],
        endDate: save["duringDateTimeEnd"],
        couponType: save["preferentialType"],
        customDiscounts: save["customDiscounts"],
        numerical:save["freeList"],
        printNum:save["printCount"],
        publisher:JSON.parse(this.user)["username"]
      };
    
      if (!save.couponId) {
        para.title = "添加";
      } else {
        para.couponNo = save["couponId"];
        para.title = "修改";
      }
      reqSavebusinessQrcode(para).then(res => {
        if (res.code === 1) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.querybusinessqrcode();
        }
      });
    },
    //查询
    querybusinessqrcode() {
      var list = this.filters;
      var _this = this;
      
      let para = {
        parkNo: list.park,
        merchantNo: list.merchant,
        couponType: list.preferentialType,
        startDate: list.duringDateTimeFrom,
        endDate: list.duringDateTimeTo,
        minCreateDate: list.createDataTimeFrom,
        maxCreateDate: list.createDataTimeTo,
        useState: list.useState,
       
        jwt: window.localStorage.getItem("jwt"),
        currentPage: this.totals.currentPage,
        pageSize: this.totals.pageSize
      };
      reqbusinessqrcode(para).then(res => {
          console.log(res);
        if (res.code === 1) {
          _this.totals.totalNum = res.totalNum;
          var list = res.couponInfoList;
          _this.getRetList(list, _this);
        }
      });
    },
    handlecurrentchange(val){
       this.totals.currentPage=val;
       this.querybusinessqrcode();
    },
    //返回参数解析
    getRetList(retpara, _this) {
        _this.businessQRcode=[];
      retpara.forEach(item => {
          var couponTypeId=item["couponType"];
          var couponType="";
         if(couponType==1){
          couponType="免单";
         } 
         var numerical=item["numerical"];

         var couponmessage=couponType+numerical;
        var temp = {
          couponId: item["couponNo"],
          businessName: item["merchantName"],
          preferentialInformation: couponmessage,
          duringDateTime: item["startDate"],
          preferentialInformation:preferentialInformation,
          useState: item["useState"],
          publisher: item["publisher"],
          createTime: item["createDate"],
          useDateTime: item["useDate"],

        };

        _this.businessQRcode.push(temp);
      });
    },
    //批量删除
    batchdelete() {
      var couponNo = this.checkBoxs.map(item => item.couponId).toString();
      if(couponNo.length===0){
           this.$alert("请选择要删除的行", "提示", {
        type: "warning"
      })
      return;
      }
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: couponNo };
          para.jwt = window.localStorage.getItem("jwt");
          batchDeletebusinessqrcode(para).then(res => {
            this.listLoading = false;
            if (res.code === 1) {
              //NProgress.done();
              this.$message({
                message: "删除成功",
                type: "success"
              });
            }

            this.querybusinessqrcode();
          });
        })
        .catch(() => {});
    },
    //单行删除
    handledel(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { couponNo: row.couponId };
          para.jwt = window.localStorage.getItem("jwt");
          reqDeleteOnebusinessQrcode(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.querybusinessqrcode();
          });
        })
        .catch(() => {});
    },
    clearquery(){
        var filter = this.filters;
      for (var item in filter) {
        filter[item] = "";
      }
    },
    freetypechange(val){
        if(val==1){
           this.save.obj.freeList="";
           this.show.freelist=false;
        }else if(val==2){
            this.save.obj.freeListTitle="免时常";
            this.show.freelist=true;
        }else if(val==3){
            this.save.obj.freeListTitle="免金额";
             this.show.freelist=true;
        }else if(val==4){
             this.save.obj.freeListTitle="按比例";
             this.show.freelist=true;
        }else if(val==5){
             this.save.obj.freeListTitle="有效期内多次免单";
             this.show.freelist=true;
        }
    }
  }
};
</script>
<style >
.showarea a {
  text-decoration: none;
  font-size: 9px;
}
.showStatus1{
    color:#fff;
    background-color:#32CD32;
    padding:5px;border-radius:3px;
}
.showStatus2{
    color:#fff;background-color:red;padding:5px;
}
.saveShow .el-row{
    margin-top:10px;
    /* line-height: 30px; */
}
</style>


