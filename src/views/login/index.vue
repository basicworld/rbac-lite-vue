<template>
  <div class="login-container">

    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">RBAC权限系统</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          prefix-icon="el-icon-user"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="off"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          prefix-icon="el-icon-lock"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :gutter="10">
          <el-col :span="14">
            <el-input
              ref="code"
              v-model="loginForm.code"
              placeholder="图片验证码"
              prefix-icon="el-icon-picture-outline"
              name="code"
              type="text"
              tabindex="3"
              auto-complete="off"
              class="img-container"
              @keyup.enter.native="handleLogin"
            />
          </el-col>
          <el-col :span="9">
            <img
              :src="captchaUrl"
              title="点击替换"
              alt="验证码"
              style="cursor: pointer; width: 120px; height: 40px;"
              @click="reloadCaptcha"
            >
          </el-col>
        </el-row>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <div class="tips">
        <span style="margin-right:20px;">
          忘记密码联系管理员
        </span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { encrypt } from '@/utils/jsencrypt'
import { removeToken } from '@/utils/auth'
import { captchaGetAPI } from '@/api/personal'
import { areYouOk } from '@/api/router'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确格式的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入6位以上密码'))
      } else {
        callback()
      }
    }
    return {
      // 图片验证码地址
      captchaUrl: undefined,
      loginForm: {
        username: '', // 用户名
        password: '', // 密码
        code: undefined, // 验证码
        uuid: undefined // 验证码唯一ID
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    areYouOk().then(() => {
      removeToken()
      this.reloadCaptcha()
    }).catch(e => { })
  },
  methods: {
    reloadCaptcha() {
      captchaGetAPI().then(res => {
        this.captchaUrl = 'data:image/gif;base64,' + res.data.base64
        this.loginForm.uuid = res.data.uuid
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          var param = {
            username: this.loginForm.username,
            code: this.loginForm.code,
            uuid: this.loginForm.uuid,
            password: encrypt(this.loginForm.password)
          }
          this.$store.dispatch('user/login', param).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
            this.reloadCaptcha()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
 .img-container{
    .el-input-group__append{
      padding: 0;
      border: 0;
    }
  }
</style>
<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url(../../assets/images/bg.jpg);
  background-size: 100%;
  background-position-x: center;
  overflow: hidden;
  height:100%;
  background-size:cover;

  .login-form {
    background-color: #fff;
    position: relative;
    width: 400px;
    max-width: 100%;
    padding: 40px 35px 30px;
    margin: 8% auto;
    overflow: hidden;
    border-radius: 1%;
  }

  .tips {
    font-size: 14px;
    color: #454545;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #454545;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 0px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
