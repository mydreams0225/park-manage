import axios from 'axios';
import qs from 'qs';
let base = '';
export const requestLogin = params => { console.log(params);  return axios.post(`http://192.168.0.105:5846/Home/TestData`, qs.stringify(params)).then(res => res.data); };
//export const requestLogin = params => { console.log(params);  return axios.post('/api/test2',)
export const getParklist = params => { console.log(params); return axios.get(`http://192.168.0.105:5846/Home/DataTable`,{ params: params }).then(res => res.data);};
// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };




