<template>
    <section>
        <div class="parent">
            <!-- 操作区 -->
            <div class="margin-tops">
                <el-button type="primary" size="medium" @click="addbusiness"><i class="el-icon-plus"></i> 新增</el-button>
                <el-button type="denger" size="medium" @click="batchdelete"><i class="el-icon-delete"></i> 删除</el-button>

            </div>
            <!-- 查询区 -->
            <div class="margin-tops querys">
                <span>所属停车场</span>
                <el-select v-model="filters.park" >
                    <el-option
                        v-for="item in park"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                </el-select>
                <el-input placeholder="商户名称"  v-model="filters.bussinessName">
                     <template slot="prepend">商户名称</template>   
                </el-input>
                <el-input placeholder="门牌号"  v-model="filters.doorNumber">
                     <template slot="prepend">门牌号</template>   
                </el-input>
                <el-button type="primary" size="medium" @click="querybusiness"><i class="el-icon-search" ></i>查询</el-button>
                <el-button size="medium"><i class="el-icon-delete"></i> 清除</el-button>
            </div>
            <!-- 展示区 -->
            <div class="margin-tops showarea">
               <el-table
               :data="businessList"
               tool-tip-effect="dark"
               style="100%"
               border
               @selection-change="handleselectchange">
                   <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        type="index"
                        label="序号">
                    </el-table-column>
                    <el-table-column
                        prop="businessId"
                        label="商户ID"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="businessName"
                        label="商户名称">
                    </el-table-column>
                    <el-table-column
                        prop="doorNumber"
                        label="门牌号">
                    </el-table-column>
                     <el-table-column
                        prop="contacts"
                        label="联系人">
                    </el-table-column>
                     <el-table-column
                        prop="contactNumber"
                        label="联系电话">
                    </el-table-column>
                     <el-table-column
                        prop="isOpenLock"
                        label="是否开启加密锁">
                        <template slot-scope="scope">
                            <span style="color:red;"><i class="el-icon-error"></i></span>
                            <span style="color:green;"><i class="el-icon-success"></i></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="customDiscounts"
                        label="自定义折扣原因">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建时间">
                    </el-table-column>
                    <el-table-column
                        prop="businessOperation"
                        label="业务操作"
                        width="200px">
                        <template slot-scope="scope">
                                <a href="" >[查看商户账号]</a>
                                <a href="#" >[查看打折记录] </a>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="operation"
                        label="操作"
                        width="120px">
                        <template slot-scope="scopes">
                            <el-button 
                                type="primary"
                                icon="el-icon-edit" 
                                circle 
                                size="mini" 
                                @click="handleedit(scopes.$index, scopes.row)">
                            </el-button>
                            <el-button 
                                type="danger" 
                                icon="el-icon-delete" 
                                circle 
                                size="mini" 
                                @click="handledel(scopes.$index, scopes.row)">
                            </el-button>
                        </template>      
                    </el-table-column>
               </el-table>
            </div>
            <div>
                 <el-pagination
              
                    @current-change="handlecurrentchange"
                    :current-page.sync="totals.currentPage"
                    :page-size.sync="totals.pageSize"
                    layout="total, prev, pager, next"
                    :total.sync="totals.totalNum">
                 </el-pagination>
            </div>
            	<!-- 添加或修改 界面-->
         <el-dialog 
				  :title="save.titles"
				  :visible.sync="save.saveVisible"
				  width="40%"	>
				     <div>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <span style="color:red">*</span><span>停车场:</span>
                                <div>
                               <el-select v-model="save.obj.park" filterable >
                                <el-option
                                    v-for="item in park"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                                </el-select>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <span style="color:red">*</span><span>商户名称:</span>
                                <div><el-input placeholder="必填" v-model="save.obj.businessName"></el-input></div>
                            </el-col>
                        </el-row>
                         <el-row :gutter="20">
                            <el-col :span="12">
                                <span>门牌号：</span>
                                <div><el-input v-model="save.obj.doorNumber"></el-input></div>
                            </el-col>
                            <el-col :span="12">
                                <span>详细地址：</span>
                                <div><el-input v-model="save.obj.address"></el-input></div>
                            </el-col>
                        </el-row>
                         <el-row :gutter="20">
                            <el-col :span="12">
                                <span>联系人：</span>
                                <div><el-input v-model="save.obj.contacts"></el-input></div>
                            </el-col>
                            <el-col :span="12">
                                <span>联系人电话：</span>
                                <div><el-input v-model="save.obj.contactNumber"></el-input></div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <span style="color:red">*</span><span>是否开启加密锁：</span>
                                <div>
                               <el-select v-model="save.obj.isOpenLock" filterable >
                                <el-option
                                    v-for="item in isOpenLock"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                                </el-select></div>
                            </el-col>
                            <el-col :span="12">
                                <span>备注：</span>
                                <div><el-input v-model="save.obj.memo"></el-input></div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <span>自定义打折原因选项：(多个以“;”号隔开)</span>
                                <div><el-input v-model="save.obj.customDiscounts"></el-input></div>
                            </el-col>  
                        </el-row>
					 </div>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="save.saveVisible=false">取 消</el-button>
				    <el-button type="primary" @click="savebusiness">保 存</el-button>
				  </span>
				</el-dialog>
        </div>
    </section>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      // park:[],
      filters: {
        park: ""
      },
      isOpenLock:business.isOpenLock,
      businessList: [
        {
          businessId: "1",
          businessName: "shanhu",
          doorNumber: "111",
          contacts: "wo",
          contactNumber: "111",
          isOpenLock: "1",
          customDiscounts:"",//折扣原因
          createTime:"2017-3-3",


        }
      ],
      totals: {
        currentPage: 1,
        pageSize: 10,
        totalNum: 1
      },
      save: {
        saveVisible: false,
        titles: "",
        obj: {}
      }
    };
  },
  created() {
    var park = this.common.getParkList();

    this.park = park;
    console.log("333" + this.park);
  },
  methods: {
    handlecurrentchange(val) {
      this.totals.currentPage = val;
    },
    //添加商户信息
    addbusiness() {
        var obj=this.save.obj;
     
      this.save.saveVisible = true;
      this.save.titles = "添加商户";
      for (var item in obj) {
        obj[item] = "";
      }
    },
    //编辑商户信息
    handleedit(index,row) {
      this.save.saveVisible = true;
      this.save.titles = "编辑商户";
      this.save.obj = Object.assign({}, row);
    },
    //多选框选中
    handleselectchange() {},
    savebusiness() {},
    //查询
    querybusiness() {},
    //批量删除
    batchdelete() {}
  }
};
</script>
<style  scoped>
.showarea a {
  text-decoration: none;
  font-size: 9px;
}
</style>


