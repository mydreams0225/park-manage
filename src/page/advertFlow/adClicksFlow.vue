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
import reqAdExpFlow from '@/api/advertFlow/adClicksFlow';
export default {
  data() {
    return {
      expDate: "",
      //   expDate: new Date().getTime() + 3600 * 1000 * 24 * 3,
      area: {
        adId: "广告主编号",
        coopId: "合作商编号",
        clickFlowId: "点击流水号",
        ggwId: "广告位编号",
        planId: "投放计划编号"
      },
      tableLoading: false,
      adExpData: [{}],
      filters: {
        adIds: "广告主编号",
        coopIds: "合作商编号",
        clickFlowIds: "点击流水号",
        ggwIds: "广告位编号",
        planIds: "投放计划编号"
      },
      totals: {
        totalNum: 0,
        pageSize: 10,
        currentPage: 1
      }
    };
  },
  mounted() {
    this.querys({});
  },
  methods: {
    querys(list) {
      let filters = this.filters;
      filters = list;
      let para = {
        adId: this.filters.adids,
        coopId: this.filters.coopId,
        clickFlowId: this.filters.clickFlowId,
        ggwId: this.filters.ggwId,
        planId: this.filters.planId,
        expDate: this.expDate,
        token: window.localStorage.getItem("token")
      };
    //   reqAdExpFlow(para)
    //     .then(res => {
    //       if (res.status === 200) {
    //       } else if (res.status === 202) {
    //       }
    //     })
    //     .catch({});
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


