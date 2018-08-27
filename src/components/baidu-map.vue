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
  props: {},
  mounted() {
    this.ready();
  },
  methods: {
    ready: function() {
      // 百度地图API功能
      var _this = this;
      var map = new BMap.Map("allmap");
      map.centerAndZoom("北京", 12);
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
        debugger;
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
            addComp.street + "" + addComp.streetNumber;
            alert(_this.locationObj["detailArea"]);
            _this.$emit("getlocation", _this.locationObj);
            // if (geoc.getStatus() == BMAP_STATUS_SUCCESS) {
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
                alert(adcode);
                //   $(ev.currentTarget).text("城市号码为" + adcode);
              }
            });
            // } else {
            //   $(ev.currentTarget).text("定位失败");
            // }
          },
          { enableHighAccuracy: true }
        ); //指示浏览器获取高精度的位置，默认false

        alert(e.point.lng + "," + e.point.lat);
      });
    },
    getLocations() {
      console.log(this.locationObj);
      //   this.$emit("getlocation", this.locationObj);
    }
  }
});
</script>

<style>
</style>


