<template>
    <div class="queryAd">
        <el-select v-model="names" :placeholder="area.name">
           <el-option v-for="item in area.options" 
           :key="item.value" 
           :label="item.label"
           :value="item.value">
           </el-option>
        </el-select>
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
      names: [],
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
    .queryAd {
        float: right;
        display: inline-block;
    }
    .queryAd .el-input {
        width: 200px;
    }
</style>


