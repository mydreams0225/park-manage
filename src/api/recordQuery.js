import $axios from 'axios';
import qs from 'qs';
var base = configs.base;
export const reqEntryRecord = params => {
  return $axios.post(`${base}/record/entryRecordList`,
    qs.stringify(params, { indices: false }),
    {  // 这里是跨域写法  
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", }  // 这里是跨域的写法  
    }).then(res => res.data);
};
// reqOutRecord
// export const reqOutRecord = params => {  return $axios.post(`${base}/record/outRecordList`, qs.params).then(res => res.data); };


export const reqOutRecord = params => {
  return $axios.post(`${base}/record/outRecordList`,
    qs.stringify(params, { indices: false }),
    {  // 这里是跨域写法  
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", }  // 这里是跨域的写法  
    }).then(res => res.data);
};

// reqManualSwitch
export const reqManualSwitch = params => { return $axios.get(`../../static/json/recordQuery/incar.json`, { params: params }).then(res => res.data); };
// reqPlateModify
// export const reqPlateModify = params => {  return $axios.get(`../../static/json/recordQuery/incar.json`, { params: params }).then(res => res.data); };
// licensePlateHistory/update
export const reqPlateModify = params => {
  return $axios.post(`${base}/licensePlateHistory/page`,
    qs.stringify(params, { indices: false }),
    {  // 这里是跨域写法  
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", }  // 这里是跨域的写法  
    }).then(res => res.data);
};
// reqCarLock
export const reqCarLock = params => { return $axios.get(`../../static/json/recordQuery/incar.json`, { params: params }).then(res => res.data); };
// reqBreakRule
export const reqBreakRule = params => { return $axios.get(`../../static/json/recordQuery/incar.json`, { params: params }).then(res => res.data); };
// reqCarCheck
export const reqCarCheck = params => { return $axios.get(`../../static/json/recordQuery/incar.json`, { params: params }).then(res => res.data); };
//


