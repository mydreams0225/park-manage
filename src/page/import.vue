<template>
    <section>
        <div class="parent">
            <div class="font upload" style="margin-top:30px">
            <input type="file" id="upLoad"  style="display:none" @change="fn()" @click="fn">
             <a href="#" @click="go()" ><strong ><i class="el-icon-document" ></i> 选择批量导入Excel文件...</strong></a>{{file.name}}
             <div style="margin-top:15px">
               <el-button size="small" type="primary" @click="uploadSave($event)"><i class="el-icon-upload2"></i>上传并保存</el-button>
               <el-button size="small" type="primary"><i class="el-icon-download"></i>下载模板</el-button>
             </div>
           </div>
        </div>
         
    </section>
</template>
<script>
export default {
  data() {
    return {
      file: {
        name: ""
      }
    };
  },
  methods: {
    uploadSave(event) {
      event.preventDefault();
      console.log(event);
      let formData = new URLSearchParams();
      formData.append("name", this.tab2_park[0].label);

      formData.append("file", this.file);

      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      console.log(formData);
      postFile(formData).then(data => {
        //this.$axios.post('', formData, config).then(function (res) {
        console.log(res);
        if (res.status === 200) {
          /*这里做处理*/
        }
      });
    },

    go() {
      var upLoad = document.getElementById("upLoad");
      upLoad.click();
    },

    fn() {
      this.file = event.target.files[0];
      console.log(this.file.name);
      if (event.type == "change") {
        var req = /xlsx|.xls$/g;
        if (this.file.name && !req.exec(this.file.name)) {
          alert("请上传xlsx或xls后缀的Excel");
        } else {
        }
      }
    }
  }
};
</script>
<style scoped="scoped">
a {
  text-decoration: none;
  font-size: 12px;
}
</style>


