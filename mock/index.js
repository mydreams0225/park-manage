import Mock from 'C:/Users/Administrator/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/mockjs'
import data from '../static/test.json'
Mock.mock('/login/login', {
    code: 200,
    msg: "请求成功",
    data: data.login
})
Mock.mock('/parklist/parklist', {
    code: 200,
    msg: "请求成功",
    data: data.parklist
})