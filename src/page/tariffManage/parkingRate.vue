<template>
	<section>
	    <div class="parent">
				<!-- 工具条 -->
	    	<div class="margin-tops">
	    		<el-button @click="addRateShow" type="primary" size="medium"><i class="el-icon-plus" ></i>新增</el-button>
	    		<el-button @click="batchRemove()" type="danger" size="medium"><i class="el-icon-delete"></i>删除</el-button>
	    	</div>
				<!-- 查询区 -->
	    	<div class="margin-tops">
					<span>所属停车场</span>
	    		<el-select v-model="filters.park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in sels.park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
		        </el-select>
		        <el-button type="primary" icon="el-icon-search" size="medium" @click="getParkingRate">查询</el-button>
	            <el-button  size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
	    	</div>
	      <!-- 展示区 -->
				<div class="margin-tops">
						<template>
								<el-table
									:data="tableData"
									border
									style="width: 100% ;"
									@selection-change="selsChange"
									>
									<el-table-column
										type="selection"
										width="55">
									</el-table-column>

									<el-table-column
										type="index"
										label="序号"
										>
									</el-table-column>
									<el-table-column
										prop="parkNo"
										label=""
										v-if="noshow"
										>
									</el-table-column>
								
									<el-table-column
										prop="rateId"
										label=""
										v-if="noshow"
										>
									</el-table-column>
									<el-table-column
										prop="garageName"
										label="车库"
										>
									</el-table-column>
									<el-table-column
										prop="chargeType"
										label="计费类型">
									</el-table-column>
									<el-table-column
										prop="vehicleType"
										label="车类型">
									</el-table-column>               
									<el-table-column
										prop="algorithmType"
										label="收费类型">
										
											
									</el-table-column>
									<el-table-column
										prop="lastEditTime"
										label="最后修改时间">  
									</el-table-column>
									<el-table-column     
										label="费率设置/批量复制"
										width="280px">
											<template slot-scope="scope">
												<el-button type="success" icon="el-icon-setting" size="mini" @click="handleSetting(scope.$index, scope.row)" >设置费率</el-button>
												<el-button type="primary" icon="el-icon-document" size="mini">复制该费率到...</el-button>
										</template>
									</el-table-column>
									<el-table-column
										width="120px"
										label="测试"
										>
											<template slot-scope="scope">
												<el-button   size="mini" @click="rateTest(scope.$index,scope.row)"> <span>$</span> 费率测试</el-button>
												</template>
									</el-table-column>

									<el-table-column
										
										label="操作"
										width="130px">
											<template slot-scope="scope">
												<el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editRate(scope.$index,scope.row)"></el-button>
												<el-button type="danger" icon="el-icon-delete" circle size="mini" @click="handleDel(scope.$index, scope.row)"></el-button>
										</template>
									</el-table-column>
								</el-table>
								</template>
				</div>
			  <!-- 费率测试界面 -->
			  <el-dialog 
				  title="费率测试"
				  :visible.sync="test.testVisible"
				  width="600px">
				   <div class="add">
						  <el-row :gutter="20">
		              <el-col :span="12">
		                <div >
		               
		                <span ><strong>当前算法：</strong> {{test.testObj.algorithmType}}</span>
		              </div>
		             </el-col>
							   		              
		          </el-row>
								<el-row :gutter="20">
		              <el-col :span="12">
		                <div >
		               
		                <span ><strong>当前计费类型： </strong>{{test.testObj.chargeType}} </span>
		              </div>
		             </el-col>
								 <el-col :span="12">
		                <div >
		               
		                <span ><strong>当前车类型： </strong> {{test.testObj.vehicleType}}</span>
		              </div>
		             </el-col>           
		       </el-row>	
					 <el-row :gutter="20">
		              <el-col :span="12">
		                <div >
		                <span > <strong>子库是否启用: </strong>  
										   <el-radio v-model="test.isused" @change="sunChange" label="no" >不启用</el-radio>
                       <el-radio v-model="test.isused" @change="sunChange" label="yes" >启用</el-radio>
									 </span>
		              </div>
		             </el-col>      
		          </el-row>
							<el-row :gutter="20">
		              <el-col :span="12">
		                <div >
		                <span >主库开始时间：</span>
		              </div>
		             </el-col>
								<el-col :span="12">
		                <div >
		                <span >主库结束时间：</span>
		              </div>
		             </el-col>              
		       </el-row>
							<el-row :gutter="20">
		              <el-col :span="12">
		                <div >
		                <span >
											<el-date-picker
											v-model="test.start_date"
											format="yyyy-MM-dd HH:mm:ss"
											value-format="yyyyMMddHHmmss"
											type="datetime"
											placeholder="选择日期时间">
										</el-date-picker>
										</span>
		              </div>
		             </el-col>
								<el-col :span="12">
		                <div >
		                <span >	<el-date-picker
											v-model="test.end_date"
											type="datetime"
											format="yyyy-MM-dd HH:mm:ss"
											value-format="yyyyMMddHHmmss"
											placeholder="选择日期时间">
										</el-date-picker></span>
		              </div>
		             </el-col>              
		       </el-row>
					 	<el-row v-show="showsunGarage" :gutter="20">
		              <el-col :span="12">
		                <div >
		                <span >子库开始时间：</span>
		              </div>
		             </el-col>
								<el-col :span="12">
		                <div >
		                <span >子库结束时间：</span>
		              </div>
		             </el-col>              
		       </el-row>
							<el-row v-show="showsunGarage" :gutter="20">
		              <el-col :span="12">
		                <div >
		                <span >
											<el-date-picker
											v-model="test.sumStartDate"
											type="datetime"
											value-format="yyyyMMddHHmmss"
											placeholder="选择日期时间">
										</el-date-picker>
										</span>
		              </div>
		             </el-col>
								<el-col :span="12">
		                <div >
		                <span >	<el-date-picker
											v-model="test.sumEndDate"
											type="datetime"
											value-format="yyyyMMddHHmmss"
											placeholder="选择日期时间">
										</el-date-picker></span>
		              </div>
		             </el-col>              
		       </el-row>
					 <el-row v-show="testResult" :gutter="20">
		              <el-col :span="6">
		                <div >
		                <span >
										 <strong>测试结果：</strong>
										</span>
		              </div>
		             </el-col>
							    <el-col :span="18">
		                <div >
		                <span style="color:red; font-size:18px;" >
										   应付金额:  
											 {{test.payableMoney}}
											 <!-- <el-input v-model="test.payableMoney"></el-input> -->
										</span>
		              </div>
									<div >
		                <span style="color:red; font-size:18px; " >
										   折扣金额: 
											 <el-input v-model="test.discountMoney"></el-input>
										</span>
		              </div>
									<div >
		                <span style="color:red; font-size:18px; " >
										   折后金额: 
											 <el-input v-model="test.accountAfterMoney"></el-input>
										</span>
		              </div>
		             </el-col>    
		       </el-row>
					 </div>
				  <span slot="footer" class="dialog-footer">
				    
				    <el-button type="primary" @click="calculationtariff">计算</el-button>
				  </span>
	      </el-dialog>
		   	<!-- 设置费率 dialog界面-->
        <el-dialog 
				  title="设置费率"
				  :visible.sync="setting.settingVisible" width="1100px">
					<div class="rateMain">
           <div class="leftd">
						 <p><strong>切换收费算法：</strong></p>
						 <el-select v-model="setting.leftobj.algorithmType" placeholder="请选择" @change="changelSuanfa">
								<el-option
									v-for="item in sels.selSuanfa"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
						 </el-select>
						 <span style="display:none">{{setting.leftobj.rateId}}</span>
						  <p><strong>当前车库：</strong></p>
							
							<label >{{setting.leftobj.garageName}}</label>
							 <p><strong>当前计费类型：</strong></p>
							 <label >{{setting.leftobj.chargeType}}</label>
							  <p><strong>当前车类型：</strong></p>
								 <label >{{setting.leftobj.vehicleType}}</label>
					 </div>
					 <div class="rightd">
              <div v-show="setting.isOne">
								 <div class="one">
									 <el-form ref="form" :model="setting.oneForm" label-width="180px">
										 <el-form-item label="免费停车时间(分钟)：">
											<el-input v-model="setting.oneForm.freeparkMin"></el-input>
										</el-form-item>
										<el-form-item label="折扣类型：">
											<el-select v-model="setting.oneForm.discType" filterable >
	                    <el-option
	                      v-for="item in sels.discType"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
		                </el-select>
										</el-form-item>
										 <el-form-item label="折扣值：">
											<el-input v-model="setting.oneForm.discValue"></el-input>
										</el-form-item>
									 </el-form>
                   <el-tabs >
												<el-tab-pane label="按小时收费" class="chargeJson">
                            <el-row :gutter="20" >
															<el-col :span="6"><div >0~1小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div >12~13小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div >1~2小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div >13~14小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div >2~3小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div >14~15小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														
														<el-row :gutter="20" >
															<el-col :span="6"><div >3~4小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div >15~16小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div >4~5小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div >16~17小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div >5~6小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div >17~18小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div >6~7小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div >18~19小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div >7~8小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div >19~20小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div >8~9小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div >20~21小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div >9~10小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div >21~22小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div >10~11小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div >22~23小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div >11~12小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div >23~24小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
												</el-tab-pane>
												
												<el-tab-pane label="按半小时收费">
                            <el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">0~0.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t1"></el-input></div></el-col>
															<el-col :span="3"><div >6~6.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t13"></el-input></div></el-col>
																<el-col :span="3"><div >12~12.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t25"></el-input></div></el-col>
															<el-col :span="3"><div >18~18.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t37"></el-input></div></el-col>
														</el-row>
														 <el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">0.5~1小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t2"></el-input></div></el-col>
															<el-col :span="3"><div >6.5~7小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t14"></el-input></div></el-col>
																<el-col :span="3"><div >12.5~13小时收费</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t26"></el-input></div></el-col>
															<el-col :span="3"><div >18.5~19小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t38"></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">1~1.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t3"></el-input></div></el-col>
															<el-col :span="3"><div >7~7.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t15"></el-input></div></el-col>
																<el-col :span="3"><div >13~13.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t27"></el-input></div></el-col>
															<el-col :span="3"><div >19~19.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t39"></el-input></div></el-col>
														</el-row>

														 <el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">1.5~2小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input  v-model="setting.chargeJson.t4"></el-input></div></el-col>
															<el-col :span="3"><div >7.5~8小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t16"></el-input></div></el-col>
																<el-col :span="3"><div >13.5~14小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t28"></el-input></div></el-col>
															<el-col :span="3"><div >19.5~20小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t40"></el-input></div></el-col>
														</el-row>
														 <el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">2~2.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t5" ></el-input></div></el-col>
															<el-col :span="3"><div >8~8.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t17"></el-input></div></el-col>
																<el-col :span="3"><div >14~14.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t29"></el-input></div></el-col>
															<el-col :span="3"><div >20~20.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t41"></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">2.5~3小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input  v-model="setting.chargeJson.t6"></el-input></div></el-col>
															<el-col :span="3"><div >8.5~9小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t18"></el-input></div></el-col>
																<el-col :span="3"><div >14.5~15小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t30"></el-input></div></el-col>
															<el-col :span="3"><div >20.5~21小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t42"></el-input></div></el-col>
														</el-row>

														 <el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">3~3.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t7"></el-input></div></el-col>
															<el-col :span="3"><div >9~9.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t19"></el-input></div></el-col>
																<el-col :span="3"><div >15~15.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t31"></el-input></div></el-col>
															<el-col :span="3"><div >21~21.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t43"></el-input></div></el-col>
														</el-row>
														 <el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">3.5~4小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content " ><el-input v-model="setting.chargeJson.t8"></el-input></div></el-col>
															<el-col :span="3"><div >9.5~10小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t20"></el-input></div></el-col>
																<el-col :span="3"><div >15.5~16小时收费</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t32"></el-input></div></el-col>
															<el-col :span="3"><div >21.5~22小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t44"></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">4~4.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t9"></el-input></div></el-col>
															<el-col :span="3"><div >10~10.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t21"></el-input></div></el-col>
																<el-col :span="3"><div >16~16.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t33"></el-input></div></el-col>
															<el-col :span="3"><div >22~22.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t45"></el-input></div></el-col>
														</el-row>

														<el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">4.5~5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t10"></el-input></div></el-col>
															<el-col :span="3"><div >10.5~11小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t22"></el-input></div></el-col>
																<el-col :span="3"><div >16.5~17小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t34"></el-input></div></el-col>
															<el-col :span="3"><div >22.5~23小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t46"></el-input></div></el-col>
														</el-row>
														 <el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">5~5.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t11"></el-input></div></el-col>
															<el-col :span="3"><div >11~11.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t23"></el-input></div></el-col>
																<el-col :span="3"><div >17~17.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t35"></el-input></div></el-col>
															<el-col :span="3"><div >23~23.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t47"></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">5.5~6小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t12"></el-input></div></el-col>
															<el-col :span="3"><div >11.5~12小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t24"></el-input></div></el-col>
																<el-col :span="3"><div >17.5~18小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t36"></el-input></div></el-col>
															<el-col :span="3"><div >23.5~24小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input v-model="setting.chargeJson.t48"></el-input></div></el-col>
														</el-row>
												</el-tab-pane>
												
										</el-tabs>
										<div class="footerBtn">
                            <el-button  type="primary" size="medium" @click="settingRateSaves"><i class="el-icon-plus" ></i>保存</el-button>
	    	                  	<el-button  size="medium" @click="setting.settingVisible= false"><i class="el-icon-delete"></i>取消</el-button>
										</div>

								 </div>
								 <div></div>
							</div>
							<div v-show="setting.isTwo">第2种</div>
					 </div>
					</div>
				   
				  <!-- <span slot="footer" class="dialog-footer">
				    <el-button @click="setting.settingVisible= false">取 消</el-button>
				    <el-button type="primary" @click="setting.settingVisible = false">保 存</el-button>
				  </span> -->
				</el-dialog>
				<!-- 分页 -->
			  <div>
          <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="totals.currentPage"
              :page-size.sync="totals.pageSize"
              layout="total, prev, pager, next"
              :total.sync="totals.totalNum">
          </el-pagination>

			  </div>
				<!-- 添加或修改 界面-->
         <el-dialog 
				  :title="edit.titles"
				  :visible.sync="edit.editVisible"
				  width="30%"	>
				   <div class="add">
						  <el-row :gutter="24">
		              <el-col :span="11">
		                <div >
		                <span style="color:red">*</span>
		                <span >选择车库：</span>
										<span  style="display:none">{{edit.editObj.reteId}}</span>
		              </div>
		             </el-col>
							   <el-col :span="11">
		                <div >
		                <span style="color:red">*</span>
		                <span >计费类型：</span>
		              </div>
		             </el-col>		              
		          </el-row>
								<el-row :gutter="24">
		              <el-col :span="11">
		                <div >
		                <el-select v-model="edit.editObj.garageName" filterable  >
                      <el-option
                        v-for="item in sels.garage"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>	        
		              </div>
		             </el-col>	
								 <el-col :span="11">
		                <div >
		                <el-select v-model="edit.editObj.chargeType" filterable  >
                      <el-option
                        v-for="item in sels.feetype"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>	        
		              </div>
		             </el-col>			              
		       </el-row>	
					 <el-row :gutter="24">
		              <el-col :span="11">
		                <div >
		                <span style="color:red">*</span>
		                <span >车类型：</span>
		              </div>
		             </el-col>
							   <el-col :span="11">
		                <div >
		                <span style="color:red">*</span>
		                <span >收费类型：</span>
		              </div>
		             </el-col>		              
		          </el-row>
							<el-row :gutter="24">
		              <el-col :span="11">
		                <div >
		                <el-select v-model="edit.editObj.vehicleType" filterable  >
                      <el-option
                        v-for="item in sels.carType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>	        
		              </div>
		             </el-col>	
								 <el-col :span="11">
		                <div >
		                <el-select v-model="edit.editObj.algorithmType" filterable  >
                      <el-option
                        v-for="item in sels.selSuanfa"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>	        
		              </div>
		             </el-col>			              
		       </el-row>
					 </div>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="cancel">取 消</el-button>
				    <el-button type="primary" @click="saveRate">保 存</el-button>
				  </span>
				</el-dialog>
    </div>
	</section>
</template>
<script>
//reqSettingRate  reqSettingRate
import {
  reqSettingRate,
  reqDeleteOne,
  batchDeleteMore,
  reqParkRate,
  reqAddorEditRate,
  reqTestTariff,
  reqshowRate
} from "@/api/rateManage";
export default {
  data() {
    return {
      testResult: false,
      showsunGarage: false,
      noshow: false, //table不显示的列
      //编辑或新增的集合
      edit: {
        editVisible: false,
        titles: "",
        editObj: {
          garageName: "",
          chargeType: "",
          vehicleType: "",
          algorithmType: "",
          parkNo: ""
        }
      },
      //费率测试
      test: {
        testVisible: false,
        testObj: {},
        reqPara: {
          payableMoney: "",
          discountMoney: "",
          accountAfterMoney: ""
        },
        isused: "no",
        sumEndDate: new Date(),
        sumStartDate: new Date(new Date().getTime() - 1 * 60 * 60 * 1000),
        start_date: "",
        end_date: ""
      },
      //设置费率的数据
      setting: {
        settingVisible: false,
        selSuanfa: "",
        isOne: true,
        isTwo: false,
        chargeJson: {},
        leftobj: {
          rateId: "",
          garageName: "",
          chargeType: "",
          vehicleType: "",
          algorithmType: ""
        },
        oneForm: {
          name: "",
          freeparkMin: "",
          discType: "",
          discValue: ""
        }
      },
      tableData: [
        {
          garageName: "1",
          chargeType: "3",
          vehicleType: "car",
          algorithmType: "按24小时累计时收费",
          parkNo: "parkNo1"
        }
      ],
      changeTypeName: {
        feetypeName: "",
        carTypeName: "",
        suanfaTypeName: ""
      },
      filters: {
        park: "停车场1"
      },
      sels: {
        park: [{ value: "停车场1", label: "停车场1" }],
        feetype: configs.chargeType,
        discType: [{ value: "1", label: "1" }],
        carType: configs.carType,
        selSuanfa: configs.selSuanfa
      },
      totals: {
        totalNum: 1,
        pageSize: 1,
        currentPage: 1
      },
      checkBoxs: []
    };
  },
  mounted() {
    this.getParkingRate();
  },
  created() {
    var park = this.common.getParkList();
    this.sels.park = park;
    // this.getParkList();
  },
  methods: {
    sunChange(val) {
      console.log(val);
      if (val === "yes") {
        this.showsunGarage = true;
      } else {
        this.showsunGarage = false;
      }
    },

    cancel() {
      var obj = this.edit.editObj;
      for (var item in obj) {
        obj[item] = "";
      }
      this.edit.editVisible = false;
    },
    //显示添加费率界面
    addRateShow() {
      this.edit.titles = "添加费率";
      this.edit.editVisible = true;
      var obj = this.edit.editObj;
      for (var item in obj) {
        obj[item] = "";
      }
    },
    //修改费率界面显示
    editRate(index, row) {
      this.edit.titles = "修改费率";
      this.edit.editVisible = true;
      this.edit.editObj = Object.assign({}, row);
    },
    saveRate() {
      let para = {
        garageName: this.edit.editObj.garageName,
        chargeType: this.edit.editObj.chargeType,
        vehicleType: this.edit.editObj.vehicleType,
        algorithmType: this.edit.editObj.algorithmType,
        parkNo: this.filters.park
      };

      para.jwt = window.localStorage.getItem("jwt");
      reqAddorEditRate(para).then(res => {
        console.log(res);
        if (res.code === 1) {
          this.$message({
            message: "添加或修改成功",
            type: "success"
          });
        }
        // this.edit.editObj.forEach(item => {
        //   item = "";
        // });
        this.edit.editVisible = false;
        this.getParkingRate();
      });
    },
    getParkingRate() {
      var _this = this;
      this.tableData = [];
      let para = {
        parkNo: this.filters.park,
        currentPage: this.totals.currentPage,
        pageSize: this.totals.pageSize
      };
      para.jwt = window.localStorage.getItem("jwt");
      // Object.assign({}, this.filters);
      para.currentPage = this.totals.currentPage; //当前页
      para.pageSize = this.totals.pageSize;
      reqParkRate(para)
        .then(res => {
          if (res.code === 1) {
            res.parkRateInfos.forEach(item => {
              var chargeTypeName = this.getChargeType(item["chargeType"]);
              this.getcarType(item["vehicleType"]);
              this.getSuanfaType(item["algorithmType"]);

              var temp = {
                chargeType: this.changeTypeName.feetypeName,
                vehicleType: this.changeTypeName.carTypeName,
                // this.changeTypeName.algorithmType
                algorithmType: this.changeTypeName.suanfaTypeName,
                parkNo: item["parkNo"],
                garageName: item["garageName"],
                rateId: item["rateId"],
                chargeJson: JSON.parse(item["chargeJson"])
              };
              this.tableData.push(temp);
            });
            // 			  tableData: [
            //   {
            //     garageName: "1",
            //     chargeType: "3",
            //     vehicleType: "car",
            //     algorithmType: "按24小时累计时收费",
            //     parkNo: "parkNo1"
            //   }
            // ],
            console.log(res);
            // this.tableData = res.parkRateInfos;

            this.totals.totalNum = res.totalNum;
          }
        })
        .catch(() => {});
    },
    //转换计费类型
    getChargeType(chargeTypevalue) {
      var feetype = this.sels.feetype;
      feetype.forEach(feetypeitem => {
        console.log(feetypeitem.value);
        if (feetypeitem.value == chargeTypevalue) {
          this.changeTypeName.feetypeName = feetypeitem.label;
        }
        // return chargeTypeName;
      });
    },
    //转换车类型
    getcarType(carTypeValue) {
      var carType = this.sels.carType;
      carType.forEach(item => {
        if (item.value == carTypeValue) {
          this.changeTypeName.carTypeName = item.label;
        }
      });
    },
    //转换收费类型
    getSuanfaType(suanfaTypeValue) {
			
			var suanfaType = this.sels.selSuanfa;
			console.log("suanfa"+suanfaType)
      suanfaType.forEach(item => {
        if (item.value == suanfaTypeValue) {
          this.changeTypeName.suanfaTypeName = item.label;
        }
      });
    },
    selsChange: function(sels) {
      console.log(sels);
      this.checkBoxs = sels;
    },
    //批量删除
    //批量删除
    batchRemove: function() {
      //能判断的唯一值
      var rateId = this.checkBoxs.map(item => item.rateId).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { rateIds: rateId };
          para.jwt = window.localStorage.getItem("jwt");
          console.log(para);
          batchDeleteMore(para).then(res => {
            console.log("fff");
            if (res.code === 1) {
              this.listLoading = false;
              //NProgress.done();
              this.$message({
                message: "删除成功",
                type: "success"
              });
            } else {
              this.$message({
                message: res.message,
                type: "errror"
              });
            }

            this.getParkingRate();
          });
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "errror"
          });
        });
    },
    //单行删除
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { rateId: row.rateId };
          para.jwt = window.localStorage.getItem("jwt");
          reqDeleteOne(para).then(res => {
            console.log(res);

            if (res.code === 1) {
              this.listLoading = false;
              //NProgress.done();
              this.$message({
                message: "删除成功",
                type: "success"
              });
            } else {
              this.$message({
                message: res.message,
                type: "errror"
              });
            }

            this.getParkingRate();
          });
        })
        .catch(() => {});
    },
    //设置费率界面显示
    handleSetting(index, row) {
      console.log(row);
      this.setting.settingVisible = true;
      this.setting.leftobj = Object.assign({}, row);
      this.setting.leftobj.rateId = row.rateId;
      this.setting.chargeJson = row.chargeJson || {};
      var para = {
        rateId: row.rateId,
        jwt: window.localStorage.getItem("jwt")
      };
      console.log("fff");
      console.log(row);

      // reqshowRate(para).then(res => {
      //   if (res.code === 1) {
      //     this.setting.chargeJson = res.chargeJson;
      //   }
      // });
    },
    //费率测试请求
    rateTest(index, row) {
      this.testResult = false;
      this.test.testVisible = true;
      this.test.testObj = Object.assign({}, row);
    },
    changelSuanfa(val) {
      var rightd = document.getElementsByClassName("rightd")[0];
      if (val === "按24小时累计时收费") {
        this.setting.isOne = true;
        this.setting.isTwo = false;
      } else if (val === "按连续累计时收费") {
        this.setting.isOne = false;
        this.setting.isTwo = true;
      }
    },
    //设置费率保存请求
    settingRateSaves() {
      let para = {
        rateId: this.setting.leftobj.rateId,
        chargeJson: JSON.stringify(this.setting.chargeJson),
        freeParkTime: this.setting.oneForm.freeparkMin || "0",
        algorithmType: this.setting.leftobj.algorithmType || "1",
        chargeType: this.setting.leftobj.chargeType || "1",
        vehicleType: this.setting.leftobj.vehicleType || "0",
        discountType: this.setting.oneForm.discType || "1",
        discountValue: this.setting.oneForm.discValue || "0"
      };
      para.jwt = window.localStorage.getItem("jwt");
      reqSettingRate(para).then(res => {
        if (res.code === 1) {
          this.$message({
            message: "费率设置成功！",
            type: "success"
          });
        }
        this.setting.settingVisible = false;
        this.getParkingRate();
      });
    },
    callbackSelTenant() {
      for (var item in this.filters) {
        this.filters[item] = "";
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页${val}`);
      this.totals.currentPage = val;
      this.getParkingRate();
    },
    //计算费率计算费率
    calculationtariff() {
      var para = {
        rateId: this.test.testObj.rateId, //
        chargeType: this.test.testObj.chargeType, // 计费类型
        vehicleType: this.test.testObj.vehicleType,
        startTime: this.test.start_date,
        endTime: this.test.end_date,
        // sumStartDate: this.test.sumStartDate,
        // sumEndDate: this.test.sumEndDate,
        jwt: window.localStorage.getItem("jwt")
      };
      reqTestTariff(para).then(res => {
        //显示计算结果
        this.testResult = true;
        console.log(res);
        if (res.code === 1) {
          this.test.payableMoney = JSON.parse(res.receivablePrice);
          this.test.discountMoney = JSON.parse(res.discountPrice);
          this.test.accountAfterMoney = JSON.parse(res.paymentPrice);
        } else {
          console.log("请求错误！");
        }
      });
    },
    addChange(val) {
      console.log(`当前值${val}`);
      console.log("zlz");
    }
  }
};
</script>
<style>
.el-dialog__header {
  background-color: #eee;
}
.el-dialog__body {
  padding: 10px 20px;
}
/* 费率 */
.rateMain {
  height: 730px;
  position: relative;
}
.rateMain .leftd {
  position: absolute;
  width: 200px;
  left: 0;
  top: 0;
  border-right: 1px solid #ccc;
  padding-right: 20px;
  height: 730px;
}
.rateMain .leftd p {
  line-height: 40px;
}
.rateMain .rightd {
  width: 830px;
  position: absolute;
  right: 0;
  top: 0;
}
.rateMain .rightd .el-form-item {
  margin-bottom: 0px;
}
.rateMain .rightd .el-form-item .el-input {
  width: 150px;
  height: 20px;
}
.rateMain .rightd .one {
  font-size: 9px;
}
.rateMain .rightd .one .el-input {
  height: 30px;
}
.rateMain .rightd .bg-purple {
  padding-top: 10px;
  width: 110px;
}
.rateMain .rightd .one .footerBtn {
  border-top: 1px dashed #ccc;
  margin-top: 15px;
  padding-top: 15px;
}
.add .el-row {
  margin-bottom: 10px;
}
</style>