<template>
    
    <section>
         <div class="parent">
             <div class="margin-tops clearF" >
                 <query :area="areas" @querys="queryflow"></query>
             </div>
              <div class="margin-tops">
               <el-table
                   v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :data="flowData"
                    height="250"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="sellersId"
                    label="商户编号"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="orderId"
                    label="内部订单号"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="wxorderId"
                    label="微信订单号">
                    </el-table-column>
                    <el-table-column
                    prop="tradeChannel"
                    label="交易渠道">
                    </el-table-column>
                    <el-table-column
                    prop="tradeTime"
                    label="交易时间">
                    </el-table-column>
                    <el-table-column
                    prop="storeId"
                    label="店铺编号">
                    </el-table-column>
                     <el-table-column
                    prop="deviceNo"
                    label="设备号">
                    </el-table-column>
                    <el-table-column
                    prop="tradeMoney"
                    label="交易金额">
                    </el-table-column>
                    <el-table-column
                    prop="tradeStatus"
                    label="交易状态">
                    </el-table-column>
                    <el-table-column
                    prop="wxopenid"
                    label="微信openid">
                    </el-table-column>
                    <el-table-column
                    prop="wxsubopenid"
                    label="微信subopenid">
                    </el-table-column>
                     <el-table-column
                    prop="businessExId"
                    label="业务扩展员编号">
                    </el-table-column>
                    <el-table-column
                    prop="wxmemo"
                    label="微信返回的备注">
                    </el-table-column>
                </el-table>
           </div>
             <div class="margin-tops">
               <paging :total="totals" @handleCurrentChange="handleCurrentChanges"> </paging>
           </div>
         </div>
    </section>
</template>
<script>
import query from "@/components/query";
import paging from "@/components/paging";
import { reqFlow } from "@/api/flowQuery";
export default {
  data() {
    return {
      loading: false,
      flowData: [],
      areas: {
        name: "内部订单号", //内部订单号
        code: "商品编号" //商品编号
      },
      filters: {
        orderNo: "",
        codes: ""
      },
      totals: {
        totalNum: 0,
        pageSize: 10,
        currentPage: 1
      }
    };
  },
  mounted() {
    this.queryflow();
  },
  methods: {
    queryflow(name, code) {
      this.filters.orderNo = name;
      this.filters.codes = code;
      let para = {
        tmordernum: this.filters.orderNo || "",
        merchantno: this.filters.codes || "",
        currentPage: this.totals.currentPage,
        pageSize: this.totals.pageSize,
        token: window.localStorage.getItem("token")
      };
      this.loading = true;
      reqFlow(para).then(res => {
        if (res.status === 200) {
          this.flowData = [];
          var list = res.data.transactionList;
          if (list) {
            list.forEach(item => {
              var temp = {
                sellersId: item.merchantno, // 商户编号(微信商户号)
                orderId: item.tmordernum, // 内部订单号,
                wxorderId: item.wechatordernum, // 微信订单号,
                tradeChannel: item.channel, // 交易渠道(1.微信2.支付宝)
                tradeTime: item.tmtrandate, // 内部交易日期
                storeId: item.shopno, // 店铺id
                deviceNo: item.deviceinfo, // 设备号
                tradeMoney: item.tranamt, // 交易金额
                tradeStatus: item.transtate, // 交易状态0:待支付 1:支付中 2:支付完成 3:支付失败'
                wxopenid: item.openid, // 微信openid
                wxsubopenid: item.subopenid, // 微信subopenid
                businessExId: item.businessno, // 业务扩展员编号
                wxmemo: item.remark // 微信返回的备注
              };
              this.flowData.push(temp);
            });
          }
          this.totals.totalNum = res.data.totalNum; //总条数
        }
        if (res.status === 202) {
          window.localStorage.removeItem("user");
          window.localStorage.removeItem("userRole");
          window.localStorage.removeItem("userInfo");
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("isLoadNodes");
          this.$message({
                message: "请求超时，请刷新页面重新登录",
                type: "error"
              });
        }
        this.loading = false;
      });
    },
    handleCurrentChanges(currentPage, pageSize) {
      this.totals.currentPage = currentPage;
      this.totals.pageSize = pageSize;
      this.queryflow(this.filters.orderNo, this.filters.codes);
    }
  },
  components: {
    query,
    paging
  }
};
</script>
<style>
.clearF::after {
  content: "";
  clear: both;
}
</style>


