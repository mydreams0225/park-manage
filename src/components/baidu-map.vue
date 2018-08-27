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
      //单击获取点击的经纬度
      var geoc = new BMap.Geocoder() || "";
      map.addEventListener("click", function(e) {
        var adds = e.point;
        var latitude = adds.lat,
          longitude = adds.lng;
        _this.locationObj["longitude"] = longitude;
        _this.locationObj["latitude"] = latitude;
        // _this.$emit('getlocation',_this.locationObj)

        geoc.getLocation(
          e.point,
          function(rs) {
            var addComp = rs.addressComponents;
            _this.locationObj["detailArea"] =addComp.district+""
              addComp.street + "" + addComp.streetNumber;
            alert(_this.locationObj["detailArea"]);
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
      this.$emit("getlocation", this.locationObj);
    }
  }
});
</script>

<style>
</style>


