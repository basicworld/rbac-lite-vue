module.exports = [
  // 后台连通性
  {
    url: '/ping',
    type: 'get',
    response: config => {
      return {
        'msg': 'pong',
        'code': 20000
      }
    }
  },
  // 菜单
  {
    url: '/router',
    type: 'get',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000,
        'data': [
          {
            'name': '系统管理',
            'path': '/system',
            'hidden': false,
            'redirect': 'noRedirect',
            'component': 'layout',
            'alwaysShow': true,
            'meta': {
              'title': '系统管理',
              'icon': 'tree'
            },
            'children': [
              {
                'name': '用户管理',
                'path': 'user',
                'hidden': false,
                'redirect': null,
                'component': 'system/user/index',
                'alwaysShow': null,
                'meta': {
                  'title': '用户管理',
                  'icon': null
                },
                'children': null
              },
              {
                'name': '角色管理',
                'path': 'role',
                'hidden': false,
                'redirect': null,
                'component': 'system/role/index',
                'alwaysShow': null,
                'meta': {
                  'title': '角色管理',
                  'icon': null
                },
                'children': null
              }

            ]
          }
        ]
      }
    }
  }
]
