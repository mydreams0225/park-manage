  export default{

     getParkList() {
        
        var userInfo = window.localStorage.getItem("user");
        var parks = [
          {
            parkName: "林芝停车场",
            parkNo: "1",
            entryPassway: "林芝入口通道1-林芝入口通道2"
            // entrychildren : [{  },{  }],
            // outChildren:[{},{}]
          },
          {
            parkName: "正佳停车场",
            parkNo: "2",
            entryPassway: "正佳入口通道"
          }
        ];
       var park=[];
        // if (typeof JSON.parse(userInfo)["parks"]  == "object") {
        //   JSON.parse(userInfo)["parks"]  .forEach(item => {
            parks.forEach(item => {
            var park1 = {
              value: item["parkNo"],
              label: item["parkName"],
              entryPassway: item["entryPassway"],
              outPassway: item["outPassway"]
            };
           park.push(park1);
           
          });
        // }
        return park;
        
  }
}
  
  