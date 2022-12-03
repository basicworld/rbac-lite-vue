<template>
  <div class="app-container">
    <el-row>
      <el-col :span="2" :xs="0"><div class="grid-content" /></el-col>
      <el-col :span="18" :xs="24">
        <!-- 操作按钮 -->
        <div style="margin-bottom: 20px;">
          <el-button type="primary" size="small" plain @click="markShowingMessageAsRead">本页已读</el-button>
          <el-button type="primary" size="small" plain @click="markAllMessageAsRead">全部已读</el-button>
          <el-button type="primary" size="small" icon="el-icon-refresh" plain @click="refreshNow">刷新</el-button>
          <el-checkbox v-model="queryParams.unreadTop" style="margin-left: 20px;" size="small" :border="device==='mobile'">未读置顶</el-checkbox>
          <div style="float: right;" />
        </div>

        <!-- 展示区 -->

        <div v-for="item in tableData" :key="item.id" style="margin-top: 0px;">
          <message-item :item-data-prop="item" />
        </div>

        <div style="text-align: center;">
          <pagination
            v-show="total >= 0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            layout="prev, pager, next"
            @pagination="getList"
          />
        </div>
      </el-col>
      <el-col :span="4" :xs="0"><div class="grid-content" /></el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import MessageItem from './MessageItem'
import { areYouOk } from '@/api/router'
import { messageListAPI, messageMarkReadAPI } from '@/api/message'

export default {
  components: { MessageItem, Pagination },
  data() {
    return {
      itemDataExample: {
        id: 1,
        sender: '系统',
        title: '密码超期未修改',
        content: '账号密码已经超过60天未修改，建议修改。',
        createTime: '2021-01-01 12:30',
        hasRead: 'false'
      },
      // ////// 表格展示区参数 //////
      // 遮罩层
      loading: true,
      // 表格数据
      tableData: [],
      // 总条数
      total: 0,
      // ////// 搜索区参数 //////
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        unreadTop: true // 未读置顶
      }
    }
  },
  computed: {
    ...mapGetters([
      'device'
    ]),
    queryParamsGetter() {
      return this.queryParams.unreadTop
    }
  },
  watch: {
    queryParamsGetter: {
      handler(data) {
        this.refreshNow()
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    // 执行初始化动作
    areYouOk().then(() => {
      this.getList()
    }).catch(e => { })
  },
  methods: {
    /** 获取消息列表 */
    getList() {
      messageListAPI(this.queryParams).then(resp => {
        this.tableData = Object.assign([], resp.rows)
        this.total = resp.total
      })
    },
    /** 刷新消息列表 */
    refreshNow() {
      this.getList()
      this.$store.dispatch('message/changeUnreadCount')
    },
    /** 当前页面消息标记为已读 */
    markShowingMessageAsRead() {
      const ids = []
      for (let i = 0; i < this.tableData.length; i++) {
        ids.push(this.tableData[i].id)
      }
      messageMarkReadAPI(ids).then(resp => {
        this.refreshNow()
      })
    },
    /** 用户所有消息标记为已读 */
    markAllMessageAsRead() {
      // -1 表示所有消息标记为已读
      messageMarkReadAPI([-1]).then(resp => {
        this.refreshNow()
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

</style>
