<template>
	<section>
	  <div class="parent">
	  	
	    <!-- 查询区 -->
		<div class="margin-tops">
			<el-select v-model="v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	        </el-select>
            <el-select v-model="v_lotState" filterable placeholder="车位是否有车">
	                    <el-option
	                      v-for="item in lotState"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	        </el-select>
            <el-select v-model="v_placeId" filterable placeholder="所属楼层">
	                    <el-option
	                      v-for="item in placeId"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	        </el-select>
	        <el-input   id="area" name="area" placeholder="区位" >
                     <template slot="prepend">区位</template>   
            </el-input>
            <el-input   id="parking_no" name="parking_no" placeholder="车位号" >
                     <template slot="prepend">车位号</template>   
            </el-input>
            <el-input   id="plate_no" name="plate_no" placeholder="车牌号" >
                     <template slot="prepend">车牌号</template>   
            </el-input>
            <div class="dates block">
                <span class="demonstration">识别时间从</span>
                <el-date-picker
                  v-model="start_date1"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
               <div class="dates block">
                <span class="demonstration">到</span>
                <el-date-picker
                  v-model="start_date2"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>

            </div>
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
                      @selection-change="">
                      <el-table-column
                        prop="seri_no"
                        label="序号"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="floor_area"
                        label="楼层区域"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="parking_no"
                        label="车位号">
                      </el-table-column>
                      <el-table-column
                        prop="plate_no"
                        label="车牌号">
                      </el-table-column>               
                      <el-table-column
                        prop="bindplate_no"
                        label="绑定的车牌号">
                      </el-table-column>
                      <el-table-column
                        prop="bindPhone"
                        label="绑定的手机号">
                      </el-table-column>
                      <el-table-column
                        prop="recognition_time"
                        label="识别时间">
                      </el-table-column>
                      <el-table-column          
                        label="操作"
                        width="250px">
                         <template slot-scope="scope">                            
                        </template>
                      </el-table-column>
                    </el-table>
                 </template>
        </div>
        <!-- 分页 -->
        <div>
		        <Paging v-bind:total="totals"></Paging>		        
		    </div>
	  </div>
	</section>
</template>
<script>
	export default{
       data(){
       	 return{
       	 	 v_park:'',
        park:'',
        v_lotState:'',
        lotState:[{}],
        v_placeId:'',
        placeId:[{}],
        start_date1:'',
        start_date2:'',
        tableData:[],
         totals:{
               	  totalnum:1,
               	  pagesize:1,
               	  currentPage1:1
               },

       	 }
       }
	}
</script>
<style scoped>
 .dates{
   display:inline-block;
 }
  /*公共属性*/
     .el-input-group{
        width:200px;
      }
	  .el-select{
	    width:130px;
	  }
  /*公共属性*/
</style>