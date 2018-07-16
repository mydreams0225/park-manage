<template>
	<section>
		<div class="parent">
			<!-- 查询区 -->
      	<div class="margin-tops">
      		<form class="form-inline" role="form" id="searchForm" name="searchForm" onsubmit="subSearchForm();return false;">
	      		<el-select v-model="v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	                  </el-select>
	                   <el-button  type="primary" icon="el-icon-search" size="medium">查询</el-button>
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
              <el-dialog :visible.sync="editFormVisible" title="编辑" v-model="editFormVisible" :close-on-click-modal="false" width="400px">
                  <form  >
                      <el-row :gutter="20">
                        <div><label for=""><span style="color:red">*</span> 类型名称</label></div>
                      
                        <el-select style="display:block" v-model="v_car_type" placeholder="请选择">
                          <el-option
                            v-for="item in car_type"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        <div><label for=""><span style="color:red">*</span> 屏显名称</label></div>
                        <el-input v-model="v_px_name" placeholder="请输入内容"></el-input>
                        
                      </el-row>
                        <el-row :gutter="20">
                          <el-col :span="10"><div class="grid-content bg-purple">
                            <div><label for="">排序</label></div>
                              <el-input v-model="v_order" placeholder="请输入内容"></el-input>
                            </div>

                          </el-col>
                          <el-col :span="10"><div class="grid-content bg-purple">
                            <div><label for=""><span style="color:red">*</span> 启用状态</label></div>
                            <el-input v-model="v_use_state" placeholder="请输入内容"></el-input>
                            </div>
                          </el-col>
                        </el-row>
                    </form>
                            <div slot="footer" class="dialog-footer">
                              <el-button @click.native="editFormVisible = false">取消</el-button>
                              <el-button type="primary" @click.native="editSubmit" :loading="editDialog.editLoading">提交</el-button>
                            </div>
              </el-dialog>
         <div>

            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size="1"
              layout="total, prev, pager, next"
              :total="1">
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
      v_car_type:"",
      car_type:[],
      v_px_name:"",
      v_order:"",
      v_use_state:"",
      //clientData: [{ plate_name: "车位一" }, { plate_name: "车位二" }],
      dialogTableVisible: false,
      editFormRules: {
        name: [{ required: true, message: "请输入车牌号", trigger: "blur" }]
      },
      editDialog: {
        //编辑界面数据
        editForm: {
          name: "22"
        },
        editLoading: false,

        editForm: ""
      },
      editFormVisible: false,
      currentPage1: 1,
      v_park: "",
      park: [{ value: "", label: "所属停车场" }],
      tableData: [
        {
          seri_no: "1",
          type_name: "小型车",
          display_info: "小型车",
          enable_status: "启用",
          order_by: ""
        }
      ]
    };
  },
  methods: {
       //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editDialog.editForm = Object.assign({}, row);
      console.log("zlz");
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