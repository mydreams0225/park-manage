<template>
    <div class="queryArea">
        <el-input :placeholder="area.adId" v-model="list.adIds" ></el-input>
        <el-input :placeholder="area.coopId" v-model="list.coopIds"></el-input>
        <el-input :placeholder="area.clickFlowId" v-model="list.clickFlowIds"></el-input>
        <el-input :placeholder="area.ggwId" v-model="list.ggwIds"></el-input>
        <el-input :placeholder="area.planId" v-model="list.planIds"></el-input>
        <el-button size="medium" type="primary" @click="query">查询</el-button>
    </div>
</template>
<script>
export default {
  props: {
    area: {
      adId: "",
      coopId: "",
      clickFlowId: "",
      ggwId: "",
      planId: ""
    }
  },
  data() {
    return {
      list: {
        adIds: "",
        coopIds: "",
        clickFlowIds: "",
        ggwIds: "",
        planIds: ""
      }
    };
  },
  methods: {
    query: function() {
      this.$emit("querys", this.list);
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


