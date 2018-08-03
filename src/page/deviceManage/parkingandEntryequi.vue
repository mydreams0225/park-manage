<template>
	<section>
		<div class="parent">
			<div class="margin-tops ">
                <span>所属停车场</span>
				<el-select v-model="filters.park"  filterable >
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
       <!-- 编辑树 -->
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
                        <P style="display:inline-block;width:100px"><span>内网IP：</span></P> <p style="width:100px;">333</p>
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
          <div v-show="rightContentCamera" class="contentR right">
               <div class="panel">
                   ddd
               </div>
          </div> 
      </div>
      <!-- 查询树 -->
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
                       <div>
                           <P ><span>内网IP：</span></P>
                            <p>333</p>
                       </div>
                      <div>
                          <p ><span>默认计费车型：</span></p>
                           <p>333</p>
                      </div>
                      <div>
                          <p ><span>缴费后允许逗留时间(分钟)：</span></p>
                           <p>333</p>
                    </div>
                      <div>
                          <p ><span>有效期到期提醒（单位:天）：</span></p>
                           <p>333</p>
                      </div>
                      <div>
                          <p ><span>到期车辆延时收费时间（单位:天）：</span></p>
                           <p>333</p>
                      </div>
                      <div>
                          <p ><span>到期车辆处理方式：</span></p>
                           <p>333</p>
                      </div>
                      <div>
                          <p ><span>二次缴费规则：</span></p>
                           <p>333</p>
                      </div>
                      <div>
                          <p ><span>车牌识别结果比对规则：</span></p>
                           <p>333</p>
                      </div>
                      <div>
                          <p ><span>未找到在场车辆处理方式：</span></p>
                           <p>333</p>
                      </div>
                      <div>
                          <p  ><span>车辆有效期播报方式：</span></p>
                           <p>333</p>
                      </div>
                      <div>
                          <p  ><span>是否启用折扣：</span></p>
                           <p>333</p>
                      </div>
                      <div>
                          <p  ><span>累加未确认收费金额：</span></p>
                           <p>333</p>
                      </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="panel" >
                      <p class="title">设备系统信息</p>
                        <div>
                            <P >当前版本：</P>
                            <p>333</p>
                        </div>
                        <div>
                            <P>发现新版本：</P>
                            <p>333</p>
                        </div>
                        <div>
                            <P>新版本说明：{{ ip}}</P>

                        </div>
                        <div>
                            <P>升级操作：{{ ip}}</P>
                        </div>
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
             <div class="panel panel2" >
                    <p class="title">属性信息</p>
                    <div>
                         <el-row  :gutter="20">
                             <el-col :span="12">
                                 <div>
                                     <p>内网IP地址：</p>
                                     <p>ip</p>
                                 </div>
                                 <div>
                                     <p>工作模式：</p>
                                     <p>{{query.tollTerminal.workMode}}</p>
                                 </div>
                                 <div>
                                     <p>免费放行：</p>
                                     <p>{{query.tollTerminal.isfreeRelease}}</p>
                                 </div>
                                 <div>
                                     <p>取消收费：</p>
                                     <p>{{query.tollTerminal.iscancelCharge}}</p>
                                 </div>
                                 <div>
                                     <p>显示累计收费金额：</p>
                                     <p>{{query.tollTerminal.isShowCharge}}</p>
                                 </div>
                                 <div>
                                     <p>是否填写免费放行原因：</p>
                                     <p>{{query.tollTerminal.isfillFreeReason}}</p>
                                 </div>
                                 <div>
                                     <p>0元自动放行：</p>
                                     <p>{{query.tollTerminal.iszeroAutoRelease}}</p>
                                 </div>
                                 <div>
                                     <p>0元自动放行针对车辆：</p>
                                     <p>{{query.tollTerminal.isAutoReleaseCar}}</p>
                                 </div>
                                 <div>
                                     <p>手动开闸：</p>
                                     <p>{{query.tollTerminal.isManualASwitchOff}}</p>
                                 </div>
                                 <div>
                                     <p>手动关闸：</p>
                                     <p>{{query.tollTerminal.isManualAShutOff}}</p>
                                 </div>
                                 <div>
                                     <p>出口视频位置：</p>
                                     <p>{{query.tollTerminal.isexitVideoPosition}}</p>
                                 </div>
                                 <div>
                                     <p>信息是否排队：</p>
                                     <p>{{query.tollTerminal.isInfoLineUp}}</p>
                                 </div>
                                 <div>
                                     <p>异常处理：</p>
                                     <p>{{query.tollTerminal.isExceptionHandling}}</p>
                                 </div>
                                 <div>
                                     <p>是否显示业主信息：</p>
                                     <p>{{query.tollTerminal.isShowOwnerInfo}}</p>
                                 </div>
                                 <div>
                                     <p>确认收费时是否自动打印小票：</p>
                                     <p>{{query.tollTerminal.isSureAutoPrint}}</p>
                                 </div>
                                 <div>
                                     <p>是否开启桌面刷卡入场：</p>
                                     <p>{{query.tollTerminal.isOpenentrance}}</p>
                                 </div>
                                 <div>
                                     <p>描述信息：</p>
                                     <p>{{query.tollTerminal.descInfo}}</p>
                                 </div>
                             </el-col>
                             <el-col :span="6">
                                 <div>
                                     <p> <strong>关联的通道：</strong>  </p>
                                 </div>
                                 <div>
                                     <p>入口通道</p>
                                </div>
                             </el-col>
                             <el-col :span="6">
                                 <div>
                                     <p><strong>可登陆的值班员：</strong></p>
                                 </div>
                                 <div>
                                     <p>全部可登陆</p>
                                 </div>
                             </el-col>
                         </el-row>
                    </div>
              </div>
          </div>
          <div v-show="rightContentCamera" class="contentR right">
               <div class="panel panel2">
                 <p class="title cameraTitle">属性信息</p>
                    <el-row  :gutter="20">
                        <el-col :span="8">
                            <div>
                                <P ><span> 内网IP地址：</span></P>
                               <p> <span>{{query.passageway.ip}}</span> </p>
                            </div>
                          
                            <div>
                              <p ><span>关联通道：</span>    </p>
                              <p> <span>{{query.passageway.type}}</span> </p>
                          </div>
                           
                        </el-col>
                        <el-col :span="10">
                            <p style="width:100%;"> 
                                <el-button type="success" size="mini" icon="el-icon-view"> 抓拍现场照片</el-button> 
                                <el-button type="success" size="mini" ><i>|||</i> 设置识别区域</el-button> 
                                <el-button type="primary" size="mini" icon="el-icon-refresh">刷新</el-button> 
                            </p>
                            <div class="imgBox">
                                <img :src="query.passageway.url" alt="">
                            </div>
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

import camera from "@/assets/img/camera.png";

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
        label: "收费手持机"
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
                type: "入口通道",
                ip: "192.168.0.225",
                url:"../../../static/img/car.jpg"
              }
            ]
          },
          {
            id: 61,
            label: "出口通道-出口",

            children: [
              {
                id: 611,
                label: "出口摄像机",
                type: "出口通道",
                ip: "192.178.0.136",
                url:"../../../static/img/car.jpg"
              }
            ]
          }
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
      mainQuery: true,
      mainEdit: false,
      editBtn: true,
      queryBtn: false,
      data4: JSON.parse(JSON.stringify(data)),
      treeData: JSON.parse(JSON.stringify(data)),
      filters: {
        park: ""
      },
      park: [{}],
      nodeLabel: "",
      showType: false,
      rightContent1: false,
      rightContent2: false,
      editrightContent1: false,
      editrightContent1: false,
      rightContentCamera: false,
      ip: "",
      type: "",
      query: {
        passageway: {
          ip: "",
          type: ""
        },
        tollTerminal:{
            ip:"",
            workMode:"出口收费",
            isfreeRelease:"启用",
            iscancelCharge:"启用",
            isShowCharge:"启用",
            isfillFreeReason:"启用",
            iszeroAutoRelease:"启用",
            isAutoReleaseCar:"全部车辆",
            isManualASwitchOff:"启用",
            isManualAShutOff:"启用",
            isexitVideoPosition:"左",
            isInfoLineUp:"否",
            isExceptionHandling:"启用",
            isShowOwnerInfo:"显示",
            isSureAutoPrint:"否",
            isOpenentrance:"是",
            descInfo:"11"

        }
      }
      // url:'1'
    };
  },
  mounted() {
    $(".showType").toggle();
    $(".showIp").toggle();
    $(".right").remove("right");
  },
  methods: {
    editBtns() {
      this.editBtn = false;
      this.queryBtn = true;
      this.mainEdit = true;
      this.mainQuery = false;
    },
    queryBtns() {
      this.editBtn = true;
      this.queryBtn = false;
      this.mainEdit = false;
      this.mainQuery = true;
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
      console.log(node);
      if(node.parent!=null  &&   node.parent.label === "物联网关") {
        this.rightContent1 = true;
        this.rightContentCamera = false;
        this.rightContent2 = false;

      } else if (node.parent!=null  && node.parent.label === "收费机顶盒") {
        this.rightContent1 = false;
        this.rightContent2 = true;
        this.rightContentCamera = false;
      } else if (node.parent.parent!=null && node.parent.parent.label === "通道管理") {
        this.rightContentCamera = true;
        this.rightContent1 = false;
        this.rightContent2 = false;
        this.query.passageway={
            type:node.data.type,
            ip:node.data.ip,
            url:node.data.url
        };
      }else if(node.parent.parent!=null && node.parent.label==="通道管理"){
          
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
      } else if (node.childNodes.length != 0) {
        return (
          <span class="custom-tree-node">
            <span>
              {" "}
              <strong>{node.label} </strong>
            </span>
          </span>
        );
      } else {
        return (
          <span class="custom-tree-node">
            <span class="nodelabel">{node.label} </span>
            <span class="showType showModel">型号: {node.data.type}</span>
            <span class="showIp showModel showips">
              ip:
              {node.data.ip}
            </span>
            <span class="queryBtns">
              <el-button size="mini" type="primary" icon="el-icon-document" />
            </span>
          </span>
        );
      }
    },
    renderContentEdit(h, { node, data, store }) {
      console.log(node);
      if (node.data.id < 10 && node.data.id === "1") {
        <span class="custom-tree-node">
          <span class="nodelabel">
            <strong>{node.label} </strong>
          </span>
        </span>;
      } else if (node.data.id < 10 && node.data.id != 1) {
        return (
          <span class="custom-tree-node">
            <span>
              <strong>{node.label} </strong>
              <span class="addP">
                <a href="#" onclick="alert(`fff`) ">
                  <strong>+添加</strong>
                </a>
              </span>
            </span>
          </span>
        );

        //  return false;
      } else if (!node.isLeaf && node.parent && node.data.id != 1) {
        return (
          <span class="custom-tree-node">
            <span class="nodelabel">
              <strong>{node.label} </strong>
              <span class="addP ">
                <a href="#">
                  <strong>+添加</strong>
                </a>&nbsp;
                <el-button
                  onclick="alert(`删除`)"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                />
              </span>
            </span>
          </span>
        );
      } else if (node.childNodes.length != 0) {
        return (
          <span class="custom-tree-node">
            <span class="nodelabel">
              <strong>{node.label} </strong>
            </span>
          </span>
        );
      } else {
        return (
          <span class="custom-tree-node">
            <span class="nodelabel">{node.label} </span>
            <span class="showType showModel">型号: {node.data.type}</span>
            <span class="showIp showModel">
              ip:
              {node.data.ip}
            </span>

            <el-button size="mini" type="primary" icon="el-icon-document" />
            <el-button size="mini" type="primary" icon="el-icon-edit" />
            <el-button
              size="mini"
              type="danger"
              onclick="alert(`删除`)"
              icon="el-icon-delete"
            />
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
  /* position: relative; */
}
.queryBtns {
  position: absolute;
  top: 5px;
  right: 5px;
}
.main,
.mainEdit {
  position: relative;
  display: flex;
  height: 100%;
}
.treeBox {
  height: 100%;
  display: inline-block;
  border: 1px solid #ddd;
  /* border-radius: 5px; */
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
  overflow: auto;
}
.panel {
  border: 1px solid #ddd;
  margin: 15px 10px;
  /* height: 350px; */
  border-radius: 5px;
}
.panel2 {
  border-radius: 0px;
  margin: 0px;
  border: 0px;
}
.panel .title {
  position: relative;
  margin-bottom: 10px;
  text-align: left;
  font-weight: bold;
  padding: 5px;
  background-color: #eee;
  border-bottom: 1px solid #ccc;
}
.panel .cameraTitle {
  text-align: right;
}
.panel p span {
  color: red;
}
.panel2 p span {
  color: #000;
}
.panel2 p .el-button span {
  color: #fff;
}
.panel p {
  height: 25px;
  text-align: right;
}

.panel .content2left {
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
.addP {
  position: absolute;
  top: 0;
  right: 10px;
  padding: 5px;
}
.addP a {
  text-decoration: none;
  color: #09c;
}
.nodelabel {
  padding: 10px;
  /* margin-right: 40px; */
  width: 150px;
}
.showModel {
  padding-right: 80px;
  display: inline-block;
  width: 100px;
}
.panel2 .imgBox {
  margin: 20px 40px 0px 0px;
  width: 450px;
  height: 230px;
}
.panel2 .imgBox img {
  width: 100%;
}
.panel .psetlabel {
  display: inline-block;
  width: 50%;
  text-align: right;
}
.panel .psetvalue {
  display: inline-block;
  width: 40%;
  text-align: left;
}
.panel div > p {
  display: inline-block;
  width: 50%;
  text-align: right;
}
.panel div {
    height: 40px;
}
.panel div p:nth-child(2) {
  display: inline-block;
  width: 40%;
  text-align: left;
}


</style>