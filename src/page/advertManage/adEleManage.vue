<template>
    <section>
        <div class="parent">
            <div class="margin-tops">
                <el-button type="success" size="medium" >海报</el-button>
                <el-button type="success" size="medium" >视频</el-button>
                <el-button type="success" size="medium" >视频和海报</el-button>
                <query :area= "area" @querys="querys" ></query>
            </div>
            <div class="margin-tops">
                <el-table
                   v-loading="tableLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :data="list"
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
                    prop="eleId"
                    label="元素编号"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="adEleName"
                    label="广告元素名称"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="adType"
                    label="广告类型"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="createDate"
                    label="创建日期"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    label="创建时间"
                    align="center">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            align="center"
                             width="250px">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="primary" size="mini" class="el-icon-edit"></el-button>
                                <el-button
                                @click.native.prevent="deleteRow(scope.$index, scope.row.advertId)"
                                type="danger"
                                class="el-icon-error"
                                size="mini">
                                </el-button>
                            </template>
                     </el-table-column>
                 </el-table>
            </div>
            <div class="margin-tops">
                <paging :total="totals" @handleCurrentChange="currentChange" ></paging>
            </div>
        </div>
    </section>
</template>
<script>
import query from '@/components/queryArea/queryAd'
import paging from '@/components/common/paging'
export default {
    data(){
        return{
           area:{
               name:"搜索"
           },
           tableLoading:false,
           list:[{}],
           totals:{
               totalNum:0,
               currentPage:1,
               pageSize:10
           }
        }
    },
    methods:{
        querys(name){
            

        },
        handleClick(){

        },
        deleteRow(){

        },
        currentChange(currentPage,pageSize){
            this.totals.currentPage = currentPage;
            this.totals.pageSize = pageSize;


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


