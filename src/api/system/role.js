import request from '@/utils/request'
/**
 * 角色列表
 * @param {*} params
 */
export function roleListAPI(params) {
  return request({
    url: '/system/role/list',
    method: 'get',
    params
  })
}
/**
 * 获取角色详情
 * @param {*} params
 */
export function roleGetAPI(roleId) {
  return request({
    url: '/system/role/detail/' + roleId,
    method: 'get'
  })
}
/**
 * 删除角色
 *
 */
export function roleDeleteAPI(roleId) {
  return request({
    url: '/system/role/delete/' + roleId,
    method: 'post'
  })
}
/**
 * 新建角色
 * @param {*} data
 */
export function roleCreateAPI(data) {
  return request({
    url: '/system/role/create',
    method: 'post',
    data
  })
}
/**
 * 更新角色
 * @param {*} data
 */
export function roleUpdateAPI(data) {
  return request({
    url: '/system/role/update',
    method: 'post',
    data
  })
}
