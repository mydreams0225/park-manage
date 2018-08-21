<template>
	<section>
		<div class="parent">

			<div class="margin-tops ">
                <span>所属停车场</span>
				<el-select @change="parkchange" v-model="filters.park"  filterable >
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
       <!-- 编辑树 -->
      <div class="mainEdit" v-show="mainEdit">
          <div class="margin-tops treeBox">
            <div class="btnClose"><el-button  size="mini" icon="el-icon-caret-right" @click="btnClose"></el-button>  </div>
                <el-tree
                :data="treeDataEdit"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                highlight-current
                @node-click="nodeClick"
                :render-content="renderContentEdit"
                >
                </el-tree>
          </div>
          <!-- 编辑物联网关 -->
          <div v-show="rightContent1" class="contentR right" >
            
             <p  class="titleTop" >
                  <el-button type="primary" size="small" class="el-icon-document">保存</el-button>
                  <el-button type="success" size="small" class="el-icon-refresh">重启网关系统</el-button>
                  <el-button  size="small" >恢复默认设置</el-button>
                  <el-button  size="small" >重置管理密码</el-button>
            </p>
            <el-row :gutter="20">
                <el-col :span="12">
                  <div class="panel">
                      <p class="title">基本设置</p>
                       <div>
                           <P ><span>内网IP：</span></P>
                            <p><el-input v-model="query.wbGateway.ip"></el-input></p>
                       </div>
                      <div>
                          <p ><span>默认计费车型：</span></p>
                           <p><el-select v-model="query.wbGateway.feeType"  filterable >
                            <el-option
                                    v-for="item in feeType"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                           </el-select>
                        </p>
                      </div>
                      <div>
                          <p ><span>缴费后允许逗留时间(分钟)：</span></p>
                           <p><el-input v-model="query.wbGateway.stopTime"></el-input></p>
                    </div>
                      <div>
                          <p ><span>有效期到期提醒（单位:天）：</span></p>
                           <p><el-input v-model="query.wbGateway.duringDay"></el-input></p>
                      </div>
                      <div>
                          <p ><span>到期车辆延时收费时间（单位:天）：</span></p>
                           <p><el-input v-model="query.wbGateway.delayFeeTime"></el-input></p>
                      </div>
                      
                      <div>
                          <p ><span>二次缴费规则：</span></p>
                           <p>
                                <el-radio v-model="query.wbGateway.twoFeeRule" label="补缴"></el-radio>
                                <el-radio v-model="query.wbGateway.twoFeeRule" label="重缴"></el-radio>
                                </p>
                                
                           
                      </div>
                      <div>
                          <p ><span>到期车辆处理方式：</span></p>
                           <p>  
                               <el-radio v-model="query.wbGateway.maturingVehicle" label="收费"></el-radio>
                              <el-radio v-model="query.wbGateway.maturingVehicle" label="不收费"></el-radio>
                        
                             
                            </p>
                      </div>
                      <div>
                          <p ><span>车牌识别结果比对规则：</span></p>
                           <p><el-radio v-model="query.wbGateway.lpr" label="模糊匹配"></el-radio>
                              <el-radio v-model="query.wbGateway.lpr" label="精准匹配"></el-radio></p>
                      </div>
                      <div>
                          <p ><span>未找到在场车辆处理方式：</span></p>
                           <p><el-radio v-model="query.wbGateway.noSpotVehicleFound" label="异常处理"></el-radio>
                              <el-radio v-model="query.wbGateway.noSpotVehicleFound" label="自动免费放行"></el-radio></p>
                      </div>
                      <div>
                          <p  ><span>车辆有效期播报方式：</span></p>
                           <p><el-radio v-model="query.wbGateway.broadcastMethod" label="按天播报"></el-radio>
                              <el-radio v-model="query.wbGateway.broadcastMethod" label="按年月日播报"></el-radio></p>
                      </div>
                      <div>
                          <p  ><span>是否启用折扣：</span></p>
                           <p><el-radio v-model="query.wbGateway.isUseDisc" label="启用"></el-radio>
                              <el-radio v-model="query.wbGateway.isUseDisc" label="不启用"></el-radio></p>
                      </div>
                      <div>
                          <p  ><span>累加未确认收费金额：</span></p>
                           <p><el-radio v-model="query.wbGateway.summationChargeMoney" label="启用"></el-radio>
                              <el-radio v-model="query.wbGateway.summationChargeMoney" label="不启用"></el-radio></p>
                      </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="panel" >
                      <p class="title">设备系统信息</p>
                        <div>
                            <P >当前版本：</P>
                            <p>{{query.wbGateway.currentVersion}}1</p>
                        </div>
                        <div>
                            <P>发现新版本：</P>
                            <p>{{query.wbGateway.newVersion}}</p>
                        </div>
                        <div>
                            <P>新版本说明：</P>
                            <p>{{query.wbGateway.newVersionDesc}}</p>

                        </div>
                        <div>
                            <P >升级操作：</P>
                            <p><el-button type="success" size="mini">点击升级到最新版本</el-button></p>
                        </div>
                  </div>
                </el-col>
                
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                  <div class="panel" >
                    <p class="title">高级设置</p>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>是否允许锁车：</P>
                              <p>
                                <el-radio v-model="query.wbGateway.isAllowLock" label="允许"></el-radio>
                                <el-radio v-model="query.wbGateway.isAllowLock" label="不允许"></el-radio>
                              </p>
                          </el-col>
                          <el-col :span="12">
                              <P>储值卡余额不足是否扣除余额：</P>
                              <p>
                                <el-radio v-model="query.wbGateway.isDeductBalance" label="是"></el-radio>
                                <el-radio v-model="query.wbGateway.isDeductBalance" label="否"></el-radio>
                              </p>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>向广告屏发空车位信息：</P>
                                <P>
                                  <el-radio v-model="query.wbGateway.isparkInfo" label="是"></el-radio>
                                  <el-radio v-model="query.wbGateway.isparkInfo" label="否"></el-radio>
                                </P>
                          </el-col>
                          <el-col :span="12">
                              <P>储值卡扣费自动放行：</P>
                              <P>
                                  <el-radio v-model="query.wbGateway.prepaidAutoRelease" label="是"></el-radio>
                                  <el-radio v-model="query.wbGateway.prepaidAutoRelease" label="否"></el-radio>
                                </P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>停车时间较长需值班员确认(单位:天)：</P>
                              <p><el-input v-model="query.wbGateway.dutyManConfirm"></el-input></p>
                          </el-col>
                          <el-col :span="12">
                              <P>车卡是否绑定：</P>
                              <P>
                                  <el-radio v-model="query.wbGateway.isCarCardBind" label="绑定"></el-radio>
                                  <el-radio v-model="query.wbGateway.isCarCardBind" label="不绑定"></el-radio>
                              </P>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>语音大小：</P>
                              <P>
                                  <el-select v-model="query.wbGateway.speechSize"  filterable >
                                            <el-option
                                              v-for="item in speechSize"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                            </el-option>
                                  </el-select>
                              </P>
                          </el-col>
                          <el-col :span="12">
                              <P>设定音量开始时间：</P>
                              <p>
                                <el-time-select
                                  v-model="query.wbGateway.startTime"
                                  :picker-options="{
                                    start: '00:00',
                                    step: '01:00',
                                    end: '23:00'
                                  }"
                                  placeholder="选择时间">
                                </el-time-select>
                              </p>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>语言：</P>
                              <p>
                                <el-select v-model="query.wbGateway.language"  filterable >
                                            <el-option
                                              v-for="item in language"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                            </el-option>
                                  </el-select>
                              </p>
                          </el-col>
                          <el-col :span="12">
                              <P>设定音量结束时间：</P>
                              <p>
                                <el-time-select
                                  v-model="query.wbGateway.endTime"
                                  :picker-options="{
                                    start: '00:00',
                                    step: '01:00',
                                    end: '23:00'
                                  }"
                                  placeholder="选择时间">
                                </el-time-select>
                              </p>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>控制器心跳间隔：</P>
                              <p>
                                <el-input v-model="query.wbGateway.palpitationInterval"></el-input>
                              </p>
                          </el-col>
                          <el-col :span="12">
                              <P>军警等特殊车辆是否自动放行：</P>
                              <p>
                                <el-radio v-model="query.wbGateway.specialVehiclesAutoRelease" label="是"></el-radio>
                                  <el-radio v-model="query.wbGateway.specialVehiclesAutoRelease" label="否"></el-radio>
                              </p>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>黄牌车默认车型：</P>
                              <p>
                                <el-select v-model="query.wbGateway.yellowCarDefaultMode"  filterable >
                                            <el-option
                                              v-for="item in yellowCarDefaultMode"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                            </el-option>
                                  </el-select>
                                
                              </p>
                          </el-col>
                          <el-col :span="12">
                              <P>分配IP方式：</P>
                                  <el-radio v-model="query.wbGateway.ipMethod" label="自动"></el-radio>
                                  <el-radio v-model="query.wbGateway.ipMethod" label="手动"></el-radio>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>是否定时重启摄像机：</P>
                                  <el-radio v-model="query.wbGateway.isTimingRestartCamera" label="是"></el-radio>
                                  <el-radio v-model="query.wbGateway.isTimingRestartCamera" label="否"></el-radio>
                          </el-col>
                          <el-col :span="12">
                              <P>停车场类型：</P>
                              <el-select v-model="query.wbGateway.parkingType"  filterable >
                                            <el-option
                                              v-for="item in parkingType"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                            </el-option>
                                  </el-select>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>判定单通道重复最小间隔(单位:秒)：</P>
                              <p>
                                <el-input v-model="query.wbGateway.judgeSingleMinInterval"></el-input>
                              </p>
                          </el-col>
                          <el-col :span="12">
                              <P>入口延时关闸(单位:秒)：</P>
                              <p>
                                <el-input v-model="query.wbGateway.passDelayOff"></el-input>
                              </p>
                          </el-col>
                      </el-row>
                       <el-row :gutter="20">
                          <el-col :span="12">
                              <P>判定单通道重复最大间隔(单位:秒)：</P>
                              <p>
                                <el-input v-model="query.wbGateway.judgeSingleMaxInterval"></el-input>
                              </p>
                          </el-col>
                          <el-col :span="12">
                              <P>出口延时关闸(单位:秒)：</P>
                              <p>
                                <el-input v-model="query.wbGateway.outDelayOff"></el-input>
                              </p>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>未授权的主库是否收费：</P>
                              <p>
                                  <el-radio v-model="query.wbGateway.unRootMainKuisCharge" label="收费（自动放行）"></el-radio>
                                  <el-radio v-model="query.wbGateway.unRootMainKuisCharge" label="禁止通行/收费(确认放行)"></el-radio>
                              </p>
                          </el-col>
                          <el-col :span="12">
                              <P>进场车辆卡机处理方式：</P>
                              <p>
                                  <el-radio v-model="query.wbGateway.passCarCardHandle" label="重置后发出"></el-radio>
                                  <el-radio v-model="query.wbGateway.passCarCardHandle" label="回收"></el-radio>
                              </p>
                          </el-col>
                      </el-row>
                       <el-row :gutter="20">
                          <el-col :span="12">
                              <P>是否开启稽查：</P>
                               <p>
                                  <el-radio v-model="query.wbGateway.isOpenInspection" label="开启"></el-radio>
                                  <el-radio v-model="query.wbGateway.isOpenInspection" label="不开启"></el-radio>
                              </p>
                          </el-col>
                          <el-col :span="12">
                              <P>识别后是否需要刷卡或取票卡出入：</P>
                              <p>
                                  <el-radio v-model="query.wbGateway.recognitionIsSwingCard" label="是"></el-radio>
                                  <el-radio v-model="query.wbGateway.recognitionIsSwingCard" label="否"></el-radio>
                              </p>
                          </el-col>
                      </el-row>
                       <el-row :gutter="20">
                          <el-col :span="12">
                              <P>LED屏是否显示支付二维码：</P>
                              <p>
                                  <el-radio v-model="query.wbGateway.isLedShowQRcode" label="是"></el-radio>
                                  <el-radio v-model="query.wbGateway.isLedShowQRcode" label="否"></el-radio>
                              </p>
                          </el-col>
                          <el-col :span="12">
                              <P>注册车辆是否需要刷卡：</P>
                              <p>
                                  <el-radio v-model="query.wbGateway.registerCarIsSwing" label="是"></el-radio>
                                  <el-radio v-model="query.wbGateway.registerCarIsSwing" label="否"></el-radio>
                              </p>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>最高收费计费方式：</P>
                              <p>
                                  <el-radio v-model="query.wbGateway.maxChargingMode" label="连续二十四小时"></el-radio>
                                  <el-radio v-model="query.wbGateway.maxChargingMode" label="自然天"></el-radio>
                              </p>
                          </el-col>
                          <el-col :span="12">
                              <P>达到最高收费后收费0元是否提醒：</P>
                              <p>
                                  <el-radio v-model="query.wbGateway.MaxChargeZeroReminding" label="提醒"></el-radio>
                                  <el-radio v-model="query.wbGateway.MaxChargeZeroReminding" label="不提醒"></el-radio>
                              </p>
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
                              <P>月票车：</P>
                             <p>
                                <el-radio v-model="query.wbGateway.MaxChargeNoFeeMonth" label="是"></el-radio>
                                <el-radio v-model="query.wbGateway.MaxChargeNoFeeMonth" label="否"></el-radio>
                             </p>
                          </el-col>
                          <el-col :span="12">
                              <P>月票车：</P>
                              <p>
                                <el-radio v-model="query.wbGateway.lotFullPassModeMonth" label="正常放行"></el-radio>
                                <el-radio v-model="query.wbGateway.lotFullPassModeMonth" label="确认放行"></el-radio>
                                <el-radio v-model="query.wbGateway.lotFullPassModeMonth" label="禁止放行"></el-radio>
                              </p>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="12">
                              <P>免费车：</P>
                              <p>
                                <el-radio v-model="query.wbGateway.MaxChargeNoFeeFree" label="是"></el-radio>
                                <el-radio v-model="query.wbGateway.MaxChargeNoFeeFree" label="否"></el-radio>
                             </p>
                          </el-col>
                          <el-col :span="12">
                              <P>免费车：</P>
                              <p>
                                <el-radio v-model="query.wbGateway.lotFullPassModeFree" label="正常放行"></el-radio>
                                <el-radio v-model="query.wbGateway.lotFullPassModeFree" label="确认放行"></el-radio>
                                <el-radio v-model="query.wbGateway.lotFullPassModeFree" label="禁止放行"></el-radio>
                              </p>
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
                              <P>纸票标题：</P>
                              <p>
                                <el-input v-model="query.wbGateway.paperTitle"></el-input>
                              </p>
                          </el-col>
                          <el-col :span="12">
                              <P>纸票的提示语/广告语：</P>
                              <p>
                                <el-input v-model="query.wbGateway.paperHint"></el-input>
                              </p>
                          </el-col>
                      </el-row>
                      
                  </div>
                </el-col>
                
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                  <div class="panel">
                    <p class="title">是否开启出场限行提醒
                      <el-checkbox v-model="query.wbGateway.isOpenTiXing"></el-checkbox>
                    </p>
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
               <div class="panel panel2">
                 
                 <div class="title">
                   <el-button size="mini" type="primary">保存</el-button>
                  
                  
                  <p class="cameraTitle" style="text-align:right ;width:90%;"> 属性信息</p>
                  </div>
                    <el-row  :gutter="20">
                        <el-col :span="8">
                            <div>
                                <P ><span> 内网IP地址：</span></P>
                               <p> <el-input v-model="query.passageway.ip"></el-input> </p>
                            </div>                         
                            <div>
                              <p ><span>关联通道：</span>    </p>
                              <p> <el-select v-model="query.passageway.type">
                                     <el-option v-for="item in type" 
                                     :key="item.value"
                                     :value="item.value"
                                     :label="item.label">
                                     </el-option>
                                 </el-select> </p>
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
      
       <el-dialog
                title="添加设备"
                :visible.sync="addVisible"
                width="700px"
                :before-close="handleClose">
                
                  <form >
                    <el-row :gutter="20">
                      
                      <el-col :span="12">
                                <div>
                                  <label for=""><span style="color:red">*</span> 设备类型：（添加后不可修改）</label>
                                </div>
                                <el-select v-model="add.deviceType"  filterable >
                                        <el-option
                                        v-for="item in deviceType"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                            </el-select>    
                        </el-col>        
                        <el-col :span="12">
                                <div>
                                  <label for=""><span style="color:red">*</span> 设备IP ：</label>
                                </div>
                                  <el-input v-model="add.deviceIP" ></el-input>
                        </el-col>
                        
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                                <div>
                                  <label for=""><span style="color:red">*</span> 别名：</label>
                                </div>
                                  <el-input v-model="add.deviceOtherName" ></el-input>
                        </el-col>        
                        <el-col :span="12">
                                <div>
                                  <label for=""> 设备SN：</label>
                                </div>
                                  <el-input v-model="add.deviceSN" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                                <div>
                                  <label for=""> 编码：</label>
                                </div>
                                  <el-input v-model="add.deviceID" placeholder="同一停车场的唯一值"></el-input>
                        </el-col>        
                        <el-col :span="12">
                                <div>
                                  <label for=""> 型号：</label>
                                </div>
                                  <el-input v-model="add.deviceModel" placeholder=""></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                                <div>
                                  <label for="">版本号：</label>
                                </div>
                                  <el-input v-model="add.deviceVersion" ></el-input>
                        </el-col>        
                        <el-col :span="12">
                                <div>
                                  <label for=""> 二进制位数：值范围（0-255）</label>
                                </div>
                                  <el-input v-model="add.deviceTwoBinary" placeholder=""></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                                <div>
                                  <label for=""> 使用状态：</label>
                                </div>
                                  <el-select v-model="add.deviceUseStatus"  filterable >
                                        <el-option
                                        v-for="item in deviceUseStatus"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                            </el-select>    
                        </el-col>        
                        
                    </el-row>
                  </form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addVisible = false">取 消</el-button>
              <el-button type="primary" @click="savedevice">保 存</el-button>
            </span> 
         </el-dialog>
		</div>  
	</section>
</template>
<script>
import camera from "@/assets/img/camera.png";
import {
  reqSaveDevice,
  reqDeviceInfo,
  reqDeviceInfo1
} from "@/api/deviceManage";
export default {
  data() {
    const datas = [
      {
        id: 9,
        label: "物联网关",
        children: [
          {
            id: 10,
            label: "停车场物联网关",
            type: "edrere",
            ip: "192.178.4.4",
            json: {}
          }
        ]
      },
      {
        id: 11,
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
            id: 1,
            label: "入口通道-入口",
            // children:[]
            children: []
          },
          {
            id: 2,
            label: "出口通道-出口",
            children: []
            // children: [
            //   {
            //     id: 611,
            //     label: "出口摄像机",
            //     type: "出口通道",
            //     ip: "192.178.0.136",
            //     url: "../../../static/img/car.jpg"
            //   }
            // ]
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
    const data = [
      {
        id: 9,
        label: "物联网关",
        children: [
          {
            id: 10,
            label: "停车场物联网关",
            type: "edrere",
            ip: "192.178.4.4",
            json: {}
          }
        ]
      },
      {
        id: 11,
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
            id: 1,
            label: "入口通道-入口",
            // children:[]
            children: []
          },
          {
            id: 2,
            label: "出口通道-出口",
            children: []
            // children: [
            //   {
            //     id: 611,
            //     label: "出口摄像机",
            //     type: "出口通道",
            //     ip: "192.178.0.136",
            //     url: "../../../static/img/car.jpg"
            //   }
            // ]
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
      parks: [],
      language: [],
      yellowCarDefaultMode:[],
      parkingType:[],//停车场类型
      addVisible: false,
      speechSize: [
        { value: "1", label: "大" },
        { value: "2", label: "中" },
        { value: "3", label: "小" }
      ],
      add: {
        deviceType: "",
        deviceIP: "",
        deviceOtherName: "",
        deviceSN: "",
        deviceID: "",
        deviceModel: "", //型号
        deviceVersion: "",
        deviceTwoBinary: "", //二进制位数：值范围（0-255）
        deviceUseStatus: "" //使用状态
      },
      deviceType: [],
      deviceUseStatus: [],
      mainQuery: true,
      mainEdit: false,
      editBtn: true,
      queryBtn: false,
      //   data4: JSON.parse(JSON.stringify(data)),
      treeData: data,
      treeDataEdit: datas,
      filters: {
        park: ""
      },
      feeType: [],
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
        wbGateway: {
          feeType: ""
        },
        json: {},
        tollTerminal: {
          ip: "",
          workMode: "出口收费",
          isfreeRelease: "启用",
          iscancelCharge: "启用",
          isShowCharge: "启用",
          isfillFreeReason: "启用",
          iszeroAutoRelease: "启用",
          isAutoReleaseCar: "全部车辆",
          isManualASwitchOff: "启用",
          isManualAShutOff: "启用",
          isexitVideoPosition: "左",
          isInfoLineUp: "否",
          isExceptionHandling: "启用",
          isShowOwnerInfo: "显示",
          isSureAutoPrint: "否",
          isOpenentrance: "是",
          descInfo: "11"
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
  created() {
    this.park = this.common.getParkList();
    this.getDeviceInfo();
    // this.addDevice();
  },
  methods: {
    parkchange() {
      this.getDeviceInfo();
    },
    //请求左树控控件
    getDeviceInfo() {
      //       this.treeData=[{
      //     id: 1,
      //     label: "物联网关",
      //     children: [
      //       {
      //         id: 10,
      //         label: "停车场物联网关",
      //         type: "edrere",
      //         ip: "192.178.4.4"
      //       }
      //     ]
      //   }];
      let para = {
        jwt: window.localStorage.getItem("jwt"),
        parkNo: this.filters.park || "111"
      };
      reqDeviceInfo1(para).then(res => {
        console.log(res);
        if (res.code === 1) {
          //   this.treeData = res.equipmentInfoMap;
          this.getRenderData(res.equipmentInfoMap, this.treeData);
          this.getRenderData(res.equipmentInfoMap, this.treeDataEdit);
        } else {
          console.log("获取数据失败");
        }
      });
    },
    //树控件请求的数据解析
    getRenderData(equipmentInfoList, treeData) {
      var data = treeData;
      for (var item in equipmentInfoList) {
        treeData.forEach(items => {
          //  items["children"] = [];
          if (items.label == "通道管理") {
            items.children.forEach(itemss => {
              // itemss.children=[];
              if (itemss.id == item) {
                console.log(itemss);
                equipmentInfoList[item].forEach(elementss => {
                  var temp = {
                    id: elementss.equipmentNo,
                    label: elementss.equipmentName,
                    ip: elementss.ip || "",
                    type: elementss.type || ""
                  };
                  itemss.children.push(temp);
                  // console.log(itemss.children);
                });
              }
            });
          } else if (items["id"] == item) {
            console.log("收费终端");
            console.log(item);
            items.children = [];
            equipmentInfoList[item].forEach(elements => {
              var temp = {
                id: elements.equipmentNo,
                label: elements.equipmentName,
                ip: elements.ip || "",
                type: elements.type || ""
              };
              items.children.push(temp);
            });
            // items["children"]=equipmentInfoList[item]
          }
        });
      }
      console.log(this.treeDataEdit);
    },
    //添加设备信息
    savedevice() {
      var obj = this.add;
      let para = {
        //         add: {
        //     deviceType: "",
        //     deviceUseStatus: "",
        //     deviceIP: "",
        //     deviceOtherName: "",
        //     deviceSN: "",
        //     deviceID: "",
        //     deviceModel: "", //型号
        //     deviceVersion: "",
        //     deviceTwoBinary: "", //二进制位数：值范围（0-255）
        //   },
        parkNo: this.filters.park,
        deviceType: obj.deviceType, //设备类型
        deviceUseStatus: obj.deviceUseStatus, //设备使用状态
        diviceIP: obj.deviceIP, //设备ip
        deviceOtherName: obj.deviceOtherName, //别名
        deviceSN: obj.deviceSN, //设备sn
        deviceID: obj.deviceID, //编号
        deviceModel: obj.deviceModel, //型号
        deviceVersion: obj.deviceVersion, //版本号
        deviceTwoBinary: obj.deviceTwoBinary, //二进制位数
        jwt: window.localStorage.getItem("jwt")
      };
      reqSaveDevice(para).then(res => {
        if (res.code === 1) {
          this.$message({
            message: res.message,
            type: "success"
          });
        } else {
          this.$message({
            message: res.message,
            type: "success"
          });
        }
      });
    },
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
      done();
    },
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
    nodeClick(obj, node, zujian) {
      console.log("obj");
      console.log(node);
      if (node.parent != null && node.parent.label === "物联网关") {
        this.rightContent1 = true;
        this.rightContentCamera = false;
        this.rightContent2 = false;
        this.query.wbGateway = {
          ip: node.data.ip,
          type: node.data.type
        };
      } else if (node.parent != null && node.parent.label === "收费机顶盒") {
        this.rightContent1 = false;
        this.rightContent2 = true;
        this.rightContentCamera = false;
      } else if (
        node.parent.parent != null &&
        node.parent.parent.label === "通道管理"
      ) {
        this.rightContentCamera = true;
        this.rightContent1 = false;
        this.rightContent2 = false;
        this.query.passageway = {
          type: node.data.type,
          ip: node.data.ip,
          url: node.data.url
        };
      } else if (
        node.parent.parent != null &&
        node.parent.label === "通道管理"
      ) {
      }

      this.nodeLabel = node.label;
    },

    addDevice(data) {
      for (var item in this.add) {
        this.add[item] = "";
      }
      this.addVisible = true;
    },
    renderContent(h, { node, data, store }) {
      console.log("ffffffffff");
      console.log(node);
      if (!node.parent.label) {
        return (
          <span class="custom-tree-node">
            <span>
              {" "}
              <strong>{node.label} </strong>
            </span>
          </span>
        );
        //  return false;
      }
      if (node.label == "停车场物联网关") {
        return (
          <span class="custom-tree-node">
            <span> {node.label}</span>
          </span>
        );
      }
      if (node.childNodes.length != 0) {
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
      console.log("eeeeeeeeeeeee");
      console.log(node);
      //   if (node.data.id < 10 && node.data.id === "1") {
      if (!node.isLeaf && node.label == "物联网关") {
        // <span class="custom-tree-node">
        //   <span class="nodelabel">
        //     <strong>{node.label} </strong>
        //   </span>
        // </span>;
        return (
          <span class="custom-tree-node">
            <span>
              {" "}
              <strong>{node.label} </strong>
            </span>
          </span>
        );
      }
      if (node.isLeaf && node.label == "停车场物联网关") {
        return (
          <span class="custom-tree-node">
            <span> {node.label}</span>
          </span>
        );
      }
      if (!node.parent.label && node.label != "物联网关") {
        return (
          <span class="custom-tree-node">
            <span>
              <strong>{node.label} </strong>
              <span class="addP">
                <el-button
                  on-click={() => this.addDevice(data)}
                  size="mini"
                  icon="el-icon-plus"
                />
              </span>
            </span>
          </span>
        );
        //  return false;
      }
      if (!node.isLeaf && node.parent && node.label != "物联网关") {
        return (
          <span class="custom-tree-node">
            <span class="nodelabel">
              <strong>{node.label} </strong>
              <span class="addP">
                <el-button
                  on-click={() => this.addDevice(data)}
                  size="mini"
                  icon="el-icon-plus"
                />
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
      }
      if (node.childNodes.length != 0) {
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
            <span style="margin-right:6px;float:right;">
              <el-button size="mini" type="primary" icon="el-icon-document" />
              <el-button size="mini" type="primary" icon="el-icon-edit" />
              <el-button
                size="mini"
                type="danger"
                onclick="alert(`删除`)"
                icon="el-icon-delete"
              />
            </span>
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
  padding-left: 36px !important;
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
  width: 1800px;
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
.titleTop {
  padding: 5px;
  height: 30px;
  background-color: #eee;
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
.panel p > span {
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