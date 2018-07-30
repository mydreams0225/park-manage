import $axios from 'axios';
import qs from 'qs';
let base=configs.base;

//1.请求页面车辆信息
//export const reqCarInfo = params => {  return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };
export const reqCarInfo = params => {    
    return $axios.post(`${base}/vehicleInfo/query/page`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
      }).then(res => res.data); }; 
//base

//2.请求点击选择里的车位池数据
export const reqPlateName = params => {  return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };

//3.请求编辑数据
//export const reqEdit = params => {  return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };

export const reqEdit = params => {    
    return $axios.post(`${base}/vehicleInfo/update`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
      }).then(res => res.data); }; 


//4.请求点击选择业主信息的数据
export const reqOwnerName = params => {  return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };
//5.发送单行删除请求
//export const reqdeleteOne = params => {  return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };

export const reqCarInfoDeleteOne = params => {    
    return $axios.post(`${base}/vehicleInfo/delete`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
      }).then(res => res.data); }; 

//6.多行删除 batchRemove
//export const batchRemove = params => {  return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };
export const reqCarInfoDeleteMore = params => {    
    return $axios.post(`${base}/vehicleInfo/delete/batch/ids`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
      }).then(res => res.data); }; 


//7.outExcelCarInfo导出
export const outExcelCarInfo = params => {    
    return $axios.post(`${base}/vehicleInfo/export`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
      }).then(res => res.data); }; 
// 8.postFile
export const postFile = params => {    
  return $axios.post(`${base}/vehicleInfo/export`,  
   qs.stringify(params,{ indices: false }),  
     {  // 这里是跨域写法  
    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
    }).then(res => res.data); }; 

    //添加业主信息reqAddOwnerInfo
    export const reqAddOwnerInfo = params => {    
      return $axios.post(`${base}/vehicleInfo/export`,  
       qs.stringify(params,{ indices: false }),  
         {  // 这里是跨域写法  
        headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
        }).then(res => res.data); }; 
