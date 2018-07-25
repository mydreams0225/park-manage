<template>
	<section>
		<div class="parent">
		
			<div class="margin-tops querys" >
				      <el-select v-model="filters.v_park" filterable placeholder="所属停车场">
	                    <el-option
	                      v-for="item in park"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	            </el-select>
	             <el-select v-model="filters.v_operateType" filterable placeholder="操作类型">
	                    <el-option
	                      v-for="item in operateType"
	                      :key="item.value"
	                      :label="item.label"
	                      :value="item.value">
	                    </el-option>
	             </el-select>
	            <el-input v-model="filters.v_modiBefore"  id="dutyMan" name="dutyMan" placeholder="修改前车牌" >
                     <template slot="prepend">修改前车牌</template>   
                </el-input>
                <el-input v-model="filters.v_modiAfter"  id="dutyMan" name="dutyMan" placeholder="修改后车牌" >
                     <template slot="prepend">修改后车牌</template>   
                </el-input>
	            <div class="dates block">
		                    <span class="demonstration">操作时间从</span>
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
                <el-input v-model="filters.dutyMan"  id="dutyMan" name="dutyMan" placeholder="值班员"  >
                     <template slot="prepend">值班员</template>   
                </el-input>
	             <el-button type="primary" icon="el-icon-search" size="medium" @click="getPlateModify">查询</el-button>
                 <el-button size="medium" icon="el-icon-delete" v-on:click="callbackSelTenant(null,'')">清除</el-button>
                 <div class="rights"> 
                 	<el-button type="success" size="medium"><strong><i class="el-icon-upload"></i></strong > 导出EXCEL报表</el-button>	
                 </div>
			</div>
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
                        prop="operateType"
                        label="操作类型"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="modiBefore"
                        label="修改前车牌号">
                      </el-table-column>
                      <el-table-column
                        prop="modiAfter"
                        label="修改后车牌">
                      </el-table-column>               
                      <el-table-column
                        prop="operate_time"
                        label="操作时间">
                      </el-table-column>
                      <el-table-column
                        prop="dutyMan"
                        label="值班员">
                      </el-table-column>

                      
                      <!-- <el-table-column          
                        label="操作"
                        width="250px">
                         <template slot-scope="scope">    
							<el-button type="primary" icon="el-icon-document" circle size="mini"></el-button>                   
                        </template>
                      </el-table-column> -->
                    </el-table>
                 </template>
			</div>
			<div>
		        <!-- <Paging v-bind:total="totals"></Paging>		         -->
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
import {reqPlateModify } from '@/api/recordQuery'
export default {
  data() {
    return {
      totals: {
        totalNum: 1,
        pageSize: 1,
        currentPage: 1
      },
      filters: {
        v_park: "",
        v_operateType: "",
        dutyMan: "",
        start_datefrom: "",
        start_dateto: ""
      },
      v_operateType: [],
      park: [{}],
      operateType: [],

      tableData: [{}]
    };
  },
  mounted(){
    this.getPlateModify();
  },
  methods: {
    getPlateModify(){
      let para ={

      }
      reqPlateModify(para).then(res=>{
          if(res.code===1){
            this.totals.totalNum=res.total;
            this.tableData=res.list;
          }
      })
    },
    callbackSelTenant() {
      for (var item in this.filters) {
        this.filters[item] = "";
      }
    },
    handleCurrentChange() {}
  }
};
</script>
<style scoped>
/*公共属性*/
.el-input-group {
  width: 200px;
}
.el-select {
  width: 130px;
}
/*公共属性*/
.dates {
  display: inline-block;
}
.querys {
  position: relative;
}
.rights {
  position: absolute;
  top: 45px;
  right: 0;
}
</style>