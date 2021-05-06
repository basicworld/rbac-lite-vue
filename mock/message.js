const Mock = require('mockjs')
// 消息列表
const messageList = []
// 消息总数量
const count = 45

for (let i = 0; i < count; i++) {
  messageList.push(Mock.mock({
    id: '@id',
    sender: '@cname',
    title: '@csentence(10,20)',
    content: '@csentence(20,40)',
    createTime: '@datetime',
    'hasRead|1': [1, 0]
  }))
}

module.exports = [
  // 消息列表
  {
    url: '/message/list',
    type: 'get',
    response: config => {
      const { unreadTop, pageNum = 1, pageSize = 10 } = config.query
      if (unreadTop === 'true') {
        // 按未读优先，然后按时间倒序
        messageList.sort((m, n) => {
          if (m.hasRead === 0 && n.hasRead === 1) {
            return -1
          } else if (m.hasRead === 1 && n.hasRead === 0) {
            return 1
          } else {
            if (m.createTime > n.createTime) { return -1 } else if (m.createTime < n.createTime) { return 1 } else { return 0 }
          }
        })
      } else {
        // 按时间倒序
        messageList.sort((m, n) => {
          if (m.createTime > n.createTime) { return -1 } else if (m.createTime < n.createTime) { return 1 } else { return 0 }
        })
      }

      const pageList = messageList.filter((item, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1))

      return {
        code: 20000,
        msg: 'success',
        total: count,
        rows: pageList
      }
    }
  },
  // 未读消息计数
  {
    url: '/message/unread/count',
    type: 'get',
    response: config => {
      const unreadCount = messageList.filter((item, index) => item.hasRead === 0).length
      return {
        code: 20000,
        msg: 'success',
        data: unreadCount
      }
    }
  },
  // 消息详情
  {
    url: '/message/detail/\\d',
    type: 'get',
    response: config => {
      const item = messageList[0]
      return {
        code: 20000,
        msg: 'success',
        data: item
      }
    }
  },
  // 标为已读
  {
    url: '/message/markRead',
    type: 'post',
    response: config => {
      const ids = config.body

      // 所有标记为已读
      if (ids.indexOf(-1) >= 0) {
        for (let i = 0; i < count; i++) {
          messageList[i].hasRead = 1
        }
      }
      // 按id 标为已读
      for (let i = 0; i < count; i++) {
        if (ids.indexOf(messageList[i]) >= 0) {
          messageList[i].hasRead = 1
        }
      }
      return {
        code: 20000,
        msg: 'success'
      }
    }
  }
]
