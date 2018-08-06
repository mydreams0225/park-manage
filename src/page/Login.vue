<template>
	<transition name="form-fade" mode="in-out">
	<div class="wrapper">
		
	
	
	  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width=   "0px" class="demo-ruleForm login-container">
		    <h3 class="title">系统登录</h3>
		    <el-form-item prop="account">
				      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号">
				      	
				      </el-input>
			</el-form-item>
			<el-form-item prop="checkPass">
				     <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码">
				     </el-input> 
			</el-form-item>
			<el-form-item prop="yzm">
				<div class="yzm_content">				
				<el-input type="text" class="yzm_input" v-model="ruleForm2.yzm" auto-complete="off"  id="code_input" placeholder="验证码" style="width:40%">
					     	
				</el-input> 
			
				<div  id="v_container" class="yzm" style="width: 140px;height: 30px; display:inline-block"></div>
				</div>
			</el-form-item>
		    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
		    <el-form-item style="width:100%;">
		      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
		    </el-form-item>
	  </el-form>
    
    </div>
    </transition>
</template>

<script>
// import $ from '../../static/js/jquery-1.9.1.min.js'
import {
  requestLogin,
  requestMenu,
  requestLogin1,
  requestMenu1
} from "@/api/api";
import MenuUtils from "@/utils/MenuUtils";
var routers = [];
import axios from "axios";
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: "test2",
        checkPass: "123456",
        yzm: ""
      },
      rules2: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ],
        yzm: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      checked: true,
      verifyCode: "1"
    };
  },

  mounted() {
    this.gv();
  },
  methods: {
    gv() {
      this.verifyCode = new GVerify("v_container");
    },
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    setCookie(name, value) {
      var Days = 7;
      var exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie =
        name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },

    login(datas) {
      window.localStorage.setItem("userRole", JSON.stringify(datas));
         console.log(datas)
      MenuUtils(routers, datas, false);
    },
    handleSubmit2(ev) {
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          console.log("yzm" + _this.ruleForm2.yzm);
          var yzmt = this.verifyCode.validate(_this.ruleForm2.yzm);
          console.log("yzmt" + yzmt);
          // if (yzmt) {
            this.logining = true;
            var loginParams = new URLSearchParams();
            loginParams.append("username", this.ruleForm2.account);
            loginParams.append("password", this.ruleForm2.checkPass);
           //jsonp
           $.ajax({
              type: "get",
               data: { username: _this.ruleForm2.account, password: _this.ruleForm2.checkPass },
              // url: "../../static/json/login.json",
              url: `${configs.base}/login`,
              jsonpCallback: "showData",
              dataType: "jsonp",
              success: function(data) {
                this.logining = false;
                console.log(data);
                var jwt = data.jwt || "";
                window.localStorage.setItem("jwt", data.jwt);
                $.ajax({
                  type: "get",
                  data:{a:"111"},
                  //  url: "../../static/json/rolelist.json",
                  url:`${configs.base}/index` ,
                  dataType: "jsonp",
                  success: function(data) {
                    // console.log(data);
                    window.localStorage.setItem("user",JSON.stringify(data.userInfo));
                     _this.login(data.menus);
                     _this.$router.addRoutes(routers);
                     _this.$router.push({ path: "/Park" });
                  },
                  error: function(error) {
                    console.log(error);
                  }
                });
              },
              error: function(error) {
                _this.$message({
                  message: error.message,
                  type: "error"
                });
              }
            });
           ////jsonpend
           
          // } else {
          //   alert("验证码错误");
          //   return false;
          // }
        } else {
          
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style  scoped>
.wrapper {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  background: url(../../static/img/login.jpg);
  overflow: auto;
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: 0px 0px 30px 0px;
}
.yzm_content {
  position: relative;
  width: 350px;
  height: 50px;
}
.yzm_input {
  position: absolute;
  top: 6px;
  left: 0px;
}
.yzm {
  position: absolute;
  top: 12px;
  right: 0px;
}
</style>