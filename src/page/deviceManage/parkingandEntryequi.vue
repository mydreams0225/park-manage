<template>
	<section>
		<div class="parent">
			<div class="margin-tops ">
        <span>所属停车场</span>
				<el-select v-model="v_park"  filterable >
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
			</div>
		
      <div class="main">
      <div class="margin-tops treeBox">
        <div class="btnClose"><el-button  size="mini" icon="el-icon-caret-right" @click="btnClose"></el-button>  </div>
        <el-tree
          :data="treeData"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          highlight-current
          @node-click="nodeClick"
          :render-content="renderContent"
          >
          
        </el-tree>
      </div>
      <div class="contentR">
        dd
      </div>
      </div>
     
				
         
			
			
		</div>
	</section>
</template>
<script>
let id = 1000;

export default {
  data() {
    const data = [
      {
        id: 2,
        label: "收费机顶盒",
        children: [
          {
            id: 20,
            label: "收费终端"
          }
        ]
      },
      {
        id: 3,
        label: "收费手持机",
        children: [
          {
            id: 30,
            label: "二级 3-1"
          },
          {
            id: 31,
            label: "二级 3-2"
          }
        ]
      },
      {
        id: 4,
        label: "自动缴费机"
      },
      {
        id: 5,
        label: "无线出入控制机"
      },
      {
        id: 6,
        label: "通道管理"
      },
      {
        id: 7,
        label: "显示屏管理"
      },
      {
        id: 8,
        label: "未分配设备"
      }
    ];
    return {
      data4: JSON.parse(JSON.stringify(data)),
      treeData: JSON.parse(JSON.stringify(data)),
      v_park: "",
      park: [{}],
      nodeLabel: "",
      showType: false
      // url:'1'
    };
  },

  methods: {
    btnClose() {
     $('.showType').toggle()
     $('.showIp').toggle()
     
      
    },
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    nodeClick(obj, node, zujian) {
      console.log("obj")
      console.log(node.parent.label)
      this.nodeLabel = node.label;
     
      // if(node.key=="10"){
      // 	var obj=document.getElementsByClassName("r-content")[0];
      // 	obj.innerHTML="停车物联网关";
      // 	console.log("obj");
      // }
      // else{
      // 	console.log(this.nodeLabel);
      // }
      var obj = document.getElementsByClassName("r-content")[0];
      obj.innerHTML = node.label;
    },
    renderContent(h, { node, data, store }) {
      console.log(node);
      if (node.data.id < 10) {
        return (
          <span class="custom-tree-node">
            <span> <strong>{node.label} </strong></span>
          </span>
        );

        //  return false;
      } else {
        return (
          <span class="custom-tree-node">
            <span style="padding:10px;margin-right:40px">{node.label} </span>
            <span class="showType">
              型号: 192.168.0.225 型号: 192.168.0.225
            </span>
            <span class="showIp" style="padding-right:130px">
           
              192.168.0.225
            </span>
          
            <el-button
              size="mini"
              icon="el-icon-document"
            />
          </span>
        );
      }
    }
  }
};
</script>
<style >
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  padding-right: 8px;
}
.main{
  position: relative;
  display: flex;
}
.treeBox{
 
  display:inline-block;
  border:1px solid #ccc;
  border-radius: 5px;
  position: relative;
}
.contentR{
  flex:1;
  position: absolute;
  top:0;
  right: 0;
  border:1px solid red;
}
.btnClose{
  position:absolute;
  top:-1px;
  right:-13px;
  z-index:999;
}
</style>