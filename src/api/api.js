import $axios from 'axios';
import qs from 'qs';
let base=configs.base;
// let base = '/apis';

$axios.defaults.baseURL='apis'
//post注销
export const reqLoginOut = params=>{
  return $axios({
    url:"http://192.168.1.19:8088/jwt/logout",
    method:"post",
    data:params,
  }).then(res=>res.data);
}
//  post登录
export const requestLogin = params => {
 
  return $axios({
    //  url: 'http://192.168.43.116:8080/park/login',
    url: "/park/login",
    method: 'post',
    data: params,
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }    //{headers:{'Access-Control-Allow-Origin': "*"}}
  ).then(res =>
    res.data);
};
//  mock本地登录
export const requestLogin1 = params => { return $axios.get(`../../static/json/login.json`, { params: params }).then(res => res.data); };
export const getPermission = params => { return $axios.get(`../../static/json/rolelist.js`, { params: params }).then(res => res.data); };

export const postFile = params => {
 
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
export const getMenu = params => { return $axios.get(`../../static/json/role.json`, { params: params }).then(res => res.data); };
//post请求菜单
export const requestMenu = params => {
 
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
//export const requestMenu = params => { return $axios.get(`http://192.168.43.116:8080/park/indexinfo`, { params: params }).then(res => res.data); };
//mock本地请求菜单
export const requestMenu1 = params => { return $axios.get(`../../static/json/rolelist.json`, { params: params }).then(res => res.data); };
//mock本地请求 获取停车场
export const getParklist1 = params => { return $axios.get(`../../static/json/park.json`, { params: params }).then(res => res.data); };

//停车场列表新增停车场 reqSavePark
export const reqSavePark=params=>{
  return $axios.post(`${base}`,
  qs.stringify(params,{indices:false}),
  {
    headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"}
  }).then(res=>res.data);};

//mock本地请求获取在场车辆
export const requestAttendCar1 = params => { return $axios.get(`../../static/json/attendcar.json`, { params: params }).then(res => res.data); };
//export const requestAttendCar = params => { return $axios.get(`${base}`, { params: params }).then(res => res.data); };

export const requestAttendCar = params => {   
  return $axios.post(`${base}/flow/findByStatus`,  
   qs.stringify(params,{ indices: false }),  
     {  // 这里是跨域写法  
    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
    }).then(res => res.data); }; 


//mock本地请求编辑数据
//export const requestAttendCarEdit1 = params => { return $axios.get(`../../static/json/attendcar.json`, { params: params }).then(res => res.data); };
export const requestAttendCarEdit = params => {   
  return $axios.post(`${base}/flow/updatePlate`,  
   qs.stringify(params,{ indices: false }),  
     {  // 这里是跨域写法  
    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
    }).then(res => res.data); }; 

//mock本地请求单行删除数据
 export const requestAttendCarODelete1 = params => { return $axios.get(`../../static/json/attendcar.json`, { params: params }).then(res => res.data); };
 //纠正空车位数
//  reqUpdateStall
export const reqUpdateStall = params => {   
  return $axios.post(`${base}/flow/updateStall`,  
   qs.stringify(params,{ indices: false }),  
     {  // 这里是跨域写法  
    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
    }).then(res => res.data); }; 

    // 文件上传
    // const upload = axios.create({
    //   baseURL: 'api',
    //   //这里配置你自己的url
    //   timeout: 5000,
    //   headers: {
    //     'Content-Type': 'multipart/form-data' //请求头
    //   }
    // })
    export const upload = params => {   
      return $axios.post(`https://adveross.oss-cn-shenzhen.aliyuncs.com/`,  
       qs.stringify(params,{ indices: false }),  
         {  // 这里是跨域写法  
        headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
        }).then(res => res.data); }; 

        //上传图片 uploadAli
        export const upLoadPicFromWeApp = params => {   
          return $axios.post(`${base}/pic/upload`,  
            // qs.stringify(params,{ indices: false }),  
            params,
             {  // 这里是跨域写法  
            headers:{"Content-Type": "multipart/form-data",}  // 这里是跨域的写法  
            }).then(res => res.data); };      









