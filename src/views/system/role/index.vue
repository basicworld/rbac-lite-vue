<template>
  <div class="app-container">
    <!--搜索区-->
    <el-form ref="queryForm" :model="queryParams" :inline="true" size="small">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="queryParams.roleName" placeholder="筛选角色名称" clearable style="width: 180px" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="角色代码" prop="roleKey">
        <el-input v-model="queryParams.roleKey" placeholder="筛选角色代码" clearable style="width: 180px" @keyup.enter.native="handleQuery" />
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
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleKey" label="角色代码" />
      <el-table-column prop="sort" label="排序" />
      <el-table-column prop="note" label="描述" min-width="140" />
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button size="small" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="small" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
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
    <!-- 添加、修改角色对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" size="small" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色代码" prop="roleKey">
          <el-input v-model="form.roleKey" placeholder="请输入角色代码（全局唯一）" />
        </el-form-item>
        <el-form-item label="菜单权限" prop="menuIds">
          <el-tree
            ref="menu"
            :data="menuOptions"
            show-checkbox
            default-expand-all
            node-key="id"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model.number="form.sort" placeholder="请输入数字排序编号" />
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="form.note" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitForm">确定</el-button>
        <el-button size="small" @click="cancel">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { roleListAPI, roleCreateAPI, roleUpdateAPI, roleGetAPI, roleDeleteAPI } from '@/api/system/role'
import { menuTreeselectAPI } from '@/api/system/menu'
import { areYouOk } from '@/api/router'

export default {
  name: 'Role',
  components: { Pagination },
  data() {
    return {
      // ////// 通用参数 //////
      // 菜单列表
      menuOptions: [],

      // ////// 搜索区参数 //////
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderByColumn: 'sort',
        isAsc: 'asc',
        roleName: undefined, // 角色名称
        roleKey: undefined // 角色代码
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
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 表单校验
      rules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
          { min: 3, max: 20, message: '角色名称长度限制为3-20字符', trigger: 'blur' }

        ],
        roleKey: [
          { required: true, message: '角色代码不能为空', trigger: 'blur' },
          { min: 5, max: 20, message: '角色代码长度限制为5-20字符', trigger: 'blur' }
        ],
        sort: [
          { type: 'number', message: '排序编号只能是数字', trigger: 'blur' }
        ]

      }

    }
  },
  created() {
    // 执行初始化动作
    areYouOk().then(() => {
      this.getList()
    }).catch(e => { })
  },
  methods: {
    // ////// 常用函数 //////
    /** 获取菜单树 */
    getMenuTreeselect() {
      menuTreeselectAPI().then(resp => {
        this.menuOptions = resp.data
      }).catch(() => {})
    },
    /** 获取角色列表 */
    getList() {
      roleListAPI(this.queryParams).then(resp => {
        this.tableData = resp.rows
        this.total = resp.total
        this.loading = false
      }).catch(() => {})
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
      this.getMenuTreeselect()
      this.open = true
      this.title = '添加角色'
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
        this.$refs.menu.setCheckedKeys([])
      })
    },
    /** 触发修改弹窗 */
    handleUpdate(row) {
      this.reset()
      this.getMenuTreeselect()
      const roleId = row.id || this.ids
      roleGetAPI(roleId).then(resp => {
        this.form = resp.data
        this.open = true
        this.title = '修改角色'
        this.$nextTick(() => {
          this.$refs['form'].clearValidate()

          if (this.form.menuIds) {
            this.$refs.menu.setCheckedKeys(this.form.menuIds)
          }
        })
      }).catch(() => {})
    },
    /** 触发删除弹窗，执行删除动作 */
    handleDelete(row) {
      const roleIds = row.id || this.ids
      this.$confirm('确认删除编号为(' + roleIds + ')的角色?', '确认操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'btn-custom-cancel'
      }).then(function() {
        return roleDeleteAPI(roleIds)
      }).then(resp => {
        this.getList()
        this.$message.success(resp.msg)
      }).catch(() => {})
    },

    // ////// 弹窗区函数 //////
    /** 提交和处理新增角色、修改角色请求 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            // 修改
            this.form.menuIds = this.$refs.menu.getHalfCheckedKeys().concat(this.$refs.menu.getCheckedKeys())
            roleUpdateAPI(this.form).then(resp => {
              this.$message.success(resp.msg)
              this.open = false
              this.getList()
            }).catch(() => {})
          } else {
            // 新增
            this.form.menuIds = this.$refs.menu.getHalfCheckedKeys().concat(this.$refs.menu.getCheckedKeys())
            roleCreateAPI(this.form).then(resp => {
              this.$message.success(resp.msg)
              this.open = false
              this.getList()
            }).catch(() => {})
          }
        }
      })
    },
    /** 重置新增角色、修改角色表单 */
    reset() {
      this.form = {
        id: undefined,
        roleName: undefined,
        roleKey: undefined,
        note: undefined,
        menuIds: []
      }
    },
    /** 取消新增角色、修改角色，关闭弹窗 */
    cancel() {
      this.open = false
      this.reset()
    }

  }
}
</script>
