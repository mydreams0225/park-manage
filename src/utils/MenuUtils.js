import lazyLoading from './lazyLoading'

export default (routers, data, hasparent) => {
  //这里之所以要重新遍历一下，是因为，通常我们动态路由的时候，是获取服务端数据，这个component属性是一个字符串，或者可能连字段名都是其他的key
  //所以这里要做一些转换
  generaMenu(routers, data, hasparent)
}
function generaMenu(routers, data, hasparent) {
  
  data.forEach((item) => {
    var menu = Object.assign({}, item);
    !hasparent ? menu.component = lazyLoading("Home") : menu.children ? menu.component = lazyLoading("publish-center") : menu.component = lazyLoading(menu.component);
   
    if (item.children) {
      menu.children = []
     
     
      generaMenu(menu.children, item.children, true)
    }
    routers.push(menu);
  

  })

}

// function generMenu(routers, data){
//  var res = eachArr(data,false)
//  routers.menus =res;
// }

// function eachArr(data,hasParent){
//   var args = [];
//   data.forEach((item) => {
//     !hasparent ? item.component = lazyLoading("Home") : item.children ? item.component = lazyLoading("publish-center") :"";
//        if(item.children && item.children.length>0)
//         item.children =  eachArr(item.children,true);
      
//     args.push(item);
//       })
// return args;
  
// }