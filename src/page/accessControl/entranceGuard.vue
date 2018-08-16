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
             <div class="accessquerys margin-tops">
               所属社区
               <communtitySelect :community="filters.community">
               </communtitySelect>
               <el-input placeholder="门禁通道名称" :value="filters.entranceChannelName" >
                        <template slot="门禁通道名称">门禁通道名称</template>   
              </el-input>
             </div>
               <!-- 展示区 -->
             <div class="margin-tops">
                  <template>
                  <el-table
                      :data="mjGuardList"
                      border
                      style="width: 100%">
                      <el-table-column
                        type="selection"
                        width="40">
                      </el-table-column>
                      <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                      </el-table-column>
                      <el-table-column
                        prop="mjPasswayName"
                        label="门禁通道名称"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="buildingUnits"
                        label="所属楼栋单元"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="createTime"
                        label="创建时间"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="lastUpdateTime"
                        label="最后修改时间"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        
                        label="查看白名单"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        
                        label="白名单授权"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        
                        label="查看设备"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        
                        label="操作"
                        width="80">
                      </el-table-column>
                </el-table>
              </template>   
             </div>
             <div>
               <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="totals.currentPage"
              :page-size.sync="totals.pageSize"
              layout="total, prev, pager, next"
              :total.sync="totals.totalNum">
            </el-pagination>
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
import communtitySelect from "@/components/accessControl/communitySelect";

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
    },
    //分页事件改变
    handleCurrentChange(val){
      this.totals.currentPage=val;
    }
  },
  data() {
    return {
      mjGuardList:[],
      totals:{
        currentPage:1,
        pageSize:1,
        totalNum:0
      },
      filters:{
          community: "ddd",
      },
      
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
  },
  components: {
    communtitySelect
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
  border: 1px solid #AED3F4;
  width: 200px;
  height: 800px;
  float: left;
}
.leftTree .el-input{
   margin:0px;
   border:0;
   border-radius: 0px;
   border-bottom:1px solid #AED3F4;
}
.rightTree {
  margin-left: 210px;
  margin-top: 20px;
}
.title span {
  font-size: 16px;
}
.accessquerys .el-input{
  width:200px;
}
</style>


