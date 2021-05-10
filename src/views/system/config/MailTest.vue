<template>
  <div>
    <!-- 展示区 -->
    <el-input
      v-model="mailTo"
      placeholder="example@abc.com"
      clearable
      size="small"
    >
      <el-button slot="append" size="mini" icon="el-icon-message" @click="sendEmail">发送测试邮件</el-button>
    </el-input>
  </div>
</template>
<script>
import { configMailSendTestAPI } from '@/api/system/config'
import { validEmail } from '@/utils/validate'
export default {
  name: 'MailTest',
  data() {
    return {
      // 收件人
      mailTo: undefined
    }
  },
  methods: {
    sendEmail() {
      if (undefined === this.mailTo || this.mailTo === '') {
        this.$message.warning('邮箱不能为空')
        return
      }
      if (!validEmail(this.mailTo)) {
        this.$message.warning('邮箱格式错误')
        return
      }
      configMailSendTestAPI({ mailTo: this.mailTo }).then(resp => {
        this.$message.success(resp.msg)
      })
    }
  }
}
</script>
