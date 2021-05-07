<template>
  <!-- 顶部导航栏的消息按钮、未读消息数量 -->
  <div class="right-menu-bell">
    <router-link to="/message/index">
      <el-tooltip class="item" effect="dark" content="消息中心" placement="bottom">
        <i class="el-icon-message-solid large-bell" />
      </el-tooltip>
      <transition name="el-fade-in-linear">
        <el-badge v-if="unreadCount>=1" :max="99" class="mark" type="danger" :value="unreadCount" />
      </transition>
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
  .item{
    padding-top: 12px;
  }
  .large-bell{
    font-size: 26px;
    color: #909399;
  }
  .el-divider--horizontal{
    margin: 10px 0;
  }
  .right-menu-bell{
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 10px;
    color: #5a5e66;
    vertical-align: text-bottom;
    width: 80px;
  }
  .el-badge {
    position: relative;
    vertical-align: top;
    margin-left: -10px;
    display: inline-block;
  }
</style>
