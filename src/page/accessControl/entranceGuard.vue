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
                    ref="tree2">
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
                 <el-button type="primary" size="medium" icon="el-icon-plus" @click="openAddGuard()">新增</el-button>
                  <el-dialog
                        title="添加门禁通道"
                        :visible.sync="addGuardVisible"
                        width="600px">
                          <el-form  :model="addGuard" :rules="rules" ref="addGuard" class="form-inline" >
                            <el-row :gutter="20">
                              <el-col :span="12">
                                    <el-form-item prop="guardName" label="门禁通道名称">
                                        <el-input v-model="addGuard.guardName"></el-input>    
                                    </el-form-item>
                                </el-col>        
                                <el-col :span="12">
                                        <el-form-item  label="所属楼栋单元">
                                          <communtitySelect :community="addGuard.unit"></communtitySelect>
                                        </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                        <el-form-item prop="area" label="通道类型">
                                          <channelType :community="addGuard.channelType"> </channelType>
                                          <!-- <div style="display:block">
                                            
                                          
                                          <el-select v-model="addGuard.channelType" filterable >
                                              <el-option
                                                v-for="item in channelType"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                              </el-option>
                                            </el-select> -->
                                          <!-- </div> -->
                                              

                                        </el-form-item>     
                                </el-col>        
                            </el-row>
                            <hr>
                            <div style="margin-top:5px;font-weight:600;">绑定值班门卫：访客进入通道时，绑定该通道的值班员将收到推送消息</div>
                            <!-- <div class="querys">
                              <el-input   id="names" name="names" placeholder="员工姓名查询" v-model="filters.name" >
                                <template slot="prepend">员工姓名</template>   
                              </el-input>
                              <el-button size="medium"  type="primary">查询</el-button>
                            </div>  -->
                            <div class="margin-tops">
                                <el-transfer
                                filterable
                                :filter-method="filterMethod"
                                filter-placeholder="员工姓名查询"
                                v-model="transferName"
                                :data="transferNamedata2">
                              </el-transfer>
                            </div>
                            
                          </el-form>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="addGuardVisible = false">取 消</el-button>
                      <el-button type="primary" @click="savePark('add')">保 存</el-button>
                    </span> 
                </el-dialog>
                
                 <el-button type="danger" size="medium" icon="el-icon-delete">删除</el-button>
             </div>
             <div class="accessquerys margin-tops">
               所属社区
               <communtitySelect :community="filters.community">
               </communtitySelect>
               <el-input placeholder="门禁通道名称" :value="filters.entranceChannelName" >
                        <template slot="门禁通道名称">门禁通道名称</template>   
              </el-input>
              <el-button type="primary" size="medium" @click="queryGuard()">查询</el-button>
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
import channelType from "@/components/accessControl/channelType";
import { 
  reqGuardData //查询请求
} from "@/api/mjmanage/entranceGuard";
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
    handleCurrentChange(val) {
      this.totals.currentPage = val;
    },
    //打开添加事件
    openAddGuard() {
      this.addGuardVisible = true;
    },
    //查询数据请求
    queryGuard(){
      let para = {
        jwt:window.localStorage.getItem('jwt'),
        currentPage:this.totals.currentPage,
        pageSize:this.totals.pageSize,
        community:this.filters.community,//所属社区
        entranceChannelName:this.filters.entranceChannelName,//门禁通道名称
      }
      reqGuardData(para).then(res=>{
        if(res===0){
          let list=res.list;
          list.forEach(item => {
            var temp = {
              mjPasswayName: item["mjPasswayName"],//门禁通道名称
              buildingUnits: item["buildingUnits"],//所属楼栋单元
              createTime: item["createTime"],//创建时间
              lastUpdateTime: item["lastUpdateTime"],//最后修改时间
            };
            this.mjGuardList.push(temp);
          });
          this.totals.totalNum = res.totalNum;//总条数
        }else{
          
        }
      }).catch({

      })
    },
  },
  mounted(){
    this.queryGuard();//页面加载时请求查询数据
  },
  data() {
    const generateData2 = _ => {
      const data = [];
      const cities = ["咋样", "政改", "生于"];
      // const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          city: cities[index]
        });
      });
      return data;
    };
    return {
      transferName: [],
      transferNamedata2: generateData2(),
      filterMethod(query, item) {
        return item.city.indexOf(query) > -1;
      },
      //下拉框的选项
      channelType: [], //通道类型
      unit: [], //所属楼栋单元
      addGuard: {
        guardName: "", //门禁通道名称
        channelType: "", //通道类型
        unit: "" //所属楼栋单元
      },
      rules: {
        //表单验证
        guardName: [
          { required: true, message: "请输入门禁通道名称", trigger: "blur" }
        ]
      },
      addGuardVisible: false,
      mjGuardList: [],
      totals: {
        currentPage: 1,
        pageSize: 1,
        totalNum: 0
      },
      filters: {
        community: "ddd",
        entranceChannelName:"",
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
    communtitySelect,
    channelType
  }
};
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


