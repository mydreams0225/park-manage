<template>
	<section>
		<div class="parent">
			<div class="margin-tops">
				<el-select v-model="v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-select v-model="v_deviceType" filterable placeholder="设备类型">
	                    <el-option
	                      v-for="item in deviceType"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-select v-model="v_deviceStatus" filterable placeholder="设备状态">
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
            <div>
            	<Paging v-bind:total="totals"></Paging>
            </div>
		</div> 
	</section>
</template>
<script>
	export default{
          data(){
          	return{
          		v_park:'',
          		park:[{}],
                v_deviceType:'',
                deviceType:[{}],
                v_deviceStatus:'',
                deviceStatus:[{}],
                tableData:[],
                 totals:{
               	  totalnum:1,
               	  pagesize:1,
               	  currentPage1:1
               },
          	}
          }
	}
</script>
<style scoped="scoped"></style>