
import $axios from 'axios';
import qs from 'qs';
let base = configs.base;
//reqPatternList
export const reqPatternList = params => {
    return $axios.post(`${base}/team/shop/get`,
        qs.stringify(params, { indices: false }),
        {  // 这里是跨域写法  
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", }  // 这里是跨域的写法  
        }).then(res => res.data);
};
//reqEditPatternList 修改
export const reqEditPatternList = params => {
    return $axios.post(`${base}/team/shop/get`,
        qs.stringify(params, { indices: false }),
        {  // 这里是跨域写法  
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", }  // 这里是跨域的写法  
        }).then(res => res.data);
};
// reqAddPatternList 添加
export const reqAddPatternList = params => {
    return $axios.post(`${base}/team/shop/get`,
        qs.stringify(params, { indices: false }),
        {  // 这里是跨域写法  
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", }  // 这里是跨域的写法  
        }).then(res => res.data);
};
// reqRemovePattern 删除
export const reqRemovePattern = params => {
    return $axios.post(`${base}/team/shop/get`,
        qs.stringify(params, { indices: false }),
        {  // 这里是跨域写法  
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", }  // 这里是跨域的写法  
        }).then(res => res.data);
};