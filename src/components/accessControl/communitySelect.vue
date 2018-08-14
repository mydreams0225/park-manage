

        <template>
        <!-- <el-input v-model="community"></el-input> -->
            <el-select v-model="community" placeholder="请选择">
                <el-option
                v-for="item in communitySel"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </template>


<script>
export default {
    props: {
    community: {
      required: true
    }
  },
  data(){
      return{
        communitySel:[{value:"1",label:"dd"}]  
      }
  }
}
</script>
<style>
   
</style>


