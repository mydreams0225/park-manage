<template>
	<section>
      <div class="parent">
      	<!-- 操作区 -->
      	<div class="margin-tops">
      	  <el-button type="primary"  @click="addVisible = true"><strong><i class="el-icon-plus"></i></strong>新增</el-button>	
      	<el-dialog
          title="添加车辆分组"
          :visible.sync="addVisible"
          width="30%"
          :before-close="handleClose">
          
          <form >
             <el-row :gutter="20">
              <div><label for=""><span style="color:red">*</span> 所属停车场</label></div>
            
              <el-select style="display:block" v-model="v_park" placeholder="请选择">
                <el-option
                  v-for="item in s_park"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div><label for=""><span style="color:red">*</span> 分组名称</label></div>
              <el-input v-model="v_group" placeholder="请输入内容"></el-input>
              
             </el-row>
              <el-row :gutter="20">
                <el-col :span="10"><div class="grid-content bg-purple">
                  <div><label for=""><span style="color:red">*</span> 计费类型</label></div>
                     <el-select v-model="v_fee_type" placeholder="请选择">
                <el-option
                  v-for="item in fee_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
                  </div>

                </el-col>
                <el-col :span="10"><div class="grid-content bg-purple">
                  <div><label for="">排序</label></div>
                  <el-input v-model="v_order" placeholder="请输入内容"></el-input>
                  </div>
                </el-col>
              </el-row>
          </form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="addVisible = false">保 存</el-button>
          </span>
        </el-dialog>
        </div>
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
      	 <div class="margin-tops">
              <template>
                    <el-table
                      :data="groupData"
                      border
                      style="width: 100% ;">
                      <el-table-column
                        prop="seri_no"
                        label="序号"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="group_name"
                        label="分组名称"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="fee_types"
                        label="计费类型">
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
                          
                        </template>
                      </el-table-column>
                      
                    </el-table>
              </template>
            </div>
             <!--  分页 -->
         <div class="block">

            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size="1"
              layout="total, prev, pager, next"
              :total="0">
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
      v_fee_type:"",
      fee_type:[],
      v_order:"",
      addVisible: false,
      v_park: "",
      s_park: [],
      v_group: "",
      currentPage1: 1,
      v_park: "", //停车场
      park: [{ value: "", label: "所属停车场" }],
      groupData: []
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
</style>