import $axios from 'axios';
var base=configs.base;
export const reqEntryRecord = params => { console.log(params); return $axios.get(`../../static/json/recordQuery/incar.json`, { params: params }).then(res => res.data); };
//reqOutRecord
export const reqOutRecord = params => { console.log(params); return $axios.get(`../../static/json/recordQuery/incar.json`, { params: params }).then(res => res.data); };
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


