<template>
    <section>
        <div class="parent">
            <div class="margin-tops">
                <el-button type="success" size="medium">添加</el-button>
               <query  @query="queryList"></query>
            </div>
            <div class="margin-tops">
                 <el-table
                   v-loading="tableLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :data="lpData"
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
                    prop="planName"
                    label="计划名称"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="adType"
                    label="广告类型"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="dayBudget"
                    label="当日预算"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="createDate"
                    label="创建日期"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="approvalStatus"
                    label="审批状态"
                    align="center">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            align="center"
                             width="250px">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="primary" size="mini" class="el-icon-edit"></el-button>
                                <el-button
                                @click.native.prevent="deleteRow(scope.$index, scope.row.advertId)"
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
            <div class="planList">
                <el-dialog
                    :title="dialog.title"
                    :visible.sync="dialog.dialogVisible"
                    :close-on-click-modal="false"
                    width="800px">
                     <el-form label-position="right" label-width="160px" :model="dialog.list" :rules="rules" ref="dialog.list">
                       <el-form-item label="计划名称：" prop="planName">
                          <el-input v-model="dialog.list.planName"></el-input>
                       </el-form-item>
                       <el-form-item label="广告类型" prop="adType">
                          <el-input v-model="dialog.list.adType"></el-input>
                       </el-form-item>
                       <el-form-item label="计费方式：" prop="feeMethod">
                          <el-input v-model="dialog.list.pwd"></el-input>
                       </el-form-item>
                       <el-form-item label="广告元素：">
                          <el-input v-model="dialog.list.adEle"></el-input>
                       </el-form-item>
                       <el-form-item label="投放时间：" class="date" >
                           <el-date-picker
                                  v-model="dialog.list.launchDateF"
                                  type="date"
                                  placeholder="选择日期">
                              </el-date-picker>
                             <label for="">至</label>
                              <el-date-picker
                                  v-model="dialog.list.launchDateT"
                                  type="date"
                                  placeholder="选择日期">
                              </el-date-picker>
                       </el-form-item>                      
                       <el-form-item label="年龄：" class="age">
                          <el-input v-model="dialog.list.agef"></el-input>
                          <label for="">~</label>
                          <el-input v-model="dialog.list.aget"></el-input>
                       </el-form-item>
                       <el-form-item label="性别：" class="sex">
                            <el-radio v-model="dialog.list.sex"  label="1">男</el-radio>
                            <el-radio v-model="dialog.list.sex" label="2">女</el-radio>
                       </el-form-item>
                       <el-form-item label="当日预算：" class="budget">
                          <el-input v-model="dialog.list.dayBudget"></el-input><label for="">元</label>
                       </el-form-item>
                       </el-form>
                       <div class="btn margin-tops">
                        <el-button @click="submit('dialog.list')" type="success" size="medium" :loading="dialog.loading">提交</el-button>
                       </div>    
                </el-dialog>
            </div>
        </div>
    </section>
</template>

<script>
import query from "@/components/queryArea/queryDate";
import { reqLaunchPlan } from "@/api/launchPlan/lplist";
import paging from "@/components/common/paging";
export default {
  data() {
    return {
      launchDateF: "",
      launchDateT: "",
      tableLoading: false,
      lpData: [{}],
      totals: {
        currentPage: 1,
        pageSize: 10,
        totalNum: 0
      },
      dialog: {
        list: {
          sex: "2"
        },
        dialogVisible: false
      },
      rules: {
        planName: [
          { required: true, message: "请输入计划名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 查询列表
    queryList(launchDateF, launchDateT) {
      this.filters.launchDateF = launchDateF;
      this.filters.launchDateT = launchDateT;
      let para = {
        launchDateF: this.filters.launchDateF,
        launchDateT: this.filters.launchDateT,
        currentPage: this.totals.currentPage,
        pageSize: this.totals.pageSize,
        token: window.localStorage.getItem("token")
      };
      reqLaunchPlan(para).then(res => {
        if (res.status === 200) {
        }
      });
    },
    // 修改
    handleClick(row) {
      this.dialog.loading = false;
      this.dialog.dialogVisible = true;
      this.dialog.title = "编辑用户";
      this.dialog.list = row;
    },
    // 单行删除
    deleteRow(id) {
      let _this = this;
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          let para = {
            shopno: id, //门店编号
            token: window.localStorage.getItem("token")
          };
          // reqRemoveAdvertisters(para).then(res => {
          //   if (res.status === 200) {
          //     this.$message({
          //       message: "删除成功",
          //       type: "success"
          //     });
          //     this.queryAdvertList(_this.filters.identity,_this.filters.name);
          //   } else if (res.status === 202) {
          //     _this.common.tokenCheck(_this);
          //   }
          //  this.queryList();
          // });
        })
        .catch(() => {
          _this.$message.error("请求超时，请重新发送请求");
          _this.dialog.loading = false;
          return false;
        });
    },
    //更改当前页
    CurrentChanges(currentPage, pageSize) {
      this.totals.currentPage = currentPage;
      this.totals.pageSize = pageSize;
      this.queryList();
    },
    addList(title){
      if(title==="添加用户"){
         // 添加请求
         reqAddAdvertList(para)
              .then(res => {
                if (res.status === 200) {
                  this.$message({
                    message: "添加成功",
                    type: "success"
                  });
                } else if (res.status === 202) {
                  _this.common.tokenCheck(_this);
                }
                _this.dialog.loading = false;
                this.queryAdvertList(
                  _this.filters.identity,
                  _this.filters.name
                );
              })
              .catch(err => {
                _this.$message.error("请求超时，请重新发送请求");
                return false;
              });
      }else{
         reqEditAdvertList(para)
              .then(res => {
                if (res.status === 200) {
                  this.$message({
                    message: "修改成功",
                    type: "success"
                  });
                  this.queryAdvertList(
                    _this.filters.identity,
                    _this.filters.name
                  );
                } else if (res.status === 202) {
                  _this.common.tokenCheck(_this);
                }
                _this.dialog.loading = false;
              })
              .catch(err => {
                _this.$message.error("请求超时，请重新发送请求");
                _this.dialog.loading = false;
                return false;
              });
      }
    },
    submit(formName) {
      this.dialog.loading = true;
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let list = this.dialog.list;
          let para = {
            advertName: list.advertName,
            userName: list.userName,
            pwd: list.pwd,
            email: list.email,
            identity: list.identity,
            status: list.status,
            role1: list.role1,
            role2: list.role2,
            role3: list.role3,
            token: window.localStorage.getItem("token")
          };
          this.addList(list.title,para);
        }
       else {
          _this.$message.error("请完善必填项信息");
          _this.dialog.loading = false;
          return false;
        }
      });
    }
  },
  components: {
    query,
    paging
  }
};
</script>
<style>
.planList .el-input {
  width: 350px;
}
.planList .date .el-input {
  width: 150px;
}
.planList .age .el-input {
  width: 80px;
}
.planList .budget .el-input {
  width: 50px;
}
.btn {
  padding-left: 160px;
}
.planList .el-form-item {
  margin-bottom: 15px;
}
</style>


