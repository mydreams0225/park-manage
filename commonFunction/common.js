  export default{
      //远程
  //    getParkList() {
        
  //       var userInfo = window.localStorage.getItem("user");
  //       // var parks = [
  //       //   {
  //       //     parkName: "林芝停车场",
  //       //     parkNo: "1",
  //       //     entryPassway: "林芝入口通道1-林芝入口通道2"
  //       //     // entrychildren : [{  },{  }],
  //       //     // outChildren:[{},{}]
  //       //   },
  //       //   {
  //       //     parkName: "正佳停车场",
  //       //     parkNo: "2",
  //       //     entryPassway: "正佳入口通道"
  //       //   }
  //       // ];
  //      var park=[];
  //       if (typeof JSON.parse(userInfo)["parks"]  == "object") {
  //         JSON.parse(userInfo)["parks"]  .forEach(item => {
  //           // parks.forEach(item => {
  //           var park1 = {
  //             value: item["parkNo"],
  //             label: item["parkName"],
  //             entryPassway: item["entryPassway"],
  //             outPassway: item["outPassway"]
  //           };
  //          park.push(park1);
           
  //         });
  //       }
  //       return park;
        
  // },
  //本地请求
  getParkList() {
        
    // var userInfo = window.localStorage.getItem("user");
    var parks = [
      {
        parkName: "林芝停车场",
        parkNo: "1",
        entryPassway: "林芝入口通道1-林芝入口通道2"
      },
      {
        parkName: "正佳停车场",
        parkNo: "2",
        entryPassway: "正佳入口通道"
      }
    ];
    var park=[];
  parks.forEach(item => {
        // parks.forEach(item => {
        var park1 = {
          value: item["parkNo"],
          label: item["parkName"],
          entryPassway: item["entryPassway"],
          outPassway: item["outPassway"]
        };
       park.push(park1);
       
      });
    return park;
},

  
  handlecurrentchange(currentPage,callback,val) {
    currentPage = val;
    callback();
  },
   getCookie(name)
    {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
    },
   delCookie(name)
  {
  var exp = new Date();
   exp.setTime(exp.getTime() - 1);
  var cval=this.getCookie(name);
  alert("cval"+cval);
  if(cval!=null)
  document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/park";
  },
      valid(obj,show,business){
        var i=0;
        if(!obj.park){
          show.park=true;  
          i=-1;  
        }
        if(business=="businessList"){
            // var obj=  this.save.obj;
            // var show=this.show;
            if(!obj.businessName){
                show.businessName=true;  
                i=-1;
                
            }if(!obj.isOpenLock){
                show.isOpenLock=true;
                i=-1;
            }
            else{
                i=1;
            }
        }else if(business=="businessAccountList"){
           if(!obj.merchant){
             show.merchant=true;
             i=-1;
           }if(!obj.businessAccountName){
             show.businessAccountName=true;
             i=-1;
           }if(!obj.businessAccountId){
             show.businessAccountId=true;
             i=-1;
           }if(!obj.businessAccountPwd){
            show.businessAccountPwd=true;
            i=-1;
           }if(!obj.discountCycle){
            show.discountCycle=true;
            i=-1;
           }if(!obj.cycleDiscountTimes){
            show.cycleDiscountTimes=true;
            i=-1;
           }

        }
      return i;
    },
    changevalid(val,rulevalue){
     var rule=  val?rulevalue=false:rulevalue=true; 
     return rule;
    },
     deepClone(origin,target){
      // 1.判断是不是原始值 
      // 2.判断是数组还是对象
      // 3.建立相应数组或对象
      // 4.递归 
      var target = target || [],
          toStr = Object.prototype.toString,
          arrStr = "[Object array]"

      for(var prop in origin){
          // if(origin.hasOwnProperty(prop)){
               if(typeof(origin[prop]) == 'object'){
                 if(toStr.call(origin[prop])==arrStr){
                     target[prop]=[];
                 }else{
                     target[prop]={};
                 }
                 this.deepClone(origin[prop],target[prop]); 
               }else {
                   target[prop] = origin[prop];
               }
          }
      // }

   }  ,
   // 根据code获取城市区域名称
   findAreaName(res, str) {
    // if (this.areaCache[str]) return this.areaCache[str];
    for (var i = 0, len = res.length; i < len; i++) {
      if (str === res[i]["value"]) {
        return res[i]["label"];
      } else if (res[i]["children"]) {
        var temp = this.findAreaName(res[i]["children"], str);
        if (temp) {
          // this.areaCache[str] = temp;
          return  temp ;
        }
      }
    }
  },
      
    
        
  
}
  
  