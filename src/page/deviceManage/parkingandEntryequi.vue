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
       <div>
         <el-button v-show="editBtn" type="primary" @click="editBtns()">修改配置信息</el-button>
         <el-button v-show="queryBtn"  @click="queryBtns()">返回浏览列表</el-button>
      </div>
      <div class="mainEdit" v-show="mainEdit">
          <div class="margin-tops treeBox">
            <div class="btnClose"><el-button  size="mini" icon="el-icon-caret-right" @click="btnClose"></el-button>  </div>
            <el-tree
              :data="treeData"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
              highlight-current
              @node-click="nodeClick"
              :render-content="renderContentEdit"
              >
              
            </el-tree>
          </div>
          <div v-show="rightContent1" class="contentR right">
            
            <p style="color:red;" > > 以下设置会直接影响系统运行，请在修改前确认设置无误。</p>
            <el-row :gutter="20">
                <el-col :span="12">
                  <div class="panel">
                      <p class="title">基本设置</p>
                      <P><span>内网IP：</span>{{ ip}}</P>
                      <p><span>默认计费车型：</span>{{ ip}}</p>
                      <p><span>缴费后允许逗留时间(分钟)：</span>{{ ip}}</p>
                      <p><span>有效期到期提醒（单位:天）：</span>{{ ip}}</p>
                      <p><span>到期车辆延时收费时间（单位:天）：</span>{{ ip}}</p>
                      <p><span>到期车辆处理方式：</span>{{ ip}}</p>
                      <p><span>二次缴费规则：</span>{{ ip}}</p>
                      <p><span>车牌识别结果比对规则：</span>{{ ip}}</p>
                      <p><span>未找到在场车辆处理方式：</span>{{ ip}}</p>
                      <p><span>车辆有效期播报方式：</span>{{ ip}}</p>
                      <p><span>是否启用折扣：</span>{{ ip}}</p>
                      <p><span>累加未确认收费金额：</span>{{ ip}}</p>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="panel" >
                      <p class="title">设备系统信息</p>
                        <P>当前版本：{{ ip}}</P>
                        <P>发现新版本：{{ ip}}</P>
                        <P>新版本说明：{{ ip}}</P>
                        <P>升级操作：{{ ip}}</P>
                  </div>
                </el-col>
                
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                  <div class="panel">
                    <p class="title">高级设置</p>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>是否允许锁车：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>储值卡余额不足是否扣除余额：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>向广告屏发空车位信息：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>储值卡扣费自动放行：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>停车时间较长需值班员确认(单位:天)：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>车卡是否绑定：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>语音大小：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>设定音量开始时间：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>语言：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>设定音量结束时间：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>控制器心跳间隔：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>军警等特殊车辆是否自动放行：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>黄牌车默认车型：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>分配IP方式：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>是否定时重启摄像机：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>停车场类型：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>判定单通道重复最小间隔(单位:秒)：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>入口延时关闸(单位:秒)：{{ ip}}</P>
                          </el-col>
                      </el-row>
                       <el-row :gutter="20">
                          <el-col :span="12">
                              <P>判定单通道重复最大间隔(单位:秒)：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>出口延时关闸(单位:秒)：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>未授权的主库是否收费：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>进场车辆卡机处理方式：{{ ip}}</P>
                          </el-col>
                      </el-row>
                       <el-row :gutter="20">
                          <el-col :span="12">
                              <P>是否开启稽查：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>识别后是否需要刷卡或取票卡出入：{{ ip}}</P>
                          </el-col>
                      </el-row>
                       <el-row :gutter="20">
                          <el-col :span="12">
                              <P>LED屏是否显示支付二维码：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>注册车辆是否需要刷卡：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>最高收费计费方式：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>达到最高收费后收费0元是否提醒：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>达到一天最高消费不再计费：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>车位满后通行方式：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>月票车：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>月票车：{{ ip}}</P>
                          </el-col>
                      </el-row>
                  </div>
                </el-col>
                
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                  <div class="panel">
                    <p class="title">纸票信息</p>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>纸票标题：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>纸票的提示语/广告语：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      
                  </div>
                </el-col>
                
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                  <div class="panel">
                    <p class="title">是否开启出场限行提醒：未开启</p>
                  </div>
                </el-col>
                
            </el-row>
          </div>
          <div v-show="rightContent2" class="contentR right">
             <div class="panel">
                    <p class="title">属性信息</p>
                     <el-row :gutter="20">
                        <el-col :span="8">
                           <P>内网IP地址：{{ ip}}</P>
                        </el-col>
                        <el-col :span="8">
                           <P> <strong>关联的通道: </strong> </P>
                        </el-col>
                        <el-col :span="8">
                           <P> <strong> 可登陆的值班员：</strong></P>
                        </el-col>
                    </el-row>
                  <el-row :gutter="20">
                        <el-col :span="8">
                           <P>工作模式：{{ ip}}</P>
                        </el-col>
                        <el-col :span="8">
                           <P>{{ip}}</P>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                           <P>工作模式：{{ ip}}</P>
                        </el-col>
                        <el-col :span="8">
                           <P>{{ip}}</P>
                        </el-col>
                    </el-row>
              </div>
              
          </div>  
      </div>
      <div class="main" v-show="mainQuery">
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
          <div v-show="rightContent1" class="contentR right">
            
            <p style="color:red;" > > 以下设置会直接影响系统运行，请在修改前确认设置无误。</p>
            <el-row :gutter="20">
                <el-col :span="12">
                  <div class="panel">
                      <p class="title">基本设置</p>
                      <P><span>内网IP：</span>{{ ip}}</P>
                      <p><span>默认计费车型：</span>{{ ip}}</p>
                      <p><span>缴费后允许逗留时间(分钟)：</span>{{ ip}}</p>
                      <p><span>有效期到期提醒（单位:天）：</span>{{ ip}}</p>
                      <p><span>到期车辆延时收费时间（单位:天）：</span>{{ ip}}</p>
                      <p><span>到期车辆处理方式：</span>{{ ip}}</p>
                      <p><span>二次缴费规则：</span>{{ ip}}</p>
                      <p><span>车牌识别结果比对规则：</span>{{ ip}}</p>
                      <p><span>未找到在场车辆处理方式：</span>{{ ip}}</p>
                      <p><span>车辆有效期播报方式：</span>{{ ip}}</p>
                      <p><span>是否启用折扣：</span>{{ ip}}</p>
                      <p><span>累加未确认收费金额：</span>{{ ip}}</p>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="panel" >
                      <p class="title">设备系统信息</p>
                        <P>当前版本：{{ ip}}</P>
                        <P>发现新版本：{{ ip}}</P>
                        <P>新版本说明：{{ ip}}</P>
                        <P>升级操作：{{ ip}}</P>
                  </div>
                </el-col>
                
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                  <div class="panel">
                    <p class="title">高级设置</p>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>是否允许锁车：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>储值卡余额不足是否扣除余额：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>向广告屏发空车位信息：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>储值卡扣费自动放行：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>停车时间较长需值班员确认(单位:天)：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>车卡是否绑定：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>语音大小：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>设定音量开始时间：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>语言：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>设定音量结束时间：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>控制器心跳间隔：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>军警等特殊车辆是否自动放行：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>黄牌车默认车型：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>分配IP方式：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>是否定时重启摄像机：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>停车场类型：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>判定单通道重复最小间隔(单位:秒)：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>入口延时关闸(单位:秒)：{{ ip}}</P>
                          </el-col>
                      </el-row>
                       <el-row :gutter="20">
                          <el-col :span="12">
                              <P>判定单通道重复最大间隔(单位:秒)：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>出口延时关闸(单位:秒)：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>未授权的主库是否收费：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>进场车辆卡机处理方式：{{ ip}}</P>
                          </el-col>
                      </el-row>
                       <el-row :gutter="20">
                          <el-col :span="12">
                              <P>是否开启稽查：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>识别后是否需要刷卡或取票卡出入：{{ ip}}</P>
                          </el-col>
                      </el-row>
                       <el-row :gutter="20">
                          <el-col :span="12">
                              <P>LED屏是否显示支付二维码：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>注册车辆是否需要刷卡：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>最高收费计费方式：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>达到最高收费后收费0元是否提醒：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>达到一天最高消费不再计费：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>车位满后通行方式：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>月票车：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>月票车：{{ ip}}</P>
                          </el-col>
                      </el-row>
                  </div>
                </el-col>
                
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                  <div class="panel">
                    <p class="title">纸票信息</p>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>纸票标题：{{ ip}}</P>
                          </el-col>
                          <el-col :span="12">
                              <P>纸票的提示语/广告语：{{ ip}}</P>
                          </el-col>
                      </el-row>
                      
                  </div>
                </el-col>
                
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                  <div class="panel">
                    <p class="title">是否开启出场限行提醒：未开启</p>
                  </div>
                </el-col>
                
            </el-row>
          </div>
          <div v-show="rightContent2" class="contentR right">
             <div class="panel">
                    <p class="title">属性信息</p>
                     <el-row :gutter="20">
                        <el-col :span="8">
                           <P>内网IP地址：{{ ip}}</P>
                        </el-col>
                        <el-col :span="8">
                           <P> <strong>关联的通道: </strong> </P>
                        </el-col>
                        <el-col :span="8">
                           <P> <strong> 可登陆的值班员：</strong></P>
                        </el-col>
                    </el-row>
                  <el-row :gutter="20">
                        <el-col :span="8">
                           <P>工作模式：{{ ip}}</P>
                        </el-col>
                        <el-col :span="8">
                           <P>{{ip}}</P>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                           <P>工作模式：{{ ip}}</P>
                        </el-col>
                        <el-col :span="8">
                           <P>{{ip}}</P>
                        </el-col>
                    </el-row>
              </div>
              
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
        id: 1,
        label: "物联网关",
        children: [
          {
            id: 10,
            label: "停车场物联网关",
            type: "edrere",
            ip: "192.178.4.4"
          }
        ]
      },
      {
        id: 2,
        label: "收费机顶盒",
        children: [
          {
            id: 20,
            label: "收费终端",
            type: "edrere",
            ip: "192.178.4.4"
          }
        ]
      },
      {
        id: 3,
        label: "收费手持机",
        
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
        label: "通道管理",
        children: [
          {
            id: 60,
            label: "入口通道-入口",
           
            children: [
          {
            id: 600,
            label: "入口摄像机",
            type: "edrere",
            ip: "192.178.4.4",
            
          }]
          },
           {
            id: 61,
            label: "出口通道-出口",
           
            children: [
          {
            id: 611,
            label: "出口摄像机",
            type: "edrere",
            ip: "192.178.4.4",
            
          }]
          },
          
        ]
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
      mainQuery:true,
      mainEdit:false,
      editBtn:true,
      queryBtn:false,
      data4: JSON.parse(JSON.stringify(data)),
      treeData: JSON.parse(JSON.stringify(data)),
      v_park: "",
      park: [{}],
      nodeLabel: "",
      showType: false,
      rightContent1: false,
      rightContent2: false,
      ip: "192.168.0.225",
      type: "nt999"
      // url:'1'
    };
  },

  methods: {
    editBtns(){
      this.editBtn=false;
      this.queryBtn=true;
      this.mainEdit=true;
      this.mainQuery=false;
    },
    queryBtns(){
      this.editBtn=true;
      this.queryBtn=false;
      this.mainEdit=false;
      this.mainQuery=true;
    },
    btnClose() {
      $(".showType").toggle();
      $(".showIp").toggle();
      $(".right").toggleClass("right");
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
      console.log("obj");
      console.log(node.parent.label);
      if (node.parent.label === "物联网关") {
        this.rightContent1 = true;
        this.rightContent2 = false;
      } else if (node.parent.label === "收费机顶盒") {
        this.rightContent1 = false;
        this.rightContent2 = true;
      }
      this.nodeLabel = node.label;
    },
    
    renderContent(h, { node, data, store }) {
      console.log(node);
      if (node.data.id < 10) {
        return (
          <span class="custom-tree-node">
            <span>
              {" "}
              <strong>{node.label} </strong>
            </span>
          </span>
        );

        //  return false;
      } else if(node.childNodes.length!=0){
         return (
          <span class="custom-tree-node">
            <span>
              {" "}
              <strong>{node.label} </strong>
              
            </span>
          </span>
        );  
      }
      else {
        return (
          <span class="custom-tree-node">
            <span style="padding:10px;margin-right:40px">{node.label} </span>
            <span class="showType" style="padding-right:130px ">
              型号: {node.data.type}
            </span>
            <span class="showIp" style="padding-right:130px ;">
              ip:
              {node.data.ip}
            </span>
            <span>
            <el-button size="mini" type="primary" icon="el-icon-document" />
            </span>
            
          </span>
        );
      }
    },
    renderContentEdit(h,{node,data,store}){
      console.log(node);
     if(node.data.id < 10 && node.data.id==="1"){
       <span class="custom-tree-node">
            <span>
              {" "}
              <strong>{node.label} </strong>
               
            </span>
          </span>
       
     }
      else if ( node.data.id < 10 && node.data.id!=1 ) {
        return (
          <span class="custom-tree-node">
            <span>
              {" "}
              <strong>{node.label} </strong>
               <span  class="addP">
                  <a href="#" onclick="alert(`fff`) "><strong>+添加</strong></a>
             
               </span>
            </span>
          </span>
        );

        //  return false;
      }else if(!node.isLeaf && node.parent && node.data.id!=1 ){
          return (
          <span class="custom-tree-node">
            <span>
              {" "}
              <strong>{node.label} </strong>
                <span  class="addP">
                  <a href="#" ><strong>+添加</strong></a>&nbsp;
                   <el-button onclick="alert(`删除`)" size="mini"type="danger" icon="el-icon-delete"  />
               </span>
               

            </span>
          </span>
        );
      }
      else if(node.childNodes.length!=0){
         return (
          <span class="custom-tree-node">
            <span>
              {" "}
              <strong>{node.label} </strong>
              
            </span>
          </span>
        );  
      }
       else {
        return (
          <span class="custom-tree-node">
            <span style="padding:10px;margin-right:40px">{node.label} </span>
            <span class="showType" style="padding-right:130px ">
              型号: {node.data.type}
            </span>
            <span class="showIp" style="padding-right:130px ;">
              ip:
              {node.data.ip}
            </span>

            <el-button size="mini"type="primary" icon="el-icon-document" />
            <el-button size="mini"type="primary" icon="el-icon-edit" />
            <el-button size="mini"type="danger" onclick="alert(`删除`)"  icon="el-icon-delete" />
          </span>
        );
      }

    }
  }
};
</script>
<style >
.el-tree-node__content {
  position: relative;
  height: 40px;
}
.custom-tree-node {
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  padding-right: 8px;
}
.main ,
.mainEdit{
  position: relative;
  display: flex;
  height: 100%;
}
.treeBox {
  height: 100%;
  display: inline-block;
  border: 1px solid #ddd;
  border-radius: 5px;
  position: relative;
  height: 750px;
}
.contentR {
  margin-top: 15px;
  margin-left: 15px;
  border: 1px solid #ddd;
  font-size: 12px;
  width: 1500px;
  height: 750px;
  -ms-scroll-snap-y: auto;
  overflow:auto;
}
.panel{
  border:1px solid #ddd;
  margin:15px 10px;
  /* height: 350px; */
  border-radius: 5px;
}
.panel .title{
  margin-bottom: 10px;
   text-align: left;
  font-weight: bold;
  padding:5px;
  background-color: #eee;
  border-bottom: 1px solid #ccc;
}
.panel p span{
  color:red;
}
.panel p{
  height: 25px;
  text-align: center;
}
.panel .content2left{
  float: left;
  width: 100px;
}
/* .right{
  padding-left: 985px;
} */
.btnClose {
  position: absolute;
  top: -1px;
  right: -13px;
  z-index: 999;
}
.addP{
  position:absolute;
  top:0;
  right:10px;
  padding:5px;
}
.addP a{
  text-decoration: none;
}
</style>