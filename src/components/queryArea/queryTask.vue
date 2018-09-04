<template>
    <div class="queryArea">
        <el-date-picker
            v-model="list.ads1"
            type="date"
           :placeholder="area.ad1">
        </el-date-picker>
        <!-- <el-input :placeholder="area.ad1" v-model="list.ads1" ></el-input> -->
        <el-input :placeholder="area.ad2" v-model="list.ads2"></el-input>
        <el-input :placeholder="area.ad3" v-model="list.ads3"></el-input>
       
        <el-button size="medium" type="primary" @click="query">查询</el-button>
    </div>
</template>
<script>
export default {
  props: {
    area: {
      ad1: "",
      ad2: "",
      ad3: "",
    
    }
  },
  data() {
    return {
      list: {
        ads1: "",
        ads2: "",
        ads3: "",
       
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


