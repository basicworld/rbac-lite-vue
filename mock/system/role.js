module.exports = [
  // list
  {
    url: '/system/role/list',
    type: 'get',
    response: config => {
      return {
        'total': 2,
        'rows': [
          {
            'id': 1,
            'roleName': 'rolename',
            'roleKey': 'roleKey',
            'status': 0,
            'sort': 0,
            'dataScope': null,
            'createBy': null,
            'createTime': '2021-03-27T22:54:00.000+0800',
            'updateBy': null,
            'updateTime': null,
            'deleted': 0,
            'note': 'sadfsd',
            'menuIds': []
          },
          {
            'id': 2,
            'roleName': 'rolename2',
            'roleKey': 'roleKey2',
            'status': 0,
            'sort': 0,
            'dataScope': null,
            'createBy': null,
            'createTime': '2021-03-27T22:54:45.000+0800',
            'updateBy': null,
            'updateTime': null,
            'deleted': 0,
            'note': 'sadfsd',
            'menuIds': []
          },
          {
            'id': 3,
            'roleName': 'rolename2',
            'roleKey': 'roleKey2',
            'status': 0,
            'sort': 0,
            'dataScope': null,
            'createBy': null,
            'createTime': '2021-03-27T22:54:45.000+0800',
            'updateBy': null,
            'updateTime': null,
            'deleted': 0,
            'note': 'sadfsd',
            'menuIds': []
          },
          {
            'id': 4,
            'roleName': 'rolename2',
            'roleKey': 'roleKey2',
            'status': 0,
            'sort': 0,
            'dataScope': null,
            'createBy': null,
            'createTime': '2021-03-27T22:54:45.000+0800',
            'updateBy': null,
            'updateTime': null,
            'deleted': 0,
            'note': 'sadfsd',
            'menuIds': []
          },
          {
            'id': 5,
            'roleName': 'rolename2',
            'roleKey': 'roleKey2',
            'status': 0,
            'sort': 0,
            'dataScope': null,
            'createBy': null,
            'createTime': '2021-03-27T22:54:45.000+0800',
            'updateBy': null,
            'updateTime': null,
            'deleted': 0,
            'note': 'sadfsd',
            'menuIds': []
          },
          {
            'id': 6,
            'roleName': 'rolename2',
            'roleKey': 'roleKey2',
            'status': 0,
            'sort': 0,
            'dataScope': null,
            'createBy': null,
            'createTime': '2021-03-27T22:54:45.000+0800',
            'updateBy': null,
            'updateTime': null,
            'deleted': 0,
            'note': 'sadfsd',
            'menuIds': []
          },
          {
            'id': 7,
            'roleName': 'rolename2',
            'roleKey': 'roleKey2',
            'status': 0,
            'sort': 0,
            'dataScope': null,
            'createBy': null,
            'createTime': '2021-03-27T22:54:45.000+0800',
            'updateBy': null,
            'updateTime': null,
            'deleted': 0,
            'note': 'sadfsd',
            'menuIds': []
          },
          {
            'id': 8,
            'roleName': 'rolename2',
            'roleKey': 'roleKey2',
            'status': 0,
            'sort': 0,
            'dataScope': null,
            'createBy': null,
            'createTime': '2021-03-27T22:54:45.000+0800',
            'updateBy': null,
            'updateTime': null,
            'deleted': 0,
            'note': 'sadfsd',
            'menuIds': []
          },
          {
            'id': 9,
            'roleName': 'rolename2',
            'roleKey': 'roleKey2',
            'status': 0,
            'sort': 0,
            'dataScope': null,
            'createBy': null,
            'createTime': '2021-03-27T22:54:45.000+0800',
            'updateBy': null,
            'updateTime': null,
            'deleted': 0,
            'note': 'sadfsd',
            'menuIds': []
          },
          {
            'id': 10,
            'roleName': 'rolename2',
            'roleKey': 'roleKey2',
            'status': 0,
            'sort': 0,
            'dataScope': null,
            'createBy': null,
            'createTime': '2021-03-27T22:54:45.000+0800',
            'updateBy': null,
            'updateTime': null,
            'deleted': 0,
            'note': 'sadfsd',
            'menuIds': []
          }

        ],
        'code': 20000,
        'msg': '查询成功'
      }
    }
  },
  // get
  {
    url: '/system/role/\\d',
    type: 'get',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000,
        'data': {
          'id': 1,
          'roleName': 'rolename',
          'roleKey': 'roleKey',
          'status': 0,
          'sort': 0,
          'dataScope': null,
          'createBy': null,
          'createTime': '2021-03-27T22:54:00.000+0800',
          'updateBy': null,
          'updateTime': null,
          'deleted': 0,
          'note': 'sadfsd',
          'menuIds': [1]
        }
      }
    }
  },
  // add
  {
    url: '/system/role',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        msg: 'success'
      }
    }
  },
  // update
  {
    url: '/system/role',
    type: 'put',
    response: config => {
      return {
        code: 20000,
        msg: 'success'
      }
    }
  },
  // delete
  {
    url: '/system/role',
    type: 'delete',
    response: config => {
      return {
        code: 20000,
        msg: 'success'
      }
    }
  }
]
