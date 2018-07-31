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
                <el-input placeholder="商户名称"  v-model="filters.bussinessName">
                     <template slot="prepend">商户名称</template>   
                </el-input>
                <el-input placeholder="门牌号"  v-model="filters.doorNumber">
                     <template slot="prepend">门牌号</template>   
                </el-input>
                <el-button type="primary" size="medium" @click="querybusiness"><i class="el-icon-search" ></i>查询</el-button>
                <el-button size="medium" @click="clearquery"><i class="el-icon-delete"></i> 清除</el-button>
            </div>
            <!-- 展示区 -->
            <div class="margin-tops showarea">
               <el-table
               :data="businessList"
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
                        prop="businessId"
                        label="商户ID"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="businessName"
                        label="商户名称">
                    </el-table-column>
                    <el-table-column
                        prop="doorNumber"
                        label="门牌号">
                    </el-table-column>
                     <el-table-column
                        prop="contacts"
                        label="联系人">
                    </el-table-column>
                     <el-table-column
                        prop="contactNumber"
                        label="联系电话">
                    </el-table-column>
                     <el-table-column
                        prop="isOpenLock"
                        label="是否开启加密锁">
                        <template slot-scope="scoped">
                            <span v-if="scoped.row.isOpenLock==0" style="color:red;"><i class="el-icon-error"></i></span>
                            <span v-if="scoped.row.isOpenLock==1" style="color:#32CD32;"><i class="el-icon-success"></i></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="customDiscounts"
                        label="自定义折扣原因">
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
                                <a href="" >[查看商户账号]</a>
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
				  width="40%"	>
				     <div>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <span style="color:red">*</span><span>停车场:</span>
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
                            <el-col :span="12">
                                <span style="color:red">*</span><span>商户名称:</span>
                                <div><el-input placeholder="必填" v-model="save.obj.businessName"></el-input><span style="display:none">{{save.obj.businessId}}</span></div>
                            </el-col>
                        </el-row>
                         <el-row :gutter="20">
                            <el-col :span="12">
                                <span>门牌号：</span>
                                <div><el-input v-model="save.obj.doorNumber"></el-input></div>
                            </el-col>
                            <el-col :span="12">
                                <span>详细地址：</span>
                                <div><el-input v-model="save.obj.address"></el-input></div>
                            </el-col>
                        </el-row>
                         <el-row :gutter="20">
                            <el-col :span="12">
                                <span>联系人：</span>
                                <div><el-input v-model="save.obj.contacts"></el-input></div>
                            </el-col>
                            <el-col :span="12">
                                <span>联系人电话：</span>
                                <div><el-input v-model="save.obj.contactNumber"></el-input></div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <span style="color:red">*</span><span>是否开启加密锁：</span>
                                <div>
                               <el-select v-model="save.obj.isOpenLock" filterable >
                                <el-option
                                    v-for="item in isOpenLock"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                                </el-select></div>
                            </el-col>
                            <el-col :span="12">
                                <span>备注：</span>
                                <div><el-input v-model="save.obj.memo"></el-input></div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <span>自定义打折原因选项：(多个以“;”号隔开)</span>
                                <div><el-input v-model="save.obj.customDiscounts"></el-input></div>
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
  reqBusinessList,
  batchDeleteBusinessList,
  reqAddBusinessList,
  reqModifyBusinessList,
  reqDeleteOneBusinessList
} from "@/api/businessManage";
export default {
  data() {
    return {
      checkBoxs: [],
      dialogVisible: false,
      // park:[],
      filters: {
        park: "",
        bussinessName: "",
        businessName: ""
      },
      isOpenLock: business.isOpenLock,
      businessList: [
        {
          businessId: "1",
          businessName: "shanhu",
          doorNumber: "111",
          contacts: "wo",
          contactNumber: "111",
          isOpenLock: "1",
          customDiscounts: "", //折扣原因
          createTime: "2017-3-3"
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
        obj: {}
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
  },
  methods: {
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
        parkId:save["park"],//停车场编号
        shopName: save["businessName"],//商户名称
        shopNum: save["doorNumber"],//门牌号
        contact: save["contacts"],//联系人
        telePhone: save["contactNumber"],//手机号
        isLock: save["isOpenLock"],//是否开启加锁
        remark: save["customDiscounts"] ,//联系地址
        address:save["address"],//地址
        reason:save["memo"]//备注
      };
      if (!save.businessId) {
          //添加
            reqAddBusinessList(para).then(res => {
                if (res.code === 1) {
                this.$message({
                    message: "添加成功",
                    type: "success"
                });
                
                }
            }).catch(()=>{
                console.log("错误")
            });
        // para.title = "添加";
      } else {
        para.shopId = save["businessId"];
        reqModifyBusinessList(para).then(res => {
                if (res.code === 1) {
                this.$message({
                    message: "修改成功",
                    type: "success"
                });
                
                }
            }).catch(()=>{
                console.log("错误");
            });
        // para.title = "修改";
      }
      this.querybusiness();
      
    },
    //查询
    querybusiness() {
      var list = this.filters;
      var _this = this;
      let para = {
        parkId: list.park,
        shopName: list.businessName,
        shopNum: list.doorNumber,
        jwt: window.localStorage.getItem("jwt"),
        currentPage: this.totals.currentPage,
        pageSize: this.totals.pageSize
      };
      reqBusinessList(para).then(res => {
        if (res.code === 1) {
          _this.totals.totalNum = res.totalNum;
          var list = JSON.parse(res.list);
          getRetList(list, _this);
        }
      });
    },
    handlecurrentchange(val){
       this.totals.currentPage=val;
       this.querybusiness();
    },
    //返回参数解析
    getRetList(retpara, _this) {
      retpara.forEach(item => {
        var temp = {
          businessId: item["shopId"],
          businessName: item["shopName"],
          doorNumber: item["shopNum"],
          contacts: item["contact"],
          contactNumber: item["telePhone"],
          isOpenLock:parseInt(item["isLock"]) ,
          customDiscounts: item["remark"],
          createTime: item["createDate"]
        };

        _this.businessList.push(temp);
      });
    },
    //批量删除
    batchdelete() {
      var businessId = this.checkBoxs.map(item => item.businessId).toString();
      if(businessId.length===0){
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
          let para = { shopId: businessId };
          para.jwt = window.localStorage.getItem("jwt");
          batchDeleteBusinessList(para).then(res => {
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
          let para = { shopId: row.businessId };
          para.jwt = window.localStorage.getItem("jwt");
          reqDeleteOneBusinessList(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.querybusiness();
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
  }
};
</script>
<style  scoped>
.showarea a {
  text-decoration: none;
  font-size: 9px;
}
</style>


