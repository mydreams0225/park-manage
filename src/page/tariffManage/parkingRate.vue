<template>
	<section>
	    <div class="parent">
	    	<div class="margin-tops">
	    		<el-button @click="add.addVisible=true" type="primary" size="medium"><i class="el-icon-plus" ></i>新增</el-button>
	    		<el-button type="danger" size="medium"><i class="el-icon-delete"></i>删除</el-button>
	    	</div>
				 <!-- 添加 -->
         <el-dialog 
				  title="添加费率"
				  :visible.sync="add.addVisible"
				  width="30%"
					@change="addChange">
				   <div class="add">
						  <el-row :gutter="24">
		              <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span style="color:red">*</span>
		                <span >选择车库：</span>
		              </div>
		             </el-col>
							   <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span style="color:red">*</span>
		                <span >计费类型：</span>
		              </div>
		             </el-col>		              
		          </el-row>
								<el-row :gutter="24">
		              <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <el-select v-model="add.v_park" filterable  >
                      <el-option
                        v-for="item in add.park"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>	        
		              </div>
		             </el-col>	
								 <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <el-select v-model="add.v_feetype" filterable  >
                      <el-option
                        v-for="item in add.feetype"
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
		                <div class="grid-content bg-purple">
		                <span style="color:red">*</span>
		                <span >车类型：</span>
		              </div>
		             </el-col>
							   <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <span style="color:red">*</span>
		                <span >收费类型：</span>
		              </div>
		             </el-col>		              
		          </el-row>
							<el-row :gutter="24">
		              <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <el-select v-model="add.v_carType" filterable  >
                      <el-option
                        v-for="item in add.carType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>	        
		              </div>
		             </el-col>	
								 <el-col :span="11">
		                <div class="grid-content bg-purple">
		                <el-select v-model="add.v_collectFee" filterable  >
                      <el-option
                        v-for="item in add.collectFee"
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
				    <el-button @click="add.addVisible = false">取 消</el-button>
				    <el-button type="primary" @click="add.addVisible = false">保 存</el-button>
				  </span>
				</el-dialog>
	    	<div class="margin-tops">
	    		<el-select v-model="filters.v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
		        </el-select>
		        <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
	            <el-button  size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
	    	</div>
	         <!-- 展示区 -->
	        <div class="margin-tops">
				 <template>
	                <el-table
	                  :data="tableData"
	                  border
	                  style="width: 100% ;"
	                  >
	                  <el-table-column
		                  type="selection"
		                  width="55">
	                  </el-table-column>
	                  <el-table-column
	                    prop="seri_no"
	                    label="序号"
	                    >
	                  </el-table-column>
	                  <el-table-column
	                    prop="garage_name"
	                    label="车库"
	                    >
	                  </el-table-column>
	                  <el-table-column
	                    prop="fee_type"
	                    label="计费类型">
	                  </el-table-column>
	                  <el-table-column
	                    prop="car_type"
	                    label="车类型">
	                  </el-table-column>               
	                  <el-table-column
	                    prop="charge_type"
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
													<el-button   size="mini"> <span>$</span> 设置费率</el-button>
													</template>
	                  </el-table-column>

	                  <el-table-column
	                   
	                    label="操作"
	                    width="130px">
	                     <template slot-scope="scope">
	                        <el-button type="primary" icon="el-icon-edit" circle size="mini" ></el-button>
                          <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
	                    </template>
	                  </el-table-column>
	                </el-table>
	               </template>
			</div>
			<!-- 设置费率 dialog界面-->
         <el-dialog 
				  title="设置费率"
				  :visible.sync="setting.settingVisible" width="1100px">
					<div class="rateMain">
           <div class="leftd">
						 <p><strong>切换收费算法：</strong></p>
						 <el-select v-model="setting.v_selSuanfa" placeholder="请选择" @change="changelSuanfa">
								<el-option
									v-for="item in setting.selSuanfa"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
						 </el-select>
						  <p><strong>当前车库：</strong></p>
							<label >{{setting.leftobj.garage_name}}</label>
							 <p><strong>当前计费类型：</strong></p>
							 <label >{{setting.leftobj.fee_type}}</label>
							  <p><strong>当前车类型：</strong></p>
								 <label >{{setting.leftobj.car_type}}</label>
					 </div>
					 <div class="rightd">
              <div v-show="setting.isOne">
								 <div class="one">
									 <el-form ref="form" :model="setting.oneForm" label-width="180px">
										 <el-form-item label="免费停车时间(分钟)：">
											<el-input v-model="setting.oneForm.freeparkMin"></el-input>
										</el-form-item>
										<el-form-item label="折扣类型：">
											<el-select v-model="setting.oneForm.disc_type" filterable >
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
		                </el-select>
										</el-form-item>
										 <el-form-item label="折扣值：">
											<el-input v-model="setting.oneForm.disc_value"></el-input>
										</el-form-item>
									 </el-form>
                   <el-tabs >
												<el-tab-pane label="按小时收费" >
                            <el-row :gutter="20" >
															<el-col :span="6"><div class="grid-content bg-purple">0~1小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div class="grid-content bg-purple">12~13小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div class="grid-content bg-purple">1~2小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div class="grid-content bg-purple">13~14小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div class="grid-content bg-purple">2~3小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div class="grid-content bg-purple">14~15小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														
														<el-row :gutter="20" >
															<el-col :span="6"><div class="grid-content bg-purple">3~4小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div class="grid-content bg-purple">15~16小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div class="grid-content bg-purple">4~5小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div class="grid-content bg-purple">16~17小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div class="grid-content bg-purple">5~6小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div class="grid-content bg-purple">17~18小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div class="grid-content bg-purple">6~7小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div class="grid-content bg-purple">18~19小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div class="grid-content bg-purple">7~8小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div class="grid-content bg-purple">19~20小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div class="grid-content bg-purple">8~9小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div class="grid-content bg-purple">20~21小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div class="grid-content bg-purple">9~10小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div class="grid-content bg-purple">21~22小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div class="grid-content bg-purple">10~11小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div class="grid-content bg-purple">22~23小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="6"><div class="grid-content bg-purple">11~12小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="6"><div class="grid-content bg-purple">23~24小时收费：</div></el-col>
															<el-col :span="6"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
												</el-tab-pane>
												
												<el-tab-pane label="按半小时收费">
                            <el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">0~0.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">6~6.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
																<el-col :span="3"><div class="grid-content bg-purple">12~12.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">18~18.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														 <el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">0.5~1小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">6.5~7小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
																<el-col :span="3"><div class="grid-content bg-purple">12.5~13小时收费</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">18.5~19小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">1~1.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">7~7.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
																<el-col :span="3"><div class="grid-content bg-purple">13~13.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">19~19.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>

														 <el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">1.5~2小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">7.5~8小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
																<el-col :span="3"><div class="grid-content bg-purple">13.5~14小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">19.5~20小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														 <el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">2~2.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">8~8.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
																<el-col :span="3"><div class="grid-content bg-purple">14~14.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">20~20.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">2.5~3小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">8.5~9小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
																<el-col :span="3"><div class="grid-content bg-purple">14.5~15小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">20.5~21小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>

														 <el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">3~3.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">9~9.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
																<el-col :span="3"><div class="grid-content bg-purple">15~15.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">21~21.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														 <el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">3.5~4小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">9.5~10小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
																<el-col :span="3"><div class="grid-content bg-purple">15.5~16小时收费</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">21.5~22小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">4~4.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">10~10.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
																<el-col :span="3"><div class="grid-content bg-purple">16~16.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">22~22.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>

														<el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">4.5~5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">10.5~11小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
																<el-col :span="3"><div class="grid-content bg-purple">16.5~17小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">22.5~23小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														 <el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">5~5.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">11~11.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
																<el-col :span="3"><div class="grid-content bg-purple">17~17.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">23~23.5小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
														<el-row :gutter="20" >
															<el-col :span="3"><div class="bg-purple">5.5~6小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">11.5~12小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
																<el-col :span="3"><div class="grid-content bg-purple">17.5~18小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
															<el-col :span="3"><div class="grid-content bg-purple">23.5~24小时收费：</div></el-col>
															<el-col :span="3"><div class="grid-content "><el-input ></el-input></div></el-col>
														</el-row>
												</el-tab-pane>
												
										</el-tabs>
										<div class="footerBtn">
                            <el-button @click="add.addVisible=true" type="primary" size="medium"><i class="el-icon-plus" ></i>新增</el-button>
	    	                  	<el-button  size="medium"><i class="el-icon-delete"></i>取消</el-button>
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
			<div>
         <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="totals.currentPage"
              :page-size.sync="totals.pageSize"
              layout="total, prev, pager, next"
              :total.sync="totals.totalNum">
        </el-pagination>

			</div>
			
	    </div>
	</section>
</template>
<script>
export default {
  data() {
    return {
      add: {
        addVisible: false,
        v_park: "",
        park: "",
        v_feetype: "",
        feetype: "",
        v_carType: "",
        carType: "",
        v_collectFee: "",
        collectFee: ""
      },
      setting: {
        settingVisible: false,
        v_selSuanfa: "",
        isOne: true,
        isTwo: false,
        selSuanfa: [
          { value: "按24小时累计时收费", label: "按24小时累计时收费" },
          { value: "按连续累计时收费", label: "按连续累计时收费" }
        ],
        leftobj: {
          garage_name: "",
          fee_type: "",
          car_type: ""
				},
				oneForm:{
					name:"",
					freeparkMin:"",
					disc_type:"",
					disc_value:""
				}
      },
      tableData: [
        {
          garage_name: "1",
          fee_type: "3",
          car_type: "car"
        }
      ],
      filters: {
        v_park: ""
      },
      park: [{}],
      totals: {
        totalNum: 1,
        pageSize: 1,
        currentPage: 1
      }
    };
  },
  methods: {
    handleSetting(index, row) {
      this.setting.settingVisible = true;
      this.setting.leftobj = Object.assign({}, row);
    },

    changelSuanfa(val) {
      alert(val);
      var rightd = document.getElementsByClassName("rightd")[0];
      if (val === "按24小时累计时收费") {
        this.setting.isOne = true;
        this.setting.isTwo = false;
      } else if (val === "按连续累计时收费") {
        this.setting.isOne = false;
        this.setting.isTwo = true;
      }
    },
    callbackSelTenant() {
      for (var item in this.filters) {
        this.filters[item] = "";
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页${val}`);
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

.rateMain .rightd .el-form-item{
	margin-bottom: 0px;
}
 .rateMain .rightd .el-form-item .el-input{
	 width: 150px;
	 height: 20px;

	
 }
 .rateMain .rightd .one{
	 font-size: 9px;

 }
  .rateMain .rightd .one .el-input{
		height: 30px;
	}
  .rateMain .rightd  .bg-purple{
		 padding-top: 10px;
		 width: 110px;
	}
	   .rateMain .rightd .one  .footerBtn{
			 border-top:1px dashed #ccc;
			 margin-top:15px;
			 padding-top: 15px;
		 }
</style>