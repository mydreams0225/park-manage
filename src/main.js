import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'

import paging from './components'

// import axios from 'axios';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(Element)
Vue.use(router)
Vue.use(paging)





router.beforeEach((to, from, next) => {
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
