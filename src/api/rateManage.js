import $axios from 'axios';
var base=configs.base;
import qs from 'qs';
//临停车费
//费率设置
//export const reqSettingRate = params => { console.log(params); return $axios.get(`${base}/recordQuery/incar.json`, { params: params }).then(res => res.data); };

export const reqSettingRate = params => { console.log(params);   
    return $axios.post(`${base}/rate/setRate`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
      }).then(res => res.data); }; 
//reqDeleteOne
export const reqDeleteOne = params => { console.log(params); return $axios.get(`${base}/recordQuery/incar.json`, { params: params }).then(res => res.data); };
//batchDeleteMore
export const batchDeleteMore = params => { console.log(params); return $axios.get(`${base}/recordQuery/incar.json`, { params: params }).then(res => res.data); };
//reqParkRate
//export const reqParkRate = params => { console.log(params); return $axios.get(`${base}/recordQuery/incar.json`, { params: params }).then(res => res.data); };
export const reqParkRate = params => { console.log(params);   
    return $axios.post(`${base}/rate/list`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
      }).then(res => res.data); }; 

      //添加费率
    //   reqAddRate
    export const reqAddRate = params => { console.log(params);   
        return $axios.post(`${base}/rate/addRate`,  
         qs.stringify(params,{ indices: false }),  
           {  // 这里是跨域写法  
          headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
          }).then(res => res.data); };  


