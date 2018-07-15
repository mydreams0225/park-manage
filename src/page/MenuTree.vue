<template>
  <div>
    <template v-for="(node,index) in nodes" v-if="!node.hidden">
      <el-submenu :index="index+''" v-if="!node.leaf" :key="index">
        <template slot="title">
          <i :class="node.iconCls"></i>{{node.name}}</template>
        <menu-tree :nodes="node.children"></menu-tree>
      </el-submenu>
      <!-- 这里是用:route="{name:node.name}，如果不使用name跳转的话，可以在数据源那里把path写成全路径即可 -->
      <el-menu-item v-if="node.leaf" :index="node.path" :route="{name:node.name}" :key="node.path">
        <i :class="node.iconCls"></i>{{node.name}}</el-menu-item>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'MenuTree',
  data() {
    return {
           
    }
  },
  created(){
    console.log("路由路由")
     console.log(this.nodes);
  },
  props: {
    nodes: {
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-item {
  //background-color: #222;
  background: rgba(0,0,0,0.8);
  color: #fff;
}
.el-menu-item.is-active{
  background: #4091ff;
}
</style>