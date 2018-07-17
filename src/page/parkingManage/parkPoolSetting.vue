<template>
	<section>
		<div class="parent">
			<div class="margin-tops">
				<el-button v-on:click.native="add.addTableVisible = true" type="primary" size="medium"><i class="el-icon-plus"></i>新增</el-button>
				<a href="#"  size="medium"><i class="el-icon-circle-check" ></i>车位池功能说明</a>
				 <el-button type="success" size="medium"><strong><i class="el-icon-upload" ></i></strong> 导出EXCEL报表</el-button>	
			</div>
      <el-dialog title="添加车位池" :visible.sync="add.addTableVisible" width="550px" >      
         <div slot="footer" class="dialog-footer">
            <el-button @click.native="add.addTableVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit" :loading="add.editLoading">提交</el-button>
         </div>             
      </el-dialog>
			<div class="margin-tops">
				<form class="form-inline" role="form" id="searchForm" name="searchForm" onsubmit="subSearchForm();return false;">
                    <el-select v-model="filters.v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
                  </el-select>
                  <el-select v-model="filters.v_feetype" filterable placeholder="车位满时收费方式">
                    <el-option
                      v-for="item in feetype"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="filters.v_countrule" filterable placeholder="车位池满统计规则">
                    <el-option
                      v-for="item in countrule"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input   id="poolname" name="poolname" placeholder="车位池名称" v-model="filters.v_poolname" >
                      <template slot="prepend">车位池名称</template>   
                  </el-input> 
                  <el-input   id="totalplatenum" name="totalplatenum" placeholder="总车位数" v-model="filters.v_totalplatenum">
                      <template slot="prepend">总车位数</template>   
                  </el-input> 
                  <el-input   id="car_no" name="car_no" placeholder="车牌号" v-model="filters.v_car_no">
                      <template slot="prepend">车牌号</template>   
                  </el-input> 
                  <el-button size="medium" type="primary" icon="el-icon-search">查询</el-button>
                  <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
			 </form>
			</div>
			<div class="margin-tops">
				 <template>
                    <el-table
                      :data="tableData"
                      border
                      style="width: 100% ;"
                      >
                      <el-table-column
		                  type="selection"
		                  width="55">
                      </el-table-column>
                      <el-table-column
                        prop="seri_no"
                        label="序号"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="pool_name"
                        label="车位池名称"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="garage"
                        label="所属车库">
                      </el-table-column>
                      <el-table-column
                        prop="feetype"
                        label="车位满时收费方式">
                      </el-table-column>               
                      <el-table-column
                        prop="countrule"
                        label="车位池满统计规则">
                       
                         
                      </el-table-column>
                      <el-table-column
                        prop="totalplatenum"
                        label="总车位数">
                        
                         
                      </el-table-column>

                      <el-table-column
                        prop="ternpalateNum"
                        label="有效期内车位数">
                      </el-table-column>
                      <el-table-column
                        prop="presentCarNum"
                        label="在场车辆数">
                      </el-table-column>
                      <el-table-column
                        prop="surplusCarNum"
                        label="剩余车辆数">
                      </el-table-column>
                      <el-table-column
                        prop="plate_no"
                        label="绑定的车牌号">
                      </el-table-column>
                      <el-table-column
                        prop="create_time"
                        label="创建时间">
                      </el-table-column>
                     
                      <el-table-column
                       
                        label="操作"
                        width="250px">
                         <template slot-scope="scope">
                            
                        </template>
                      </el-table-column>
                    </el-table>
                 </template>
			</div>
			 <!-- 分页区 -->
		    <!-- <div>
		        <Paging v-bind:total="totals"></Paging>
		        
		    </div> -->
        <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="totals.currentPage"
              :page-size.sync="totals.pageSize"
              layout="total, prev, pager, next"
              :total.sync="totals.totalNum">
            </el-pagination>
          </div>
		</div>
	</section>
</template>
<script>
export default {
  data() {
    return {
      add: {
        addTableVisible: false,
        editLoading: false
      },
       totals: {
        totalNum: 1,
        pageSize: 1,
        currentPage: 1
      },
      filters: {
        v_park: "",
        v_feetype: "",
        v_countrule: "",
        v_poolname: "",
        v_totalplatenum: "",
        v_car_no: ""
      },

      park: [{}],
      feetype: [{}],
      countrule: [{}],
      tableData: [
        {
          seri_no: "1",
          pool_name: "11"
        }
      ],

     
    };
  },
  methods: {
        handleCurrentChange(val) {
          // this.getPark();
          console.log(`当前页: ${val}`);
        },
    //提交编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            para.birth =
              !para.birth || para.birth == ""
                ? ""
                : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            // editUser(para).then((res) => {
            //   this.editLoading = false;
            //   //NProgress.done();
            //   this.$message({
            //     message: '提交成功',
            //     type: 'success'
            //   });
            //   this.$refs['editForm'].resetFields();
            //   this.editFormVisible = false;
            //   this.getUsers();
            // });
          });
        }
      });
    },
    callbackSelTenant: function() {
      console.log(this.filters);
      for (var item in this.filters) {
        if (typeof this.filters[item] == "object") {
          this.filters[item] = [];
        } else {
          this.filters[item] = "";
        }
      }
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: #1a72c1;
}
.el-button--success {
  float: right;
}
.el-input-group {
  width: 200px;
}
.el-select {
  width: 130px;
}
</style>