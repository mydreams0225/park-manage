import $axios from 'axios';
import qs from 'qs';

let base = '';
//写法一 后端可以接收到，但是是keyvalue形式
 // export const requestLogin = params => { console.log(params); 
 //  return $axios.post(`http://192.168.1.143:8090/login`,
 //   qs.stringify(params,{ indices: false }),
 // 	{  // 这里是跨域写法
 //    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法
 //    }).then(res => res.data); };
//写法二这样的方式只能通过输入流获取对应的json格式，而request.form就会乱码
//  export const requestLogin = params => { console.log(params); 
//   return $axios({
//     method:'POST',
//     url:'http://192.168.0.105:5846/Home/TestData',
//     data:params,
//     transformRequest: [function (data) {
//             let ret = '{'
//             for (let it in data) {
//                 ret += ""+ encodeURIComponent(it) + ':' + encodeURIComponent(data[it]) + ','
//             }
//             ret+="}"
//             return ret
//         }],
//     headers:{'Content-Type': "application/x-www-form-urlencoded"}
// }).then(res => res.data); };
  //写法三后端获取不到参数
//    export const requestLogin = params => { console.log(params); 
//   return $axios.post('http://192.168.1.143:8090/login',qs.stringify(params),
    
//     // {headers:{'Access-Control-Allow-Origin': "*"}}
// ).then(res => res.data); };
//写法四官方写法 这种方式可以获取json格式(正常可用)
//    export const requestLogin = params => { console.log(params); 
//   return $axios({url:'http://192.168.1.143:8090/login',
//   	method:'post',
//   	data:params,
//    headers:{'Content-Type': 'application/x-www-form-urlencoded'}
// }    //{headers:{'Access-Control-Allow-Origin': "*"}}
// ).then(res => 
// 	 res.data); };

// http://192.168.1.143:8090/demo/test
export const requestLogin = params => { console.log(params);  return $axios.get(`../../static/json/login.json`, {params:params}).then(res => res.data); };
//export const requestLogin = params => { console.log(params);  return $axios.get(`../../static/json/login.json`, {params:params}).then(res => res.data); };
//export const requestLogin = params => { console.log(params);  return axios.post('/api/test2',)
//请求停车场列表get
//export const getParklist = params => { console.log(params); return $axios.get(`http://192.168.0.105:5846/Home/DataTable`,{ params: params }).then(res => res.data);};
//请求停车场列表post
// export const getParklist = params => { console.log(params); 
// 	return $axios.post(`http://192.168.0.105:5846/Home/DataTable`,
// 		 params ).then(res => res.data);};
export const getParklist = params => { console.log(params); return $axios.get(`../../static/json/park.json`,{ params: params }).then(res => res.data);};

   export const postFile = params => { console.log(params); 
  return $axios({url:'../../static/json/park.json',
  	method:'post',
  	data:params,
  	headers:{'Content-Type': 'application/x-www-form-urlencoded'}
   // headers:{'Content-Type': 'multipart/form-data'}
}    //{headers:{'Access-Control-Allow-Origin': "*"}}
).then(res => 
	 res.data); };

// export const requestFile = params => { console.log(params); return $axios.get(``,{ params: params }).then(res => res.data);};

// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };




