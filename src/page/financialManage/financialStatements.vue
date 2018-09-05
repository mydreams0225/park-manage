<template>
    <section>
        <div class="parent">
            <div class="margin-tops">
               <el-row>
                    <el-col :span="6" v-for="(o, index) in list" :key="index" :offset="index > 0 ? 2 : 0">
                        <el-card :body-style="{ padding: '0px' }" class="card">
                        <!-- <img src="~examples/assets/images/hamburger.png" class="image"> -->
                             <el-row >
                                 <el-col :span="6">
                                     <div class="logos"><span class="el-icon-sold-out"></span></div>
                                     
                                 </el-col>
                                 <el-col :span="18">
                                     <div class="datas">
                                         <div class="mount">{{o.mount}}</div>
                                          <div class="name">{{o.name}}</div>
                                          
                                     </div>
                                 </el-col>
                             </el-row>
                             <el-row>
                               <div class="detail">
                                  <el-col :span="12">
                                    <label for="">View Detail</label>
                                     
                                 </el-col >
                                 <el-col :span="12" class="to">
                                   <span  class="el-icon-back"></span>
                                 </el-col>
                               </div>
                             </el-row>
                        </el-card>
                    </el-col>
                 </el-row>
            </div>
            <div class="margin-tops">
                <div class="showTitle">
                    <el-row>
                        <el-col :span="6"> 
                            <h5>收益产出详情</h5>
                        </el-col>
                        <el-col class="showDate" :span="18">
                            <span >时间：</span>
                            <el-button type="primary" size="mini">7日</el-button>
                            <el-button type="primary" size="mini">10日</el-button>
                            <el-button type="primary" size="mini">15日</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div>
                   
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data(){
        return{
           list:[{mount:"1",name:"广告位"},{mount:"0元·",name:"今日收益"}]
        }
    },

}
</script>
<style>
.card{
    border:1px solid #ccc;
}
.logos{
    display: inline-block;
    padding:4px;
    margin:10px;
    font-size: 4em;
    /* height: 60px; */
    color:rgba(0,0,0,0.8)
}
.datas{
    box-sizing: border-box;
    margin:10px;
    padding:4px;
    font-size: 26px;
    text-align: right;
    vertical-align: middle;
     /* height: 60px; */
     color:rgba(0,0,0,0.8)
}
.datas .mount{
    margin-top:10px;
}
.datas .name{
    font-size: 16px;
}
.card .detail >div{
     padding: 10px 15px;
    background-color: #f5f5f5;
    border-top: 1px solid #ddd;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px; 
}
.card .detail label{
    font-size: 14px !important
}
.card .detail .to{
    text-align: right;
}
.showTitle{
    padding:10px;
    background: #eee;
    box-shadow: 2px 2px 3px #888888;
}
.showDate{
    text-align: right;
}
.showDate span{
    font-size: 14px;
}

  
</style>


