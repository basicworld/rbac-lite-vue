const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    username: 'Super Admin',
    nickname: 'nicknick'
  },
  'editor-token': {
    roles: ['editor'],
    userame: 'Normal Editor',
    nickname: 'nicknick2'

  }
}

module.exports = [
  // user login
  {
    url: '/personal/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username].token

      // mock error
      if (!token) {
        return {
          code: 60204,
          msg: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token,
        message: 'success'
      }
    }
  },
  // update info
  {
    url: '/personal/info',
    type: 'put',
    response: config => {
      return {
        code: 20000,
        msg: 'success'
      }
    }
  },
  // update password
  {
    url: '/personal/password',
    type: 'put',
    response: config => {
      return {
        code: 20000,
        msg: 'success'
      }
    }
  },
  // get user info
  {
    url: '/personal/info',
    type: 'get',
    response: config => {
      // mock header只能识别小写
      const token = config.headers['X-Token'.toLocaleLowerCase()]
      // const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          msg: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info,
        msg: 'success'
      }
    }
  },

  // user logout
  {
    url: '/personal/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }

]
