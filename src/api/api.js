import $axios from 'axios';
import qs from 'qs';
// let base = '/apis';
let base=configs.base;
$axios.defaults.baseURL='apis'
//  post登录
export const requestLogin = params => {
  console.log(params);
  return $axios({
    //  url: 'http://192.168.43.116:8080/park/login',
    url: "/park/login",
    method: 'post',
    data: {},
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }    //{headers:{'Access-Control-Allow-Origin': "*"}}
  ).then(res =>
    res.data);
};
//  mock本地登录
export const requestLogin1 = params => { console.log(params); return $axios.get(`../../static/json/login.json`, { params: params }).then(res => res.data); };
export const getPermission = params => { console.log(params); return $axios.get(`../../static/json/rolelist.js`, { params: params }).then(res => res.data); };

export const postFile = params => {
  console.log(params);
  return $axios({
    url: '../../static/json/park.json',
    method: 'post',
    data: params,
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    // headers:{'Content-Type': 'multipart/form-data'}
  }    //{headers:{'Access-Control-Allow-Origin': "*"}}
  ).then(res =>
    res.data);
};
export const getMenu = params => { console.log(params); return $axios.get(`../../static/json/role.json`, { params: params }).then(res => res.data); };
//post请求菜单
export const requestMenu = params => {
  console.log(params);
  return $axios({
    url: 'http://192.168.43.116:8080/park/jwt_api/index',
    method: 'post',
    data: params
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }    //{headers:{'Access-Control-Allow-Origin': "*"}}
  ).then(res =>
    res.data);
};

// 添加响应拦截器
// $axios.interceptors.response.use(function (response) {

//   console.log(response)
//   // redirect('http://192.168.43.116:8080/park/index')
//   // parent.location.href="http://192.168.43.116:8080/park/index"
//   // 对响应数据做点什么
//   return response;
// }, function (error) {
//   console.log('response')
//   console.log(response)
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });
//export const requestMenu = params => { console.log(params); return $axios.get(`http://192.168.43.116:8080/park/indexinfo`, { params: params }).then(res => res.data); };
//mock本地请求菜单
export const requestMenu1 = params => { console.log(params); return $axios.get(`../../static/json/rolelist.json`, { params: params }).then(res => res.data); };
//mock本地请求 获取停车场
export const getParklist1 = params => { console.log(params); return $axios.get(`../../static/json/park.json`, { params: params }).then(res => res.data); };

//mock本地请求获取在场车辆
export const requestAttendCar1 = params => { console.log(params); return $axios.get(`../../static/json/attendcar.json`, { params: params }).then(res => res.data); };
export const requestAttendCar = params => { console.log(params); return $axios.get(`${base}`, { params: params }).then(res => res.data); };


//mock本地请求编辑数据
export const requestAttendCarEdit1 = params => { console.log(params); return $axios.get(`../../static/json/attendcar.json`, { params: params }).then(res => res.data); };

//mock本地请求单行删除数据
 export const requestAttendCarODelete1 = params => { console.log(params); return $axios.get(`../../static/json/attendcar.json`, { params: params }).then(res => res.data); };









