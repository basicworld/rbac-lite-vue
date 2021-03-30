<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!-- show user info -->
      <el-col :span="8" :xs="24" style="margin-bottom: 10px;">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="font-weight: bold;">基本信息</span>
          </div>
          <el-row>
            <el-col :span="24" class="mb10"><i class="el-icon-user-solid" /> 用户名：{{ user.username }}</el-col>
            <el-col :span="24" class="mb10"><i class="el-icon-user-solid" /> 昵称：{{ user.nickname }}</el-col>
            <el-col :span="24" class="mb10"><i class="el-icon-phone" /> 手机：{{ user.phone }}</el-col>
            <el-col :span="24" class="mb10"><i class="el-icon-s-comment" /> 邮箱：{{ user.email }}</el-col>
            <el-col :span="24" class="mb10"><i class="el-icon-s-cooperation" /> 部门：{{ user.deptname }}</el-col>
          </el-row>

        </el-card>
      </el-col>
      <!-- update user info and password -->
      <el-col :span="16" :xs="24" style="margin-bottom: 10px;">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="font-weight: bold;">修改信息</span>
          </div>
          <el-tabs v-model="activeTab">
            <!-- 基本信息设置 -->
            <el-tab-pane label="修改基本信息" name="userInfo">
              <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="100px" size="small">
                <el-form-item label="昵称" prop="nickname">
                  <el-input v-model="infoForm.nickname" placeholder="请输入昵称" />
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                  <el-input v-model="infoForm.phone" placeholder="请输入11位手机号" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="infoForm.email" placeholder="请输入邮箱" />
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="primary" @click="onInfoSubmit">保存</el-button>
                  <el-button size="small" @click="onInfoCancel">取消修改</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <!-- 修改密码 -->
            <el-tab-pane label="修改密码" name="resetPassword">
              <el-form ref="pwdForm" :rules="pwdRules" :model="pwdForm" label-width="100px" size="small">
                <el-form-item label="当前密码" prop="oldPassword">
                  <el-input v-model="pwdForm.oldPassword" type="password" placeholder="请输入当前密码" />
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                  <el-input v-model="pwdForm.password" type="password" placeholder="请输入新密码" />
                </el-form-item>
                <el-form-item label="确认密码" prop="passwordConfirm">
                  <el-input v-model="pwdForm.passwordConfirm" type="password" placeholder="请再次输入新密码" />
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="primary" @click="onPwdSubmit">保存</el-button>
                  <el-button size="small" @click="onPwdCancel">取消修改</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-card>

      </el-col>
    </el-row>
  </div>

</template>

<script>
import { validCellphone } from '@/utils/validate'
import { areYouOk } from '@/api/router'
import { userInfoUpdateAPI, getInfoAPI, userPasswordUpdateAPI } from '@/api/personal'
import { encrypt } from '@/utils/jsencrypt'
import { diffObjectFunc } from '@/utils/object-util'
import store from '@/store'

export default {
  data() {
    // password check rule
    const checkPassword = (rule, value, callback) => {
      if (value.trim() !== value) {
        callback(new Error('密码不允许空格'))
      }
      if (value.length < 8 || value.length > 20) {
        callback(new Error('密码长度限定为8-20位'))
      }
      var ls = 0
      if (value.match(/([a-z])+/)) { ls++ }
      if (value.match(/([0-9])+/)) { ls++ }
      if (value.match(/([A-Z])+/)) { ls++ }
      if (value.match(/[^a-zA-Z0-9]+/)) { ls++ }
      if (ls < 3) {
        callback(new Error('密码必须同时包含大写字母、小写字母、数字'))
      }
      callback()
    }
    // password compare check rule
    const checkPasswordConfirm = (rule, value, callback) => {
      if (this.pwdForm.password !== this.pwdForm.passwordConfirm) {
        callback(new Error('两次输入密码不一致'))
      }
      callback()
    }
    // phone check rule
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        callback()
      } else {
        if (validCellphone(value)) {
          callback()
        } else {
          callback(new Error('手机号格式错误'))
        }
      }
    }
    return {
      // ////// 展示区 //////
      // 活动tab
      activeTab: 'userInfo',
      // 用户详情
      user: {}, // 个人详情

      // ////// 修改个人信息 //////
      // 个人信息表单
      infoForm: {
        nickname: undefined,
        phone: undefined,
        email: undefined
      },
      // 个人信息表单备份
      constInfoForm: {},
      // 个人信息校验规则
      infoRules: {
        nickname: [
          { required: true, message: '昵称为必填项', trigger: 'blur' },
          { min: 2, max: 20, message: '昵称长度限制为 2 到 20 字', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      },

      // ////// 修改密码 //////
      // 修改密码表单
      pwdForm: {
        oldPassword: '',
        password: '',
        passwordConfirm: ''

      },
      // 密码校验规则
      pwdRules: {
        oldPassword: [
          { required: true, message: '原密码为必填项', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '新密码为必填项', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        passwordConfirm: [
          { required: true, message: '确认密码为必填项', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' },
          { validator: checkPasswordConfirm, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    areYouOk().then(() => {
      this.doGetUserInfo()
    })
  },
  methods: {
    /** 获取用户信息 */
    doGetUserInfo() {
      console.log('personal.index.getInfoAPI')
      getInfoAPI().then(res => {
        this.user = res.data
        this.infoForm = {
          nickname: res.data.nickname,
          phone: res.data.phone,
          email: res.data.email
        }
        // 备份原始信息，用于提交前的比对
        this.constInfoForm = Object.assign({}, this.infoForm)
      })
    },
    /** 提交用户信息修改请求 */
    onInfoSubmit() {
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          // 找到修改后的配置
          const diffForm = diffObjectFunc(this.constInfoForm, this.infoForm)
          if (undefined === diffForm) {
            this.$message.info('未修改任何信息，无需保存')
            return
          }
          const param = {
            nickName: this.isNotBlank(this.infoForm.nickname) ? this.infoForm.nickname : undefined,
            email: this.isNotBlank(this.infoForm.email) ? this.infoForm.email : undefined,
            phone: this.isNotBlank(this.infoForm.phone) ? this.infoForm.phone : undefined
          }
          userInfoUpdateAPI(param).then(res => {
            this.$message.success(res.msg)
            this.doGetUserInfo()
            // 更新缓存的用户信息
            store.dispatch('user/getInfo')
          })
        }
      })
    },
    /** 取消用户信息修改 */
    onInfoCancel() {
      this.$refs.infoForm.resetFields()
      this.doGetUserInfo()
    },
    /** 提交密码修改请求 */
    onPwdSubmit() {
      this.$refs.pwdForm.validate((valid) => {
        if (valid) {
          var parm = {
            password: encrypt(this.pwdForm.oldPassword),
            newPassword: encrypt(this.pwdForm.password)
          }
          userPasswordUpdateAPI(parm).then(res => {
            this.$message.success('修改密码成功')
            this.onPwdCancel()
          })
        }
      })
    },
    /** 取消修改密码 */
    onPwdCancel() {
      this.$refs.pwdForm.resetFields()
    },
    /** 工具函数：校验obj是否为null或空字符 */
    isNotBlank(obj) {
      return (undefined !== obj) && (obj !== '')
    }
  }
}
</script>

<style>
.mb10{
  margin-bottom: 10px;
}
</style>
