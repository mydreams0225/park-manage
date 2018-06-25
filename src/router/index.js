import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/page/Login'
import Home from '@/page/Home'
// import Main from '@/page/Main'
import Park from '@/page/Park'
import AttendCar from '@/page/AttendCar'
//车辆管理
import carinfoList from '@/page/carManage/carinfoList'
import newCarRegist from '@/page/carManage/newCarRegist'
import garageAuthorize from '@/page/carManage/garageAuthorize'
import carGroup from '@/page/carManage/carGroup'
import carType from '@/page/carManage/carType'
import blacklistCar from '@/page/carManage/blacklistCar'
import sendcarManage from '@/page/carManage/sendcarManage'
import reservationvehicleList from '@/page/carManage/reservationvehicleList'
//车位管理
import parkPoolSetting from '@/page/parkingManage/parkPoolSetting'
Vue.use(Router)

export default new Router({
  routes: [
            {
              path: '/',
              name: '',
              component: Login,
              hidden:true
            },
            {
                path: '/park',
                component: Home,
                name: '停车场管理',
                iconCls: 'el-icon-goods',//图标样式class
                children: [
                    { path: '/parklist', component: Park, name: '停车场列表' },
                    { path: '/attendcar', component: AttendCar, name: '在场车辆' },
                    
                    
                ]
             },
             {
                path: '/carmanage',
                component: Home,
                name: '车辆管理',
                iconCls: 'el-icon-tickets',//图标样式class
                children: [
                    { path: '/carinfoList', component: carinfoList, name: '车辆信息列表' },
                    { path: '/newCarRegist', component: newCarRegist, name: '新车登记注册' },
                    { path: '/garageAuthorize', component: garageAuthorize, name: '车库授权' },
                    { path: '/carGroup', component: carGroup, name: '车辆分组' },
                    { path: '/carType', component: carType, name: '车辆类型' },
                    { path: '/blacklistCar', component: blacklistCar, name: '黑名单车' },
                    { path: '/sendcarManage', component: sendcarManage, name: '派车管理' },
                    { path: '/reservationvehicleList', component: reservationvehicleList, name: '预约车辆列表' },
                    
                ]
             },
             {
                path:'/parkingManage',
                component:Home,
                name:'车位管理',
                iconCls:'el-icon-star-on',
                children:[
                   { path: '/parkPoolSetting', component: parkPoolSetting, name: '车位池设置' },
                ]
             }
       
      ]
     }
)
