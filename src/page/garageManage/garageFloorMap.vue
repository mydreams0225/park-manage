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
	            <el-select v-model="v_floor" filterable placeholder="所属楼层">
	                    <el-option
	                      v-for="item in floor"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	            <el-button type="primary" size="medium" icon="el-icon-search">查询</el-button>
                <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
			</div>
			<div class="margin-tops sum sumParlot">
				
				<p><i class="el-icon-location"></i>总车位数：{{grid.sum}}</p>
				<p>已用车位数：{{grid.useNum}}</p>
				<p>剩余车位数：{{grid.surplusNum}}</p>
			</div>
			<div class="margin-tops sum sumDevice">
				
				<p><i class="el-icon-mobile-phone"></i>设备总数{{grid.deviceNum}}</p>
				<p>在线：{{grid.online}}</p>
				<p>离线：{{grid.offline}}</p>
			</div>
			<div class="margin-tops sum northDeviation">
				
				<p><i class="el-icon-zoom-in"></i>距离正北方向偏移度：{{grid.deviceNum}}</p>
				
			</div>
		</div>
	</section>
</template>
<script>
export default {
  data() {
    return {
		filters:{
		   v_park: "",
		   v_floor: "",
		},   
      park: [{}],
      floor: [{}],
      grid: {
        sum: 0,
        useNum: 0,
        surplusNum: 0,
        deviceNum: 0,
        online: 0,
        offline: 0
      }
    };
  }
};
</script>
<style scoped>
.sum {
  margin-bottom: 10px;
  padding: 10px;
  line-height: 20px;
  font-size: 13px;
  border-radius: 4px;
  overflow: hidden;
  zoom: 1;
}
.sumParlot {
  color: #3c763d;
  background-color: #dff0d8;
  border: 1px #d6e9c6 solid;
}

.sumParlot p,
.sumDevice p,
.northDeviation p {
  float: left;
  padding-right: 20px;
}
.sumDevice {
  color: #31708f;
  background-color: #d9edf7;
  border: 1px #bce8f1 solid;
}
.northDeviation {
  color: #31708f;
  background-color: #e8e8e8;
  border: 1px #bce8f1 solid;
}
</style>