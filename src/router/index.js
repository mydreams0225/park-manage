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
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
            {
              path: '/login',
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
                   { path: '/parkPoolorParking', component: parkPoolorParking, name: '车位池-车位管理' },
                   { path: '/garageParkingInfo', component: garageParkingInfo, name: '车库车位信息' },
                ]
             },
             {
               path:'/deviceManage',
               component:Home,
               name:'设备管理',
               iconCls:'el-icon-view',
               children:[
                  { path: '/parkingandEntryequi', component: parkingandEntryequi, name: '停车出入设备' }, 
                  { path: '/parkGuidequiState', component: parkGuidequiState, name: '停车引导设备状态' },  
               ]
             },
             {
                path:'/garageManage',
                component:Home,
                name:'车库管理',
                iconCls:'el-icon-mobile-phone',
                children:[
                    { path: '/garageList', component: garageList, name: '车库列表' },  
                    { path: '/garageFloorMap', component: garageFloorMap, name: '车库楼层地图' },
                    { path: '/garageLocationInfo', component: garageLocationInfo, name: '车库区位信息' },  
                ]
             },
             {
                path:'/tariffManage',
                component:Home,
                name:'费率管理',
                iconCls:'el-icon-check',
                children:[
                   { path: '/parkingRate', component: parkingRate, name: '临停车费率' }, 
                   { path: '/holiday', component: holiday, name: '节假日' }, 
                   { path: '/fixedRate', component: fixedRate, name: '固定车费率' }, 
                ]
             },
             {
                path:'/recordQuery',
                component:Home,
                name:'记录查询',
                iconCls:'el-icon-search',
                children:
                 [
                    { 
                     path: 'carRecord', 
                     z:'1',
                    component: () => import('@/page/publish-center.vue'),
                    name: '车辆出入记录' , 
                    children:[{ path: '/carRecord/passRecord', component: passRecord, name: '入场记录' },
                              { path: '/carRecord/outRecord', component: outRecord, name: '出场记录' } ,
                              { path: '/carRecord/freeRelease', component: freeRelease, name: '免费放行记录' },
                              { path: '/carRecord/manualSwitch', component: outRecord, name: '手动开闸记录' } ,
                              { path: '/carRecord/plateModify', component: passRecord, name: '车牌修改记录' },
                              { path: '/carRecord/carLock', component: outRecord, name: '车辆锁车记录' } ,
                             ]
                     },
                     // { path: '/outRecord', component: outRecord, name: '出场记录1' } 
                     {path:'/parkingDiscount',component:parkingDiscount,name:'停车打折记录'},
                     {
                      path:'carin-out',
                      z:'2',
                      component: () => import('@/page/publish-center.vue'),
                          name: '车辆管理记录' , 
                          children:[ { path:'/carin-out/breakRule', component: breakRule, name: '场内违章停车记录' },
                                     { path:'/carin-out/carCheck', component: carCheck, name: '车辆盘点操作记录' },
                                   ]
                     }

                  ]
           },
          {
              path:'/statisticsReport',
              component:Home,
              name:'统计报表',
              iconCls:'el-icon-more',
              children:[
                  {path:'/trafficflowAnalysisReport',component:trafficflowAnalysisReport,name:'车流量分析报表'},
                  {path:'/regionalAnalysisReport',component:regionalAnalysisReport,name:'区域车流分析报表'},
              ]
         },
         {
              path:'/financeReport',
              component:Home,
              name:'财务报表',
              iconCls:'el-icon-circle-plus',
              children:[
                  {path:'/parkFee',component:parkFee,name:'停车收费汇总报表'},
                  {path:'/tempStop',component:tempStop,name:'临停收费报表'},
                  {path:'/monthCar',component:monthCar,name:'月结车消费汇总报表'},
              ]
         },
      ]
     }
)
