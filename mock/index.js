import Mock from 'mockjs'
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