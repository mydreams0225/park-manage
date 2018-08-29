<template>
    <section>
       <div class="parent">
           <div class="margin-tops">
               <el-button type="success" size="medium" class="el-icon-plus" @click="openBusiness">新增商户</el-button>
               <query :area="areas" @querys="queryBusiness"></query>
           </div>
           <!-- 展示区 -->
           <div class="margin-tops">
               <el-table
                   v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :data="businessData"
                   
                    border
                    style="width: 100%">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                    prop="sellersId"
                    label="商户编号"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="sellersName"
                    label="商户名称"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="sellersTradeType"
                    label="商户行业类型">
                    </el-table-column>
                    <el-table-column
                    prop="sellersAPPID"
                    label="商户APPID">
                    </el-table-column>
                    <el-table-column
                    prop="contacttMethod"
                    label="联系方式">
                    </el-table-column>
                    <el-table-column
                    prop="contacts"
                    label="联系人">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    label="创建日期">
                    </el-table-column>
                    <el-table-column
                    prop="status"
                    label="状态">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="180">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="primary" size="mini" class="el-icon-edit"></el-button>
                                <el-button
                                @click.native.prevent="deleteRow(scope.$index, scope.row.sellersId)"
                                type="danger"
                                class="el-icon-error"
                                size="mini"
                                >
                                </el-button>
                            </template>
                     </el-table-column>
                </el-table>
           </div>
           <div class="margin-tops">
               <paging :total="totals" @handleCurrentChange="handleCurrentChanges"> </paging>
           </div>
           <businessDialog :dialog="dialog" :info="info" @submit="submits"></businessDialog>   
       </div>
    </section>
</template>
<script>
import query from "@/components/query";
import {
  reqBusiness, // 查询请求
  reqAddBusiness, // 添加请求
  reqEditBusiness, // 修改请求
  reqDeleteBusiness // 单行删除
} from "@/api/businessManage";
import paging from "@/components/paging"; // 引入分页组件
import businessDialog from "@/components/businessDialog"; // 引入添加修改弹出界面

export default {
  data() {
    return {
      loading: true, // 展示区加载中
      //// 父组件传给子组件
      areas: {
        name: "商户名称",
        code: "商户编码"
      },
      filters: {
        names: "",
        codes: ""
      },
      totals: {
        totalNum: 0,
        pageSize: 10,
        currentPage: 1
      },
      businessData: [
        {
          sellersId: "1",
          sellersName: "gg",
          sellersTradeType: "行业2",
          sellersAPPID: "appid",
          contacts: "zlz",
          status: "禁用",
          ff: ""
        }
      ],
      dialog: {
        title: "",
        dialogVisible: false,

        loading: false
      },
      info: {
        //  sellersName: "",
        //  sellersTradeType: "",
        //  // sellersAPPID: "", //父传子
        //  contacts: "",
      }
    };
  },
  mounted() {
    this.queryBusiness(this.filters.names, this.filters.codes);
  },
  methods: {
    //打开商户添加页面
    openBusiness() {
      this.dialog.dialogVisible = true;
      this.dialog.title = "添加商户列表";
      this.info = {};
    },
    //查询
    queryBusiness(name, code) {
      this.filters.names = name;
      this.filters.codes = code;
      //入参
      let para = {
        merchantno: this.filters.names,
        merchantname: this.filters.codes,
        currentPage: this.totals.currentPage,
        pageSize: this.totals.pageSize,
        token: window.localStorage.getItem("token")
      };
      this.loading = true;
      reqBusiness(para).then(res => {
        this.businessData = [];
        if (res.status === 200) {
          let list = res.data.merchantList;
          if (list) {
            list.forEach(item => {
              var val = item.sellersTradType;
              var sellersTradTypes = business.mccode; // 行业id
              var sellersTradTypeName = "";
              for (var item in sellersTradTypes) {
                if (val === data[item]["value"]) {
                  sellersTradTypeName = data[item]["name"];
                }
              }
              let baseinfoareas = [];
              let businessScopes = [];
              let settleAccountarea = [];
              baseinfoareas.push(
                item.merchantpro,
                item.merchantcity,
                item.merchantarea
              );
              businessScopes.push(item.businessstartdate, item.businessenddate);
              settleAccountarea.push(item.regbankpro, item.regbankcity);
              let temp = {
                createTime: item.createTime,
                status: item.status,
                sellersId: item.merchantno, // 商户id
                sellersAPPID: item.wechatappid, // 微信appid
                contacts: item.contacts, // 联系人
                email: item.email, // 邮箱
                fixedPhone: item.phone, // 电话
                mobilePhone: item.mobphonenumber, // 手机号
                sellersJC: item.merchantshortname, // 商户简称
                baseinfoarea: baseinfoareas, // 地区 必填
                rate: item.rate, // 费率
                //商户信息
                sellersName: item.merchantinfo, // 商户名称
                registAddress: item.merchantregaddress, // 注册地址
                businessLicenceNo: item.businesslicencenum, // 营业执照注册号
                sellersTradeType: item.mccode, // 商户行业类型
                businessScope: item.businessrange, // 经营范围
                // businessTerm: businessScopes, // 营业期限
                tycode: item.organnum, // 组织机构代码/统一社会信用代码,
                operateTerm: businessScopes, //经营期限

                certifyHolderType: item.cerhavetype, // 证件持有人类型
                certifyHolderName: item.cername, // 证件持有人名称
                certifyType: item.certype, // 证件类型
                //结算账号
                accountName: item.bankpersonname, // 开户行名称
                settleAccountarea: settleAccountarea, //  开户行地区 必填
                accountOpenBank: item.regbank, // 开户行账号
                bankAccount: item.cardno, // 银行账号
                //附件
                businessLinseimgUrl: item.businesspath, // 营业执照
                openPermitimgUrl: item.openingpath, // 开户许可证
                identityCardfimgUrl: item.frontcardpath, // 身份证背面照
                identityCardzimgUrl: item.backcardpath // 身份证正面照
              };
              this.businessData.push(temp);
            });
          }
          this.totals.totalNum = res.data.totalNum; //总条数
        } else {
        }
        this.loading = false;
      });
    },
    //改变当前页数
    handleCurrentChanges(currentPage, pageSize) {
      this.totals.currentPage = currentPage;
      this.totals.pageSize = pageSize;
      this.queryBusiness(this.filters.names, this.filters.codes);
    },
    //单行删除
    deleteRow(index, rowId) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          let para = {
            merchantno: rowId,
            token: window.localStorage.getItem("token")
          };
          reqDeleteBusiness(para).then(res => {
            if (res.status === 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
            }
            this.queryBusiness(this.filters.names, this.filters.codes);
          });
        })
        .catch(() => {});

      // console.log("rows");
      // console.log(rowId);
      // rows.splice(index, 1);
    },
    //编辑信息查看
    handleClick(row) {
      console.log("row");
      console.log(row);
      this.dialog;
      this.dialog.dialogVisible = true;
      this.dialog.title = "修改商户列表";
      this.info = row;
    },
    // 子组件传给父组件
    submits(obj) {
      console.log("obj1");
      console.log(obj);
      this.dialog.loading = true;
      let para = {
        // 基本信息
        merchantno: obj.info.sellersId, // 商户id
        wechatappid: obj.info.sellersAPPID, // 微信appid
        contacts: obj.info.contacts, // 联系人
        email: obj.info.email, // 邮箱
        phone: obj.info.fixedPhone, // 电话
        mobphonenumber: obj.info.mobilePhone, // 手机号
        merchantshortname: obj.info.sellersJC, // 商户简称
        baseinfoarea: obj.info.baseinfoarea, // 地区 必填
        rate: obj.info.rate, // 费率
        //商户信息
        merchantinfo: obj.info.sellersName, // 商户名称
        merchantregaddress: obj.info.registAddress, // 注册地址
        businesslicencenum: obj.info.businessLicenceNo, // 营业执照注册号

        mccode: obj.info.sellersTradeType, // 商户行业类型
        businessrange: obj.info.businessScope, //经营范围
        businessstartdate: obj.info.operateTerm[0] || "",
        businessenddate: obj.info.operateTerm[1] || "", // 经营范围
        // businessTerm: obj.info.businessTerm, // 营业期限
        organnum: obj.info.tycode, // 组织机构代码/统一社会信用代码,

        cerhavetype: obj.info.certifyHolderType, // 证件持有人类型
        cername: obj.info.certifyHolderName, // 证件持有人名称
        certype: obj.info.certifyType, // 证件类型
        //结算账号
        bankpersonname: obj.info.accountName, // 开户行名称
        settleAccountarea: obj.info.settleAccountarea, //  开户行地区 必填
        regbank: obj.info.accountOpenBank, // 开户行账号
        cardno: obj.info.bankAccount, // 银行账号
        //附件
        businesspath: obj.info.businessLinseimgUrl, // 营业执照
        openingpath: obj.info.openPermitimgUrl, // 开户许可证
        frontcardpath: obj.info.identityCardfimgUrl, // 身份证背面照
        backcardpath: obj.info.identityCardzimgUrl, // 身份证正面照
        token: window.localStorage.getItem("token")
      };
      if (this.dialog.title === "添加商户列表") {
        //添加请求
        reqAddBusiness(para).then(res => {
          if (res.status === 200) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.dialog.dialogVisible = false;
            this.dialog.loading = false;
            this.queryBusiness(this.filters.names, this.filters.codes);
            this.loading = false;
          }
        });
      } else {
        //修改请求
        reqEditBusiness(para).then(res => {
          if (res.status === 200) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.dialog.dialogVisible = false;
            this.dialog.loading = false;
            this.queryBusiness(this.filters.names, this.filters.codes);
            this.loading = false;
          }
        });
      }
    }
  },

  components: {
    query, //查询
    paging,
    businessDialog
  }
};
</script>
<style>
</style>


