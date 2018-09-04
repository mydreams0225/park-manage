<template>
    <section>
        <div class="parent">
            <div class="margin-tops">
                <el-table
                   v-loading="tableLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :data="List"
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
                    prop="rechargeFlowId"
                    label="充值流水编号"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="adrId"
                    label="广告主编号"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="rechargeMoney"
                    label="充值金额"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="rechargeDate"
                    label="充值时间"
                    align="center">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            align="center"
                             width="250px">
                            <template slot-scope="scope">
                                <el-button
                                @click.native.prevent="deleteRow(scope.$index, scope.row.rechargeFlowId)"
                                type="danger"
                                class="el-icon-error"
                                size="mini">
                                </el-button>
                            </template>
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
import paging from "@/components/common/paging";
import { reqRechargeList,reqRemoveReList } from "@/api/moneyManage/queryRecharge";
export default {
  data() {
    return {
      tableLoading: false,
      List: [],
      totals: {
        totalNum: 0,
        currentPage: 1,
        pageSize: 10
      }
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    query() {
      this.List = [
        {
          rechargeFlowId: "1",
          adrId: "2",
          rechargeMoney: "50",
          rechargeDate: ""
        }
      ];
      let para = {
        pageSize: this.totals.pageSize,
        currentPage: this.totals.currentPage,

        token: window.localStorage.getItem("token")
      };
      reqRechargeList(para).then(res => {});
    },
    deleteRow(rechargeFlowId) {
      let _this = this;
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          let para = {
            rechargeFlowId: rechargeFlowId, //编号
            token: window.localStorage.getItem("token")
          };
          reqRemoveReList(para).then(res => {
            if (res.status === 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
            } else if (res.status === 202) {
              _this.common.tokenCheck(_this);
            }
            _this.query();
          });
        })
        .catch(() => {
          _this.$message.error("请求超时，请重新发送请求");
          _this.dialog.loading = false;
          return false;
        });
    },
    CurrentChanges(currentPage, pageSize) {
      this.totals.currentPage = currentPage;
      this.totals.pageSize = pageSize;
      this.query();
    }
  },
  components: {
    paging
  }
};
</script>
<style>
</style>


