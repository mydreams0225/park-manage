<template>
	<section>
		<el-button type="primary" icon="el-icon-search">查询</el-button>
        <el-button icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
	</section>
</template>
<script>
	export default{
           methods:{
			       	callbackSelTenant:function(){
			          var aa=document.getElementsByTagName("input");  
			          console.log(aa);
			                for(var i=0;i<aa.length;i++){  
			                    if (aa[i].type=="text"){  
			                        aa[i].value = "";  
			                    }  
			                }  
			      }
               },
	}
</script>
<style>
</style>