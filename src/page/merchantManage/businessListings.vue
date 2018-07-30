<template>
    <section>
        <div class="parent">
            <!-- 操作区 -->
            <div class="margin-tops">
                <el-button type="primary" size="medium"><i class="el-icon-plus"></i> 新增</el-button>
                <el-button type="denger" size="medium"><i class="el-icon-delete"></i> 删除</el-button>

            </div>
            <!-- 查询区 -->
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
                <el-input placeholder="商户名称"  v-model="filters.bussinessName">
                     <template slot="prepend">商户名称</template>   
                </el-input>
                <el-input placeholder="门牌号"  v-model="filters.doorNumber">
                     <template slot="prepend">门牌号</template>   
                </el-input>
                <el-button type="primary" size="medium"><i class="el-icon-search"></i>查询</el-button>
                <el-button size="medium"><i class="el-icon-delete"></i> 清除</el-button>
            </div>
            <!-- 展示区 -->
            <div class="margin-tops">
               <el-table
               :data="businessList"
               tool-tip-effect="dark"
               style="100%"
               @selection-change="handleselectchange">
                   <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="120">
                    </el-table-column>
               </el-table>
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


