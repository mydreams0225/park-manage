
import $axios from 'axios';
import qs from 'qs';
let base=configs.base;

// 1.1reqBusinessList 商户列表查询
//export const reqCarInfo = params => {  return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };
export const reqBusiness = params => {    
    return $axios.post(`${base}/team/merchant/get`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
}).then(res => res.data); }; 

//2.添加商户信息
export const reqAddBusiness = params => {    
  return $axios.post(`${base}/team/merchant/add`,  
   qs.parse(params,{ indices: false }),  
     {  // 这里是跨域写法  
    headers:{"Content-Type": "application/json",}  // 这里是跨域的写法  
}).then(res => res.data); }; 

//reqEditBusiness]3.修改商户信息
export const reqEditBusiness = params => {    
  return $axios.post(`${base}/team/merchant/update`,  
   qs.parse(params,{ indices: false }),  
     {  // 这里是跨域写法  
    headers:{"Content-Type": "application/json",}  // 这里是跨域的写法  
}).then(res => res.data); }; 

//4.删除商户信息 reqDeleteBusiness
export const reqDeleteBusiness = params => {    
  return $axios.post(`${base}/team/merchant/delete`,  
   qs.stringify(params,{ indices: false }),  
     {  // 这里是跨域写法  
    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
}).then(res => res.data); }; 



