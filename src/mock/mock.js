// 引入mockjs
const Mock = require('mockjs');

// mock一组数据
const menuData = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  data: [
    {
      name: '系统用户管理',
      key: 1
    },
    {
      name: '旅游项目管理',
      key: 1
    },
    {
      name: '旅游路线信息管理',
      key: 1
    },
    {
      name: '客户管理',
      key: 1
    },
    {
      name: '合同订单管理',
      key: 1
    },
    {
      name: '价格信息管理',
      key: 1
    },
    {
      name: '客户对服务的评价管理',
      key: 1
    },
  ]
})

const loginData = Mock.mock(
  'user/login', 'post', (req, res) => {
    return {
      status: 200,
      data: [],
      msg: '成功'
    }
  }
)

// Mock.mock( url, post/get , 返回的数据)；


Mock.mock('/menus', 'post', menuData)

export default {
  loginData,
  // user
}