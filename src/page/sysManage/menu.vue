<template>
    <section>
        <div class="parent">
            <div class="margin-tops" >
                <el-button size="medium" type="danger" icon="success" >删除</el-button>
                <el-button size="medium" type="success" icon="el-icon-check" >添加</el-button>
            </div>
           
            <!-- 展示区 -->
            <div class="margin-tops">
                <template>
                    <el-table
                        border
                        :data="userInfoData"
                        stripe
                        style="width: 100%">           
                        <el-table-column
                        prop="id"
                        label="编号">
                        </el-table-column>
                        <el-table-column 
                          label="名称">
                            </el-table-column>
                        <el-table-column
                        prop="logo"
                        label="图标">
                        </el-table-column>
                        <el-table-column
                        prop="ip"
                        label="地址">
                        </el-table-column>
                        <el-table-column
                        prop="rolesign"
                        label="权限标识">
                        </el-table-column>
                        <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            
                        </template>
                        </el-table-column>
                    </el-table>
                </template>

            </div>
            <!-- 分页 -->
            <div>
                <div class="block">

                    <el-pagination
                    
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage1"
                    :page-size=3
                    layout="total, prev, pager, next"
                    :total.sync="totalnum">
                    </el-pagination>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
  data() {
    return {
      totalnum: 1,
      currentPage1: 1,
      v_name: "",
      userInfoData: [{ name: "zlz", user_name: "zlz" }]
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.getPark();
      console.log(`当前页: ${val}`);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>
<style scoped>
.el-input-group {
  width: 250px;
}
.el-input {
  width: 250px;
}
.operate_l {
  float: left;
}
.operate_r {
  float: right;
}
</style>



