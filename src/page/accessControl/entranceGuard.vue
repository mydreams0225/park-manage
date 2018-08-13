<template>
    <section>
        <!-- 最外层 -->
       <div class="parent">
          <div class="leftTree">
              <el-input
                placeholder="输入楼栋单元名称检索"
                v-model="filterText">
                </el-input>

                <el-tree
                class="filter-tree"
                :data="data2"
                :props="defaultProps"
                default-expand-all
                :filter-node-method="filterNode"
                ref="tree2">
                </el-tree>
          </div>
       </div>
    </section>
</template>
<script>
export default {
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  data() {
    return {
      filterText: "",
      data2: [
        {
          id: 1,
          label: "楼栋单元",
          children: [
            {
              id: 4,
              label: "公共区域",
            }
          ]
        }
      ],
       defaultProps: {
          children: 'children',
          label: 'label'
        }
    };
  }
};
</script>
<style >
.parent{
    height: 100%;
}
.leftTree{
    margin-top:20px;
    border:1px solid #ccc;
    width:200px;
    height: 800px;
}
</style>


