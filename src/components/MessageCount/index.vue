<template>
  <!-- 顶部导航栏的消息按钮、未读消息数量 -->
  <div class="right-menu-item">
    <router-link to="/message/index">
      <el-tooltip v-if="unreadCount>=1" class="item" effect="dark" content="你有未读消息" placement="bottom">
        <i class="el-icon-message-solid large-bell" />
      </el-tooltip>
      <el-tooltip v-if="unreadCount<1" class="item" effect="dark" content="消息中心" placement="bottom">
        <i class="el-icon-message-solid large-bell" />
      </el-tooltip>
      <el-badge v-if="unreadCount>=1" class="mark" size="middle" type="danger" :value="unreadCount" />
    </router-link>
  </div>
</template>
<script>

export default {
  name: 'MessageCount',
  data() {
    return {
      unreadCount: 0 // 未读消息数量
    }
  },
  computed: {
    // 监控未读消息数量
    unreadMessageCounter() {
      return this.$store.getters.unread_message_count
    }
  },
  watch: {
    // 未读消息数量出现变化时，更新页面数字
    unreadMessageCounter: {
      handler(data) {
        this.unreadCount = data
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style>
  .large-bell{
    font-size: 20px;
  }
  .el-divider--horizontal{
    margin: 10px 0;
  }
</style>
