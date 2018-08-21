

        <template>
        <!-- <el-input v-model="community"></el-input> -->
            <el-select v-model="channelType" placeholder="请选择">
                <el-option
                v-for="item in channelTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </template>


<script>
export default {
    props: {
    channelType: {
      required: true
    }
  },
  data(){
      return{
        channelTypes:[{value:"1",label:"通道1"}]  
      }
  }
}
</script>
<style>
   
</style>


