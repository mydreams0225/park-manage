import $axios from 'axios';
import qs from 'qs';
var base = configs.base;
//reqDeviceInfo 查询设备信息
export const reqDeviceInfo = params => {
    return $axios.post(`${base}/equipmentInfo/getEquipmentInfoMap`,
      qs.stringify(params, { indices: false }),
      {  // 这里是跨域写法  
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", }  // 这里是跨域的写法  
      }).then(res => res.data);
  };
  export const reqDeviceInfo1 = params => { return $axios.get(`../../static/json/device.json`, { params: params }).then(res => res.data); };

//reqSaveDevice 添加设备
export const reqSaveDevice = params => {
    return $axios.post(`${base}/equipmentInfo/addEquipmentInfo`,
      qs.stringify(params, { indices: false }),
      {  // 这里是跨域写法  
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", }  // 这里是跨域的写法  
      }).then(res => res.data);
  };