<template>
    <section>
       <div class="parent">
           <div class="margin-tops">
               <el-button type="success" size="medium" @click="addClick">添加广告位</el-button>
               <query :area =  "area" @querys="query"></query>
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
                    prop="ggwName"
                    label="广告位名称"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="ggwType"
                    label="广告位类型"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="adCategory"
                    label="广告类别"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="feeMethod"
                    label="计费方式"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    label="创建时间"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="status"
                    label="状态"
                    align="center">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            align="center"
                             width="250px">
                            <template slot-scope="scope">
                                <el-button @click="editClick(scope.row)" type="success" size="mini" class="el-icon-edit"></el-button>
                                 <el-button @click="detailClick(scope.row)" type="success" size="mini" >详情</el-button>
                                  <el-button v-if="scope.row.feeMethod===1" @click="lookAdClick(scope.row.url)" type="success" size="mini" >查看广告</el-button>
                            </template>
                     </el-table-column>
                 </el-table>
           </div>
           <div class="margin-tops">
              <paging :total="totals" @handleCurrentPage="currentPage"></paging>
           </div>
           <div class="dialogArea">
               <el-dialog
                    :title="dialog.title"
                    :visible.sync="dialog.dialogVisible"
                    :close-on-click-modal="false"
                    width="700px">
                    <el-form label-position="right" label-width="160px" :model="dialog.list" :rules="rules" ref="dialog.list">
                         <el-form-item label="广告位名称：" prop="ggwName">
                          <el-input v-model="dialog.list.ggwName"></el-input>
                         </el-form-item>
                         <el-form-item label="广告位类型：" prop="ggwType">
                             <el-select v-model="dialog.list.ggwType" >
                            <el-option
                                v-for="item in config.ggwType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                            </el-select>
                         </el-form-item>
                         <el-form-item label="广告位类别：" prop="ggwCategory">
                          <el-select v-model="dialog.list.ggwCategory">
                              <el-option v-for ="item in config.ggwCategory"
                                     :value="item.value" 
                                     :key="item.value" 
                                     :label="item.label">
                              </el-option>
                          </el-select>
                         </el-form-item>
                         <el-form-item  v-if=" dialog.list.ggwCategory==='1'" label="停车场编号：" prop="parkId">
                          <el-input v-model="dialog.list.parkId"></el-input>
                         </el-form-item>
                         <el-form-item  v-if="dialog.list.ggwCategory==='1'" label="停车场名称：" prop="parkName">
                          <el-input v-model="dialog.list.parkName"></el-input>
                         </el-form-item>
                         <el-form-item v-if=" dialog.list.ggwCategory==='1'" label="类型：" prop="parkType">
                          <el-select v-model="dialog.list.parkType">
                              <el-option v-for ="item in config.parkType"
                                     :value="item.value" 
                                     :key="item.value" 
                                     :label="item.label">
                              </el-option>
                          </el-select>
                         </el-form-item>
                         
                        <el-form-item label="日期：" >
                            <el-date-picker
                            v-model="dialog.list.ggwDate"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyyMMdd">
                            </el-date-picker>
                         </el-form-item>
                         <el-form-item label="位置：" prop="position">
                          <el-cascader class="areaCascader" 
                                      :options="config.position"
                                      expand-trigger="hover"
                                      v-model="dialog.list.position"
                                      @change="handleChange">
                        </el-cascader>
                         </el-form-item>
                         <el-form-item label="详细地址：" >
                          <el-input v-model="dialog.list.detailAddress"></el-input>
                         </el-form-item>
                         <el-form-item label="计费方式：" prop="feeMethod">
                          <el-select v-model="dialog.list.feeMethod">
                              <el-option v-for ="item in config.feeMethod"
                                     :value="item.value" 
                                     :key="item.value" 
                                     :label="item.label">
                              </el-option>
                          </el-select>
                         </el-form-item>
                    </el-form>
                    <div class="btn margin-tops" v-if="looKAt!=='1'">
                      <el-button  @click="submit('dialog.list')" type="success" size="medium" :loading="dialog.loading">提交</el-button>
                    </div>  
               </el-dialog>
           </div>
            <div>
                 <el-dialog
                    :title="QRcode.title"
                    :visible.sync="QRcode.dialogVisible"
                    :close-on-click-modal="false"
                    width="300px">
                    <div class="qrcode">
                        <div id="qrcode"></div>
                    </div>

               </el-dialog>
            </div>
       </div>
    </section>
</template>
<script>
import query from "@/components/queryArea/query1.vue";
import paging from "@/components/common/paging";
import QRCodes from 'qrcode'
export default {
  data() {
    return {
        looKAt:"",
      config: {
        ggwCategory: [
          { value: "1", label: "停车场" },
          { value: "2", label: "APP应用" }
        ],
        ggwType: [{}],
        position: configs.options,
        feeMethod: [{}]
      },

      area: {
        name: "广告位名称"
      },
      totals: {
        totalNum: 0,
        pageSize: 10,
        currentPage: 1
      },
      tableLoading: false,
      list: [
        { ggwId: "3333", ggwName: "ffff", adType: "开屏广告", feeMethod: 1 },
        { ggwId: "3333", ggwName: "ffff", adType: "开屏广告" }
      ],
      dialog: {
        sign: "2",
        title: "",
        dialogVisible: false,
        loading: false,
        list: {
          ggwDate: [
            this.common.dateFormatter(new Date(), false),
            this.common.dateFormatter(new Date(), false)
          ],
          position: ["110000", "110100", "110101"]
        }
      },
      QRcode:{
        title:"",
        dialogVisible:false
      },
      rules: {
        ggwName: [
          { required: true, message: "请输入广告位名称", trigger: "blur" }
        ],
        ggwType: [
          { required: true, message: "请选择广告位类型", trigger: "change" }
        ],
        ggwCategory: [
          { required: true, message: "请选择广告位类别", trigger: "change" }
        ]
      }
    };
  },
  mounetd(){
     
  },
  methods: {
    // 查询列表
    query(name) {
      this.filters.ggwName = name;
    },
    //跳转页数
    currentPage(currentPage, pageSize) {
      this.totals.pageSize = pageSize;
      this.totals.currentPage = currentPage;
    },
    // 点击编辑按钮
    editClick(row) {
      this.dialog.list = row;
      this.looKAt = "0";
      this.dialog.dialogVisible = true;
      this.dialog.title = "编辑广告位";
    },
    // 点击详情按钮
    detailClick(row) {
      this.dialog.list = row;
      this.looKAt = "1";
      this.dialog.dialogVisible = true;
      this.dialog.title = "查看详情";
    },
    // 点击查看广告
    lookAdClick(url) {
       
        this.QRcode.dialogVisible=true;

      
    },
    //点击添加按钮
    addClick() {
      this.looKAt = "0";
      this.dialog.dialogVisible = true;
      this.dialog.title = "添加广告位";
      this.dialog.list = {};
    },
    handleChange() {}
  },
  components: {
    query,
    paging
  }
};
</script>
<style>
.dialogArea .el-input,
.el-select,
.el-cascader {
  width: 280px;
}
.dialogArea .el-form-item {
  margin-bottom: 10px;
}
.dialogArea .btn {
  padding-left: 160px;
}
</style>


