<template>
	<section>
	  <div class="parent">
	  	
	    <!-- 查询区 -->
		<div class="margin-tops">
			<el-select v-model="filters.v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	        </el-select>
            <el-select v-model="filters.v_lotState" filterable placeholder="车位是否有车">
	                    <el-option
	                      v-for="item in lotState"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	        </el-select>
            <el-select v-model="filters.v_placeId" filterable placeholder="所属楼层">
	                    <el-option
	                      v-for="item in placeId"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	        </el-select>
	        <el-input   id="area" name="area" placeholder="区位" v-model="filters.v_area" >
                     <template slot="prepend">区位</template>   
            </el-input>
            <el-input   id="parking_no" name="parking_no" placeholder="车位号" v-model="filters.v_parking_no">
                     <template slot="prepend">车位号</template>   
            </el-input>
            <el-input   id="plate_no" name="plate_no" placeholder="车牌号" v-model="filters.v_plate_no" >
                     <template slot="prepend">车牌号</template>   
            </el-input>
            <div class="dates block">
                <span class="demonstration">识别时间从</span>
                <el-date-picker
                  v-model="filters.start_datefrom"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
               <div class="dates block">
                <span class="demonstration">到</span>
                <el-date-picker
                  v-model="filters.start_dateto"
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
                      >
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
        <!-- <div>
		        <Paging v-bind:total="totals"></Paging>		        
		    </div> -->
        <div class="block">
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
      totals: {
        totalNum: 2,
        pageSize: 1,
        currentPage: 1
      },
      filters: {
        v_park: "",
        v_lotState: "",
        v_placeId: "",
        v_area: "",
        v_parking_no: "",
        v_plate_no: "",
        start_datefrom: "",
        start_dateto: ""
      },

      park: [{}],
      lotState: [{}],
      placeId: [{}],
      tableData: [],
     
    };
  },
  methods:{
      callbackSelTenant: function() {
      console.log(this.filters);
      for (var item in this.filters) {
       
          this.filters[item] = "";
        
      }
    },
    handleCurrentChange(val){
       console.log(`当前页: ${val}`);
       console.log('zzz')
    }

  }
};
</script>
<style scoped>
.dates {
  display: inline-block;
}
/*公共属性*/
.el-input-group {
  width: 200px;
}
.el-select {
  width: 130px;
}
/*公共属性*/
</style>