<template>
    <div class="dialogArea">
        <el-dialog
        :title="dialog.title"
        :visible.sync="dialog.dialogVisible"
        width="800px"
        >
                 <el-form label-position="right" label-width="160px" :model="baseinfo">
                   <el-row :gutter="20">
                     <el-col :span="12">
                         <el-form-item label="门店名称：">
                        <el-input v-model="dialog.storeData.storeName"></el-input>
                    </el-form-item>
                     </el-col>
                     <el-col :span="12">
                       <el-form-item label="联系人：">
                        <el-input v-model="dialog.storeData.contacts"></el-input>
                    </el-form-item>
                     </el-col>
                   </el-row>
                   <el-row :gutter="20">
                     <el-col :span="12">
                         <el-form-item label="手机号码：">
                        <el-input v-model="dialog.storeData.mobilePhone"></el-input>
                    </el-form-item>
                     </el-col>
                     <el-col :span="12">
                        <el-form-item label="固定电话：">
                        <el-input v-model="dialog.storeData.fixedPhone"></el-input>
                    </el-form-item>
                     </el-col>
                   </el-row>
                   <el-row :gutter="20">
                     <el-col :span="12">
                       <el-form-item label="电子邮箱：">
                        <el-input v-model="dialog.storeData.email"></el-input>
                    </el-form-item>
                     </el-col>
                     <el-col :span="12">
                         <el-form-item label="简介：">
                        <el-input v-model="dialog.storeData.abstracts"></el-input>      
                       </el-form-item> 
                     </el-col>
                   </el-row>
                   <el-row :gutter="20">
                     <el-col :span="12">
                    <el-form-item label="备注：">
                        <el-input v-model="dialog.storeData.memo"></el-input>      
                    </el-form-item>
                     </el-col>
                     <el-col :span="12">
                       <el-form-item label="所在地区：">
                        <el-cascader class="areaCascader" 
                                      :options="area"
                                      expand-trigger="hover"
                                      v-model="dialog.storeData.area"
                                      
                                      @change="handleChange">
                                    </el-cascader>      
                    </el-form-item>
                     </el-col>
                   </el-row>
                    <el-form-item  class="detailArea" label="详细地址：">
                        <el-input v-model="dialog.storeData.storeDetailAddress" ></el-input>
                    </el-form-item>
                    <el-row :gutter="20">
                       
                       <el-col :span="12">
                         <el-form-item label="经度：">
                        <el-input v-model="dialog.storeData.gpsLongitude" ></el-input>
                      </el-form-item>
                       </el-col>
                       <el-col :span="12">
                    <el-form-item label="纬度：">
                        <el-input v-model="dialog.storeData.gpsLatitude" :value="baseinfo.gpsLatitude"></el-input>
                    </el-form-item>
                       </el-col>
                    </el-row>
                    
                    <baiMap id="allmap" :locationObj="locationObj" @getlocation="getlocation"></baiMap>
                    </el-form>
                    <div class="btn margin-tops">
                      <el-button @click="submit" type="success" size="medium" :loading="loading">提交</el-button>
                    </div>     
        </el-dialog>
    </div>
</template>
<script>
import BMap from "BMap";
import baiMap from "@/components/baidu-map";
// import BaiduMap from "@/utils/baidu-map";
export default {
  data() {
    return {
      name: "allmap",
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
        memo: "",
        gpsLongitude: "",
        gpsLatitude: ""
      },
      locationObj: {
        longitude: "", // 经度
        latitude: "" // 纬度
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
  mounted() {
    // // this.ready();
    // debugger;
    // if (this.dialog.title == "添加门店") {
    //   this.baseinfo.gpsLongitude = "1";
    //   this.baseinfo.gpsLatitude = "1";
    // } else {
    // this.baseinfo.gpsLongitude = this.dialog.storeData.gpsLongitude;
    // this.baseinfo.gpsLatitude = this.dialog.storeData.gpsLatitude;
    // }
  },
  methods: {
    getlocation(obj) {
      this.baseinfo.gpsLongitude = obj.longitude;
      this.baseinfo.gpsLatitude = obj.latitude;
      this.baseinfo.detailArea=obj.detailArea;
      this.dialog.storeData.gpsLongitude = this.baseinfo.gpsLongitude;
      this.dialog.storeData.gpsLatitude = this.baseinfo.gpsLatitude;
      this.dialog.storeData.storeDetailAddress=this.baseinfo.detailArea;
      // thid.dialog.storeData.storeDetailAddress=obj.storeDetailAddress;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    firstclick(name) {
      this.activeName = name;
    },

    submit() {
      console.log("add");
      // console.log(this.baseinfo.area[2]);
      this.loading = true;

      console.log(this.dialog.storeData);
      // this.baseinfo = this.dialog.storeData; //修改需要改变
      // this.baseinfo.area[2] = this.dialog.area; //地区
      this.$emit("submit", this.dialog.storeData);
      this.loading = false;
    },
    handleChange(value) {
      console.log(value || "");
    }
  },
  components: {
    baiMap
  }
};
</script>
<style >
#allmap {
  width: 100%;
  height: 300px;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
  border: 1px solid #ccc;
}
.dialogArea .el-input,
.el-select,
.el-cascader {
  width: 200px;
}
.detailArea .el-input{
  width:500px;
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