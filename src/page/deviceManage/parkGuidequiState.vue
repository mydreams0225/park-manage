<template>
	<section>
		<div class="parent">
			<div class="margin-tops">
				<el-select v-model="filters.v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-select v-model="filters.v_deviceType" filterable placeholder="设备类型">
	                    <el-option
	                      v-for="item in deviceType"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-select v-model="filters.v_deviceStatus" filterable placeholder="设备状态">
	                    <el-option
	                      v-for="item in deviceStatus"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
                <el-button icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')" size="medium">清除</el-button>

			</div>
			<!-- 展示区 -->
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
                        prop="device_type"
                        label="设备类型"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="ip_address"
                        label="IP地址">
                      </el-table-column>
                      <el-table-column
                        prop="mac_address"
                        label="MAC地址">
                      </el-table-column>               
                      <el-table-column
                        prop="device_status"
                        label="设备状态">
                      </el-table-column>
                      <el-table-column
                        prop="lastonlineTime"
                        label="最后一次在线时间">
                      </el-table-column>
                      
                    </el-table>
              </template>
            </div>
            <!-- 分页	 -->
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
      filters: {
        v_park: "",
        v_deviceType: "",
        v_deviceStatus: ""
      },
      park: [{}],
      deviceType: [{}],
      deviceStatus: [{}],
      tableData: [],
      totals: {
        totalNum: 1,
        pageSize: 1,
        currentPage: 1
      }
    };
  },
  methods: {
    callbackSelTenant: function() {
      console.log(this.filters);
      for (var item in this.filters) {
        this.filters[item] = "";
      }
    },
    handleCurrentChange(val){
      console.log(`当前页: ${val}`)
    }
    //end
  }
};
</script>
<style scoped="scoped"></style>