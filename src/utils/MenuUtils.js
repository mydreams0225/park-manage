import lazyLoading from './lazyLoading'

export default (routers, data, parent_id) => {
  //这里之所以要重新遍历一下，是因为，通常我们动态路由的时候，是获取服务端数据，这个component属性是一个字符串，或者可能连字段名都是其他的key
  //所以这里要做一些转换
  generaMenu(routers, data, parent_id)
}
function generaMenu(routers, data, parent_id) {
   console.log(data)
  data.forEach((item) => {
    var menu = Object.assign({}, item);
    if (menu.parent_id == "0") {
      menu.component = lazyLoading("Home");
    }

    else if (menu.parent_id == "1" && !menu.component) {
      menu.component = lazyLoading("publish-center");
    }
    else {
      menu.component = lazyLoading(menu.component);
    }
    if(!item.leaf && menu.children){
       parent_id+=1;
    }
    if (!item.leaf) {
      menu.children = []
      // parent_id += 1;
      generaMenu(menu.children, item.children, parent_id)
    }
    routers.push(menu);
    console.log("ffdsjfi");
    console.log(routers);
    parent_id = 0;
  })

}