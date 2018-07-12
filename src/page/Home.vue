<template>
	<el-row class="container">
		<el-col :xs="24" :sm="24" :md="24" :lg="24"  class="header" >
			<!-- <el-col :xs="10" :sm="10" :md="10" :lg="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'"> -->
				<el-col :xs="10" :sm="10" :md="10" :lg="10" class="logo" :class="'logo-collapse-width'">
				<!-- <img :src="this.sysUserAvatar" alt=""> -->
				{{sysName}}
			</el-col>
			<!-- <el-col :xs="4" :sm="4" :md="4" :lg="4" >
				<div class="tools" @click.prevent="collapse">
					<i>|||</i>

				</div>
			</el-col> -->
			<el-col :xs="10" :sm="10" :md="10" :lg="10"  class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<!-- <span class="el-dropdown-link userinfo-inner"><img :src="logo.png" /> {{sysUserName}}</span> -->
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>

		<el-col :xs="24" :sm="24" :md="24" :lg="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'" >
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo el-menus" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed" >
					 <div class="tools" @click.prevent="collapse">
					   <i>|||</i>

				     </div>
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf" :key="index">
							<template slot="title" ><i :class="item.iconCls"></i>{{item.name}}</template>

								<el-menu-item-group  v-for="child  in item.children"  :index="child.path" :key="child.path"  v-if="!child.hidden">
		                                <!-- <el-menu class="xz"  v-if="!child.path" :default-active="child.path"> -->
		                                <el-submenu  :index="child.path"  v-if="child.z &&!item.leaf">
		                                	<template slot="title" class="child_title"><i :class="child.iconCls"></i>{{child.name}}</template>
		                                	<el-menu-item  v-for="sun  in child.children" :index="sun.path" :key="sun.path" >
		                                		{{sun.name}}
		                                	</el-menu-item>
		                                </el-submenu>
		                                <!-- </el-menu> -->
		                                <el-menu-item :index="child.path" v-if="!child.z" :key="child.path"> {{child.name}}  </el-menu-item>
		                       </el-menu-item-group>
		                       
                                <!-- <el-menu-item v-if="child.path">{{child.name}}</el-menu-item> -->
							
							<!-- </el-menu-item-group> -->
                            <!--  <el-menu-item v-for="sun in child.children" :index="sun.path" :key="sun.path" v-if="!sun.hidden"> {{sun.name}}</el-menu-item> -->
							
							
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed el-menus"  v-show="collapsed" ref="menuCollapsed">
					 <div class="tools" @click.prevent="collapse">
					   <i>|||</i>

				     </div>
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item" :key="index">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 10px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls" ></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''"  @click="$router.push(child.path)">{{child.name}}
                                    <!-- zlz ok-->
                                    <!-- <ul class="sun">
                                    	<li v-for="sun in child.children" v-if="!sun.hidden" :key="sun.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==sun.path?'is-active':''" @click="$router.push(sun.path)">{{sun.name}}</li>
                                    </ul> -->
								</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i  :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" class="breadcrumb-container">
                        
						<!-- <strong class="title">{{$route.name}}</strong> -->
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" class="content-wrapper">
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
import { getRole } from "../api/api";
import parkFee from '@/page/financeReport/parkFee'
export default {

  data() {
    return {
      sysName: "logo",
      w:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      collapsed: false,
      sysUserName: "",
      sysUserAvatar:
        "https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png",
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
          sessionStorage.removeItem("user");
          _this.$router.push({ path: "/login" });
        })
        .catch(() => {});
    },
    //折叠导航栏
    collapse: function() {
      let w =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      console.log("i,status");
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    }
  },
  created(){
        getRole().then(res => {
          console.log(res);
            // console.log(this.$router.options.routes[0].children)
        
            // this.$router.options.routes[0].children.push({//插入路由
            //   name:'list',
            //   path: '/park',
            //   component:parkFee
            // });
            // console.log('11')
            // this.$router.addRoutes(this.$router.options.routes);//调用a


    });
  },
  mounted() {
    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.name || "";
      this.sysUserAvatar = user.avatar || "";
    }
  }
  // watch: {
  //       myScreen (val, oldval) {
  //         let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  //                if(w<400){
  //                 this.collapsed=true;
  // 		 }

  //       }
  //       }
};
</script>

<style scoped lang="scss">
html body {
  width: 100%;
  height: 100%;
}
.el-menu-item {
  background-color: #222;
  color: #fff;
  text-align: left;
}
.el-menu-item:hover {
  background-color: #333;
}
.is-active {
  background-color: #09c;
}
.is-active:hover {
  background-color: #09c;
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
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);

      img {
        width: 40px;
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
      width: 230px;
      /*新增样式*/
      .el-menus {
        width: 230px;
        background-color: #222;
        color: #fff;
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