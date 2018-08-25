import $axios from 'axios';
import qs from 'qs';
let base = configs.base;

// 1.1reqBusinessList 门店列表查询
//export const reqCarInfo = params => {  return $axios.get(`../../static/json/carManage/carInfolist.json`, { params: params }).then(res => res.data); };
export const reqStore = params => {
  return $axios.post(`${base}/team/shop/get`,
    qs.stringify(params, { indices: false }),
    {  // 这里是跨域写法  
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", }  // 这里是跨域的写法  
    }).then(res => res.data);
};

//2.添加
export const reqAddStore = params => {
  return $axios.post(`${base}/team/shop/add`,
    qs.parse(params, { indices: false }),
    {  // 这里是跨域写法  
      headers: { "Content-Type": "application/json" }  // 这里是跨域的写法  
    }).then(res => res.data);
};

//reqEditBusiness]3.修改信息
export const reqEditStore = params => {
  return $axios.post(`${base}/team/shop/update`,
  qs.parse(params, { indices: false }),
    {  // 这里是跨域写法  
      headers: { "Content-Type": "application/json", }  // 这里是跨域的写法  
    }).then(res => res.data);
};

// 4.删除数据 reqRemoveStore
export const reqRemoveStore = params => {
  return $axios.post(`${base}/team/shop/delete`,
    qs.stringify(params, { indices: false }),
    {  // 这里是跨域写法  
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", }  // 这里是跨域的写法  
    }).then(res => res.data);
}; 