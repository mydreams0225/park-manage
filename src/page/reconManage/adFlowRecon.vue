<template>
    <section>
         <div class="parent">
             <div class="margin-tops">
                  <query :area="areas" @querys="query"></query>
             </div>
             <div class="margin-tops">
                 <el-table
                   v-loading="tableLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :data="List"
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
                    prop="patternId"
                    label="合作商编号"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="patternType"
                    label="类型"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="createDate"
                    label="时间"
                    align="center">
                    </el-table-column>
                    
                    <el-table-column
                            fixed="right"
                            label="操作"
                            align="center"
                             width="250px">
                            <template slot-scope="scope">
                            </template>
                     </el-table-column>
                </el-table> 
             </div>
             <div class="margin-tops">
                  <paging :total="totals" @handleCurrentChange="currentChange"></paging>
             </div>
         </div>
    </section>
</template>

<script>
import query from '@/components/queryArea/queryRecon'
import paging from '@/components/common/paging'
export default {
    data(){
        return{
           areas:{

           },
           tableLoading:false,
           List:[{}],
           totals:{
               currentChange:1,
               pageSize:10,
               totalNum:0
           }
        }
    },
    methods:{
      query(){

      },
      currentChange(){

      }
    },
    components:{
        query,
        paging
    }
    
}
</script>
<style>
   
</style>


