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
        account: "admin",
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
      window.sessionStorage.setItem("userRole", JSON.stringify(datas));

      MenuUtils(routers, datas, false);
    },
    handleSubmit2(ev) {
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          console.log("yzm" + _this.ruleForm2.yzm);
          var yzmt = this.verifyCode.validate(_this.ruleForm2.yzm);
          console.log("yzmt" + yzmt);
          if (yzmt) {
            this.logining = true;
            //传参方式1
            // var loginParams = {
            //     username: this.ruleForm2.account,
            //     password: this.ruleForm2.checkPass };
            //传参方式2
            // var loginParams =new FormData();
            // loginParams.append("username",this.ruleForm2.account);
            //  loginParams.append("password",this.ruleForm2.checkPass );
            let loginParams = new URLSearchParams();
            loginParams.append("username", this.ruleForm2.account);
            loginParams.append("password", this.ruleForm2.checkPass);
            // console.log(loginParams)
            ///

            // var jqxhr;
            //     //设置ajax请求完成后运行的函数,
            //     $.ajaxSetup({
            //         complete:function(){
            //             if("REDIRECT" == jqxhr.getResponseHeader("REDIRECT")){ //若HEADER中含有REDIRECT说明后端想重定向，
            //                 var win = window;
            //                 while(win != win.top){
            //                     win = win.top;
            //                 }

            //                 win.location.href = jqxhr.getResponseHeader("CONTENTPATH");//将后端重定向的地址取出来,使用win.location.href去实现重定向的要求

            //             }
            //         }
            //     });
            //     jqxhr = axios({
            //       url: 'http://192.168.43.116:8080/park/login',
            //       method: 'post',
            //       data: loginParams,
            //       headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            //     }    //{headers:{'Access-Control-Allow-Origin': "*"}}
            //     ).then(data => {

            $.ajax({
              //../../static/json/login.json
              url: "http://192.168.43.116:8080/park/login",
              type: "post",
              data: { username: "admin", password: "123456" },
              // jsonpCallback: "showData",
              dataType: "json",
              success: function(data) {
                    this.logining = false;
                    console.log(data);
                    var jwt=data.jwt || "";
                    window.sessionStorage.setItem("jwt", JSON.stringify(data.jwt));
                    window.sessionStorage.setItem("user", JSON.stringify(data.userInfo));
                      $.ajax({
                        //../../static/json/login.json
                        url: "http://192.168.43.116:8080/park/index",
                        type: "get",
                        jsonpCallback: "showData",
                        dataType: "jsonp",
                        success: function(data) {
                          console.log(data);
                        },
                        error: function(error) {
                          console.log(error);
                        }
                      });
              },
              error: function(error) {
                console.log(error);
              }
            });
            //  function successM(data){

            //         console.log(data);

            //  }

               requestLogin1(loginParams).then(data => {
                console.log("ggggg");

                this.logining = false;
                // let { msg, code, user } = data;

              //  window.location.href = 'http://192.168.43.116:8080/park/index'
                if (data.code !== 1) {
                  this.$message({
                    message: data.message,
                    type: "error"
                  });
                } else {
                  console.log(data);
                  alert(data)
                  console.log("fdffffdfd")
                  var jwt=data.jwt || "";
                   window.sessionStorage.setItem("jwt", JSON.stringify(data.jwt));
                  // this.setCookie("Token", data.token); //登录成功后将token存储在cookie之中
                  // sessionStorage.setItem("Token", data.token);
                  // axios
                  //   .get(`../../static/json/rolelist.json`, {
                  //     params: { a: "1" }
                  //   })
                  let para = new URLSearchParams();
                  para.append("jwt", jwt);

                   console.log('parklistzzlzllz')
                  //  this.$router.push({ path: "/home" });
                  // requestMenu(para).then(data => {

                    window.sessionStorage.setItem("user", JSON.stringify(data.userInfo));
                  //     console.log('fdfdgfsdgfds')
                  //     console.log(data);
                  //     console.log('dddd')
                  //     this.login(data.menus);
                  //     console.log("routers");
                  //     console.log(routers);
                  //     this.$router.addRoutes(routers);

                  //   });
                  this.$router.push({ path: "/parklist" });
             //我的写法
                  requestMenu(para).then(data => {
                    window.sessionStorage.setItem("user", JSON.stringify(data.userInfo));
                      console.log('fdfdgfsdgfds')
                      console.log(data);
                      console.log('dddd')
                      this.login(data.menus);
                      console.log("routers");
                      console.log(routers);
                      this.$router.addRoutes(routers);
                      this.$router.push({ path: "/parklist" });
                    });

                }
              });

            this.$router.push({ path: '/parklist' });
          } else {
            alert("验证码错误");
            return false;
          }
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