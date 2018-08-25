import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'

import paging from './components'
import has from '@/assets/js/btnPermission.js';
//mock放到全局 感觉没用
// import '../mock'
//新增

//  import axios from 'axios';
//  Vue.prototype.$axios = axios;

// // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// // Vue.prototype.$axios = axios;
// Vue.config.productionTip = false
require('./mock')
Vue.use(Element)
Vue.use(router)
Vue.use(paging)

import MenuUtils from "@/utils/MenuUtils";
var routers = [];
import axios from "axios";

import { getPermission } from "@/api/api";
import { constantRouterMap } from '@/router';

import Blob from './excel/Blob';
import Export2Excel from './excel/Export2Excel';
import common from '../commonFunction/common.js';
Vue.prototype.common = common
var userInfo = JSON.parse(window.localStorage.getItem("menu"));

let data = "";
var secondMenu = JSON.parse(window.localStorage.getItem("secondMenus"));
if (secondMenu) {
  data = secondMenu;
} else {
  data = userInfo ? userInfo : [];
}

// let data=JSON.parse(window.localStorage.getItem('userRole'));
if (data) {
  //这里是防止用户手动刷新页面，整个app要重新加载,动态新增的路由，会消失，所以我们重新add一次
  let routes = [];
  MenuUtils(routes, data, false);
  router.addRoutes(routes);
  window.localStorage.removeItem('isLoadNodes');
}
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    console.log(to.path)
    window.localStorage.removeItem('token');
    window.sessionStorage.removeItem('isLoadNodes');
  }
  var token= window.localStorage.getItem("token");
  if (!token && to.path != '/login') {
    next({ path: '/login' });
  } else {
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
