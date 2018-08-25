import $axios from 'axios';
import qs from 'qs';
let base=configs.base;

//export const reqCarInfo = params => {  return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };
export const reqFlow = params => {    
    return $axios.post(`${base}/team/transaction/get`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
}).then(res => res.data); };  