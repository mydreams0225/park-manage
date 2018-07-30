<template>
    <section>
        <div class="parent">
            <div class="margin-tops">
                <el-button type="primary"><i class="el-icon-plus"></i> 新增</el-button>
                <el-button type="denger"><i class="el-icon-delete"></i> 删除</el-button>

            </div>
            <div class="margin-tops querys">
                <span>所属停车场</span>
                <el-select v-model="filters.park" >
                    <el-option
                        v-for="item in park"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                </el-select>
                
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data(){
        return{
            // park:[],
            filters:{
                park:""
            }
        }
    },
    created(){
       var park= this.common.getParkList();
      
       this.park=park;
        console.log("333"+this.park)
    },
}
</script>
<style  scoped>
   
</style>


