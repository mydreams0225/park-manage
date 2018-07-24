import $axios from 'axios';

export const reqEntryRecord = params => { console.log(params); return $axios.get(`../../static/json/recordQuery/incar.json`, { params: params }).then(res => res.data); };