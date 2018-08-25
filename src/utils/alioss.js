// var OSS = require('ali-oss').Wrapper
//  const OSS = require('_ali-oss@6.0.1@ali-oss') || "ccc"
export function client(data) {
   
  var clients = new OSS.Wrapper({
    
    region: "oss-cn-shenzhen",
    accessKeyId: "LTAItO8Vr9J2iEeJ",
    accessKeySecret: "vRiLIubkSbi5A9cpC1fVp9gY0UjO6S",
    bucket: "adveross",
  })  //后端提供数据
  return clients
}