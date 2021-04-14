import request from '@/utils/request'

/**
 * 用户列表
 * @param {*} params
 */
export function userListAPI(params) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params
  })
}
/**
 * 获取用户详情
 * @param {*} params
 */
export function userGetAPI(userId) {
  return request({
    url: '/system/user/detail/' + userId,
    method: 'get'
  })
}
/**
 * 删除用户
 *
 */
export function userDeleteAPI(userId) {
  return request({
    url: '/system/user/delete/' + userId,
    method: 'post'
  })
}
/**
 * 新建用户
 * @param {*} data
 */
export function userCreateAPI(data) {
  return request({
    url: '/system/user/create',
    method: 'post',
    data
  })
}
/**
 * 更新用户
 * @param {*} data
 */
export function userUpdateAPI(data) {
  return request({
    url: '/system/user/update',
    method: 'post',
    data
  })
}
/**
 * 重置密码
 * @param
 */
export function userResetPasswordAPI(data) {
  return request({
    url: '/system/user/password/reset',
    method: 'post',
    data
  })
}
