<template>
  <div class="app-container">
    <!--搜索区-->
    <el-form ref="queryForm" :model="queryParams" :inline="true" size="small">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="queryParams.userName" placeholder="筛选用户名" clearable style="width: 180px" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="queryParams.nickName" placeholder="筛选昵称" clearable style="width: 180px" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="small" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!--操作按钮区-->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button size="small" type="success" icon="el-icon-edit" :disabled="single" @click="handleUpdate">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button size="small" type="danger" icon="el-icon-delete" :disabled="multiple" @click="handleDelete">删除</el-button>
      </el-col>
    </el-row>

    <!--表格展示区-->
    <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="45" />
      <el-table-column prop="id" label="编号" width="100" />
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="nickName" label="昵称" />
      <el-table-column prop="deptName" label="部门" />
      <el-table-column prop="email" label="邮箱" min-width="140" />
      <el-table-column prop="status" label="启用">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" size="small" type="success">启用</el-tag>
          <el-tag v-if="scope.row.status !== 0" size="small" type="danger">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button size="small" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="small" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="small" type="text" icon="el-icon-key" @click="handleResetPwd(scope.row)">重置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total >= 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!--弹窗区-->
    <!-- 添加、修改用户对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" size="small" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="0">
          <el-col :xs="24" :sm="24" :md="12">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入用户名（全局唯一）" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12">
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入昵称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="form.id === undefined" label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item v-if="form.id === undefined" label="确认密码" prop="passwordConfirm">
          <el-input v-model="form.passwordConfirm" type="password" placeholder="请再次输入密码" />
        </el-form-item>

        <el-form-item label="角色" prop="roleIds">
          <el-select v-model="form.roleIds" filterable multiple placeholder="请选择角色" style="width: 100%;">
            <el-option
              v-for="item in roleOptions"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
              empty-text="加载中，请稍后"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="deptName">
          <el-input v-model="form.deptName" placeholder="请输入部门名称" />
        </el-form-item>
        <el-row :gutter="0">
          <el-col :xs="24" :sm="24" :md="12">
            <el-form-item label="手机" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="用户状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitForm">确定</el-button>
        <el-button size="small" @click="cancel">取消</el-button>
      </div>
    </el-dialog>

    <!-- 重置密码对话框 -->
    <el-dialog :title="pwdTitle" :visible.sync="pwdOpen" width="500px" append-to-body>
      <el-form ref="pwdForm" size="small" :model="pwdForm" :rules="pwdRules" label-width="80px">
        <el-form-item label="新密码" prop="password">
          <el-input v-model="pwdForm.password" type="password" placeholder="请输入新密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordConfirm">
          <el-input v-model="pwdForm.passwordConfirm" type="password" placeholder="请再次输入新密码" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="pwdSubmitForm">确定</el-button>
        <el-button size="small" @click="pwdCancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { userResetPasswordAPI, userListAPI, userCreateAPI, userUpdateAPI, userGetAPI, userDeleteAPI } from '@/api/system/user'
import { roleListAPI } from '@/api/system/role'
import { encrypt } from '@/utils/jsencrypt'
import { areYouOk } from '@/api/router'

export default {
  name: 'User',
  components: { Pagination },
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
      if (this.form.password !== this.form.passwordConfirm) {
        callback(new Error('两次输入密码不一致'))
      }
      callback()
    }
    // 密码校验函数
    const validatePassword = (rule, value, callback) => {
      if (this.form.password !== this.form.passwordConfirm) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      // ////// 通用参数 //////
      // 角色列表
      roleOptions: [],

      // ////// 搜索区参数 //////
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        nickName: undefined, // 昵称
        userName: undefined // 用户名
      },

      // ////// 按钮操作区参数 //////
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 选中数组
      ids: [],

      // ////// 表格展示区参数 //////
      // 遮罩层
      loading: true,
      // 表格数据
      tableData: [],
      // 总条数
      total: 0,

      // ////// 弹窗区参数--新增、修改对话框 //////
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '昵称不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }

        ],
        roleIds: [
          { required: true, message: '角色为必选项', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '用户状态为必选项', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        passwordConfirm: [
          { required: true, message: '确认密码为必填项', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' },
          { validator: checkPasswordConfirm, trigger: 'blur' }
        ]

      },

      // ////// 弹窗区参数--重置密码对话框 //////
      // 密码弹出框标题
      pwdTitle: '重置密码',
      // 密码弹出层开关
      pwdOpen: false,
      // 密码弹出层表单数据
      pwdForm: {},
      // 密码表单校验
      pwdRules: {
        password: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        passwordConfirm: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' },
          { trigger: 'blur', validator: validatePassword }
        ]
      }
    }
  },
  created() {
    // 执行初始化动作
    areYouOk().then(() => {
      this.getList()
      this.getRoleOptions()
    })
  },
  methods: {
    // ////// 常用函数 //////
    /** 获取角色列表 */
    getRoleOptions() {
      roleListAPI({ pageNum: 1, pageSize: 999, orderByColumn: 'sort' }).then(resp => {
        this.roleOptions = resp.rows
      })
    },
    /** 获取用户列表 */
    getList() {
      userListAPI(this.queryParams).then(resp => {
        this.tableData = resp.rows
        this.total = resp.total
        this.loading = false
      })
    },

    // ////// 搜索区函数 //////
    /** 触发搜索动作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置搜索条件并重新搜索 */
    resetQuery() {
      this.$refs['queryForm'].resetFields()
      this.handleQuery()
    },

    // ////// 按钮操作区、展示区函数 //////
    /** 多选框选中情况辨识函数 */
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 触发新增弹窗 */
    handleAdd() {
      this.reset()
      this.form.status = 0
      this.open = true
      this.title = '添加用户'
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    /** 触发修改弹窗 */
    handleUpdate(row) {
      this.reset()
      const userId = row.id || this.ids
      userGetAPI(userId).then(resp => {
        this.form = resp.data
        this.open = true
        this.title = '修改用户'
        this.$nextTick(() => {
          this.$refs['form'].clearValidate()
        })
      })
    },
    /** 触发删除弹窗，执行删除动作 */
    handleDelete(row) {
      const userIds = row.id || this.ids
      this.$confirm('确认删除编号为(' + userIds + ')的用户?', '确认操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'btn-custom-cancel'
      }).then(function() {
        return userDeleteAPI(userIds)
      }).then(resp => {
        this.getList()
        this.$message.success(resp.msg)
        this.$store.dispatch('message/changeUnreadCount')
      }).catch(() => {})
    },
    /** 触发重置密码弹窗 */
    handleResetPwd(row) {
      this.pwdForm = {
        id: row.id,
        password: undefined,
        passwordConfirm: undefined
      }
      this.pwdTitle = '重置密码(用户编号:' + row.id + ')'
      this.pwdOpen = true
      this.$nextTick(() => {
        this.$refs['pwdForm'].clearValidate()
      })
    },

    // ////// 弹窗区函数 //////
    /** 提交和处理新增用户、修改用户请求 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // 数据提交前处理
          if (this.form.email === '') {
            this.form.email = undefined
          }
          if (this.form.phone === '') {
            this.form.phone = undefined
          }
          // 数据提交
          if (this.form.id !== undefined) {
            // 修改

            // 预处理
            const param = {
              id: this.form.id,
              userName: this.form.userName,
              nickName: this.form.nickName,
              roleIds: this.form.roleIds,
              deptName: this.form.deptName,
              email: this.form.email,
              phone: this.form.phone,
              status: this.form.status

            }
            userUpdateAPI(param).then(resp => {
              this.$message.success(resp.msg)
              this.open = false
              this.getList()
              this.$store.dispatch('message/changeUnreadCount')
            })
          } else {
            // 新增

            // 预处理
            const param = {
              userName: this.form.userName,
              nickName: this.form.nickName,
              roleIds: this.form.roleIds,
              password: encrypt(this.form.password),
              deptName: this.form.deptName,
              email: this.form.email,
              phone: this.form.phone,
              status: this.form.status

            }
            userCreateAPI(param).then(resp => {
              this.$message.success(resp.msg)
              this.open = false
              this.getList()
              this.$store.dispatch('message/changeUnreadCount')
            })
          }
        }
      })
    },
    /** 重置新增用户、修改用户表单 */
    reset() {
      this.form = {
        id: undefined,
        userName: undefined,
        nickName: undefined,
        phone: undefined,
        email: undefined,
        deptName: undefined,
        roleIds: [],
        password: undefined,
        passwordConfirm: undefined,
        status: undefined
      }
    },
    /** 取消新增用户、修改用户，关闭弹窗 */
    cancel() {
      this.open = false
      this.reset()
    },

    /** 提交重置密码请求 */
    pwdSubmitForm() {
      this.$refs['pwdForm'].validate(valid => {
        if (valid) {
          // 预处理
          const param = {
            id: this.pwdForm.id,
            password: encrypt(this.pwdForm.password)
          }
          // 提交
          userResetPasswordAPI(param).then(resp => {
            this.$message.success(resp.msg)
            this.pwdOpen = false
            this.$store.dispatch('message/changeUnreadCount')
          })
        }
      })
    },
    /** 取消重置密码，关闭弹窗 */
    pwdCancel() {
      this.pwdOpen = false
      this.pwdForm = {}
    }

  }
}
</script>
