import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'

import paging from './components'
//mock放到全局 感觉没用
import '../mock/index'
//新增

//  import axios from 'axios';
//  Vue.prototype.$axios = axios;

// // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// // Vue.prototype.$axios = axios;
// Vue.config.productionTip = false
require('./mock.js')
Vue.use(Element)
Vue.use(router)
Vue.use(paging)



import { getPermission } from "@/api/api";

router.beforeEach((to, from, next) => {
  // getPermission().then(res => {
    
  //   console.log(res);
  //   let isPermission = false
  //   router.options.routes[1].forEach((v) => {
  //     console.log(v.path);
  //     // 判断跳转的页面是否在权限列表中
  //     if (v.path == to.fullPath) {
  //       isPermission = true

  //     }
  //   })
  //   // 没有权限时跳转到404页面
  //   if (!isPermission) {
  //     next({ path: "/error/404", replace: true })
  //   } else {
  //     next()
  //   }
  // })
  console.log('z')
  console.log(!user && to.path != '/login');

  if (to.path == '/login') {
    console.log(to.path)
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
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
