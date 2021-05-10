const Mock = require('mockjs')
// 配置列表
const configList = []
// 配置总数量
const count = 20

for (let i = 0; i < count; i++) {
  configList.push(Mock.mock({
    id: '@id',
    configName: '@cname',
    configKey: '@id',
    'configValue|1': ['123', '789', 'abc'],
    'configValueType|1': ['string', 'integer', 'byte'],
    'systemBuilt|1': [1, 0],
    'formType|1': ['string', 'password', 'radio', 'checkbox'],
    optionalValues: '123:value1,456:value2,789:value3,abc:value4,edf:value5',
    'visible|1': [1, 0],
    'enable|1': [1, 0],
    'sort|+1': 10,
    defaultValue: '123,456,789',
    note: '@csentence(30,100)'
  }))
}

module.exports = [
  // 配置列表
  {
    url: '/system/config/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        msg: 'success',
        total: count,
        rows: configList
      }
    }
  },
  // 更新
  {
    url: '/system/config/update',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        msg: 'success'
      }
    }
  },
  // 刷新缓存
  {
    url: '/system/config/cache/flush',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        msg: 'success'
      }
    }
  },
  // 测试发送邮件
  {
    url: '/system/config/test/mailSend',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        msg: 'success'
      }
    }
  }
]
