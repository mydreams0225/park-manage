import lazyLoading from './lazyLoading'

export default (routers, data, hasparent) => {
  // 这里之所以要重新遍历一下，是因为，通常我们动态路由的时候，是获取服务端数据，这个component属性是一个字符串，或者可能连字段名都是其他的key
  // 所以这里要做一些转换
  generaMenu(routers, data, hasparent)
}
function generaMenu(routers, data, hasparent) {
  data.forEach((item) => {
    var menu = Object.assign({}, item);
    //判断是加载home组件还是对应的组件
    !hasparent ? menu.component = lazyLoading("/Home") : menu.hasChildren ? menu.component = lazyLoading("/publish-center") : menu.component = lazyLoading(menu.path);
    if (item.hasChildren) {
      menu.children = [];
      generaMenu(menu.children, item.children, true);
    }
    routers.push(menu);
  });

}