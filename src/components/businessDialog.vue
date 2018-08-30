<template>
    <div class="dialogBusiness">
        <el-dialog
        :title="dialog.title"
        :visible.sync="dialog.dialogVisible"
        :close-on-click-modal="false"
        width="800px"
        >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" >
            <el-tab-pane label="基本资料" name="first">
                 <el-form label-position="right" :inline-message="true" label-width="160px" :model="info" :rules="rules" ref="info" class="demo-dynamic">
                    <el-form-item label="微信商户号："  prop="sellersId">
                        <el-input v-model="info.sellersId" readnoly="readnoly"></el-input>
                    </el-form-item>
                    <el-form-item label="微信公众号-APPID：">
                        <el-input v-model="info.sellersAPPID"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人：" prop="contacts">
                        <el-input v-model="info.contacts"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱：" prop="email">
                        <el-input v-model="info.email"></el-input>
                    </el-form-item>
                    <el-form-item label="固定电话：">
                        <el-input v-model="info.fixedPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：" prop="mobilePhone">
                        <el-input v-model="info.mobilePhone"></el-input>
                    </el-form-item>
                    <el-form-item label="商户简称：">
                        <el-input v-model="info.sellersJC"></el-input>      
                    </el-form-item>
                    <el-form-item label="费率：" prop="rate">
                        <el-input v-model="info.rate"></el-input>    
                        <span style="font-size:12px">单位(千分比)</span>  
                    </el-form-item>
                  
                    <el-form-item label="所在地区：" prop="baseinfoarea">
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
                 <el-form label-position="right" label-width="160px" :model="info" :inline-message="true" :rules="rules" ref="info">
                        <el-form-item label="商户名称：" prop="sellersName">
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
                        <el-form-item label="经营期限：" prop="operateTerm">
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
                        <!-- <el-form-item label="营业期限：">
                            <el-date-picker
                                v-model="info.businessTerm"
                                type="daterange"
                                value-format="yyyyMMdd"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item> -->
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
                <el-form label-position="right" label-width="160px" :model="info" :inline-message="true" :rules="rules" ref="info">
                    <el-form-item label="开户名称：">
                        <el-input v-model="info.accountName"></el-input>
                    </el-form-item>
                    <el-form-item label="开户银行所在地区：" prop="settleAccountarea"> 
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
                 <el-button @click="submit('info')" type="success" size="medium" :loading="dialog.loading">提交</el-button>
                 </div>
            </el-tab-pane>
        </el-tabs>
        
        </el-dialog>
    </div>
</template>
<script>
import { upLoadPicFromWeApp, reqSellersId } from "@/api/api";
import { client } from "@/utils/alioss";
import axios from "axios";
export default {
  data() {
    // 验证商户编号
    var validateSellersId = (rule, value, callback) => {
      var _this=this;
      if (value) {
        let para = {
          token: window.localStorage.getItem("token"),
          merchantno: value
        };
        reqSellersId(para)
          .then(res => {
            // this.$refs.info.validateField("sellersId");
            if (res.status === 201) {
              _this.loading = true;
              callback(new Error("该商户id已存在"));
              
            } else {
               _this.loading = false;
              callback();
            }
          })
          .catch(err => {
            console.log(err);
            _this.loading = true;
            callback(new Error("连接超时"));

          });
      } else {
        callback(new Error("请输入商户id"));
      }
    };
    // 验证费率
    var validateRate = (rule, value, callback) => {
      if (value >= 2 && value <= 20) {
        callback();
      } else {
        callback(new Error("费率必须在 2-20之间"));
      }
    };
    return {
      mult: "multipart/form-data",
      file: "",
      loading: false,
      area: configs.options,
      openBankArea: businessObj.openBankArea,
      sellersTradeType: businessObj.sellersTradeType,
      certifyHolderType: businessObj.certifyHolderType, // 证件持有人类型
      certifyType: businessObj.certifyType, // 证件类型
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
      },
      rules: {
        sellersId: [
          // { required: true, message: "请输入商户号", trigger: "blur" },
          { validator: validateSellersId, trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        rate: [{ validator: validateRate, trigger: "blur" }],
        contacts: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        mobilePhone: [
          {
            required: true,
            message: "请输入手机号码"
          },
          {
            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: "手机格式不对"
          }
        ],
        email: [
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
            message: "请输入有效的邮箱"
          }
        ],
        baseinfoarea: [
          { required: true, message: "请选择地区", trigger: "change" }
        ],
        sellersName: [
          { required: true, message: "请输入商户名称", trigger: "blur" }
        ],
        operateTerm: [
          { required: true, message: "请选择经营期限", trigger: "change" }
        ],
        settleAccountarea: [
          { required: true, message: "请选择开户行所在地区", trigger: "blur" }
        ]
      }
    };
  },
  props: {
    dialog: {
      title: "添加商户",
      dialogVisible: false,
      loading: false,
      info: {}
    },
    info: {
      sellersName: "",
      sellersTradeType: "",
      sellersAPPID: "",
      contacts: "",
      certifyHolderType:""
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
    // 提交
    submit(formName) {
      var _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.loading = true;
          console.log(_this.info);
          debugger
          if (
            !_this.info.sellersId ||
            !_this.info.rate ||
            !_this.info.contacts ||
            !_this.info.mobilePhone ||
            !_this.info.baseinfoarea ||
            !_this.info.sellersName ||
            !_this.info.operateTerm ||
            !_this.info.settleAccountarea
          ) {
            this.$message.error("请完善必填项信息");
            _this.loading = false;
            return false;
          } 
           else {
             if(_this.info.rate>=2 && _this.info.rate<=20){
                  _this.$emit("submit", {
                  info: _this.info
                    });
                  _this.loading = _this.dialog.loading;
             }else{
                this.$message.error("费率必须在2-20之间");
                _this.loading = false;
                return false;
             }
            
          }
        } else {
          this.$message.error("请完善必填项信息");
          _this.loading = false;
          return false;
        }
      });
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
      formData.append("token", window.localStorage.getItem("token"));
      axios
        .post(`${configs.base}/team/upload`, formData)
        .then(function(response) {
          _this.info.businessLinseimgUrl = response.data.data;
        })
        .catch(function(error) {
          alert("上传失败");
        });
      console.log("tupain");
      console.log(_this.info.businessLinseimgUrl);
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
      formData.append("token", window.localStorage.getItem("token"));
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
      formData.append("token", window.localStorage.getItem("token"));
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
      formData.append("token", window.localStorage.getItem("token"));
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
.dialogBusiness .el-input,
.el-select,
.el-cascader {
  width: 350px;
}
.dialogBusiness .el-form-item {
  margin-bottom: 0px;
}
.dialogBusiness .btn {
  padding-left: 160px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-form-item__error {
  padding-top: 0px;
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