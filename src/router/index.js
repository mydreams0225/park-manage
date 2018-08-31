import Vue from '../../node_modules/_vue@2.5.17@vue'
import Router from '../../node_modules/_vue-router@3.0.1@vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/page/Login'
import Home from '@/page/Home'
import s404  from '@/page/404.vue'
Vue.use(Router)
const commonRouter = [
    {
        path: '/login',
        name: '',
        component: Login,

        hidden: true
    },
    {
        path: '/Home',
        name: '',
        component: Home,

        hidden: true
    },
    // {path:'*',component:s404, hidden: true}

];

export default new Router({
    //   base: '/history',
    //  mode:'history',
    //  base: '/parkManage/',  //添加的地方
    routes: commonRouter
}
);





