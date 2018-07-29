<template>
  <div>
    <template v-for="(node,index) in nodes" v-if="!node.hidden">
      <el-submenu :index="nodes[index].name+index+''" v-if="node.hasChildren" :key="nodes[index].name+ index ">
        <template slot="title">
          <i :class="node.iconCls"></i>{{node.name}}</template>
        <menu-tree :nodes="node.children"></menu-tree>
      </el-submenu>
      <!-- 这里是用:route="{name:node.name}，如果不使用name跳转的话，可以在数据源那里把path写成全路径即可 -->
      <el-menu-item v-if="!nodes[index].hasChildren" :index="node.path" :route="{name:node.name}" :key="node.path">
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
     for(var item in this.nodes){
        console.log(this.nodes[item].hasChildren)
        console.log(item.hasChildren)
     }
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
  text-align: right;
}
.el-menu-item.is-active{
  background: #09c;
}
.el-menu-item.is-active:hover{
    background: #09c;
}
 .el-menu-item:hover{
  background: rgba(1,153,204,0.8);
}
</style>