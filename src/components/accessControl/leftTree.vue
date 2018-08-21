   <template>
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
                    ref="tree2">
                </el-tree>
          </div>  
   </div>
       
   </template>
<script>
export default {
     watch: {
        filterText(val) {
        this.$refs.tree2.filter(val);
        }
    },
    methods:{
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
    // nodeClick(obj, node, zujian) {
    //   this.title = node.label === "楼栋单元列表" ? "我的社区" : node.label;
    // },
      nodeClick(obj, node, zujian){
          this.$emit('nodeClick',this.title = node.label === "楼栋单元列表" ? "我的社区" : node.label)
      }

  },
  data(){
      return{
          //左边树数据
            //  treeGuard: [
            //     {
            //     id: 1,
            //     label: "楼栋单元列表",
            //     children: [
            //         {
            //         id: 4,
            //         label: "公共区域"
            //         }
            //     ]
            //     }
            // ],
            defaultProps: {
                children: "children",
                label: "label"
            },
            filterText:''
            //左边树数据end
      }
      
  },
  props:['treeGuard']
}
</script>
<style >
.wrapper {
  font-size: 14px;
  height: 100%;
}
.wrapper .leftTree {
  position: absolute;
  top: 60px;
  left: 250px;
  border: 1px solid #aed3f4;
  width: 200px;
  height: 800px;
  float: left;
}
.wrapper .leftTree .el-input {
  margin: 0px;
  border: 0;
  border-radius: 0px;
  border-bottom: 1px solid #aed3f4;
}
.wrapper .rightTree {
  margin-left: 210px;
  margin-top: 20px;
}
.wrapper .title span {
  font-size: 16px;
}
.wrapper .accessquerys .el-input {
  width: 200px;
}
.wrapper .form-inline .querys .el-input {
  width: 300px;
}
</style>