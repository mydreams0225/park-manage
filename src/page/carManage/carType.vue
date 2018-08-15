<template>
	<section>
		<div class="parent">
			<!-- 查询区 -->
      	<div class="margin-tops">
      		<form class="form-inline" role="form" id="searchForm" name="searchForm" onsubmit="subSearchForm();return false;">
	      		<el-select v-model="filters.park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	                  </el-select>
	                   <el-button  type="primary" icon="el-icon-search" size="medium" @click="getCarType">查询</el-button>
	                   <el-button icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')" size="medium">清除</el-button>
              </form>
      	</div>
      	<!-- 操作区 -->
      	<div class="margin-tops">
              <template>
                    <el-table
                      :data="tableData"
                      border
                      style="width: 100% ;">
                      <el-table-column
                        prop="seri_no"
                        label="序号"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="type_name"
                        label="类型名称"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="display_info"
                        label="屏显信息">
                      </el-table-column>
                      <el-table-column
                        
                        label="启用状态">
                         <template slot-scope="scope"><span class="backgrounds red">{{ scope.row.enable_status }}</span></template>
                       <!--  <span style='background-color:green;'>{{enable_status}}</span> -->
                      </el-table-column>    
                      <el-table-column
                        prop="order_by"
                        label="排序">
                      </el-table-column>           
                      <el-table-column
                        prop="operate"
                        label="操作"
                        width="250px">
                         <template slot-scope="scope">
                            <el-button size="small" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
                        </template>
                      </el-table-column>
                      
                    </el-table>
              </template>
            </div>
             <!--  分页 -->
              <!--编辑界面-->
              <el-dialog :visible.sync="editFormVisible" title="编辑" v-model="editFormVisible" :close-on-click-modal="false" width="500px">
                  <el-form :model="edit" :rules="rules" ref="edit" >
                        <el-row :gutter="20">
                         <el-col :span="12">
                           <el-form-item prop="carType" label="类型名称">
                                 <el-select  v-model="edit.carType" placeholder="请选择">
                                    <el-option
                                      v-for="item in carType"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                                </el-form-item>
                         </el-col>
                         <el-col :span="12">
                            <el-form-item prop="pxName" label="屏显名称">
                                 <el-input v-model="edit.pxName" ></el-input>
                            </el-form-item>
                         </el-col>                       
                        </el-row>
                        <el-row :gutter="20">                        
                          <el-col :span="12">
                            <el-form-item label="排序">
                                 <el-input v-model="edit.order" ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item prop="useState" label="启用状态"> 
                                 <el-select  v-model="edit.useState" placeholder="请选择">
                                    <el-option
                                      v-for="item in useState"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>
                    </el-form>
                            <div slot="footer" class="dialog-footer">
                              <el-button @click.native="editFormVisible = false">取消</el-button>
                              <el-button type="primary" @click.native="editSubmit('edit')" :loading="editDialog.editLoading">保存</el-button>
                            </div>
              </el-dialog>
         <div>

           <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="totals.currentPage"
              :page-size.sync="totals.pageSize"
              layout="total, prev, pager, next"
              :total.sync="totals.totalNum">
            </el-pagination>
          </div>
             <!-- 分页end -->
		</div>
	</section>
</template>
<script>
export default {
  data() {
    return {
      edit: {
        carType: "",
        pxName: "",
        order: "",
        useState: ""
      },
      useState:[],
      rules:{
        carType: [
            { required: true, message: '请选择车辆类型', trigger: 'change' },
          ],
          pxName:[
            { required: true, message: '请输入显屏名称', trigger: 'blur' },
          ],
          useState:[
            { required: true, message: '请选择使用状态', trigger: 'change' },
          ]

      },
      carType: [],
      dialogTableVisible: false,
      editFormRules: {
        name: [{ required: true, message: "请输入车牌号", trigger: "blur" }]
      },
      editDialog: {
       
        editLoading: false,
      },
      editFormVisible: false,
      currentPage1: 1,
      filters: {
        park: ""
      },
      park: [],
      tableData: [
        {
          seri_no: "1",
          type_name: "小型车",
          display_info: "小型车",
          enable_status: "启用",
          order_by: ""
        }
      ],
      totals:{
        currentPage:1,
        pageSize:1,
        totalNum:10
      }
    };
  },
  created() {
    //获取停车场列表
    this.park = this.common.getParkList();
  },
  mounted(){
    this.getCarType();
  },
  methods: {
    //查询请求
    getCarType() {
      
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      // this.editDialog.edit = Object.assign({}, row);
    },
    //修改数据请求
    editSubmit(formNames){
      this.$refs.edit.validate(valid=>{
        if(valid){
          //验证通过
          this.dialogTableVisible=false;
          
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
     
      console.log(`当前页: ${val}`);
    },
    callbackSelTenant: function() {
      var aa = document.getElementsByTagName("input");
      console.log(aa);
      for (var i = 0; i < aa.length; i++) {
        if (aa[i].type == "text") {
          aa[i].value = "";
        }
      }
    }
  }
};
</script>
<style scoped>
.backgrounds {
  color: #fff;
  padding: 3px;
  border-radius: 5px;
}
.green {
  background-color: #5cb85c;
}
.red {
  background-color: #d9534f;
}
</style>