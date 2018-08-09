<template>
	<el-row class="container">
		<el-col :span=24  class="header" >
				<el-col :span=5 class="logo" :class="'logo-collapse-width'">
				{{sysName}}
			</el-col>
      <el-col :span=15>
        <!-- <div class="tenet-lnav">
           <li><a >停车管理</a> </li>
           <li><a >物业管理</a></li>
        </div> -->
       
      </el-col>
			<el-col :span=4 class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
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
        	<menu-tree :nodes="$router.options.routes"></menu-tree>
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
  requestLogin,
  requestMenu,
  requestLogin1,
  requestMenu1
} from "@/api/api";
import { getRole } from "../api/api";
import parkFee from "@/page/financeReport/parkFee";
import MenuTree from "@/page/MenuTree";
//引入图标库
import iconfont from "@/assets/icon/iconfont.css";
export default {
  data() {
    return {
      isCollapse: true,
      nodes: this.$router.options.routes,
      sysName: "logos",
      w:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      collapsed: false,
      sysUserName: "",
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
    onSubmit() {
      console.log("submit!");
    },
    handleopen() {
      console.log("handleopen");
      console.log(this.nodes);
    },
    handleclose() {
      console.log("handleclose");
    },
    handleselect: function(a, b) {},
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          window.localStorage.removeItem("user");
          window.localStorage.removeItem("userRole");
          window.localStorage.removeItem("userInfo");
          window.localStorage.removeItem("jwt");
          window.localStorage.removeItem("isLoadNodes");
          _this.$router.push({ path: "/login" });
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
      console.log("i,status");
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
    if (!isLoadNodes) {
      let data = JSON.parse(window.localStorage.getItem("userRole"));
      this.nodes.push(...data);
      console.log(this.nodes);
      window.localStorage.setItem("isLoadNodes", "true");
    }
  },
  mounted() {
    // this.getMenu();
    var user = window.localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.name || "";
      this.sysUserAvatar = user.avatar || "";
    }
  },
  components: {
    MenuTree
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
      li a:hover {
        border-bottom: 2px solid #fff;
        cursor: pointer;
      }
      li a:active {
         border-bottom: 2px solid #fff;
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