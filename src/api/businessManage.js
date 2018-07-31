
import $axios from 'axios';
import qs from 'qs';
let base=configs.base;

// 1.1reqBusinessList 商户列表查询
//export const reqCarInfo = params => {  return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };
export const reqBusinessList = params => {    
    return $axios.post(`${base}/shopInfo/query/page`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
}).then(res => res.data); }; 

//1.2.batchDeleteBusinessList 批量删除商户列表
export const batchDeleteBusinessList = params => {    
    return $axios.post(`${base}/shopInfo/delete/batch/ids`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
}).then(res => res.data); }; 

//1.3.reqDeleteOneBusinessList 单行删除
export const reqDeleteOneBusinessList = params => {    
    return $axios.post(`${base}/shopInfo/delete`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
}).then(res => res.data); }; 

//1.4.reqSaveBusinessList 添加商户列表
export const reqAddBusinessList = params => {    
    return $axios.post(`${base}/shopInfo/insert`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
}).then(res => res.data); }; 

// 1.5.reqModifyBusinessList 修改商户列表
export const reqModifyBusinessList = params => {    
    return $axios.post(`${base}/shopInfo/update`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
}).then(res => res.data); }; 
//1.6 reqmerchant 请求所属商户
export const reqmerchant = params => {    
    return $axios.post(`${base}/`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
}).then(res => res.data); }; 


//2.1.reqbusinessAccountList 商户账号列表查询
export const reqbusinessAccountList = params => {    
    return $axios.post(`${base}/`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
}).then(res => res.data); }; 

//2.2.reqSavebusinessAccountList 保存商户账号
export const reqSavebusinessAccountList = params => {    
    return $axios.post(`${base}/`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
}).then(res => res.data); }; 

//2.3.batchDeletebusinessAccountList 批量删除商户账号列表
export const batchDeletebusinessAccountList = params => {    
    return $axios.post(`${base}/`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
}).then(res => res.data); }; 

//2.4.reqDeleteOnebusinessAccountList 单行删除商户账户列表
export const reqDeleteOnebusinessAccountList = params => {    
    return $axios.post(`${base}/`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
}).then(res => res.data); }; 

//3.1.reqbusinessqrcode 查询二维码信息
export const reqbusinessqrcode = params => {    
    return $axios.post(`${base}/`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
}).then(res => res.data); }; 

//3.2.batchDeletebusinessqrcode 批量删除

export const batchDeletebusinessqrcode = params => {    
    return $axios.post(`${base}/`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
}).then(res => res.data); }; 

//3.3.reqDeleteOnebusinessQrcode 单行删除
export const reqDeleteOnebusinessQrcode = params => {    
    return $axios.post(`${base}/`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
}).then(res => res.data); }; 

//3.4.reqSavebusinessQrcode 保存

export const reqSavebusinessQrcode = params => {    
    return $axios.post(`${base}/`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
}).then(res => res.data); }; 



