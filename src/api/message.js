import request from '@/utils/request'
/**
 * 获取消息列表
 * @param {*} params
 */
export function messageListAPI(params) {
  return request({
    url: '/message/list',
    method: 'get',
    params
  })
}

/**
 * 获取消息详情
 * @param {*} messageId
 */
export function messageGetAPI(messageId) {
  return request({
    url: '/message/detail/' + messageId,
    method: 'get'
  })
}

/**
 * 将消息标记为已读
 * @param [id1,id2] data 消息ID列表
 */
export function messageMarkReadAPI(data) {
  return request({
    url: '/message/markRead',
    method: 'post',
    data
  })
}

/**
 * 未读消息计数
 * @param {*} data 暂无用途
 */
export function messageUnreadCountAPI(data) {
  return request({
    url: '/message/unread/count',
    method: 'get',
    data
  })
}
