<template>
     <div class="dialogPwd">
         <el-dialog
         title="修改密码"
         :visible.sync="dialog.dialogVisible"
          width="600px">
             <el-form  label-width="160px" :model="info" >
                   <el-form-item label="密码：" >
                        <el-input type="password" v-model="info.pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：">
                        <el-input type="password" v-model="info.checkPwd"></el-input>
                    </el-form-item>
                    
             </el-form>
             <div class="btn margin-tops">
                      <el-button @click="submit" type="success" size="medium" :loading="loading">提交</el-button>
                    </div> 
         </el-dialog>
     </div>
</template>
<script>
// import reqEditPwd from '@/api/api'
export default {
  data() {
    return {
      info: {
        pwd: "",
        checkPwd: ""
      },
      loading: false
    };
  },
  props: {
    dialog: {
      dialogVisible: false
    }
  },
  methods: {
      submit(){
          reqEditPwd(para).then(res=>{

          })
          this.dialog.dialogVisible=false;

      }
  }
};
</script>
<style>
.dialogPwd{
    text-align: left;
}
.dialogPwd .el-input{
    width:180px;
}
.dialogPwd .btn{
    padding-left: 160px;
}
</style>


