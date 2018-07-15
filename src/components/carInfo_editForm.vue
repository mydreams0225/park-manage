<template>
    <section>
        <el-dialog title="纠正车牌号" v-model="editFormVisible" :close-on-click-modal="false" :visible="editFormVisible" >
              <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm" >
                <el-form-item label="车牌号" prop="name">
                  <el-input v-model="editForm.car_no" auto-complete="off" ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
              </div>
            </el-dialog>
    </section>
</template>
<script>
export default {

    props:{
        editDialog:{

        }
    }
}
</script>
<style>

</style>


