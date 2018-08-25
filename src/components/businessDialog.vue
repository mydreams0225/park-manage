<template>
    <div class="dialogArea">
        <el-dialog
        :title="dialog.title"
        :visible.sync="dialog.dialogVisible"
        width="800px"
        >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="基本资料" name="first">
                 <el-form label-position="right" label-width="160px" :model="info">
                    <el-form-item label="微信商户号：">
                        <el-input v-model="info.sellersId" readnoly="readnoly"></el-input>
                    </el-form-item>
                    <el-form-item label="微信公众号-APPID：">
                        <el-input v-model="info.sellersAPPID"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人：">
                        <el-input v-model="info.contacts"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱：">
                        <el-input v-model="info.email"></el-input>
                    </el-form-item>
                    <el-form-item label="固定电话：">
                        <el-input v-model="info.fixedPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：">
                        <el-input v-model="info.mobilePhone"></el-input>
                    </el-form-item>
                    <el-form-item label="商户简称：">
                        <el-input v-model="info.sellersJC"></el-input>      
                    </el-form-item>
                    <el-form-item label="费率：">
                        <el-input v-model="info.rate"></el-input>      
                    </el-form-item>
                    <el-form-item label="所在地区：">
                        <el-cascader class="areaCascader" 

                                      :options="area"
                                      expand-trigger="hover"
                                      v-model="info.baseinfoarea"
                                      @change="handleChange">
                                    </el-cascader>      
                    </el-form-item>
                    </el-form>
                    <div class="btn">
                      <el-button @click="firstclick('second')" type="success" size="medium">下一步</el-button>
                    </div>
                
            </el-tab-pane>
            <el-tab-pane label="商户资料" name="second">
                 <el-form label-position="right" label-width="160px" :model="info">
                        <el-form-item label="商户名称：">
                            <el-input v-model="info.sellersName" ></el-input>
                        </el-form-item>
                        <el-form-item label="注册地址：">
                            <el-input v-model="info.registAddress"></el-input>
                        </el-form-item>
                        <el-form-item label="营业执照注册号：">
                            <el-input v-model="info.businessLicenceNo"></el-input>
                        </el-form-item>
                        <el-form-item label="商户行业类型：">
                            <el-select v-model="info.sellersTradeType" >
                        <el-option
                            v-for="item in sellersTradeType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="经营范围：">
                            <el-input v-model="info.businessScope"></el-input>
                        </el-form-item>
                        <el-form-item label="经营期限：">
                            <el-date-picker
                                v-model="info.operateTerm"
                                type="daterange"
                                value-format="yyyyMMdd"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="组织机构代码/统一社会信用代码：">
                            <el-input v-model="info.tycode"></el-input>      
                        </el-form-item>
                        <el-form-item label="营业期限：">
                            <el-date-picker
                                v-model="info.businessTerm"
                                type="daterange"
                                value-format="yyyyMMdd"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="证件持有人类型：">
                        <el-select v-model="info.certifyHolderType" >
                        <el-option
                            v-for="item in certifyHolderType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="证件持有人姓名：">
                            <el-input v-model="info.certifyHolderName"></el-input>
                        </el-form-item>
                        <el-form-item label="证件类型：">
                        <el-select v-model="info.certifyType" >
                        <el-option
                            v-for="item in certifyType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                        </el-form-item>
                </el-form>
                <div class="btn">
                    <el-button @click="firstclick('first')" type="success" size="medium">上一步</el-button>
                    <el-button @click="firstclick('third')" type="success" size="medium">下一步</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="结算账号" name="third">
                <el-form label-position="right" label-width="160px" :model="info">
                    <el-form-item label="开户名称：">
                        <el-input v-model="info.accountName"></el-input>
                    </el-form-item>
                    <el-form-item label="开户银行所在地区：">
                        <el-cascader class="areaCascader" 
                                      :options="openBankArea"
                                      expand-trigger="hover"
                                      v-model="info.settleAccountarea"
                                      @change="handleChange">
                        </el-cascader>  
                    </el-form-item>
                    <el-form-item label="开户银行：">
                        <el-input v-model="info.accountOpenBank"></el-input>
                    </el-form-item>
                    <el-form-item label="银行账号：">
                        <el-input v-model="info.bankAccount"></el-input>
                    </el-form-item>
                </el-form>
                 <div class="btn">
                    <el-button @click="firstclick('second')" type="success" size="medium">上一步</el-button>
                    <el-button @click="firstclick('fourth')" type="success" size="medium">下一步</el-button>
                 </div>
            </el-tab-pane>
            <el-tab-pane label="附件" name="fourth">
                <el-form label-position="right" label-width="160px" :model="info">
                    <el-form-item label="营业执照：">
                        <el-upload
                            class="avatar-uploader"
                            action="123"
                            :show-file-list="false"
                            :before-upload="businessLinseSuccess">
                            <img v-if="info.businessLinseimgUrl" :src="info.businessLinseimgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="开户许可证：">
                        <el-upload
                            class="avatar-uploader"
                            action="123"
                            :show-file-list="false"
                            :before-upload="openPermitSuccess">
                            <img v-if="info.openPermitimgUrl" :src="info.openPermitimgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="身份证人面照：">
                        <el-upload
                            class="avatar-uploader"
                            action="https://adveross.oss-cn-shenzhen.aliyuncs.com/"
                            :show-file-list="false"
                            :before-upload="identityCardzSuccess">
                            <img v-if="info.identityCardzimgUrl" :src="info.identityCardzimgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="身份证国徽照：">
                        <el-upload
                            class="avatar-uploader"
                            action="https://adveross.oss-cn-shenzhen.aliyuncs.com/"
                            :show-file-list="false"
                            :before-upload="identityCardfSuccess">
                            <img v-if="info.identityCardfimgUrl" :src="info.identityCardfimgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div class="btn">
                <el-button @click="firstclick('third')" type="success" size="medium">上一步</el-button>
                 <el-button @click="submit" type="success" size="medium" :loading="loading">提交</el-button>
                 </div>
            </el-tab-pane>
        </el-tabs>
        
        </el-dialog>
    </div>
</template>
<script>
import { upLoadPicFromWeApp } from "@/api/api";
import { client } from "@/utils/alioss";
import axios from "axios";
export default {
  data() {
    return {
      mult: "multipart/form-data",
      file: "",
      loading: false,
      area: configs.options,
      openBankArea:businessObj.openBankArea,
      sellersTradeType: businessObj.sellersTradeType,
      certifyHolderType: [], // 证件持有人类型
      certifyType: [], // 证件类型
      activeName: "first",
      baseinfo: {
        wxSellersNo: "",
        sellersAPPID: "",
        contacts: "",
        email: "",
        fixedPhone: "",
        mobilePhone: "",
        sellersJC: "", // 商户简称
        rate: "", //费率
        area: []
      },
      sellersInfo: {
        sellersName: "",
        registAddress: "",
        businessLicenceNo: "",
        sellersTradeType: "", // 商户行业类型
        businessScope: "", // 经营范围
        businessTerm: [new Date(2018, 10, 10), new Date(2018, 10, 11)], // 营业期限
        tycode: "", // 组织机构代码/统一社会信用代码,
        operateTerm: [], //经营期限,
        certifyHolderType: "",
        certifyHolderName: "",
        certifyType: ""
      },
      settleAccount: {
        accountName: "",
        area: [],
        accountOpenBank: "", // 开户银行
        bankAccount: ""
      },
      enclosure: {
        businessLinseimgUrl: "",
        openPermitimgUrl: "", // 开户许可证
        identityCardzimgUrl: "", // 身份证人面照
        identityCardfimgUrl: ""
      }
    };
  },
  props: {
    dialog: {
      title: "添加商户",
      dialogVisible: false,
      loading: false,
      info: {
       
      }
    },
    info:{
        sellersName: "",
        sellersTradeType: "",
        sellersAPPID: "",
        contacts: "",
    }
  },
  mounted() {
    console.log("zlz");
    console.log(this.dialog["info"]);
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    firstclick(name) {
      this.activeName = name;
    },
    submit() {
      this.loading = true;
      console.log(this.info)
      this.$emit("submit", {
        info:this.info
      });
      this.loading = this.dialog.loading;
    },
    handleChange(value) {
      console.log(value || "");
    },
    //图片上传
    businessLinseSuccess: function(file) {
      var _this = this;
      var file = file;
      console.log(file);
      //阻止元素发生默认的行为
      event.preventDefault();
      let formData = new FormData();
      formData.append("file", file);
      formData.append("token",window.localStorage.getItem("token"));
      axios
        .post(`${configs.base}/team/upload`, formData)
        .then(function(response) {
          _this.info.businessLinseimgUrl = response.data.data;
          
        })
        .catch(function(error) {
          alert("上传失败");
        });
        console.log("tupain")
        console.log( _this.info.businessLinseimgUrl);
    },
    //开户许可证
    openPermitSuccess(file) {
      var _this = this;
      // var files=file.target.files[0];
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      //   return isJPG && isLt2M;
      let formData = new FormData();
      formData.append("file", file);
      formData.append("token",window.localStorage.getItem("token"));
      axios
        .post(`${configs.base}/team/upload`, formData)
        .then(function(response) {
          _this.info.openPermitimgUrl = response.data.data;
          console.log(response);
        })
        .catch(function(error) {
          alert("上传失败");
        });
    },
    //身份证人面照
    identityCardzSuccess(file) {
      
      var _this = this;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      let formData = new FormData();
      formData.append("file", file);
      formData.append("token",window.localStorage.getItem("token"));
      axios
        .post(`${configs.base}/team/upload`, formData)
        .then(function(response) {
          _this.info.identityCardzimgUrl = response.data.data;
        })
        .catch(function(error) {
          alert("上传失败");
        });
    },
    //身份证正面照
    identityCardfSuccess(file) {
      var _this = this;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      let formData = new FormData();
      formData.append("file", file);
      formData.append("token",window.localStorage.getItem("token"));
      axios
        .post(`${configs.base}/team/upload`, formData)
        .then(function(response) {
          _this.info.identityCardfimgUrl = response.data.data;
        })
        .catch(function(error) {
          alert("上传失败");
          console.log(error);
        });
    },
    beforeAvatarUpload(file) {
      var _this = this;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      let formData = new FormData();
      formData.append("file", file);
      axios
        .post(`${configs.base}/team/upload`, formData)
        .then(function(response) {
          _this.enclosure.openPermitimgUrl = response.data.data;
          console.log(response);
        })
        .catch(function(error) {
          alert("上传失败");
        });
    }
  }
};
</script>
<style >
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 78px;
  display: block;
}
</style>