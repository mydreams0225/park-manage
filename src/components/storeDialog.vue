<template>
    <div class="dialogArea">
        <el-dialog
        :title="dialog.title"
        :visible.sync="dialog.dialogVisible"
        width="800px"
        >
                 <el-form label-position="right" label-width="160px" :model="baseinfo">
                    <el-form-item label="门店名称：">
                        <el-input v-model="dialog.storeData.storeName"></el-input>
                    </el-form-item>
                    <el-form-item label="所在地区：">
                        <el-cascader class="areaCascader" 

                                      :options="area"
                                      expand-trigger="hover"
                                      v-model="dialog.storeData.area"
                                      
                                      @change="handleChange">
                                    </el-cascader>      
                    </el-form-item>
                    <el-form-item label="经度：">
                        <el-input v-model="dialog.storeData.gpsLongitude"></el-input>
                    </el-form-item>
                    <el-form-item label="纬度：">
                        <el-input v-model="dialog.storeData.gpsLatitude"></el-input>
                    </el-form-item>
                    <!-- <div  id="allmap"></div> -->
                    <el-form-item label="详细地址：">
                        <el-input v-model="dialog.storeData.storeDetailAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人：">
                        <el-input v-model="dialog.storeData.contacts"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：">
                        <el-input v-model="dialog.storeData.mobilePhone"></el-input>
                    </el-form-item>
                    <el-form-item label="固定电话：">
                        <el-input v-model="dialog.storeData.fixedPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱：">
                        <el-input v-model="dialog.storeData.email"></el-input>
                    </el-form-item>
                    <el-form-item label="简介：">
                        <el-input v-model="dialog.storeData.abstracts"></el-input>      
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input v-model="dialog.storeData.memo"></el-input>      
                    </el-form-item>
                    </el-form>
                    <div class="btn">
                      <el-button @click="submit" type="success" size="medium" :loading="loading">提交</el-button>
                    </div>     
        </el-dialog>
    </div>
</template>
<script>
// import BMap from "BMap";
import BaiduMap from "@/utils/baidu-map";
export default {
  data() {
    return {
      name:'',
      loading: false,
      area: configs.options,
      baseinfo: {
        storeName: "",
        area: [],
        storeDetailAddress: "",
        contacts: "",
        mobilePhone: "",
        fixedPhone: "",
        email: "",
        abstracts: "",
        memo: ""
      }
    };
  },
  props: {
    dialog: {
      title: "添加门店111",
      dialogVisible: false,
      loading: false,
      storeName: "1",
      area: ""
    }
  },
  methods: {
    
    ready: function() {
      // // 百度地图API功能
      // var map = new BMap.Map("allmap"); // 创建Map实例
      // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
      // //添加地图类型控件
      // map.addControl(
      //   new BMap.MapTypeControl({
      //     mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
      //   })
      // );
      // map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
      // map.enableScrollWheelZoom(true);
      
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    firstclick(name) {
      this.activeName = name;
    },
    mounted() {
      console.log(this.dialog.storeData)
     
      // this.ready();
     
    },
    submit() {
      console.log("add");
      // console.log(this.baseinfo.area[2]);
      this.loading = true;
      console.log(this.dialog.storeData)

      // this.baseinfo = this.dialog.storeData; //修改需要改变

      // this.baseinfo.area[2] = this.dialog.area; //地区
      this.$emit("submit", this.dialog.storeData);
      this.loading = this.dialog.loading;
    },
    handleChange(value) {
      console.log(value || "");
    }
  }
};
</script>
<style >
#allmap {
  width: 100%;
  height: 200px;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
  border: 1px solid #ccc;
}
.dialogArea .el-input,
.el-select,
.el-cascader {
  width: 350px;
}
.dialogArea .el-form-item {
  margin-bottom: 0px;
}
.dialogArea .btn {
  padding-left: 160px;
}

/* .dialogArea .el-select,.el-cascader{
      width:300px !important;
  } */
</style>