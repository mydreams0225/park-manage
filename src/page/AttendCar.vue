<template>
	<section>
     <div class="parent">
        <!-- 操作区 -->
       <div class="margin-tops">
         <el-button  type="danger" icon="el-icon-delete" size="medium">删除</el-button>
         <el-button  type="danger" icon="el-icon-delete" size="medium">删除查询到的记录</el-button>
         <el-button  icon="el-icon-circle-check-outline" size="medium">根据在场车辆数纠正空车位数</el-button>
         <div class="fr">
           <el-button  icon="el-icon-upload2" type="primary" size="medium" >批量导入</el-button>
           <el-button  icon="el-icon-upload" type="primary" size="medium">导出EXCEL报表</el-button>
         </div>
       </div>
       <!-- 查询区 -->
       <div class="margin-tops">
         <form class="form-inline" role="form" id="searchForm" name="searchForm" onsubmit="subSearchForm();return false;">
           <el-select v-model="v_park" filterable placeholder="所属停车场">
                    <el-option
                      v-for="item in park"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
           </el-select>
           <el-input   id="car_no" name="car_no" placeholder="车牌号">
                   <template slot="prepend">车牌号</template>   
           </el-input>
           <el-input   id="regist_no" name="regist_no" placeholder="注册号">
                   <template slot="prepend">注册号</template>   
           </el-input>
            <el-select v-model="v_price_type" filterable placeholder="计费类型">
                    <el-option
                      v-for="item in price_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
           </el-select>
           <el-select v-model="v_car_type" filterable placeholder="车类型">
                    <el-option
                      v-for="item in car_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
           </el-select>
           <div class="dates block">
                    <span class="demonstration">入场时间从</span>
                    <el-date-picker
                      v-model="start_value"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
                   <div class="dates block">
                    <span class="demonstration">到</span>
                    <el-date-picker
                      v-model="end_value"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
           </div>
           <el-select v-model="v_garage" filterable placeholder="所属车库">
                    <el-option
                      v-for="item in garage"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
           </el-select>
           <el-select v-model="v_isplate" filterable placeholder="是否有车牌">
                    <el-option
                      v-for="item in isplate"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
           </el-select>
           <el-input   id="client" name="client" placeholder="点击选择" readonly="readonly">
                  <template slot="prepend">所属车位池</template>   
           </el-input>
           <el-select v-model="v_plateRelia" filterable placeholder="车牌可信度">
                    <el-option
                      v-for="item in plateRelia"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
           </el-select>
           <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
           <el-button icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')" size="medium">清除</el-button>
         </form>
       </div>
       <!-- 数据展示区 -->
       <div> 
          <el-row >
             <el-col :span="6" v-for="(item ,index) in carlist" :key=index>
               <el-card  class="fatherImg">
                  <div><el-checkbox ></el-checkbox></div>
                  <div class="rf">
                    <a href="#" title="编辑" @click="handleEdit(index, item)"><i class="el-icon-edit"></i></a> 
                    <a href="#" title="删除" @click="handleDel(index, item)"><i class="el-icon-delete"></i></a>
                  </div>
                  <img :src="item.url" class="image" alt="拍照失败">
                  <div class="info">
                     <p class="l">{{item.car_no}}</p>
                     <p class="r">{{item.desc}}</p>
                  </div>
               </el-card>
             </el-col>
          </el-row>
       </div>
       <!-- 展示区end -->
      <!--  分页 -->
      <div >

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="12">
        </el-pagination>
      </div>
      <!-- 分页end -->
      <!--编辑界面-->
    <el-dialog title="纠正车牌号" v-model="editFormVisible" :close-on-click-modal="false" :visible="editFormVisible" >
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm" >
        <el-form-item label="车牌号" prop="name">
          <el-input v-model="editForm.car_no" auto-complete="off" ></el-input>
        </el-form-item>
        <!-- <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="editForm.addr"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
    
    </div>
	</section>
</template>

<script>
export default {
  methods: {
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //提交编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            para.birth =
              !para.birth || para.birth == ""
                ? ""
                : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            // editUser(para).then((res) => {
            //   this.editLoading = false;
            //   //NProgress.done();
            //   this.$message({
            //     message: '提交成功',
            //     type: 'success'
            //   });
            //   this.$refs['editForm'].resetFields();
            //   this.editFormVisible = false;
            //   this.getUsers();
            // });
          });
        }
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          // removeUser(para).then((res) => {
          //   this.listLoading = false;
          //   //NProgress.done();
          //   this.$message({
          //     message: '删除成功',
          //     type: 'success'
          //   });
          //   this.getUsers();
          // });
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    callbackSelTenant: function() {
      var aa = document.getElementsByTagName("input");
      console.log(aa);
      for (var i = 0; i < aa.length; i++) {
        if (aa[i].type == "text") {
          aa[i].value = "";
        }
      }
    }
  },
  data() {
    return {
      editFormRules: {
        name: [{ required: true, message: "请输入车牌号", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        name: "22"
      },
      editLoading: false,
      editFormVisible: false,
      editForm: "",
      carlist: [
        {
          url:
            "http://pic.people.com.cn/NMediaFile/2018/0619/MAIN201806191422000284134827157.jpg",
          car_no: "粤A9M33 临时车",
          desc: "2018--3-3 4：13:4停车·"
        },
        {
          url:
            "http://pic.people.com.cn/NMediaFile/2018/0619/MAIN201806191422000284134827157.jpg",
          car_no: "赣A8888 临时车",
          desc: "2018--3-3 4：13:4停车·"
        },
        {
          url:
            "http://pic.people.com.cn/NMediaFile/2018/0619/MAIN201806191422000284134827157.jpg",
          car_no: "赣F6666 临时车"
        }
      ],
      currentPage1: 1,
      checked: false,
      currentDate: new Date(),
      park: [
        {
          value: "",
          label: "所属停车场"
        },
        {
          value: "1",
          label: "停车场1"
        }
      ],
      v_park: "",
      // 计费类型
      v_price_type: "",
      price_type: [
        {
          value: "",
          label: "计费类型"
        },
        {
          value: "1",
          label: "月票车"
        }
      ],
      //车类型
      v_car_type: "",
      car_type: [
        {
          value: "",
          label: "车类型"
        },
        {
          value: "1",
          label: "小型车"
        }
      ],
      start_value: "",
      end_value: "",
      //车库
      v_garage: "",
      garage: [
        {
          value: "",
          label: "所属车库"
        },
        {
          value: "1",
          label: "所属车库1"
        }
      ],
      isplate: [
        {
          value: "",
          label: "是否有车牌"
        }
      ],
      v_isplate: "",
      v_plateRelia: "",
      plateRelia: [
        {
          value: "",
          label: "车牌可信度"
        }
      ]
    };
  }
};
</script>

<style scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.fr {
  float: right;
}

.el-input-group {
  width: 200px;
}
.el-select {
  width: 130px;
}

.form-inline {
  margin-top: 15px;
}
.dates {
  display: inline-block;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 12px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.el-col-6 {
  padding: 10px;
  position: relative;
}
.el-card__body .el-checkbox {
  position: absolute;
  top: 15px;
  left: 15px;
}
.rf i {
  position: absolute;
  top: 15px;
  right: 44px;
  border: 1px solid #428bca;
  background-color: #428bca;
  color: #fff;
  border-radius: 5px;
  padding: 3px;
}
.rf .el-icon-delete {
  position: absolute;
  top: 15px;
  right: 15px;
  border: 1px solid #d9534f;
  background-color: #d9534f;
}

.info {
  background-color: #000;
  opacity: 0.6;
  color: #fff;
  font-size: 12px;
  padding: 5px;
}
.info .r {
  position: absolute;
  bottom: 15px;
  right: 15px;
}
.el-card__body {
  padding: 0 !important;
}
</style>