<template>
    <section>
         <div class="parent">
             <div class="margin-tops flowdates">
                 曝光日期：
                 <el-date-picker
                    v-model="expDate"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    default-value="2018-3-3"
                    value-format="yyyy-MM-dd">
                 </el-date-picker>
                  <query :area= "area" @querys="querys" ></query>
             </div>
             <div class="margin-tops">
                 <el-table
                   v-loading="tableLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :data="adExpData"
                    border
                    style="width: 100%"
                    >
                    <el-table-column
                      type="index"
                      width="100"
                      label="序号"
                      align="center">
                    </el-table-column>
                    <el-table-column
                    prop="expFlowId"
                    label="曝光流水编号"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="adrId"
                    label="广告主编号"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="adrName"
                    label="广告主"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="coop"
                    label="合作商"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="adId"
                    label="广告位编号"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="adName"
                    label="广告位名称"
                    align="center">
                    </el-table-column>
                     <el-table-column
                    prop="putPlanId"
                    label="投放计划编号"
                    align="center">
                    </el-table-column>
                     <el-table-column
                    prop="adPlanName"
                    label="广告计划名称"
                    align="center">
                    </el-table-column>
                     <el-table-column
                    prop="adEleName"
                    label="广告元素名称"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="feeMethod"
                    label="计费方式"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="terminalIP"
                    label="终端IP"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="expUnitPrice"
                    label="曝光单价"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="coopBA"
                    label="合作商获益金额"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="expDate"
                    label="曝光时间"
                    align="center">
                    </el-table-column>
                 </el-table>
             </div>
             <div class="margin-tops">
                 <paging :total="totals" @handleCurrentChange="CurrentChanges"></paging>
             </div>
         </div>
    </section>
</template>
<script>
import query from "@/components/queryArea/queryExp";
import paging from "@/components/common/paging.vue";
import { reqAdExpFlow } from "@/api/advertFlow/adExpFlow.js";
export default {
  data() {
    return {
      expDate: "",
      //   expDate: new Date().getTime() + 3600 * 1000 * 24 * 3,
      area: {
        adId: "广告主编号",
        coopId: "合作商编号",
        clickFlowId: "曝光流水号",
        ggwId: "广告位编号",
        planId: "投放计划编号"
      },
      tableLoading: false,
      adExpData: [{}],
      filters: {},
      totals: {
        totalNum: 0,
        pageSize: 10,
        currentPage: 1
      }
    };
  },
  mounted() {
    this.querys();
  },
  methods: {
    querys(list) {
      this.tableLoading = true;
      let para = {
        adId: this.filters.adids,
        coopId: this.filters.coopId,
        clickFlowId: this.filters.clickFlowId,
        ggwId: this.filters.ggwId,
        planId: this.filters.planId,
        expDate: this.expDate,
        token: window.localStorage.getItem("token")
      };
      reqAdExpFlow(para)
        .then(res => {
          if (res.status === 200) {
            var list = res.list;
            _this.loopItem(list);
            _this.totals.totalNum = res.data.totalNum;
          } else if (res.status === 202) {
            _this.common.tokenCheck(_this);
          }
          this.tableLoading = false;
        })
        .catch(() => {
          this.$message.error("请求超时，请重新发送请求");
          this.tableLoading = false;
          return false;
        });
    },
    loopItem(list) {
      list.forEach(item => {
        let temp = {
          expFlowId: item.expFlowId, // 曝光流水编号
          adrId: item.adrId, //广告主编号
          adrName: item.adrName, // 广告主
          coop: item.coop, // 合作商
          adId: item.adId, // 广告位编号
          adName: item.adName, // 广告位名称
          putPlanId: item.putPlanId, // 投放计划编号
          adPlanName: item.adPlanName, // 广告计划名称
          adEleName: item.adEleName, // 广告元素名称
          feeMethod: item.feeMethod, //计费方式
          terminalIP: item.terminalIP, //终端IP
          expUnitPrice: item.expUnitPrice, // 曝光单价
          coopBA: item.coopBA, // 合作商获益金额
          expDate: item.expDate // 曝光时间
        };
        this.adExpData.push(temp);
      });
    },
    CurrentChanges(currentPage, pageSize) {
      this.totals.currentPage = currentPage;
      this.totals.pageSize = pageSize;
      this.querys();
      //   this.queryAdvertList(_this.filters.identity,_this.filters.name);
    }
  },
  components: {
    query,
    paging
  }
};
</script>
<style>
/* .flowdates{
    display: inline-block
} */
</style>


