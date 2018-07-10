<template>
	<section>
	 <div class="parent">
    <template >
       <el-tabs :tab-position="tabPosition" style="margin-top:15px" type="border-card" >
        <el-tab-pane  label="新车登记注册">
          <!-- 读卡操作 -->
           <div class="margin-tops">
             <el-row :gutter="20">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                <span style="color:red">*</span>
                <span >所属停车场：</span>
                <template>
                  <el-select v-model="v_park" placeholder="请选择">
                    <el-option
                      v-for="item in park"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </div>
             </el-col>
              <el-col :span="6"><div class="grid-content bg-purple">
                <template>
                     <!-- `checked` 为 true 或 false -->
                  <el-checkbox v-model="read_card">开启读卡操作</el-checkbox>
                </template>
              </div>
            </el-col>
            </el-row>
          </div>
           
           <!-- 授权车库 -->
           <div class="newCar">
             <el-card class="box-card" >
              <div slot="header" class="clearfix" >
                <span >授权车库</span>
               
              </div>
              <div class="sq_body">
                <el-checkbox checked="checked">主车库</el-checkbox>
              </div>
            </el-card>
           </div>
          <div class="newCar carinfo">
             <el-card class="box-card" >
              <div slot="header" class="clearfix" >
                <span >录入车辆信息</span>
               
              </div>
              <div >
               <el-row :gutter="24">
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                     <span style="color:red;">*</span>
                     <span>车牌号码：</span>
                     <el-input  placeholder="请输入内容" ></el-input>
                  </div>
                </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span style="color:red;">*</span>
                     <span>注册号</span>
                     <el-checkbox checked="checked" style="font-size:12px;">与车牌号一样</el-checkbox>
                     <el-input :disabled="true" ></el-input>
                  </div>
                </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                      <span style="color:red;">*</span>
                     <span>计费类型：</span>
                     <el-select v-model="v_price_type" placeholder="请选择">
                      <el-option
                        v-for="item in price_type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                      <span style="color:red;">*</span>
                     <span>车类型：</span>
                     <el-select v-model="v_car_type" placeholder="请选择">
                      <el-option
                        v-for="item in car_type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                    <span style="color:red;">*</span>
                     <span>缴费规则分组：</span>
                     <el-select v-model="v_pay_rule_group" placeholder="请选择">
                      <el-option
                        v-for="item in pay_rule_group"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div >
                   <el-row :gutter="24">
                      <el-col :span="4">
                        <div class="grid-content bg-purple">
                         <span>容错车牌</span>
                         <el-input placeholder="请输入内容" ></el-input>
                       </div>
                    </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple">
                       
                         <span>车牌颜色</span>
                         
                          <el-select v-model="v_plate_color" placeholder="请选择">
                          <el-option
                            v-for="item in plate_color"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple">
                         <span>车位类型：</span>
                         <el-select v-model="v_seat_type" placeholder="请选择">
                          <el-option
                            v-for="item in seat_type"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        </div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple">
                        <span style="color:red;">*</span>
                         <span>车辆分组：</span>
                         <el-select v-model="v_car_group" placeholder="请选择">
                          <el-option
                            v-for="item in car_group"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        </div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple">
                        <span style="color:red;">*</span>
                         <span>车位号：</span>
                         <el-input  ></el-input>
                        </div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple">
                        <span style="color:red;">*</span>
                         <span>编号</span>
                         <el-input  ></el-input>
                        </div>
                      </el-col>
                    </el-row>
              </div>
               <div class="newcardate">
                    <el-row :gutter="24">
                          <el-col :span="12">
                            <div class="grid-content bg-purple">
                             <span>有效期开始时间</span>
                            <el-date-picker
                                v-model="start_date"
                                type="date"
                                placeholder="">
                              </el-date-picker>
                           </div>
                        </el-col>
                        <el-col :span="12">
                          <div class="grid-content bg-purple">
                         
                           <span>有效期结束时间</span>
                           
                           <el-date-picker
                                v-model="end_date"
                                type="date"
                                placeholder="">
                              </el-date-picker>
                        </div>
                      </el-col>
                     
                    </el-row>
               </div>
               <div >
                    <el-row :gutter="24">
                          <el-col :span="8">
                            <div class="grid-content bg-purple">
                             <span>车品牌：</span>
                             <el-input  ></el-input>
                           </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content bg-purple">
                         
                           <span>车颜色：</span>
                           <el-input  ></el-input>
                           
                        </div>
                      </el-col>
                     <el-col :span="8">
                          <div class="grid-content bg-purple">
                         
                           <span>收费：</span>
                           <el-input  >￥1</el-input>
                           
                        </div>
                      </el-col>
                    </el-row>
               </div>
               <div class="memo">
                    <el-row :gutter="24">
                          <el-col :span="24">
                            <div class="grid-content bg-purple">
                             <span>备注：</span>
                             <el-input placeholder="选填" ></el-input>
                           </div>
                        </el-col>
                        
                    </el-row>
               </div>
               <div class="memo sshy">
                    <el-row :gutter="24">
                          <el-col :span="12">
                            <div class="grid-content bg-purple">
                             <span>所属行业：（点击选择，x清除）[点击添加业主信息]</span>
                             <el-input placeholder="点击选择" readonly="readonly" ></el-input>
                           </div>
                        </el-col>
                         <el-col :span="12">
                            <div class="grid-content bg-purple">
                             <span>所属车位池：（点击选择，x清除）</span>
                             <el-input placeholder="点击选择" readonly="readonly" ></el-input>
                           </div>
                        </el-col>
                    </el-row>
               </div>
               <div class="submit">
                    <el-button type="primary">保存</el-button> 
               </div>
            </el-card>
           </div>
        </el-tab-pane>
        <el-tab-pane label="批量导入">
          <!-- 所属停车场 -->
           <div class="font" style="margin-top:15px">
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                  <span style="color:red">*</span>
                  <span >所属停车场：</span>
                  <template>
                    <el-select v-model="v_tab2_park" placeholder="请选择">
                      <el-option
                        v-for="item in tab2_park"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </div>
               </el-col>
            </el-row>
           </div>
           <div class="font upload" style="margin-top:30px">
            <input type="file" @change="getFile($event)">
             <a href=""><strong><i class="el-icon-document"></i> 选择批量导入Excel文件...</strong></a>
             <div style="margin-top:15px">
               <el-button size="small" type="primary" @click="submitForm($event)"><i class="el-icon-upload2"></i>上传并保存</el-button>
               <el-button size="small" type="primary"><i class="el-icon-download"></i>下载模板</el-button>
             </div>
           </div>
        </el-tab-pane>
      
      </el-tabs>
    </template>
   </div>
	</section>
</template>

<script>
import $axios from 'axios';
import { postFile } from '../../api/api';
	export default {
    data() {
      return {
        end_date:'',
        start_date:'',
        tabPosition: 'top',
        v_price_type:'',
        price_type:[{}],
        car_type:[{}],
        v_car_type:'',
        v_pay_rule_group:'',
        pay_rule_group:[{}],
        v_park:'',
        park:[{}],
        read_card:false,
        v_plate_color:'',
        plate_color:[{}],
        v_seat_type:'',
        seat_type:[{}],
        v_car_group:'',
        car_group:[{}],
        v_tab2_park:'',
        tab2_park:[{value: '选项1',
                  label: '停车场管理系统（网页版）'}],
      };
    },
    methods:{
      getFile(event) {
            this.file = event.target.files[0];
            console.log(this.file);
          },
      submitForm(event) {
            event.preventDefault();
             // let formData = new FormData();
            let formData=new URLSearchParams();
            formData.append('name', this.tab2_park[0].label);
            
    
            formData.append('file', this.file);
 
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
    console.log(formData);
    postFile(formData).then(data => {
            //this.$axios.post('', formData, config).then(function (res) {
              console.log(res)
              if (res.status === 200) {
                /*这里做处理*/
              }
            })
            // getParklist(para).then((res) => {
            //       // this.$axios.get('../../static/json/park.json',{ para: para }).then((res) => {
            //          //本地写法
            //          this.parkList = (eval(res)).data;
            //         this.totalnum=(eval(res)).total;
            //         //请求后端写法
            //            // this.parkList = res;
            //         //this.totalnum=(eval(res)).total;
            //         console.log("fff"+res)
                    
            //        this.listLoading = false;
            //         //NProgress.done();
            // });
          }
    
   }
	}
</script>

<style scoped>
.sq_body{
  height:60px;
  line-height:60px;
  padding-left:20px;
}
.carinfo{
  font-size:12px;
}
.memo .el-input{
  width:100%;

}
.font{
  font-size:12px;
}



</style>