<template>
    <div class="query1">
        <el-input :placeholder="area.name" v-model="names" ></el-input>
        <el-button size="medium" type="primary" @click="query">查询</el-button>
    </div>
</template>
<script>
export default {
  props: {
    area: {
      name: "",
    }
  },
  data() {
    return {
      names: "",
    };
  },
  methods:{
      query:function(){
          this.$emit('querys',this.names);
      }
  }
};
</script>
<style>
    .query1 {
        float: right;
        display: inline-block;
    }
    .query1 .el-input {
        width: 200px;
    }
</style>


