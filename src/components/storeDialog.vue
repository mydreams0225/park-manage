<template>
    <div class="dialogArea storeDialog">
        <el-dialog
        :title="dialog.title"
        :visible.sync="dialog.dialogVisible"
        width="800px">
                 <el-form label-position="right" label-width="160px" :model="dialog.storeData"  :rules="rules" ref="dialog.storeData">
                   <el-row :gutter="20">
                     <el-col :span="12">
                         <el-form-item label="门店名称：" prop="storeName">
                        <el-input v-model="dialog.storeData.storeName"></el-input>
                    </el-form-item>
                     </el-col>
                     <el-col :span="12">
                       <el-form-item label="联系人：" prop="contacts">
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
                       <el-form-item label="所在地区：" prop="area">
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
                    <baiMap id="allmap" :locationObj="locationObj" @getlocation="getlocation" :areaName="areaName"></baiMap>
                    </el-form>
                    <div class="btn margin-tops">
                      <el-button @click="submit('dialog.storeData')" type="success" size="medium" :loading="dialog.loading">提交</el-button>
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
      areaName: "",
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
      },
      rules: {
        storeName: [
          { required: true, message: "请输入门店名称", trigger: "blur" }
        ],
        contacts: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        area: [{ required: true, message: "请选择所在地区", trigger: "blur" }]
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
  mounted() {},
  methods: {
    //地区转换
    findAreaName(res, str) {
      // if (this.areaCache[str]) return this.areaCache[str];
      for (var i = 0, len = res.length; i < len; i++) {
        if (str === res[i]["value"]) {
          return res[i]["value"];
        } else if (res[i]["children"]) {
          var temp = this.findAreaName(res[i]["children"], str);
          if (temp) {
            // this.areaCache[str] = temp;
            return res[i]["value"] + "," + temp;
          }
        }
      }
    },
    getlocation(obj) {
      var areaStr = this.findAreaName(configs.options, obj.areaCode);
      var areaArr = areaStr.split(",");
      this.dialog.storeData.area = areaArr;
      this.baseinfo.gpsLongitude = obj.longitude;
      this.baseinfo.gpsLatitude = obj.latitude;
      this.baseinfo.detailArea = obj.detailArea;
      this.dialog.storeData.gpsLongitude = this.baseinfo.gpsLongitude;
      this.dialog.storeData.gpsLatitude = this.baseinfo.gpsLatitude;
      this.dialog.storeData.storeDetailAddress = this.baseinfo.detailArea;
      // thid.dialog.storeData.storeDetailAddress=obj.storeDetailAddress;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    firstclick(name) {
      this.activeName = name;
    },

    submit(formName) {
    
      console.log("add");
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.baseinfo.area[2]);      
          console.log(_this.dialog.storeData);
          
          // this.baseinfo = this.dialog.storeData; //修改需要改变
          // this.baseinfo.area[2] = this.dialog.area; //地区
          _this.$emit("submit", _this.dialog.storeData);
        } else {
          this.$message.error("请完善必填项信息");
          return false;
        }
      });
    },
    handleChange(value) {
      console.log(value || "");
      if (value.length === 3) {
        var areaName = this.common.findAreaName(configs.options, value[2]);
        this.areaName = areaName;
      }
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
.storeDialog .el-form-item__error {
  padding-top: 0px;
  top: 91%;
}
.detailArea .el-input {
  width: 500px;
}
.dialogArea .el-form-item {
  margin-bottom: 0px;
}
.dialogArea .btn {
  padding-left: 160px;
}
</style>