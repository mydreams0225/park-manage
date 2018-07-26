import $axios from 'axios';
import qs from 'qs';
var base=configs.base;
//export const reqEntryRecord = params => { console.log(params); return $axios.post(`${base}/record/entryRecordList`, params).then(res => res.data); };
// export const reqEntryRecord = params => {
//     console.log(params);
//     return $axios({
//       //  url: 'http://192.168.43.116:8080/park/login',
//       url: `${base}/record/entryRecordList`,
//       method: 'post',
//       data: params,
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//     }    //{headers:{'Access-Control-Allow-Origin': "*"}}
//     ).then(res =>
//       res.data);
//   };

  export const reqEntryRecord = params => { console.log(params);   
  return $axios.post(`${base}/record/entryRecordList`,  
   qs.stringify(params,{ indices: false }),  
     {  // 这里是跨域写法  
    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
    }).then(res => res.data); }; 
//reqOutRecord
//export const reqOutRecord = params => { console.log(params); return $axios.post(`${base}/record/outRecordList`, qs.params).then(res => res.data); };


export const reqOutRecord = params => { console.log(params);   
    return $axios.post(`${base}/record/outRecordList`,  
     qs.stringify(params,{ indices: false }),  
       {  // 这里是跨域写法  
      headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}  // 这里是跨域的写法  
      }).then(res => res.data); }; 

//reqManualSwitch
export const reqManualSwitch = params => { console.log(params); return $axios.get(`../../static/json/recordQuery/incar.json`, { params: params }).then(res => res.data); };
//reqPlateModify
export const reqPlateModify = params => { console.log(params); return $axios.get(`../../static/json/recordQuery/incar.json`, { params: params }).then(res => res.data); };
//reqCarLock
export const reqCarLock = params => { console.log(params); return $axios.get(`../../static/json/recordQuery/incar.json`, { params: params }).then(res => res.data); };
//reqBreakRule
export const reqBreakRule = params => { console.log(params); return $axios.get(`../../static/json/recordQuery/incar.json`, { params: params }).then(res => res.data); };
//reqCarCheck
export const reqCarCheck = params => { console.log(params); return $axios.get(`../../static/json/recordQuery/incar.json`, { params: params }).then(res => res.data); };
//


