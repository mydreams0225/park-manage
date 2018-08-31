<template>
    <div class="queryArea">
        <el-input :placeholder="area.name" v-model="names" v-if="area.label"></el-input>
        <el-input :placeholder="area.code" v-model="codes" v-if="area.id"></el-input>
        <el-button size="medium" type="primary" @click="query">查询</el-button>
    </div>
</template>
<script>
export default {
  props: {
    area: {
      name: "",
      code: ""
    }
  },
  data() {
    return {
      names: "",
      codes: ""
    };
  },
  methods:{
      query:function(){
          this.$emit('querys',this.names,this.codes);
      }
  }
};
</script>
<style>
    .queryArea {
        float: right;
        display: inline-block;
    }
    .queryArea .el-input {
        width: 200px;
    }
</style>


