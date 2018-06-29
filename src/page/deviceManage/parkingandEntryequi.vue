<template>
	<section>
		<div class="parent">
			<div class="margin-tops ">
				<el-select v-model="v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
			</div>
			<div class="margin-tops left">
				<el-tree
			      :data="data5"
			      show-checkbox
			      node-key="id"
			      default-expand-all
			      :expand-on-click-node="false">
			      <span class="custom-tree-node" slot-scope="{ node, data }">
			       <span>{{ node.label }}</span>
			        <span>
			          <el-button
			            type="text"
			            size="mini"
			            @click="() => append(data)">
			            添加
			          </el-button>
			          <el-button
			            type="text"
			            size="mini"
			            @click="() => append(data)">
			            查看
			          </el-button>
			          <el-button
			            type="text"
			            size="mini"
			            @click="() => remove(node, data)">
			            删除
			          </el-button>
			        </span>
			      </span>
			    </el-tree>
			</div>
		</div>
	</section>
</template>
<script>
	let id = 1000;

  export default {
    data() {
      const data = [{
        id: 1,
        label: '物联网关',
        children: [{
          id: 10,
          label: '停车场物联网关',
          
          children: [{
            id: 100,
            label: '三级 1-1-1',
           
          }, {
            id: 101,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '收费机顶盒',
        children: [{
          id: 20,
          label: '收费终端'
        }, 
        ]
      }, {
        id: 3,
        label: '收费手持机',
        children: [{
          id: 30,
          label: '二级 3-1'
        }, {
          id: 31,
          label: '二级 3-2'
        }]
      },
       {
        id: 4,
        label: '自动缴费机',
        
      },
      {
        id: 5,
        label: '无线出入控制机',
        
      },
      {
        id: 6,
        label: '通道管理',
        
      },
      {
        id: 7,
        label: '显示屏管理',
        
      },
      {
        id: 8,
        label: '未分配设备',
        
      },
      ];
      return {
        data4: JSON.parse(JSON.stringify(data)),
        data5: JSON.parse(JSON.stringify(data)),
        v_park:'',
        park:[{}],
        // url:'1'
      }
    },

    methods: {
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>);
      }
    }
  };
</script>
<style scoped="scoped">
   .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .left{
  	width:50%;
  	border:1px solid #ccc;
  	border-radius:5px;
  	padding:5px;
  }
</style>