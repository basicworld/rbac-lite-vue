<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <message-count />

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="require('@/assets/images/blue-people.png')" class="user-avatar"> -->
          <span class="user-name">{{ name }}</span>
          <i class="el-icon-caret-bottom" style="top: 22px;" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/personal/index">
              <span style="display:block;">
                <i class="el-icon-setting" />个人设置
              </span>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">
              <i class="el-icon-switch-button" />退出
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import MessageCount from '@/components/MessageCount'
// import { messageUnreadCountAPI } from '@/api/message'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    MessageCount
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'name'
    ])
  },
  mounted() {
    this.getMessageCountFunc()
  },
  methods: {
    /** 获取未读消息数量 */
    getMessageCountFunc() {
      this.$store.dispatch('message/changeUnreadCount')
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // 登录跳转，重新登录后跳转到首页
      this.$router.push(`/login`)
      // 下面的功能是，重新登录后跳转到退出前的页面，如果跳转到用户没有权限的页面会报错
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 14px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 0px; // 5px
        position: relative;
        .user-name {
          cursor: pointer;
          font-size: 15px;
          line-height: 20px;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
