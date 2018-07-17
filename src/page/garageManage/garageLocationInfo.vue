<template>
	<section>
		<div class="parent">
			<!-- 查询区 -->
			<div class="margin-tops">
				<el-select v-model="filters.v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-select v-model="filters.v_floor" filterable placeholder="所属楼层">
	                    <el-option
	                      v-for="item in floor"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-input   id="area" name="area" placeholder="区位" v-model="filters.v_area" >
                     <template slot="prepend">区位</template>   
                </el-input>
	            <el-button type="primary" size="medium" icon="el-icon-search">查询</el-button>
                <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
			</div>
			<!-- 展示区 -->
      <div class="margin-tops">
        	 <template>
                    <el-table
                      :data="tableData"
                      border
                      style="width: 100% ;"
                      >
                      <el-table-column
                        prop="seri_no"
                        label="序号"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="floor_area"
                        label="楼层/区域"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="totalNum"
                        label="总车位数">
                      </el-table-column>
                      <el-table-column
                        prop="surplusNum"
                        label="剩余车位数">
                      </el-table-column>               
                      <el-table-column
                        prop="lastEditTime"
                        label="最后修改时间">
                      </el-table-column>
                      
                    </el-table>
              </template>
      </div>
    <!-- <div>
		        <Paging v-bind:total="totals"></Paging>		        
		</div> -->
    <el-pagination
              
              @current-change="handleCurrentChange"
              :current-page.sync="totals.currentPage"
              :page-size.sync="totals.pageSize"
              layout="total, prev, pager, next"
              :total.sync="totals.totalNum">
            </el-pagination>
		</div>
	</section>
</template>
<script>
export default {
  data() {
    return {
      filters: {
        v_park: "",
        v_floor: "",
        v_area: ""
      },
      park: [{}],
      floor: [{}],
      totals: {
        totalNum: 1,
        pageSize: 1,
        currentPage: 1
      }
    };
  },
  methods: {
    callbackSelTenant() {
      for (var item in this.filters) {
        this.filters[item] = "";
      }
    }
  }
};
</script>
<style scoped>
.el-input-group {
  width: 200px;
}
.el-select {
  width: 130px;
}
</style>