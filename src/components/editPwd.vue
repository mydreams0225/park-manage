<template>
     <div>
         <el-dialog
         title="修改密码"
         :visible.sync="dialog.dialogVisible"
          width="800px">
             <el-form label-position="right" label-width="160px" :model="dialog" >
                   <el-form-item label="密码：" >
                        <el-input v-model="dialog.pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：">
                        <el-input v-model="dialog.checkPwd"></el-input>
                    </el-form-item>
             </el-form>
         </el-dialog>
     </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: {
        pwd: "",
        checkPwd:""
      },
     
      
    };
  },
   props:{
          dialog:{
              dialogVisible: false, 
          }
         
      }
};
</script>
<style>
</style>


