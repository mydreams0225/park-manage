<template>
    <section>
        <!-- 最外层 -->
       <div class="parent">
           <div class="wrapper">
               
           
          <div class="leftTree">
              <el-input
                placeholder="输入楼栋单元名称检索"
                v-model="filterText">
                </el-input>
                <el-tree
                    class="filter-tree"
                    :data="treeGuard"
                    :props="defaultProps"
                    default-expand-all
                    :filter-node-method="filterNode"
                    :render-content="renderContent"
                    @node-click="nodeClick"
                    ref="tree2"
                >
                </el-tree>
          </div>
          <div class="rightTree">
             <div class="orginfod">
                 <div class="title">
                     <i class="el-icon-goods"></i>
                     <span>{{title}}</span>
                 </div>
             </div>
             <div class="btnGroup margin-tops">
                 <el-button type="primary" size="medium" icon="el-icon-plus">保存</el-button>
                 <el-button type="danger" size="medium" icon="el-icon-delete">删除</el-button>
             </div>
             <!-- <div class="query">
                  <el-select v-model="filters.v_park" filterable placeholder="所属社区">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	                 </el-select>
             </div> -->
          </div>
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
    //循环树
    renderContent: function() {
      var createElement = arguments[0];
      var level = arguments[1].node.level;
      if (level == 1) {
        return createElement("span", [
          createElement("i", { attrs: { class: "el-icon-document" } }),
          createElement("span", "     "),
          createElement("span", arguments[1].node.label)
        ]);
      } else {
        return createElement("span", [
          createElement("i", { attrs: { class: "el-icon-document" } }),
          createElement("span", "     "),
          createElement("span", arguments[1].node.label)
        ]);
      }
    },
    //筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //tree单击事件
    nodeClick(obj, node, zujian) {
      this.title = node.label === "楼栋单元列表" ? "我的社区" : node.label;
    }
  },
  data() {
    return {
      title: "我的社区",
      filterText: "",
      treeGuard: [
        {
          id: 1,
          label: "楼栋单元列表",
          children: [
            {
              id: 4,
              label: "公共区域"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  }
};
</script>
<style >
.wrapper {
  font-size: 14px;
  height: 100%;
}
.leftTree {
  position: absolute;
  top: 60px;
  left: 250px;
  border: 1px solid #ccc;
  width: 200px;
  height: 800px;
  float: left;
}
.rightTree {
  margin-left: 210px;
  margin-top: 20px;
}
.title span {
  font-size: 16px;
}
</style>


