import $axios from 'axios';
//请求页面车辆信息
export const reqCarInfo = params => { console.log(params); return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };
//请求点击选择里的车位池数据
export const reqPlateName = params => { console.log(params); return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };

//请求编辑数据
export const reqEdit = params => { console.log(params); return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };
//请求点击选择业主信息的数据
export const reqOwnerName = params => { console.log(params); return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };