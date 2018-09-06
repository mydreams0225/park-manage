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
                    prop="ggwId"
                    label="广告位编号"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="planId"
                    label="投放计划编号"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="planName"
                    label="投放计划名称"
                    align="center">
                    </el-table-column>
                    
                    <el-table-column
                    prop="adrId"
                    label="广告主编号"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="adrName"
                    label="广告主名称"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="adEleId"
                    label="广告元素编号"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="statusName"
                    label="状态"
                    align="center">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            align="center"
                             width="250px">
                            <template slot-scope="scope">
                                <el-button
                                @click.native.prevent="prentName(scope.$index, scope.row.ggwId,scope.row.status)"
                                type="primary"
                                
                                size="mini">
                                  修改状态
                                </el-button>
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
import query from "@/components/queryArea/query2";
import paging from "@/components/common/paging";
import { reqPlanManage ,reqStatus} from "@/api/patternManage/planManage";
export default {
  data() {
    return {
      areas: {
        name: "投放计划编号",
        code: "投放计划名称"
      },
      totals: {
        totalNum: 0,
        pageSize: 10,
        currentPage: 1
      },
      tableLoading: false,
      list: [{}],
      filters: {}
    };
  },
  mounted(){
      this.query();
  },
  methods: {
    query(planId, planName) {
        debugger
        var _this=this;
      this.filters.planId = planId;
      this.filters.planName = planName;
      let para = {
        planId: this.filters.planId,
        planName: this.filters.planName,
        pageSize:this.totals.pageSize,
        currentPage:this.totals.currentPage,
        token: window.localStorage.getItem("token")
      };
      reqPlanManage(para)
        .then(res => {
          if (res.status === 200) {
              var list = res.list;
              list.length!=0 ? this.loopItemq(list) : "";
          } else if (res.status === 202) {
            _this.common.tokenCheck(_this);
            this.tableLoading = false;
          }
        })
        .catch(() => {
          _this.$message.error("请求超时，请重新发送请求");
          this.tableLoading = false;
          return false;
        });
    },
    loopItemq(list){
       list.forEach(item=>{
           var statusNames="";
           if(item.status==="1"){
              statusNames="启用";
           }else if(item.status==="2"){
               statusNames="禁用"
           }
          var temp = {
              ggwId:item.ggwId,
              planId:item.planId,
              planName:item.planName,
              adrId:item.adrId,
              adrName:item.adrName,
              adEleId:item.adEleId,
              statusName:statusNames
          }
       })
    },
    currentChange(currentPage, pageSize) {
      this.totals.currentChange = currentPage;
      this.totals.pageSize = pageSize;
      this.query();
    },
   
    prentName(index,id, status) {
      let para = {
        status: status,
        id:id,
        token:window.localStorage.getItem("token")
      };
      reqStatus(para).then(res=>{
        if(res.status===200){
           this.query();
        }else if(res.status===202){
             _this.common.tokenCheck(_this);
            this.tableLoading = false;
        }
      }).catch(()=>{
           _this.$message.error("请求超时，请重新发送请求");
          this.tableLoading = false;
          return false;
      })

    }
  },
  components: {
    query
  }
};
</script>
<style>
</style>


