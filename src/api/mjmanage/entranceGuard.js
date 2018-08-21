
import $axios from 'axios';
import qs from 'qs';
var base = configs.base;
// 1. 查询数据
export const reqGuardData = params => {
    return $axios.post(`${base}/rate/setRate`,
            qs.stringify(params, { indices: false }),
            {  // 这里是跨域写法  
              headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", }  // 这里是跨域的写法  
            }).then(res => res.data);
  };