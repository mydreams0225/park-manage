<template>
	<el-row class="container">
		<el-col :span=24  class="header" >
				<el-col :span=5 class="logo" :class="'logo-collapse-width'">
				{{sysName}}
			</el-col>
      <el-col :span=15>
      </el-col>
			<el-col :span=4 class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"> 欢迎您，{{sysUserName}}<span class="el-icon-caret-bottom"></span></span>
          <showPwd :dialog="dialog"></showPwd>
					<el-dropdown-menu slot="dropdown">
						<!-- <el-dropdown-item>我的消息</el-dropdown-item> -->
						<el-dropdown-item divided @click.native="showPwds">修改密码</el-dropdown-item>
            
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span=24 class="main">
			<aside >
        
				<!--导航菜单-->
        <el-menu   
            :default-active="$route.path" class="el-menu-vertical-demo el-menus" 
            @open="handleopen" 
            @close="handleclose" 
            :collapse-transition="true"
            @select="handleselect" theme="dark" 
            unique-opened 
            router>
        	<MenuTree :nodes="nodes"></MenuTree>
				</el-menu>			
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span=24 class="breadcrumb-container">          
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span=24 class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>       
						</transition>
           
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>
<script>
import {
  getRole,
  requestLogin,
  requestMenu,
  requestLogin1,
  requestMenu1,
  reqLoginOut //注销,
} from "@/api/api";


import MenuTree from "@/page/MenuTree";
//引入图标库
import iconfont from "@/assets/icon/iconfont.css";
import MenuUtils from "@/utils/MenuUtils";
import showPwd from "@/components/editPwd";
export default {
  data() {
    return {
      dialog: {
        dialogVisible: false
      },
      userInfo: [],
      data: [],
      isCollapse: true,
      nodes: this.$router.options.routes,
      nodesorigin: this.$router.options.routes,
      sysName: "logos",
      w:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      collapsed: false,
      sysUserName: window.localStorage.getItem("username")||"测试",
      sysUserAvatar: "",
      form: {
        name: "zlz",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },

  methods: {
    //展示密码框
    showPwds() {
      debugger;
      this.dialog.dialogVisible = true;
    },
    //点击一级菜单事件
    fristmenuchange(e) {
      console.log("e");
      console.log(e.target.getAttribute("datas"));
      window.localStorage.setItem(
        "datas",
        JSON.stringify(e.target.getAttribute("datas"))
      );
      var name = e.target.text.trim();
      $("a").removeClass("activeLi");
      $(e.target).addClass("activeLi");
      var userInfo = JSON.parse(window.localStorage.getItem("menu"));
      //得到二级菜单
      var menu = this.getMenu(userInfo, name);
      //

      window.localStorage.setItem("secondMenus", JSON.stringify(menu));
      //判断菜单是否存在
      if (menu) {
        var routers = [];
        MenuUtils(routers, menu, false);
        this.$router.addRoutes(routers);
        //  var nodes=this.nodes;
        this.nodes = [];
        var target = [];
        console.log(target);
        this.common.deepClone(this.nodesorigin, this.nodes);
        this.nodes.push(...menu);
        this.$router.push({ path: menu[0].children[0].path });
        console.log("this.nodes");
        console.log(this.nodes);
      }
    },
    //获得二级菜单
    getMenu(userinfo, name) {
      if (userinfo) {
        for (var item in userinfo) {
          if (userinfo[item]["name"] == name) {
            return userinfo[item]["children"] || "错误";
          } else {
          }
        }
      } else {
        return [];
      }
    },
    handleopen() {
      console.log("handleopen");
    },
    handleclose() {
      console.log("handleclose");
    },
    handleselect: function(a, b) {},
    //退出登录
    logout: function() {
      var para = {
        token: window.localStorage.getItem("token")
      };
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          // reqLoginOut(para).then(res => {
          //   if (res.code === 200) {
          //       window.localStorage.removeItem("user");
          //       window.localStorage.removeItem("userRole");
          //       window.localStorage.removeItem("userInfo");
          //       window.localStorage.removeItem("token");
          //       window.localStorage.removeItem("isLoadNodes");
          //       _this.$router.push({ path: "/login" });
          //   }
          // });
          $.ajax({
            type: "post",
            data: { token: window.localStorage.getItem("token") },
            //  url: "../../static/json/rolelist.json",
            url: `${configs.login}/jwt/logout`,
            // url:`${configs.base}/index` ,
            // dataType: "jsonp",
            success: function(data) {
              window.localStorage.removeItem("user");
              window.localStorage.removeItem("userRole");
              window.localStorage.removeItem("userInfo");
              window.localStorage.removeItem("token");
              window.localStorage.removeItem("isLoadNodes");
              _this.$router.push({ path: "/login" });
            },
            error: function(error) {
              console.log(error);
            }
          });
        })
        .catch(err => {
          alert(err);
        });
    },
    //折叠导航栏
    collapse: function() {
      let w =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      this.isCollapse = !this.isCollapse;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    }
  },
  created() {
    //这里没有直接使用this.$router.options.routes，是因为addRoute的路由规则，在这里this.$router.options.routes获取不到
    //有兴趣的可以看一下源码，是为什么获取不到，但是却又有规则了
    //另外在开发的时候，可能由于是热部署，也会不断重复的给nodes添加元素，造成导航条有重复的，简单解决，可以设置一个开关
    let isLoadNodes = window.localStorage.getItem("isLoadNodes");
    var userInfo = JSON.parse(window.localStorage.getItem("menu"));
    this.userInfo = userInfo;

    userInfo.forEach(element => {
      var temp = { label: element.name };
      this.data.push(temp);
    });
    if (!isLoadNodes) {
      var secondMenus = JSON.parse(window.localStorage.getItem("secondMenus"));
      let data = "";
      // 判断是否点击过一级菜单
      if (secondMenus) {
        data = secondMenus;
      } else {
        data = userInfo ? userInfo : [];
      }
      if (data) {
        //这里是防止用户手动刷新页面，整个app要重新加载,动态新增的路由，会消失，所以我们重新add一次
        let routes = [];
        MenuUtils(routes, data, false);
        this.$router.addRoutes(routes);
      }
      this.nodes = [];
      //深度克隆路由
      this.common.deepClone(this.nodesorigin, this.nodes);
      //跳转第一个菜单的第一个路径
      this.nodes.push(...data);
      //  this.$router.push({ path: data[0].children[0].path });
      // var sub=window.location.href;
      // var index=sub.lastIndexOf("\#");

      //     sub=sub.substring(index+1,sub.length);
      //     sub =sub=="Home"? "/Park" :sub;
      //     console.log(sub)
      //     this.$router.push({ path: sub });
      window.localStorage.setItem("isLoadNodes", "true");
    }
  },
  mounted() {
    var _this = this;

    //认证
    $.ajax({
      type: "post",
      data: { token: window.localStorage.getItem("token") },
      //  url: "../../static/json/rolelist.json",
      url: `${configs.login}/jwt/checkToken`,
      // url:`${configs.base}/index` ,
      // dataType: "jsonp",
      success: function(data) {
        if (data.status === 201) {
          window.localStorage.removeItem("user");
          window.localStorage.removeItem("userRole");
          window.localStorage.removeItem("userInfo");
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("isLoadNodes");
          _this.$router.push({ path: "/login" });
        } else {
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("user", data.data);
          console.log("用户信息");
          console.log(data);
           _this.sysUserName = data.data.username || "测试";
          // this.sysUserAvatar = user.avatar || "";
        }

        // _this.sysUserName = data.userInfo.userName;
      },
      error: function(error) {
        console.log(error);
      }
    });
    var a = window.localStorage.getItem("datas");
    $(".tenet-lnav li:first-child  a:first-child").addClass("activeLi");
    var user = window.localStorage.getItem("user");
    console.log(user);
    console.log("fffff");
    if (user) {
      this.sysUserName = window.localStorage.getItem("username") || "测试333";
      this.sysUserAvatar = user.avatar || "";
    }
  },
  components: {
    MenuTree,
    showPwd
  }
};
</script>

<style scoped lang="scss">
html body {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.el-menu {
  background: rgba(0, 0, 0, 1);
}
.el-menu-item {
  //background-color: #222;
  background: rgba(0, 0, 0, 1);
  color: #fff;
  text-align: left;
}
.el-menu-item:hover {
  background-color: #000;
}
.is-active {
  //background-color: #09c;
  background: #09c !important;
}
.is-active:hover {
  background-color: #09c !important;
}

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: #09c;
    color: #fff;
    .tenet-lnav {
      margin: 0 200px 0 122px;
      line-height: 40px;
      padding: 10px 0 0 0;
      font-size: 13px;
      background-color: #09c;
      overflow: hidden;
      zoom: 1;

      li {
        float: left;
        margin: 0 18px;
        list-style: none;
      }
      .activeLi {
        padding-bottom: 5px;
        border-bottom: 2px solid #fff;
      }
      li :hover {
        padding-bottom: 5px;
        // border-bottom: 2px solid #fff;
        cursor: pointer;
      }
    }

    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      color: #000;
      .userinfo-inner {
        cursor: pointer;
        color: #000;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      width: 100px;
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 80px;
      border-color: rgba(238, 241, 146, 0.3);

      img {
        width: 120px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 230px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      background-color: #222;
    }
  }
  .main {
    .tools {
      padding: 20px 0px;

      cursor: pointer;
      background-color: #394555;
    }

    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 180px;
      /*新增样式*/
      .el-menus {
        width: 230px;
        background-color: #222;
        color: #fff;
        overflow-y: hidden;
      }
      .el-menus:hover {
        overflow-y: auto;
      }

      /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background-color: #666;
      }

      /*定义滚动条轨道 内阴影+圆角*/
      ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #666;
      }

      /*定义滑块 内阴影+圆角*/
      ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #555;
      }
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        padding-bottom: 10px;
        border-bottom: 1px #e7e7e7 solid;
        .title {
          width: 200px;
          float: right;
          color: #fff;
        }
        .breadcrumb-inner {
          float: left;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
.el-submenu .el-menu-item {
  min-width: 200px;
}
.sun .el-submenu .el-menu-item {
  z-index: 99999;
}
</style>