<template>
	<section>
		<div class="parent">
			<div class="parkPoolSetting">
				<el-button type="primary"><i class="el-icon-plus"></i>新增</el-button>
				<a href=""><i class="el-icon-circle-check"></i>车位池功能说明</a>
				 <el-button type="success"><strong><i class="el-icon-upload"></i></strong> 导出EXCEL报表</el-button>	
			</div>
			<div class="parkPoolSetting">
				
			</div>
		</div>
	</section>
</template>
<script>
	export default{
    
	}
</script>
<style scoped>
  .parent{
  	text-align:left;
  }
  .parkPoolSetting{
  	margin-top:15px;
  }
  a{
  	text-decoration:none;
  	color:#1a72c1
  }
    .el-button--success {
  	float:right;
  }
</style>