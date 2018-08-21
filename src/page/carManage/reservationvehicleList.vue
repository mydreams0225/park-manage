<template>
	<section>
		<div class="parent">
			<!-- 查询区 -->
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
                <el-input   id="car_no" name="car_no" placeholder="车牌号" v-model="filters.v_car_no">
                   <template slot="prepend">车牌号</template>   
                </el-input>
                <el-input   id="name" name="name" placeholder="姓名" v-model="filters.v_name">
                   <template slot="prepend">姓名</template>   
                </el-input>
                <el-input   id="phone" name="phone" placeholder="手机号" v-model="filters.v_phone">
                   <template slot="prepend">手机号</template>   
                </el-input>
                <el-select v-model="filters.v_carStatus" filterable placeholder="车辆状态">
                    <el-option
                      v-for="item in carStatus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
                <el-button icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')" size="medium">清除</el-button>
			</form>
		</div>
		<!-- 展示区 -->
		<div class="margin-tops">
              <template>
                    <el-table
                      :data="carListTable"
                      border
                      style="width: 100% ;">
                      <el-table-column
                        prop="seri_no"
                        label="序号"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="plate_no"
                        label="车牌号"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="车主姓名">
                      </el-table-column>
                      <el-table-column
                        prop="phone"
                        label="车主手机">
                      </el-table-column>               
                      <el-table-column
                        prop="end_time"
                        label="最晚到访时间(有效期)">
                       
                         
                      </el-table-column>
                      <el-table-column
                        prop="car_status"
                        label="车辆状态">
                        
                         
                      </el-table-column>

                      <el-table-column
                        prop="pass_time"
                        label="入场时间">
                      </el-table-column>
                      <el-table-column
                        prop="out_time"
                        label="出场时间">
                      </el-table-column>
                      
                    </el-table>
              </template>
        
        </div>
			  <!-- 分页区 -->
	    <div>
        <el-pagination
             
              @current-change="handleCurrentChange"
              :current-page.sync="totals.currentPage"
              :page-size.sync="totals.pageSize"
              layout="total, prev, pager, next"
              :total.sync="totals.totalNum">
              
        </el-pagination>
	        <!-- <Paging v-bind:total="totals"></Paging> -->
	    </div>
		</div>
	</section>
</template>
<script>
export default {
  data() {
    return {
      totals: {
        totalNum:0,
        pageSize:10,
        currentPage:1,
      },
     
      park: [{}],
      filters: {
        v_park: "",
        v_carStatus: "",
        v_car_no: "",
        v_name: "",
        v_phone: ""
      },

      carStatus: [
        { value: "all", label: "车辆状态" },
        { value: "unentrance", label: "未入场" },
        { value: "appearance", label: "已出场" }
      ],
      carListTable: [],
     
    };
  },
    methods: {
       handleCurrentChange(val) {
      // this.getPark();
      console.log(`当前页: ${val}`);
    },
      callbackSelTenant: function() {
        console.log(this.filters);
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