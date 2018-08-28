<template>
    <div class="allmap" @click="getLocations" ></div>
</template>
<script >
import BMap from "BMap";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      locationObj: {
        longitude: "", // 经度
        latitude: "" // 纬度
      }
    };
  },
  props: {
    areaName: ""
  },
  mounted() {
    this.ready();
  },
  watch: {
    areaName() {
      console.log(this.areaName);
      // 百度地图API功能
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(116.331398, 39.897445);
      map.centerAndZoom(point, 11);
      if (this.areaName != "") {
   
        map.centerAndZoom(this.areaName || "北京" , 11); // 用城市名设置地图中心点
        this.locationObj.longitude="";
        this.locationObj.latitude="";
        this.locationObj.detailArea="";
      }

    }
  },
  methods: {
    ready: function() {
      // 百度地图API功能
      var _this = this;
      var map = new BMap.Map("allmap");
      map.centerAndZoom(this.areaName || "北京" , 11);
      map.enableScrollWheelZoom(true);
      var navigationControl = new BMap.NavigationControl({
        // 靠左上角位置
        anchor: BMAP_ANCHOR_TOP_LEFT,
        // LARGE类型
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        // 启用显示定位
        enableGeolocation: true
      });
      map.addControl(navigationControl);
      // 添加定位控件
      var geolocationControl = new BMap.GeolocationControl();
      geolocationControl.addEventListener("locationSuccess", function(e) {
        // 定位成功事件
        var address = "";
        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        alert("当前定位地址为：" + address);
      });
      geolocationControl.addEventListener("locationError", function(e) {
        // 定位失败事件
        alert(e.message);
      });
      map.addControl(geolocationControl);
      //单击获取点击的经纬度
      var geoc = new BMap.Geocoder() || "";
      map.addEventListener("click", function(e) {
        var adds = e.point;
        var latitude = adds.lat,
          longitude = adds.lng;
        _this.locationObj["longitude"] = longitude;
        _this.locationObj["latitude"] = latitude;

        geoc.getLocation(
          e.point,
          function(rs) {
            var addComp = rs.addressComponents;
            _this.locationObj["detailArea"] = addComp.district + "";
            addComp.street + "" + addComp.streetNumber+addComp.business;
            debugger;
            $.ajax({
              url:
                "http://api.map.baidu.com/geocoder/v2/?ak=siqNMtF7couEA04FaCoAjfx3bsoYvclW&location=" +
                latitude +
                "," +
                longitude +
                "&output=json&pois=1",
              dataType: "jsonp",
              callback: "BMap._rd._cbk43398",
              success: function(res) {
                console.log(res);
                var result = res.result,
                  addressComponent = result.addressComponent,
                  adcode = addressComponent.adcode;
                _this.locationObj["areaCode"] = adcode;
                _this.$emit("getlocation", _this.locationObj);
                //   $(ev.currentTarget).text("城市号码为" + adcode);
              }
            });
          },
          { enableHighAccuracy: true }
        ); //指示浏览器获取高精度的位置，默认false
      });
    },
    getLocations() {
      console.log(this.locationObj);
      this.ready();
      //   this.$emit("getlocation", this.locationObj);
    }
  }
});
</script>

<style>
</style>


