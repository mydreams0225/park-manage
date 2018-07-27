import $axios from 'axios';
var base = configs.base;
import qs from 'qs';
//临停车费
//1.费率设置
export const reqSettingRate = params => {
        return $axios.post(`${base}/rate/setRate`,
                qs.stringify(params, { indices: false }),
                {  // 这里是跨域写法  
                  headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", }  // 这里是跨域的写法  
                }).then(res => res.data);
      };
//2.reqDeleteOne
export const reqDeleteOne = params => { return $axios.get(`${base}/recordQuery/incar.json`, { params: params }).then(res => res.data); };
//3.batchDeleteMore
export const batchDeleteMore = params => { return $axios.get(`${base}/recordQuery/incar.json`, { params: params }).then(res => res.data); };
//4.reqParkRate查看费率
//export const reqParkRate = params => {  return $axios.get(`${base}/recordQuery/incar.json`, { params: params }).then(res => res.data); };
export const reqParkRate = params => {
          
          return $axios.post(`${base}/rate/list`,
            qs.stringify(params, { indices: false }),
            {  // 这里是跨域写法  
              headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", }  // 这里是跨域的写法  
            }).then(res => res.data);
        };

//5.添加或修改费率//   reqAddRate
export const reqAddorEditRate = params => {
          
          return $axios.post(`${base}/rate/operateRate`,
            qs.stringify(params, { indices: false }),
            {  // 这里是跨域写法  
              headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", }  // 这里是跨域的写法  
            }).then(res => res.data);
        };
//6.reqshowRate 展示费率
export const reqshowRate = params => {
          
          return $axios.post(`${base}/rate/operateRate`,
            qs.stringify(params, { indices: false }),
            {  // 这里是跨域写法  
              headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", }  // 这里是跨域的写法  
            }).then(res => res.data);
        };



