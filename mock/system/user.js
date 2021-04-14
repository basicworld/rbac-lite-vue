module.exports = [
  // add
  {
    url: '/system/user/create',
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
    url: '/system/user/update',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        msg: 'success'
      }
    }
  },
  // reset password
  {
    url: '/system/user/password/reset',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        msg: 'success'
      }
    }
  },
  // delete
  {
    url: '/system/user/delete/\\d',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        msg: 'success'
      }
    }
  },
  // get
  {
    url: '/system/user/detail/\\d',
    type: 'get',
    response: config => {
      return {
        'msg': '操作成功',
        'code': 20000,
        'data': {
          'id': 1,
          'userName': 'uname9',
          'password': '******',
          'status': 0,
          'nickName': 'nick',
          'phone': null,
          'email': null,
          'pwdUpdateTime': null,
          'deptName': null,
          'createBy': null,
          'createTime': '2021-03-27T18:34:41.000+0800',
          'updateBy': null,
          'updateTime': '2021-03-27T19:28:40.000+0800',
          'deleted': 0,
          'roleIds': [1]
        }
      }
    }
  },
  // list
  {
    url: '/system/user/list',
    type: 'get',
    response: config => {
      return {
        'total': 2,
        'rows': [
          {
            'id': 1,
            'userName': 'uname',
            'password': '******',
            'status': 0,
            'nickName': 'nick2',
            'phone': null,
            'email': null,
            'pwdUpdateTime': null,
            'deptName': null,
            'createBy': null,
            'createTime': '2021-03-27T18:34:41.000+0800',
            'updateBy': null,
            'updateTime': '2021-03-27T19:28:40.000+0800',
            'deleted': 0,
            'roleIds': []
          },
          {
            'id': 1,
            'userName': 'uname9',
            'password': '******',
            'status': 0,
            'nickName': 'nick',
            'phone': null,
            'email': 'abcd233233333wqrewr2@123.com',
            'pwdUpdateTime': null,
            'deptName': null,
            'createBy': null,
            'createTime': '2021-03-27T18:34:41.000+0800',
            'updateBy': null,
            'updateTime': '2021-03-27T19:28:40.000+0800',
            'deleted': 0,
            'roleIds': []
          }
        ],
        'code': 20000,
        'msg': '查询成功'
      }
    }
  }
]
