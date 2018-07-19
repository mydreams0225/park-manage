import Vue from '../node_modules/_vue@2.5.16@vue'
import App from './App'
import router from './router'
import Element from '../node_modules/_element-ui@2.4.3@element-ui'

import paging from './components'
import has from '@/assets/js/btnPermission.js';
//mock放到全局 感觉没用
import '../mock'
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
import axios from "../node_modules/_axios@0.18.0@axios";

import { getPermission } from "@/api/api";
import {constantRouterMap} from '@/router';

import Blob from './excel/Blob';
 import Export2Excel from './excel/Export2Excel';
let data = JSON.parse(window.localStorage.getItem('userRole'));
 
if (data){
  //这里是防止用户手动刷新页面，整个app要重新加载,动态新增的路由，会消失，所以我们重新add一次
  let routes = []
  MenuUtils(routes,data)
  router.addRoutes(routes)
  window.localStorage.removeItem('isLoadNodes')
}
router.beforeEach((to, from, next) => {
  console.log('z')
  console.log(!user && to.path != '/login');

  if (to.path == '/login') {
    console.log(to.path)
    window.localStorage.removeItem('user');
     window.sessionStorage.removeItem('isLoadNodes')
    // window.location.href = '/'
    // return false
  }
  let user = JSON.parse(window.localStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    console.log('111s');
   
     
  

     next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
