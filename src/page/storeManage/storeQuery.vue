<template>
    <section>
       <div class="parent">
           <div class="margin-tops">
               <el-button type="success" size="medium" class="el-icon-plus" @click="openStore">新增门店</el-button>
               <query :area="areas" @querys="queryStore"></query>
           </div>
            <!-- 展示区 -->
           <div class="margin-tops">
               <el-table
                   v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :data="storeData"
                    height="250"
                    border
                    style="width: 100%">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                    prop="storeId"
                    label="门店编号"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="storeName"
                    label="门店名称"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="storeAddress"
                    label="门店地址">
                    </el-table-column>
                    <el-table-column
                    prop="storeDetailAddress"
                    label="详细地址">
                    </el-table-column>
                    <el-table-column
                    prop="contacts"
                    label="联系人">
                    </el-table-column>
                    <el-table-column
                    prop="mobilePhone"
                    label="联系人手机">
                    </el-table-column>
                     <el-table-column
                    prop="email"
                    label="邮箱">
                    </el-table-column>
                    <el-table-column
                    prop="abstracts"

                    label="简介">
                    </el-table-column>
                    <el-table-column
                    prop="memo"
                    label="备注">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="240">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="primary" size="mini" class="el-icon-edit"></el-button>
                                <el-button
                                @click.native.prevent="deleteRow(scope.$index, scope.row.storeId)"
                                type="danger"
                                class="el-icon-error"
                                size="mini"
                                >
                                </el-button>
                                <el-button @click="receiptCode(scope.row.url)" size="mini">收款码</el-button>
                            </template>
                     </el-table-column>
                </el-table>
           </div>
           <div class="margin-tops">
               <paging :total="totals" @handleCurrentChange="handleCurrentChanges"> </paging>
           </div>
           <storeDialog :dialog="dialog" @submit="submits"></storeDialog> 
           <el-dialog
            :visible.sync="receiptDialog.dialogVisible"
            width="800px">
             <div class="imgBox">
               <img :src="receiptDialog.url" alt="">
             </div>
             
           </el-dialog>
           <div style="display:none" id="allmap"></div>
       </div>
    </section>
</template>
<script>
import query from "@/components/query";
import {
  reqStore,
  reqRemoveStore,
  reqEditStore,
  reqAddStore
} from "@/api/storeManage";
import paging from "@/components/paging";
import storeDialog from "@/components/storeDialog";
export default {
  data() {
    return {
      areas: {
        name: "门店名称",
        code: "门店编码"
      },
      filters: {
        names: "",
        codes: ""
      },
      totals: {
        totalNum: 0,
        pageSize: 10,
        currentPage: 1
      },
      storeData: [
        {
          storeName: "fdff",
          storeAddress: "item.storeAddress",
          storeDetailAddress: "item.shopaddress",
          contacts: "item.contacts",
          mobilePhone: "item.mobphonenumber",
          contactsEmail: "item.contactsEmail",
          fixedPhone: "item.phone", //电话号码
          gpsLongitude: "item.gpsLongitude", // 经度
          gpsLatitude: "item.gpsLatitude", // 纬度
          abstracts: "item.shopinfo",
          email: "item.email",
          memo: "item.remark",
          area: ["110000", "110100", "110101"],
          url:
            "http://img.zcool.cn/community/019c2958a2b760a801219c77a9d27f.jpg",
          storeId: "1"
        }
      ],
      loading: false,
      dialog: {
        title: "",
        dialogVisible: false,
        loading: false,
        storeData: {
          storeId: "",
          storeName: "",
          storeAddress: "",
          storeDetailAddress: "",
          contacts: "",
          contactsPhone: "",
          contactsEmail: "",
          abstracts: "",
          memo: ""
        }
      },
      receiptDialog: {
        dialogVisible: false,
        url: ""
      },
      areaCache: {} //  缓存
    };
  },
  mounted() {
    this.queryStore();
  },
  methods: {
    //地区转换
    findAreaName(res, str) {
      if (this.areaCache[str]) return this.areaCache[str];
      for (var i = 0, len = res.length; i < len; i++) {
        if (str === res[i]["value"]) {
          return res[i]["label"];
        } else if (res[i]["children"]) {
          var temp = this.findAreaName(res[i]["children"], str);
          if (temp) {
            this.areaCache[str] = temp;
            return temp;
          }
        }
      }
    },
    // ready: function() {
     
    //   // 百度地图API功能
    //   let map = new BMap.Map("allmap"); // 创建Map实例
    //   map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
    //   //添加地图类型控件
    //   map.addControl(
    //     new BMap.MapTypeControl({
    //       mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
    //     })
    //   );
    //   map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
    //   map.enableScrollWheelZoom(true);
      
    // },
    //查询门店
    queryStore(name, code) {
      this.loading = true;
      this.filters.names = name;
      this.filters.codes = code;
      let para = {
        shopname: this.filters.names || "",
        shopno: this.filters.codes || "",
        currentPage: this.totals.currentPage,
        pageSize: this.totals.pageSize,
        token: window.localStorage.getItem("token")
      };
      reqStore(para).then(res => {
       
        var _this=this;
        console.log(res);
        if (res.status === 200) {
          this.storeData = [];
          var list = res.data.shopList; //返回的list集合
          list.forEach(item => {
            let areas = [];
            // 省市县
            areas.push(item.shoppro, item.shopcity, item.shoparea);
            var ssstoreAddress = "";
            if (areas) {
              let pro = _this.findAreaName( configs.options,areas[0]);
              let city = _this.findAreaName( configs.options,areas[1]);
              let qu = _this.findAreaName( configs.options,areas[2]);
              ssstoreAddress = pro + "" + city + qu;
            }
            var temp = {
              storeId: item.shopno,
              storeName: item.shopname,
              storeAddress: ssstoreAddress,
              storeDetailAddress: item.shopaddress,
              contacts: item.contacts,
              mobilePhone: item.mobphonenumber,
              contactsEmail: item.contactsEmail,
              fixedPhone: item.phone,
              gpsLongitude: item.gpsLongitude, // 经度
              gpsLatitude: item.gpsLatitude, // 纬度
              abstracts: item.shopinfo,
              email: item.email,
              url: item.qrcodepath, // 二维码地址
              memo: item.remark,
              area: areas
            };
            this.storeData.push(temp);
          });
          this.totals.totalNum = res.data.totalNum; //总条数
        } else {
          console.log("error");
        }
        this.loading = false;
      });
    },
    //打开门店添加页面
    openStore() {
      // this.ready();
      this.dialog.dialogVisible = true;
      this.dialog.title = "添加门店";
      //   this.dialog.sellersName = "";
      this.dialog.storeData = {};
      
    },
    //改变当前页数
    handleCurrentChanges(currentPage, pageSize) {
      this.totals.currentPage = currentPage;
      this.totals.pageSize = pageSize;
      this.queryStore(this.filters.names, this.filters.codes);
    },
    //编辑信息查看
    handleClick(row) {
       debugger
      this.dialog;
      this.dialog.dialogVisible = true;
      this.dialog.title = "编辑门店信息";
      this.dialog.storeData = row;
      console.log("编辑");
      console.log(this.dialog.storeData);
      //   this.dialog.sellersName = row.sellersName;
    },
    //单行删除
    deleteRow(index, rowId) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          let para = {
            shopno: rowId, //门店编号
            token: window.localStorage.getItem("token")
          };
          reqRemoveStore(para).then(res => {
            if (res.status === 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
            }
            this.queryStore(this.filters.names, this.filters.codes);
          });
        })
        .catch(() => {});
    },
    //添加或修改
    submits(obj) {
      let para = {
        shopname: obj.storeName, // 店铺名称·
        shopaddress: obj.storeDetailAddress, // 详细地址
        contacts: obj.contacts, // 联系人
        mobphonenumber: obj.mobilePhone, // 手机号码
        gpsLongitude: obj.gpsLongitude, // 经度
        gpsLatitude: obj.gpsLatitude, // 纬度
        email: obj.email, //邮箱
        shopinfo: obj.abstracts, // 简称
        remark: obj.memo, // 备注
        phone: obj.fixedPhone, //电话号码
        area: obj.area, // 地区
        shopno: obj.storeId, // 门店id
        token: window.localStorage.getItem("token")
      };
      if (this.dialog.title === "添加门店") {
        //添加请求
        reqAddStore(para)
          .then(res => {
            if (res.status === 200) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.dialog.dialogVisible = false;
              this.queryStore(this.filters.names, this.filters.codes);
            }
          })
          .catch(err => {
            console.log(err);
          });
        
        // });
      } else {
        //修改请求
        reqEditStore(para).then(res => {
          if (res.status === 200) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          }
          this.dialog.dialogVisible = false;
          this.queryStore(this.filters.names, this.filters.codes);
        });
      }
    },
    //收款码
    receiptCode(url) {
      this.receiptDialog.dialogVisible = true;
      this.receiptDialog.url = url;
    }
  },
  components: {
    query, //查询
    paging,
    storeDialog
  }
};
</script>
<style>
.imgBox {
  text-align: center;

  width: 100%;
  height: 700px;
}
.imgBox img {
  height: 100%;
  /* width: 100%; */
}
</style>


