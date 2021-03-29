module.exports = [
  // treeselect
  {
    url: '/system/menu/treeselect',
    type: 'get',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000,
        'data': [
          {
            'id': 1,
            'label': '系统管理',
            'children': [
              {
                'id': 2,
                'label': '用户管理'
              },
              {
                'id': 3,
                'label': '角色管理'
              }
            ]
          }
        ]
      }
    }
  },
  // list
  {
    url: '/system/menu/list',
    type: 'get',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000,
        'data': [
          {
            'id': 1,
            'parentId': 0,
            'menuName': '系统管理',
            'path': '/system',
            'component': 'layout',
            'sort': 0,
            'isFrame': 0,
            'visible': 0,
            'status': 0,
            'perms': 'system',
            'icon': 'system',
            'createBy': null,
            'createTime': null,
            'updateBy': null,
            'updateTime': null,
            'deleted': 0,
            'children': []
          },
          {
            'id': 2,
            'parentId': 1,
            'menuName': '用户管理',
            'path': 'user',
            'component': 'system/user/index',
            'sort': 0,
            'isFrame': 0,
            'visible': 0,
            'status': 0,
            'perms': 'system:user',
            'icon': null,
            'createBy': null,
            'createTime': null,
            'updateBy': null,
            'updateTime': null,
            'deleted': 0,
            'children': []
          },
          {
            'id': 3,
            'parentId': 1,
            'menuName': '角色管理',
            'path': 'role',
            'component': 'system/role/index',
            'sort': 0,
            'isFrame': 0,
            'visible': 0,
            'status': 0,
            'perms': 'system:role',
            'icon': null,
            'createBy': null,
            'createTime': null,
            'updateBy': null,
            'updateTime': null,
            'deleted': 0,
            'children': []
          }
        ]
      }
    }
  },
  // tree
  {
    url: '/system/menu/tree',
    type: 'get',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000,
        'data': [
          {
            'id': 1,
            'parentId': 0,
            'menuName': '系统管理',
            'path': '/system',
            'component': 'layout',
            'sort': 0,
            'isFrame': 0,
            'visible': 0,
            'status': 0,
            'perms': 'system',
            'icon': 'system',
            'createBy': null,
            'createTime': null,
            'updateBy': null,
            'updateTime': null,
            'deleted': 0,
            'children': [
              {
                'id': 2,
                'parentId': 1,
                'menuName': '用户管理',
                'path': 'user',
                'component': 'system/user/index',
                'sort': 0,
                'isFrame': 0,
                'visible': 0,
                'status': 0,
                'perms': 'system:user',
                'icon': null,
                'createBy': null,
                'createTime': null,
                'updateBy': null,
                'updateTime': null,
                'deleted': 0,
                'children': null
              },
              {
                'id': 3,
                'parentId': 1,
                'menuName': '角色管理',
                'path': 'role',
                'component': 'system/role/index',
                'sort': 0,
                'isFrame': 0,
                'visible': 0,
                'status': 0,
                'perms': 'system:role',
                'icon': null,
                'createBy': null,
                'createTime': null,
                'updateBy': null,
                'updateTime': null,
                'deleted': 0,
                'children': null
              }
            ]
          }
        ]
      }
    }
  }

]
