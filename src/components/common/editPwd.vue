<template>
     <div class="dialogPwd">
         <el-dialog
         title="修改密码"
         :visible.sync="dialog.dialogVisible"
          width="600px">
             <el-form  label-width="160px" :model="info" :rules="rules" ref="info" >
                   <el-form-item label="原密码：" prop="pwd">
                        <el-input type="password" v-model="info.pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码：" prop="newPwd">
                        <el-input type="password" v-model="info.newPwd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：" prop="checkPwd">
                        <el-input type="password" v-model="info.checkPwd"></el-input>
                    </el-form-item>
             </el-form>
             <div class="btn margin-tops">
                      <el-button @click="submit('info')" type="success" size="medium" :loading="loading">提交</el-button>
                    </div> 
         </el-dialog>
     </div>
</template>
<script>
import { reqEditPwd } from "@/api/api";
export default {
  data() {
    var validateoldPass = (rule, value, callback) => {
      if (value === "" || !value) {
        callback(new Error("请输入原密码"));
      } else {
        if (this.info.checkPass !== "") {
          //   this.$refs.info.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "" || !value) {
        callback(new Error("请输入新密码"));
      } else {
        if (this.info.newPwd !== "") {
          //   this.$refs.info.validateField("newPwd");
        }
        callback();
      }
    };
    var validateCheckPass = (rule, value, callback) => {
      if (value === "" || !value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.info.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      info: {
        pwd: "",
        checkPwd: "",
        newPwd: ""
      },
      loading: false,
      rules: {
        pwd: [{ validator: validateoldPass, trigger: "blur" }],
        newPwd: [{ validator: validatePass, trigger: "blur" }],
        checkPwd: [{ validator: validateCheckPass, trigger: "blur" }]
      }
    };
  },
  props: {
    dialog: {
      dialogVisible: false
    }
  },
  methods: {
    submit(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var para = {
            token: window.localStorage.getItem("token"),
            account: window.localStorage.getItem("username"),
            proId: "sys_004",
            pwdOld: this.info.pwd,
            pwdNew: this.info.checkPwd
          };
          reqEditPwd(para)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  message: "密码修改成功",
                  type: "success"
                });
                this.dialog.dialogVisible = false;
              } else if (res.status === 201) {
                this.$message({
                  message: "原密码错误,请重新输入",
                  type: "error"
                });
                _this.pwd = "";
              }
            })
            .catch(err => {
              this.$message({
                message: "请求超时",
                type: "error"
              });
            });
        //   this.dialog.dialogVisible = false;
        } else {
          this.$message.error("请完善必填项信息");
          return false;
        }
      });
    }
  }
};
</script>
<style>
.dialogPwd {
  text-align: left;
}
.dialogPwd .el-input {
  width: 180px;
}
.dialogPwd .btn {
  padding-left: 160px;
}
</style>


