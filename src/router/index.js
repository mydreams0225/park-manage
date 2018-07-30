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
        path: '/',
        component: Home,
        name: '停车场管理',
        id: '1',
        iconCls: 'el-icon-goods',//图标样式class
        children: [
            { path: '/import', id: '1-1', component: imports, name: '在场车辆---导入' },

        ],
        hidden: true
    },
    {path:'*',component:s404, hidden: true}

];

export default new Router({
    //   base: '/history',
    //  mode:'history',
    //  base: '/parkManage/',  //添加的地方
    routes: commonRouter
}
);





