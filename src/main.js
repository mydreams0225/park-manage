import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
// import mock from 'mock';
 // import '/style/font-awesome.min.css'
// import'bootstrap/js/bootstrap.min.js'

// import'bootstrap/scss/bootstrap.min.css'
import paging from './components'


Vue.config.productionTip = false
Vue.use(Element)
Vue.use(router)
Vue.use(paging)


// bootstrap();

// router.beforeEach((to, from, next) => {
// 	console.log(!user && to.path != '/login');
//   //NProgress.start();
//   if (to.path == '/login') {
//     sessionStorage.removeItem('user');
//   }
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   if (!user && to.path != '/login') {
//     next({ path: '/login' })
//   } else {
//   	console.log('111s');
//     next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
