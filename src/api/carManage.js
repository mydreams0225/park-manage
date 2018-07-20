import $axios from 'axios';
export const reqCarInfo = params => { console.log(params); return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };