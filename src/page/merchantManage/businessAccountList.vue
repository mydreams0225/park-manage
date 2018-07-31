<template>
    <section>
        <div class="parent">
            <!-- 操作区 -->
            <div class="margin-tops">
                <el-button type="primary" size="medium" @click="addbusiness"><i class="el-icon-plus"></i> 新增</el-button>
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
                <el-input placeholder="商户名称"  v-model="filters.bussinessName">
                     <template slot="prepend">商户名称</template>   
                </el-input>
                <el-input placeholder="门牌号"  v-model="filters.bussinessAccount">
                     <template slot="prepend">商户账号</template>   
                </el-input>
                 <span>商户状态</span>
                <el-select v-model="filters.bussinessStatus" >
                    <el-option
                        v-for="item in bussinessStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                </el-select>
                <el-button type="primary" size="medium" @click="querybusiness"><i class="el-icon-search" ></i>查询</el-button>
                <el-button size="medium" @click="clearquery"><i class="el-icon-delete"></i> 清除</el-button>
            </div>
            <!-- 展示区 -->
            <div class="margin-tops showarea">
               <el-table
               :data="businessAccountList"
               tool-tip-effect="dark"
               style="100%"
               border
               @selection-change="handleselectchange">
                   <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        type="index"
                        label="序号">
                    </el-table-column>
                    <el-table-column
                        prop="businessName"
                        label="商户名称">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名">
                    </el-table-column>
                     <el-table-column
                        prop="businessAccount"
                        label="商户账号">
                    </el-table-column>
                     <el-table-column
                        prop="discounts"
                        label="打折次数">
                    </el-table-column>
                    <el-table-column
                        prop="discountType"
                        label="可选用打折类型">
                    </el-table-column>
                    <el-table-column
                        prop="discountedTimes"
                        label="已打折次数">
                    </el-table-column>
                     <el-table-column
                        prop="isCreateSubAccount"
                        label="是否可创建子账号">
                        <template slot-scope="scoped">
                            <span v-if="scoped.row.isCreateSubAccount==1" style="color:red;"><i class="el-icon-error"></i></span>
                            <span v-if="scoped.row.isCreateSubAccount==2" style="color:#32CD32;"><i class="el-icon-success"></i></span>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="isbatchQRcode"
                        label="是否可以生成批量打折二维码">
                        <template slot-scope="scoped">
                            <span v-if="scoped.row.isbatchQRcode==1" style="color:red;"><i class="el-icon-error"></i></span>
                            <span v-if="scoped.row.isbatchQRcode==2" style="color:#32CD32;"><i class="el-icon-success"></i></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="bussinessStatus"
                        label="状态">
                        <template slot-scope="scoped">
                            <span v-if="scoped.row.bussinessStatus==1" class="showStatus1">激活</span>
                            <span v-if="scoped.row.bussinessStatus==2" class="showStatus2">未激活</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建时间">
                    </el-table-column>
                    <el-table-column
                        prop="businessOperation"
                        label="业务操作"
                        width="200px">
                        <template slot-scope="scope">
                                
                                <a href="#" >[查看打折记录] </a>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="operation"
                        label="操作"
                        width="120px">
                        <template slot-scope="scopes">
                            <el-button 
                                type="primary"
                                icon="el-icon-edit" 
                                circle 
                                size="mini" 
                                @click="handleedit(scopes.$index, scopes.row)">
                            </el-button>
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
                            <el-col :span="12">
                                <span style="color:red">*</span><span>姓名:</span>
                                <div><el-input placeholder="必填" v-model="save.obj.name"></el-input></div>
                            </el-col>
                        </el-row>
                         <el-row :gutter="20">
                            <el-col :span="12">
                                <span style="color:red">*</span><span>商户账号：</span>
                                <div><el-input v-model="save.obj.businessAccount"></el-input></div>
                            </el-col>
                            <el-col :span="12">
                                <span style="color:red">*</span><span>密码：</span>
                                <div><el-input v-model="save.obj.password"></el-input></div>
                            </el-col>
                        </el-row>
                         <el-row :gutter="20">
                            <el-col :span="6">
                                <span>折扣周期：</span>
                                <div>
                                    <el-select v-model="save.obj.discountCycle" filterable >
                                <el-option
                                    v-for="item in sels.discountCycle"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                                </el-select>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <span>周期内打折次数： </span>
                                <div><el-input v-model="save.obj.cycleDiscountTimes"></el-input></div>
                            </el-col>
                            <el-col :span="12">
                                <span>状态： </span>
                                <div>
                                <el-select v-model="save.obj.bussinessStatus" filterable >
                                <el-option
                                    v-for="item in sels.bussinessStatus"
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
                                <span>是否可以生成批量打折二维码：</span>
                              
                                   <el-radio-group v-model="save.obj.isbatchQRcode">
                                        <el-radio :label="1">是</el-radio>
                                        <el-radio :label="2">否</el-radio>
                                       
                                    </el-radio-group>
                               
                            </el-col>
                            <el-col :span="12">
                               <span>是否可创建子账号：</span>
                              
                                   <el-radio-group v-model="save.obj.isCreateSubAccount">
                                        <el-radio :label="1">是</el-radio>
                                        <el-radio :label="2">否</el-radio>
                                    </el-radio-group>
                               
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <span>免单:</span>
                                   <el-radio-group v-model="save.obj.freeConsumption">
                                        <el-radio :label="1">启用</el-radio>
                                        <el-radio :label="2">不启用</el-radio>
                                       
                                    </el-radio-group>
                               
                            </el-col>
                            
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <span>免时间(分钟)：</span>
                                   <el-radio-group @change="changefreeminute" v-model="save.obj.freeMinute">
                                        <el-radio  :label="1">启用</el-radio>
                                        <el-radio  :label="2">不启用</el-radio>
                                       
                                    </el-radio-group>
                               
                            </el-col>
                            
                        </el-row>
                        <el-row v-show="show.showFreeMinute" :gutter="20">
                            <el-col :span="12">
                                <span>单次最大可免时间(分钟)：</span>
                                <div><el-input v-model="save.obj.maxFreeTime"></el-input></div>
                            </el-col>
                            <el-col :span="12">
                                <span>自定义选项的小时数：</span>
                                <div><el-input v-model="save.obj.customOption"></el-input></div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <span>免金额(元)：</span>
                                <el-radio-group @change="changefreemoney" v-model="save.obj.isusefreeMoney">
                                        <el-radio :label="1">启用</el-radio>
                                        <el-radio :label="2">不启用</el-radio>
                                       
                                    </el-radio-group>
                            </el-col>
                            <el-col v-show="show.showFreeMoney" :span="12"> 
                                <el-input v-model="save.obj.freeMoney"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <span>按比例(%)：</span>
                                <el-radio-group @change="changefreeproportion" v-model="save.obj.isusebyProportionFree">
                                        <el-radio :label="1">启用</el-radio>
                                        <el-radio :label="2">不启用</el-radio>
                                       
                                    </el-radio-group>
                            </el-col>
                            <el-col v-show="show.showFreeProportion" :span="12"> 
                                <el-input v-model="save.obj.byProportionFree"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <span>有效期内多次免单：</span>
                                <el-radio-group v-model="save.obj.duringMoreFree">
                                        <el-radio :label="1">启用</el-radio>
                                        <el-radio :label="2">不启用</el-radio>
                                    </el-radio-group>
                            </el-col>
                            
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <span>备注：</span>
                                <div><el-input v-model="save.obj.memo"></el-input></div>
                            </el-col>  
                        </el-row>
                        
					 </div>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="save.saveVisible=false">取 消</el-button>
				    <el-button type="primary" @click="savebusiness">保 存</el-button>
				  </span>
				</el-dialog>
        </div>
    </section>
</template>
<script>
import {
  reqbusinessAccountList,
  batchDeletebusinessAccountList,
  reqSavebusinessAccountList,
  reqDeleteOnebusinessAccountList,
  reqmerchant // 获取所属商户
} from "@/api/businessManage";
export default {
  data() {
    return {
        show:{
            showFreeMinute:true,
            showFreeMoney:true,
            showFreeProportion:true
        },
      sels: {
        discountCycle: [],
        bussinessStatus: business.bussinessStatus
      },
      checkBoxs: [],
      merchant: [],
      bussinessStatus: [],
      dialogVisible: false,
      // park:[],
      filters: {
        park: "",
        bussinessName: "",
        businessName: ""
      },

      businessAccountList: [
        {
          businessName: "shanhu", //商户名称
          name: "zlz", //姓名
          businessAccount: "0001", //打折次数
          discounts: "1", //打折次数
          discountType: "type", //打折类型
          discountedTimes: "3", //已打折次数
          isCreateSubAccount: 1, //是否创建子账号
          isbatchQRcode: 1, //是否可以生成批量二维码
          duringMoreFree: 1,
          bussinessStatus: "1", //状态
          createTime: "2018-8-8", //创建时间
          freeConsumption: 1, //
          freeMinute: 1, //免分钟
          isusefreeMoney: 1, //免金额
          isusebyProportionFree: 1, //是否启用免费
          customOption: ""
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
          discountCycle: "",
          duringMoreFree: "1",
          freeConsumption: 1,
          customOption: ""
        }
      }
    };
  },
  created() {
    var park = this.common.getParkList();
    this.park = park;
    console.log("333" + this.park);
  },
  mounted() {
    this.querybusiness();
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
          if (res.code === 1) {
            var list = JSON.parse(res.list);
            list.forEach(item => {
              var temp = { value: item["shopId"], label: item["shopName"] };
              _this.merchant.push(temp);
            });
          }
        })
        .catch(() => {});
    },
    handlecurrentchange(val) {
      this.totals.currentPage = val;
    },
    //添加商户信息展示
    addbusiness() {
      var obj = this.save.obj;

      this.save.saveVisible = true;
      this.save.titles = "添加商户";
      for (var item in obj) {
        obj[item] = "";
      }
    },
    //编辑商户信息展示
    handleedit(index, row) {
      this.save.saveVisible = true;
      this.save.titles = "编辑商户";
      this.save.obj = Object.assign({}, row);
    },
    //多选框选中
    handleselectchange(sels) {
      console.log(sels);
      this.checkBoxs = sels;
    },
    //添加或修改商户列表
    savebusiness() {
      var save = this.save.obj;
      let para = {
        jwt: window.localStorage.getItem("jwt"),
        businessName: save["businessName"],
        doorNumber: save["doorNumber"],
        contacts: save["contacts"],
        contactNumber: save["contactNumber"],
        isOpenLock: save["isOpenLock"],
        customDiscounts: save["customDiscounts"]
      };
      if (!save.businessId) {
        para.title = "添加";
      } else {
        para.businessId = save["businessId"];
        para.title = "修改";
      }
      reqSavebusinessAccountList(para).then(res => {
        if (res.code === 1) {
          this.$message({
            message: "保存成功成功",
            type: "success"
          });
          this.querybusiness();
        }
      });
    },
    //查询
    querybusiness() {
      var list = this.filters;
      var _this = this;
      let para = {
        park: list.park,
        businessName: list.businessName,
        doorNumber: list.doorNumber,
        jwt: window.localStorage.getItem("jwt"),
        currentPage: this.totals.currentPage,
        pageSize: this.totals.pageSize
      };
      reqbusinessAccountList(para).then(res => {
        if (res.code === 1) {
          _this.totals.totalNum = res.totalNum;
          var list = JSON.parse(res.list);
          getRetList(list, _this);
        }
      });
    },
    handlecurrentchange(val) {
      this.totals.currentPage = val;
      this.querybusiness();
    },
    //返回参数解析
    getRetList(retpara, _this) {
      retpara.forEach(item => {
        var temp = {
          businessId: item["businessId"],
          businessName: item["businessName"],
          doorNumber: item["doorNumber"],
          contacts: item["contacts"],
          contactNumber: item["contactNumber"],
          isOpenLock: item["isOpenLock"],
          customDiscounts: item["customDiscounts"],
          createTime: item["createTime"]
        };

        _this.businessAccountList.push(temp);
      });
    },
    //批量删除
    batchdelete() {
      var businessId = this.checkBoxs.map(item => item.businessId).toString();
      if (businessId.length === 0) {
        this.$alert("请选择要删除的行", "提示", {
          type: "warning"
        });
        return;
      }
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { businessId: businessId };
          para.jwt = window.localStorage.getItem("jwt");
          batchDeletebusinessAccountList(para).then(res => {
            this.listLoading = false;
            if (res.code === 1) {
              //NProgress.done();
              this.$message({
                message: "删除成功",
                type: "success"
              });
            }

            this.querybusiness();
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
          let para = { id: row.businessId };
          para.jwt = window.localStorage.getItem("jwt");
          reqDeleteOnebusinessAccountList(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getParkingRate();
          });
        })
        .catch(() => {});
    },
    clearquery() {
      var filter = this.filters;
      for (var item in filter) {
        filter[item] = "";
      }
    },
    //免时间
    changefreeminute(val){
       console.log(val);
       if(val==2){
          this.show.showFreeMinute=false;
       }else{
         this.show.showFreeMinute=true;
       }
    },
    //免金额改变
    changefreemoney(val){
        if(val==2){
            this.show.showFreeMoney=false;
        }else{
            this.show.showFreeMoney=true;
        }
    },
    //按比例
    changefreeproportion(val){
        if(val===2){
            this.show.showFreeProportion=true;
        }else{
            this.show.showFreeProportion=false;
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
.showStatus1 {
  color: #fff;
  background-color: #32cd32;
  padding: 5px;
  border-radius: 3px;
}
.showStatus2 {
  color: #fff;
  background-color: red;
  padding: 5px;
}
.saveShow .el-row {
  margin-top: 10px;
  /* line-height: 30px; */
}
</style>


