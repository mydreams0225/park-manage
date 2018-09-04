<template>
    <section>
         <div class="parent">
             <div class="margin-tops">
                 <query  :area="areas" @querys="queryRecharge"></query>
             </div>
             <div class="margin-tops">
                 <el-table
                   v-loading="tableLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :data="rechargeData"
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
                    prop="advertId"
                    label="广告主编号"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="advertName"
                    label="广告主"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="rechargeAmount"
                    label="余额"
                    align="center">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            align="center">
                            <template slot-scope="scope">
                                <el-button type="success" size="mini" @click="rechargeClick(scope.row)">充值</el-button>
                            </template>
                     </el-table-column>
                 </el-table>
             </div>
             <div class="margin-tops">
                 <paging :total="totals" @handleCurrentChange="CurrentChanges"> </paging>
             </div>
             <div>
                  <el-dialog
                     title="充值"
                    :visible.sync="dialog.dialogVisible"
                    :close-on-click-modal="false"
                    >
                    <el-form label-position="right" label-width="160px" :model="dialog.rechargeData" :rules="rules" ref="dialog.rechargeData">
                       <el-form-item label="广告主编号：" prop="advertId">
                          <el-input v-model="dialog.rechargeData.advertId" :disabled="true"></el-input>
                       </el-form-item>
                       <el-form-item label="充值金额：" prop="rechargeAmount">
                          <el-input v-model="dialog.rechargeData.rechargeAmount"></el-input>
                       </el-form-item>
                       </el-form>
                       <div class="btn margin-tops">
                        <el-button @click="submit('dialog.rechargeData')" type="success" size="medium" :loading="dialog.loading">充值</el-button>
                       </div>     
                   </el-dialog>
             </div>
         </div>

    </section>
</template>
<script>
// 引入组件
import query from "@/components/queryArea/query1.vue";
import paging from "@/components/common/paging.vue";
import {
  reqRechargeList,
  reqAddRecharge
} from "@/api/advertManage/advertRecharge";
export default {
  data() {
    return {
      areas: {
        name: "广告主" //内部订单号
      },
      filters: {
        advertisterName: ""
      },
      tableLoading: false,
      rechargeData: [
        {
          advertId: "1",
          rechargeAmount: "22"
        },
        {}
      ],
      totals: {
        totalNum: 0,
        pageSize: 10,
        currentPage: 1
      },
      dialog: {
        dialogVisible: false,
        rechargeData: {
          advertId: "",
          rechargeAmount: ""
        },
        loading: false
      },
      rules: {
        advertId: [
          { required: true, message: "请输入广告主", trigger: "blur" }
        ],
        rechargeAmount: [
          { required: true, message: "请输入充值金额", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.queryRecharge();
  },
  methods: {
    //查询充值信息
    queryRecharge(advertisterName) {
      var _this = this;
      this.tableLoading = true;
      this.filters.advertisterName = advertisterName;
      let para = {
        advertisterName: this.filters.advertisterName, // 广告主
        currentPage: this.totals.currentPage,
        pageSize: this.totals.pageSize,
        token: window.localStorage.getItem("token")
      };

      reqRechargeList(para)
        .then(res => {
          if (res.status === 200) {
            _this.rechargeData = [];
            let list = res.list;
            list.forEach(item => {
              let temp = {
                advertId: item.advertId,
                rechargeAmount: item.rechargeAmount
              };
              _this.rechargeData.push(temp);
            });
            _this.totals.totalNum = res.data.totalNum; //总条数
            this.tableLoading = false;
          } else if (res.status === 202) {
            _this.common.tokenCheck(_this);
            this.tableLoading = false;
          }
        })
        .catch(err => {
          _this.$message.error("请求超时，请重新发送请求");
         this.tableLoading = false;
          return false;
        });
    },
    // 分页方法
    CurrentChanges(currentPage, pageSize) {
      this.totals.currentPage = currentPage;
      this.totals.pageSize = pageSize;
      this.queryRecharge(this.filters.advertisterName);
    },
    // 打开充值界面
    rechargeClick(row) {
      this.dialog.dialogVisible = true;
      this.dialog.rechargeData = row;
    },
    // 充值方法
    submit(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let para = {
            advertId: _this.dialog.rechargeData.advertId,
            rechargeAmount: _this.dialog.rechargeData.rechargeAmount,
            token: window.localStorage.getItem("token")
          };
          this.dialog.loading = true;
          // 发送请求
          reqAddRecharge(para)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  message: "充值成功",
                  type: "success"
                });
                this.queryRecharge(_this.filters.advertisterName);
              } else if (res.status === 202) {
                _this.common.tokenCheck(_this);
                _this.dialog.loading = false;
              }
               
            })
            .catch(err => {
              _this.$message.error("请求超时，请重新发送请求");
              _this.dialog.loading = false;
              return false;
            });
        } else {
          _this.$message.error("请完善必填项信息");
          return false;
        }
      });
    }
  },
  // 注册组件
  components: {
    query,
    paging
  }
};
</script>
<style>
.btn {
  padding-left: 160px;
}
</style>


