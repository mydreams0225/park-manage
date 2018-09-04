<template>
    <div class="queryDate">
        <label for="">投放日期：</label> 
            <el-date-picker
                v-model="launchDateF"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        <label for="">至</label>
            <el-date-picker
                v-model="launchDateT"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        <el-button size="medium" type="primary" @click="query">查询</el-button>
    </div>
</template>
<script>
export default {
  props: {
  },
  data() {
    return {
      launchDateF: "",
      launchDateT:""
    };
  },
  methods: {
    query: function() {
      this.$emit("querys", this.launchDateF,this.launchDateT);
    }
  }
};
</script>
<style>
.queryDate {
  float: right;
  display: inline-block;
}
.queryDate .el-input {
  width: 200px;
}
</style>


