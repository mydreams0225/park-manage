

import $axios from 'axios';
import qs from 'qs';
let base = configs.base;
// 1.查询 reqRechargeList
export const reqRechargeList = params => {
    return $axios.post(`${base}/team/shop/get`,
        qs.stringify(params, { indices: false }),
        {  // 这里是跨域写法  
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", }  // 这里是跨域的写法  
        }).then(res => res.data);
};
// 2. 单行删除 reqRemoveReList
export const reqRemoveReList = params => {
    return $axios.post(`${base}/team/shop/get`,
        qs.stringify(params, { indices: false }),
        {  // 这里是跨域写法  
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", }  // 这里是跨域的写法  
        }).then(res => res.data);
};