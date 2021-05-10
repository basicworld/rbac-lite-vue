import request from '@/utils/request'
/**
 * 获取配置列表
 * @param {*} params
 */
export function configListAPI(params) {
  return request({
    url: '/system/config/list',
    method: 'get',
    params
  })
}

/**
 * 批量更新配置
 * @param [{*}] data 配置列表
 */
export function configUpdateAPI(data) {
  return request({
    url: '/system/config/update',
    method: 'post',
    data
  })
}
/**
 * 刷新后台参数缓存，让新保存的参数生效
 * @param {*} data
 * @returns
 */
export function configFlushCacheAPI(data) {
  return request({
    url: '/system/config/cache/flush',
    method: 'post',
    data
  })
}

/**
 * 邮件参数测试接口
 *
 * @param { mailTo } data 收件人地址
 * @returns
 */
export function configMailSendTestAPI(data) {
  return request({
    url: '/system/config/test/mailSend',
    method: 'post',
    data
  })
}
