<template>
    <section>
        <div class="parent">
            <div class="margin-tops">
                <el-button 
                    type="success" 
                    size="medium" 
                    @click="addClick">添加
                </el-button>
                <query :area= "area" @querys="querys" ></query>
            </div>
            <div class="margin-tops">
                <el-table
                   v-loading="tableLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :data="list"
                    border
                    style="width: 100%"
                    >
                    <el-table-column
                      type="index"
                      width="100"
                      label="序号"
                      align="center">
                    </el-table-column>
                    <el-table-column
                    prop="eleId"
                    label="元素编号"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="adEleName"
                    label="广告元素名称"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="adType"
                    label="广告类型"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="createDate"
                    label="创建日期"
                    align="center">
                    </el-table-column>
                   
                    <el-table-column
                            fixed="right"
                            label="操作"
                            align="center"
                             width="250px">
                            <template slot-scope="scope">
                                <el-button 
                                    @click="handleClick(scope.row)"
                                     type="primary" size="mini" 
                                     class="el-icon-edit"></el-button>
                                <el-button
                                    @click.native.prevent="deleteRow(scope.$index, scope.row.advertId)"
                                    type="danger"
                                    class="el-icon-error"
                                    size="mini">
                                </el-button>
                            </template>
                     </el-table-column>
                 </el-table>
            </div>
            <div class="margin-tops">
                <paging :total="totals" @handleCurrentChange="currentChange" ></paging>
            </div>
            <div class="dialog">
                <el-dialog
                    :title="dialog.title"
                    :visible.sync="dialog.dialogVisible"
                    :close-on-click-modal="false"
                    width="1000px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form label-position="right" 
                                label-width="160px" 
                                :model="dialog.list"  
                                :rules="rules" 
                                ref="dialog.list">
                            <el-form-item  label="页面名称：" prop="pageName">
                                <el-input v-model="dialog.list.pageName"></el-input>
                            </el-form-item>
                            <el-form-item  label="广告类型：" prop="adType">
                                <el-select v-model="dialog.list.adType" >
                                    <el-option
                                        v-for="item in config.adType"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                    </el-select>
                            </el-form-item>
                            <el-form-item  label="元素类型：" prop="eleType">
                                <el-radio v-model="dialog.list.eleType" label="1">海报</el-radio>
                                <el-radio v-model="dialog.list.eleType" label="2">视频</el-radio>
                                <el-radio v-model="dialog.list.eleType" label="3">视频和海报</el-radio>
                            </el-form-item>
                            <el-form-item  v-if="dialog.list.eleType==='1' ||dialog.list.eleType==='3' " label="海报图片：" prop="postImg">
                                <el-upload
                                        class="upload-demo"
                                        ref="upload"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-remove="handleRemove"
                                        :file-list="dialog.list.postImg"
                                        :auto-upload="false">
                                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                        </el-upload>
                            </el-form-item>
                            <el-form-item  v-if="dialog.list.eleType==='2' ||dialog.list.eleType==='3' " label="视频封面" prop="videoPost">
                                <el-upload
                                        class="upload-demo"
                                        ref="upload"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-remove="handleRemove"
                                        :file-list="dialog.list.videoPost"
                                        :auto-upload="false">
                                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                                        <div slot="tip" class="el-upload__tip">与视频文件像素相同,大小不超过200KB</div>
                                        </el-upload>
                            </el-form-item>
                            <el-form-item  v-if="dialog.list.eleType==='2' ||dialog.list.eleType==='3' " label="视频文件" prop="videoFile">
                                <el-upload
                                        class="upload-demo"
                                        ref="upload"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-remove="handleRemove"
                                        :file-list="dialog.list.videoFile"
                                        :auto-upload="false">
                                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                                        <div slot="tip" class="el-upload__tip">仅支持mp4，大小为5MB</div>
                                        </el-upload>
                            </el-form-item>
                            <el-form-item  label="连接到url：" prop="urls">
                                <el-input v-model="dialog.list.urls"></el-input>
                            </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                             <div  class="showPhone">
                               <video controls="controls" 
                                    v-if="dialog.list.eleType==='2' 
                                    || dialog.list.eleType==='3'" 
                                    id="advertelecoverimgpath" 
                                    loop="loop" 
                                    preload="auto" 
                                    :poster="dialog.list.poster"
                                    :src="dialog.list.url"
                                    >
                             </video>
                             <img  :src="dialog.list.image" alt="" 
                                 v-if="dialog.list.eleType==='1' 
                                 || dialog.list.eleType==='3'">
                            </div>
                        </el-col>
                    </el-row>                   
                      <div class="btn">
                          <el-button 
                           @click="submit('dialog.list')"
                           type="success" 
                           size="medium" 
                           :loading="dialog.loading">提交</el-button>
                      </div>
                </el-dialog>
            </div>
        </div>
    </section>
</template>
<script>
import query from "@/components/queryArea/queryAd";
import paging from "@/components/common/paging";
import { reqAdEleList,reqEditadEle,reqAddadEle } from "@/api/advertManage/adEle";
export default {
  data() {
    return {
      rules: {
        pageName: [
          { required: true, message: "请输入页面名称", trigger: "blur" }
        ],
        adType: [
          { required: true, message: "请选择广告类型", trigger: "change" }
        ]
      },
      config: {
        adType: [{ label: "1", value: "1" }]
      },
      area: {
        name: "搜索"
      },
      tableLoading: false,
      list: [{}],
      totals: {
        totalNum: 0,
        currentPage: 1,
        pageSize: 10
      },
      dialog: {
        title: "",
        dialogVisible: false,
        list: {
          image: "../../../static/img/car.jpg",
          pageName: "",
          poster: "../../../static/img/car.jpg",
          url:
            "http://hc.yinyuetai.com/uploads/videos/common/E9B40165A8FC7544DB34697FA6F050EB.mp4?sc=ab78f1699fdd31a6&br=780&vid=3285437&aid=44719&area=KR&vst=0"
        }
      }
    };
  },
  mounted(){
    this.querys();
  },
  methods: {
    querys(name) {
      var _this = this;
      let para = {
        name: name,
        currentPage: this.totals.currentPage,
        pageSize: this.totals.pageSize,
        token: window.localStorage.getItem("token")
      };
      reqAdEleList(para)
        .then(res => {
          if (res.status === "200") {
            var list = res.list;
            _this.loopItem(list);
          } else if (res.status === "202") {
            _this.common.tokenCheck(_this);
          }
          this.tableLoading = false;
        })
        .catch(() => {
          _this.$message.error("请求超时，请重新发送请求");
          this.tableLoading = false;
          return false;
        });
    },
    loopItem(list) {
      list.forEach(item => {
        var temp = {
          eleId: item.eleId,
          adEleName: item.adEleName,
          adType: item.adType,
          createDate: item.createDate
        };
        this.list.push(temp);
      });
    },
    handleClick(row) {
     
      this.dialog.dialogVisible = true;
      this.dialog.title = "修改广告元素";
      this.dialog.list = row;
    },
    deleteRow() {},
    submit(formName){
         this.dialog.loading = true;
      var _this = this;
      this.$refs[formName].validate(valid => {
        if(valid){
          let para= {
            
          }
           this.reqData(this.list.title ,para);
        }else{
           _this.$message.error("请完善必填项信息");
           _this.dialog.loading = false;
          return false;
        }
      });
    },
    reqData(title,para){
       if (title === "添加广告元素") {
            // 添加请求
            reqAddadEle(para).then(res => {
              if (res.status === 200) {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
              } else if (res.status === 202) {
                _this.common.tokenCheck(_this);
              }
               _this.dialog.loading = false;
            }).catch(err => {
              _this.dialog.loading = false;
              _this.$message.error("请求超时，请重新发送请求");
              return false;
            });;
          } else {
            // 修改请求
            reqEditadEle(para).then(res => {
              if (res.status === 200) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
              } else if (res.status === 202) {
                _this.common.tokenCheck(_this);
                
              }
              _this.dialog.loading = false;
            }).catch(err => {
              _this.$message.error("请求超时，请重新发送请求");
              _this.dialog.loading = false;
              return false;
            });;
          }
    },
    currentChange(currentPage, pageSize) {
      this.totals.currentPage = currentPage;
      this.totals.pageSize = pageSize;
      this.querys();
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //   handlePreview(file) {
    //     console.log(file);
    //   },
    // 点击添加按钮
    addClick() {
      this.dialog.dialogVisible = true;
      this.dialog.title = "添加广告元素";
      this.dialog.list = row;
    }
  },
  components: {
    query,
    paging
  }
};
</script>
<style>
.dialog .el-input,
.el-select,
.el-cascader {
  width: 300px;
}
.dialog .btn {
  padding-left: 160px;
}
.showPhone {
  border: 1px solid #ccc;
  height: 568px;
  width: 320px;
  box-shadow: 2px 2px 5px #888888;
}
.dialog video {
  height: 180px;
  width: 320px;
  background: rgb(0, 0, 0);
}
</style>


