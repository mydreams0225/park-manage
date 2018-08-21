<template>
	<section>
      <div class="parent">
      	<!-- 操作区 -->
      	<div class="margin-tops">
      	  <el-button type="primary"  @click="addVisible = true"><strong><i class="el-icon-plus"></i></strong>新增</el-button>	
      	<el-dialog
          title="添加车辆分组"
          :visible.sync="addVisible"
          width="600px"
          :before-close="handleClose">
          <el-form :model="add" :rules="rules" ref="add" label-width="100px">
             <el-row :gutter="20">
               <el-col :span="12">  
                  <el-form-item label="所属停车场" prop="park">
                    <el-select  v-model="add.park" placeholder="请选择">
                    <el-option
                      v-for="item in park"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  </el-form-item>
              </el-col>
               <el-col  :span="12">
                 <el-form-item label="分组名称" prop="group">
                     <el-input v-model="add.group" placeholder="请输入分组名称"></el-input>
                 </el-form-item>
               </el-col>
             </el-row>
              <el-row :gutter="20">
                <el-col :span="12">  
                        <el-form-item label="计费类型" prop="feeType">                   
                              <el-select  v-model="add.feeType" placeholder="请选择">
                                <el-option
                                  v-for="item in feeType"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                  </el-form-item>
                </el-col>
                 <el-col :span="12">
                  <el-form-item label="排序" prop="order">
                      <el-input v-model="add.order" ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveCarGroup('add')">保 存</el-button>
          </span>
        </el-dialog>
        </div>
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
	                   <el-button  type="primary" icon="el-icon-search" size="medium" @click="getCarGroup">查询</el-button>
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
      rules: {
        park: [
          {
            required: true,
            message: "请选择停车场",
            trigger: "change"
          }
        ],
        group: [
          {
            required: true,
            message: "请输入分组名称",
            trigger: "blur"
          }
        ],
        feeType: [
          {
            required: true,
            message: "请选择计费类型",
            trigger: "change"
          }
        ],
        order: [
          {
            required: true,
            message: "请输入排序",
            trigger: "blur"
          }
        ]
      },
      filters: {
        park: ""
      },
      totals: {
        currentPage: 1,
        pageSize: 1,
        totalNum:0
      },
      add: {
        feeType: "",
        order: "",
        park: "",
        group: ""
      },
      feeType: [],
      addVisible: false,
      park: [],
      currentPage1: 1,
      park: [{ value: "", label: "所属停车场" }],
      groupData: []
    };
  },
  mounted() {
    this.getCarGroup();
  },
  created(){
    this.park=this.common.getParkList();
  },
  methods: {
    saveCarGroup(formName) {
      this.$refs.add.validate(valid => {
        if (valid) {
        } else {
        }
      });
    },
    //查询请求
    getCarGroup() {
      var parp = {
        park:this.filters.park,
        jwt:window.localStorage.getItem("jwt"),
        currentPage:this.totals.currentPage,
        pageSize:this.totals.pageSize
      };

    },

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