<template>

	<section>
		<div class="block">
         
            <el-pagination
             background
						 @current-change="handleCurrentChange"
              :current-page.sync="total.currentPage"
              :page-size.sync="total.pageSize"
              layout="total, prev,pager, next"
              :total.sync="total.totalNum">
            </el-pagination>
          </div>
	</section>
</template>
<script>
export default {
  methods: {
    // handleSizeChange(val) {

    //   console.log(`每页 1 条`);
    // },

    handleCurrentChange(val) {
      this.total.currentPage = val;
			console.log(`当前页: ${val}`);
			this.$emit('handleCurrentChange',this.total.currentPage,this.total.pageSize);
    }
  },
  data() {
    return {
      totals: {
        currentPage: 1,
        pageSize: 10,
        totalNum: 1
      }
    };
	},
	// methods:{
  //    handleCurrentChange(val){
	// 		 this.
	// 		 this.$emit('handleCurrentChange',this.,this.codes);
	// 	 }
	// },
  props: {
    total: {
      //  currentPage: 1,
      //   pageSize: 10,
        totalNum: 1
    }
  }
};
</script>
<style scoped>
</style>