<template>
    <section>
         <!-- <div class="parent wrapper">
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

         </div> -->
         <div class="parent wrapper">
             <leftTree @nodeClick="nodeClick" :treeGuard="treeGuards"></leftTree>
            <div class="rightTree">
             <div class="orginfod">
                 <div class="title">
                     <i class="el-icon-goods"></i>
                     <span>{{title}}</span>
                 </div> 
             </div>
             <!-- 查询区 -->
             <div class="margin-tops">
                所属社区
               <communtitySelect :community="filters.community">
               </communtitySelect>
               
                <el-input placeholder="所属房铺" v-model="filters.house" >
                     <template slot="prepend">所属房铺</template>   
                </el-input>
                <el-input placeholder="门禁卡号" v-model="filters.accessCardNo" >
                     <template slot="prepend">门禁卡号</template>   
                </el-input>
                <el-input placeholder="当前版本" v-model="filters.currentVersion" >
                     <template slot="prepend">当前版本</template>   
                </el-input>
                <el-button size="medium" type="primary" >查询</el-button>
                <el-button size="medium" >清除</el-button>
             </div>
             <!-- 展示区 -->
             <div class="margin-tops">
                 <template>
                  <el-table
                      :data="mjCMList"
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
                        prop="deviceNo"
                        label="设备序列号"
                        width="80">
                      </el-table-column>
                      <el-table-column
                        prop="cgName"
                        label="所属门禁通道"
                        width="80">
                      </el-table-column>
                      <el-table-column
                        prop="mjDeviceType"
                        label="门禁设备类型"
                        width="80">
                      </el-table-column>
                      <el-table-column
                        prop="deviceName"
                        label="设备名称"
                        width="80">
                      </el-table-column>
                      <el-table-column
                        prop="mjkroleTime"
                        label="门禁卡白名单授权时间"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="phoneroleTime"
                        label="手机号白名单授权时间"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="lastModifyTime"
                        label="最后修改时间"
                        width="80">
                      </el-table-column>
                      <el-table-column
                        prop="onlineStatus"
                        label="在线状态"
                        width="80">
                      </el-table-column>
                      <el-table-column
                        prop="openDoorStatus"
                        label="开门状态"
                        width="80">
                      </el-table-column>
                      <el-table-column
                        prop="netPhone"
                        label="网络电话"
                        width="80">
                      </el-table-column>
                      <el-table-column
                        prop="currentVersion"
                        label="当前版本"
                        width="80">
                      </el-table-column>
                      <el-table-column
                        label="查看白名单"
                        width="80">
                      </el-table-column>
                      <el-table-column
                        
                        label="操作"
                        width="80">
                      </el-table-column>
                  </el-table>
              </template>
             </div>
         </div>
         </div>
    </section>
</template>
<script>
import leftTree from "@/components/accessControl/leftTree";
import communtitySelect from "@/components/accessControl/communitySelect";
import channelType from "@/components/accessControl/channelType";
export default {
  components: {
    leftTree: leftTree,
    communtitySelect,
    channelType
  },
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
    nodeClick(obj) {
      console.log("f");
      this.title = obj;
    }
  },
  data() {
    return {
      //左边树数据
      treeGuards: [
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
      },
      filterText: "",
      //左边树数据end
      //右边数据
      title: "我的社区",
      filters: {
        commutity: "",
        guardDeviceType: "", //门禁设备类型
        onlineState: "", //在线状态
        netPhone: "", //网络电话
        deviceNo: "", //设备号
        deviceName: "", //设备名称
        currentVersion: "" //当前版本
      },
      //下拉框的值
      guardDeviceType: [],
      onlineState: [],
      netPhone: [], //网络电话
      //下拉框的值
      //展示区数据
      mjCMList:[],
    };
  }
};
</script>
<style>
.el-input-group {
  width: 200px;
}
</style>


