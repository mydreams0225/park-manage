import Vue from '../../node_modules/_vue@2.5.16@vue'
import Router from '../../node_modules/_vue-router@3.0.1@vue-router'
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
import parkPoolorParking from '@/page/parkingManage/parkPoolorParking'
import garageParkingInfo from '@/page/parkingManage/garageParkingInfo'
//设备管理
import parkingandEntryequi from '@/page/deviceManage/parkingandEntryequi'
import parkGuidequiState from '@/page/deviceManage/parkGuidequiState'
//车库管理
import garageList from '@/page/garageManage/garageList'
import garageFloorMap from '@/page/garageManage/garageFloorMap'
import garageLocationInfo from '@/page/garageManage/garageLocationInfo'
//费率管理
import parkingRate from '@/page/tariffManage/parkingRate'
import holiday from '@/page/tariffManage/holiday'
import fixedRate from '@/page/tariffManage/fixedRate'
//记录查询
import carenAndexitRecord from '@/page/recordQuery/carenAndexitRecord'
import parkingDiscount from '@/page/recordQuery/parkingDiscount'
//出入车辆记录
import passRecord from '@/page/recordQuery/carRecord/passRecord'
import outRecord from '@/page/recordQuery/carRecord/outRecord'
import freeRelease from '@/page/recordQuery/carRecord/freeRelease'
import manualSwitch from '@/page/recordQuery/carRecord/manualSwitch'
import plateModify from '@/page/recordQuery/carRecord/plateModify'
import carLock from '@/page/recordQuery/carRecord/carLock'

//车辆管理记录
import breakRule from '@/page/recordQuery/carin-out/breakRule'
import carCheck from '@/page/recordQuery/carin-out/carCheck'

//统计报表
import trafficflowAnalysisReport from '@/page/statisticsReport/trafficflowAnalysisReport'
import regionalAnalysisReport from '@/page/statisticsReport/regionalAnalysisReport'

// 财务报表
import parkFee from '@/page/financeReport/parkFee'
import tempStop from '@/page/financeReport/tempStop'
import monthCar from '@/page/financeReport/monthCar'
//系统管理
import role from '@/page/sysManage/role'
import groups from '@/page/sysManage/groups'
import menu from '@/page/sysManage/menu'
import test from '@/page/test.vue'
import imports from '@/page/import.vue'
Vue.use(Router)
const commonRouter=[
{
    path: '/login',
    name: '',
    component: Login,
       
    hidden:true
  },
  {
    path: '/',
    component: Home,
    name: '停车场管理',
    id:'1',
    iconCls: 'el-icon-goods',//图标样式class
    children: [
        { path: '/import',id:'1-1', component: imports, name: '在场车辆---导入' },
                            
    ],
    hidden:true
 }
  
]

export default new Router({
//   base: '/history',
    mode:'history',
    // base: '/parkManage/',  //添加的地方
  routes: commonRouter
     }
)




export const constantRouterMap = [
    {
        path: '/park',
        component: Home,
        name: '停车场管理',
        id:'1',
        iconCls: 'el-icon-goods',//图标样式class
        children: [
            { path: '/parklist',id:'1-1', component: Park, name: '停车场列表' },
            { path: '/attendcar',id:'1-2', component: AttendCar, name: '在场车辆' },                    
        ]
     },
     {
        path: '/carmanage',
        component: Home,
        id:'2',
        name: '车辆管理',
        iconCls: 'el-icon-tickets',//图标样式class
        children: [
            { path: '/carinfoList',id:'2-1', component: carinfoList, name: '车辆信息列表' },
            { path: '/newCarRegist', id:'2-2', component: newCarRegist, name: '新车登记注册' },
            { path: '/garageAuthorize',id:'2-3', component: garageAuthorize, name: '车库授权' },
            { path: '/carGroup', id:'2-4', component: carGroup, name: '车辆分组' },
            { path: '/carType', id:'2-5', component: carType, name: '车辆类型' },
            { path: '/blacklistCar',id:'2-6', component: blacklistCar, name: '黑名单车' },
            { path: '/sendcarManage',id:'2-7', component: sendcarManage, name: '派车管理' },
            { path: '/reservationvehicleList',id:'2-8', component: reservationvehicleList, name: '预约车辆列表' },
            
        ]
     },
     {
        path:'/parkingManage',
        component:Home,
        name:'车位管理',
        id:'3',
        iconCls:'el-icon-star-on',
        children:[
           { path: '/parkPoolSetting',id:'3-1',  component: parkPoolSetting, name: '车位池设置' },
           { path: '/parkPoolorParking', id:'3-1', component: parkPoolorParking, name: '车位池-车位管理' },
           { path: '/garageParkingInfo',id:'3-1', component: garageParkingInfo, name: '车库车位信息' },
        ]
     },
     {
       path:'/deviceManage',
       id:'4',
       component:Home,
       name:'设备管理',
       iconCls:'el-icon-view',
       children:[
          { path: '/parkingandEntryequi',id:'4-1', component: parkingandEntryequi, name: '停车出入设备' }, 
          { path: '/parkGuidequiState',id:'4-2', component: parkGuidequiState, name: '停车引导设备状态' },  
       ]
     },
     {
        path:'/garageManage',
        id:'5',
        component:Home,
        name:'车库管理',
        iconCls:'el-icon-mobile-phone',
        children:[
            { path: '/garageList',id:'5-1', component: garageList, name: '车库列表' },  
            { path: '/garageFloorMap',id:'5-2', component: garageFloorMap, name: '车库楼层地图' },
            { path: '/garageLocationInfo',id:'5-3', component: garageLocationInfo, name: '车库区位信息' },  
        ]
     },
     {
        path:'/tariffManage',
        component:Home,
        id:'6',
        name:'费率管理',
        iconCls:'el-icon-check',
        children:[
           { path: '/parkingRate', id:'6-1',component: parkingRate, name: '临停车费率' }, 
           { path: '/holiday',id:'6-2', component: holiday, name: '节假日' }, 
           { path: '/fixedRate',id:'6-3', component: fixedRate, name: '固定车费率' }, 
        ]
     },
     {
        path:'/recordQuery',
        component:Home,
        name:'记录查询',
        id:'7',
        iconCls:'el-icon-search',
        children:
         [
            { 
             path: 'carRecord', 
             z:'1',
             id:'7-1',
            component: () => import('@/page/publish-center.vue'),
            name: '车辆出入记录' , 
            children:[{ path: '/carRecord/passRecord', id:'7-1-1', component: passRecord, name: '入场记录' },
                      { path: '/carRecord/outRecord', id:'7-1-2', component: outRecord, name: '出场记录' } ,
                      { path: '/carRecord/freeRelease', id:'7-1-3', component: freeRelease, name: '免费放行记录' },
                      { path: '/carRecord/manualSwitch', id:'7-1-4', component: outRecord, name: '手动开闸记录' } ,
                      { path: '/carRecord/plateModify',id:'7-1-5',  component: passRecord, name: '车牌修改记录' },
                      { path: '/carRecord/carLock',id:'7-1-6', component: outRecord, name: '车辆锁车记录' } ,
                     ]
             },
             // { path: '/outRecord', component: outRecord, name: '出场记录1' } 
             {path:'/parkingDiscount',id:'7-2', component:parkingDiscount,name:'停车打折记录'},
             {
              path:'carin-out',
              id:'7-3',
              z:'2',
              component: () => import('@/page/publish-center.vue'),
                  name: '车辆管理记录' , 
                  children:[ { path:'/carin-out/breakRule',id:'7-3-1', component: breakRule, name: '场内违章停车记录' },
                             { path:'/carin-out/carCheck',id:'7-3-2', component: carCheck, name: '车辆盘点操作记录' },
                           ]
             }

          ]
   },
  {
      path:'/statisticsReport',
      component:Home,
      id:'8',
      name:'统计报表',
      iconCls:'el-icon-more',
      children:[
          {path:'/trafficflowAnalysisReport',id:'8-1', component:trafficflowAnalysisReport,name:'车流量分析报表'},
          {path:'/regionalAnalysisReport',id:'8-2', component:regionalAnalysisReport,name:'区域车流分析报表'},
      ]
 },
 {
      path:'/financeReport',
      component:Home,
      id:'9',
      name:'财务报表',
      iconCls:'el-icon-circle-plus',
      children:[
          {path:'/parkFee',id:'9-1', component:parkFee,name:'停车收费汇总报表'},
          {path:'/tempStop',id:'9-2', component:tempStop,name:'临停收费报表'},
          {path:'/monthCar',id:'9-3', component:monthCar,name:'月结车消费汇总报表'},
      ]
 },
 {
    path:'/sysManage',
    component:Home,
    id:'10',
    name:'系统管理',
    iconCls:'el-icon-circle-plus',
    children:[
        {path:'/role',id:'10-1', component:role, name:'用户管理'},
        {path:'/groups',id:'10-2', component:groups, name:'角色管理'},
        {path:'/menu',id:'10-3', component:menu, name:'菜单管理'},
    ]
}
 
]