<template>
  <div class="app-container">
    <!-- 展示区 -->
    <el-row>
      <el-col :span="2" :xs="0"><div class="grid-content" /></el-col>
      <el-col :span="18" :xs="24">
        <el-form ref="configForm" :rules="rules" :model="form" :label-position="device!=='mobile'?'left':'top'" size="small" label-width="180px">
          <div v-for="(item,index) in constTableData" :key="index" style="margin-top: 0px;">
            <el-form-item :label="item.configName" style="margin-bottom: 10px;">
              <!-- 密码框 -->
              <el-input v-if="item.formType==='password'" v-model="form[item.configKey]" show-password />
              <!-- 文本框 -->
              <el-input v-if="item.formType==='string'" v-model="form[item.configKey]" />
              <!-- 单选 -->
              <el-radio-group v-if="item.formType==='radio'" v-model="form[item.configKey]">
                <el-radio v-for="(radioItem, radioIndex) in item.optionalValues.split(',')" :key="radioIndex" :label="radioItem.split(':')[0]">
                  {{ radioItem.split(':')[1] }}
                </el-radio>
              </el-radio-group>
              <!-- 多选 -->
              <el-checkbox-group v-if="item.formType==='checkbox'" v-model="form[item.configKey]">
                <el-checkbox v-for="(checkboxItem, checkboxIndex) in item.optionalValues.split(',')" :key="checkboxIndex" :label="checkboxItem.split(':')[0]">
                  {{ checkboxItem.split(':')[1] }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item style="margin-bottom: 0;">
              <span class="f-color">{{ item.note }}</span>
            </el-form-item>
            <el-divider />
          </div> <!--  -->
          <el-form-item>
            <div style="margin: 10px 0;">
              <span style="font-size: small; color: #909399;">【保存】后默认在下次服务器重启时生效。【刷新缓存】可以使保存参数立即生效。</span>
            </div>
            <el-button type="primary" :disabled="!anyChangeHappen()" icon="el-icon-check" @click="submitForm()">保存</el-button>
            <el-button icon="el-icon-close" @click="resetForm()">取消修改</el-button>
            <el-button type="danger" icon="el-icon-refresh" plain @click="flushCache()">刷新缓存</el-button>
          </el-form-item>
          <el-form-item>
            <mail-test />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" :xs="0"><div class="grid-content" /></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { configListAPI, configUpdateAPI, configFlushCacheAPI } from '@/api/system/config'
import { diffObjectFunc } from '@/utils/object-util'
import MailTest from './MailTest'

export default {
  components: {
    MailTest
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 表格数据 只保存返回的原始数据，不会修改
      constTableData: [],
      // 转换后数据，用于前端展示
      form: {},
      // 表单数据 只保存返回的转换后数据，不会修改 用于判断是否修改了表单
      constForm: {},
      rules: {}
    }
  },
  computed: {
    ...mapGetters([
      'device'
    ])
  },
  mounted() {
    this.getList()
  },
  methods: {
    /** 获取参数列表 */
    getList() {
      this.loading = true
      configListAPI(this.queryParams).then(resp => {
        // 转换数据格式，因为表单的model只能接受对象，不能接受数组
        const respForm = {}
        for (let i = 0; i < resp.rows.length; i++) {
          const value = resp.rows[i].configValue
          if (resp.rows[i].formType === 'checkbox') {
            respForm[resp.rows[i].configKey] = value === '' ? [] : value.split(',')
          } else {
            respForm[resp.rows[i].configKey] = resp.rows[i].configValue
          }
        }
        //
        this.form = respForm
        this.constForm = Object.assign({}, respForm)

        this.constTableData = Object.assign([], resp.rows)

        this.total = resp.total
        this.loading = false
      })
    },
    /** 判断是否发生了修改 */
    anyChangeHappen() {
      const diffForm = diffObjectFunc(this.constForm, this.form)
      if (undefined === diffForm) {
        return false
      }
      return true
    },
    /** 保存已修改的参数
     * 逻辑：只提交有修改的参数
     */
    submitForm() {
      this.$refs['configForm'].validate(valid => {
        if (valid) {
          // body start
          // 找到修改后的配置
          const diffForm = diffObjectFunc(this.constForm, this.form)
          if (!this.anyChangeHappen()) {
            this.$message.warning('未修改任何参数，无需保存')
            return
          }
          // 构造准备提交的数据
          const updateItemList = []
          for (let i = 0; i < this.constTableData.length; i++) {
            const configId = this.constTableData[i].id // 原始id
            const configKey = this.constTableData[i].configKey // 原始configkey
            const configValue = diffForm[configKey] // 新值

            const needUpdate = Object.keys(diffForm).indexOf(configKey) >= 0
            if (needUpdate) {
              // 只能根据id修改configValue字段，其他字段不能修改
              const updateItem = {
                id: configId,
                configValue: configValue instanceof Array ? configValue.join(',') : configValue
              }
              updateItemList.push(updateItem)
            }
          }
          // 提交
          configUpdateAPI(updateItemList).then(resp => {
            this.$message.success(resp.msg)
            this.getList()
          })
          // body end
        }
      })
    },
    /** 取消保存 从服务器重新获取参数 */
    resetForm() {
      this.getList()
    },
    /** 刷新缓存 */
    flushCache() {
      configFlushCacheAPI().then(resp => {
        this.$message.success(resp.msg)
      })
    }
  }

}
</script>
<style>
  .grid-content {
    border-radius: 4px;
    min-height: 20px;
  }
  .f-color {
    color: #909399;
  }

</style>
