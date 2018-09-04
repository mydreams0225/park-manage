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
                    prop="planName"
                    label="计划名称"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="adType"
                    label="广告类型"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="dayBudget"
                    label="当日预算"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="createDate"
                    label="创建日期"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="approvalStatus"
                    label="审批状态"
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
                <paging :total="totals" @handleCurrentChange="CurrentChanges"></paging>
            </div>
        </div>
    </section>
</template>
<script>
import query from '@/components/queryArea/queryTask'
import paging from '@/components/common/paging'
export default {
    data(){
        return{
            areas:{
                ad1:"创建日期",
                ad2:"计划名称",
                ad3:"广告主编号"
            },
            tableLoading:false,
            List:[],
            totals:{
                pageSize:10,
                totalNum:0,
                currentPage:1
            }
        }
    },
    methods:{
        query(){

        },
        CurrentChanges(){

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





