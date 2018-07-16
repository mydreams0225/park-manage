<template>

	<section>
		<div class="block">
         
            <el-pagination
             background
             
              :current-page.sync="total.currentPage1"
              :page-size.sync="total.pagesize"
              layout="total, prev,pager, next"
              :total="total.totalnum">
            </el-pagination>
          </div>
	</section>
</template>
<script>
	export default{
         methods: {

		      // handleSizeChange(val) {

		      //   console.log(`每页 1 条`);
		      // },

		      handleCurrentChange(val) {
		      	this.total.currentPage1=val
                
		      	// this.page = val;
		        console.log(`当前页: ${val}`);
		      },
		     },
		    data(){
		  	return{
               currentPage1: 1,
		       //total:2,
		       pagesize:1,
	        }
		   },
		   props:{
		   	  total:{
		   	  	 type:Object,
		   	  },
		   }
	}

</script>
<style scoped>

</style>