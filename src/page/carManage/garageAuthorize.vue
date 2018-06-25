<template>
	<section>
		<div class="parent">
			<template>
				  <el-tabs v-model="activeName" >
				    <el-tab-pane label="按车辆分组授权" name="first">
				    	<div  class="tsd">
				             <el-row :gutter="20">
				              <el-col :span="12"><div class="grid-content bg-purple">
				                 <p><strong>注意事项：</strong></p>
				                 <p>按车辆分组授权，会将该分组所属的车辆授权到指定车库</p>
				              </div>
				            </el-col>
				            </el-row>

				          </div>
				          <div  class="tab1_group">
				          	<el-card class="box-card">
							  <div slot="header" class="clearfix">
							    <span>所属停车场</span>
							  </div>
							  <div class="body">
							      <template>
					                     <!-- `checked` 为 true 或 false -->
					                 <el-radio  v-model="radio" label="1" >万达广场</el-radio>
					                </template>
							  </div>
							</el-card>
				          </div>
				           <div  class="tab1_group">
				          	<el-card class="box-card">
							  <div slot="header" class="clearfix">
							    <span>车辆分组</span>
							  </div>
							  <div class="body">
							      <template>
					                     <!-- `checked` 为 true 或 false -->
					                该停车场暂无分组...
					                </template>
							  </div>
							</el-card>
				          </div>
				          <div  class="tab1_group">
				          	<el-card class="box-card">
							  <div slot="header" class="clearfix">
							    <span>授权车库（<a href="#">点击选择</a>,<a href="#">清除</a>）</span>
							  </div>
							  <div class="body">
							      <template>
					                     <!-- `checked` 为 true 或 false -->
					                请选择要授权的车库...
					                </template>
							  </div>
							</el-card>
				          </div>
				          <div  class="tab1_group submit">
			                    <el-button type="primary">保存</el-button> 
			               </div>
				    </el-tab-pane>
				    <el-tab-pane label="按停车场授权" name="second">
				    	<div  class="tsd">
				             <el-row :gutter="20">
				              <el-col :span="12"><div class="grid-content bg-purple">
				                 <p><strong>注意事项：</strong></p>
				                 <p>按停车场授权车库，会将该停车场所属的所有车辆授权到指定车库。</p>
				              </div>
				            </el-col>
				            </el-row>

				          </div>
				          <div  class="tab1_group">
				          	<el-card class="box-card">
							  <div slot="header" class="clearfix">
							    <span>所属停车场</span>
							  </div>
							  <div class="body">
							      <template>
					                     <!-- `checked` 为 true 或 false -->
					                 <el-radio  v-model="radio" label="1" >万达广场</el-radio>
					                </template>
							  </div>
							</el-card>
				          </div>
				           
				          <div  class="tab1_group">
				          	<el-card class="box-card">
							  <div slot="header" class="clearfix">
							    <span>授权车库（<a href="#">点击选择</a>,<a href="#">清除</a>）</span>
							  </div>
							  <div class="body">
							      <template>
					                     <!-- `checked` 为 true 或 false -->
					                请选择要授权的车库...
					                </template>
							  </div>
							</el-card>
				          </div>
				          <div  class="tab1_group submit">
			                    <el-button type="primary">保存</el-button> 
			               </div>
				    </el-tab-pane>
				    
				  </el-tabs>
				</template>
		</div>
	</section>
</template>
<script>
 export default{
    data(){
    	return{
    		activeName: 'first',
    		radio:'1'
    	}
    }
 }
</script>
<style scoped>
 .parent{
 	text-align:left;
 }
 .tsd{
 	padding-bottom:15px;
 	 border-bottom: 1px #999 dotted;
 	 width:900px;
 	 margin-top:15px;
 }
</style>