import $axios from 'axios';
let base=configs.base;

//请求页面车辆信息
export const reqCarInfo = params => { console.log(params); return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };
//base

//请求点击选择里的车位池数据
export const reqPlateName = params => { console.log(params); return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };

//请求编辑数据
export const reqEdit = params => { console.log(params); return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };
//请求点击选择业主信息的数据
export const reqOwnerName = params => { console.log(params); return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };
//发送单行删除请求
export const reqdeleteOne = params => { console.log(params); return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };
//多行删除 batchRemove
export const batchRemove = params => { console.log(params); return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };


export const reqEntryRecord = params => { console.log(params); return $axios.get(`../../static/json/recordQuery/incar.json`, { params: params }).then(res => res.data); };