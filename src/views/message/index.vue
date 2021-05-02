<template>
  <div class="app-container">
    <el-row>
      <el-col :span="2"><div class="grid-content" /></el-col>
      <el-col :span="18">
        <div>
          <el-button type="text">本页已读</el-button>
          <el-button type="text">全部已读</el-button>
          <div style="float: right;">
            <el-button type="text" icon="el-icon-refresh">刷新</el-button>
            <el-checkbox v-model="unreadTop" style="margin-left: 20px;">未读置顶</el-checkbox>

          </div>

        </div>
        <div style="margin-top: 20px;">
          <message-item :item-data-prop="itemDataExample" />
        </div>

        <div>
          <pagination
            v-show="total >= 0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />
        </div>
      </el-col>
      <el-col :span="4"><div class="grid-content" /></el-col>
    </el-row>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

import MessageItem from './MessageItem'
import { areYouOk } from '@/api/router'

export default {
  components: { MessageItem, Pagination },
  data() {
    return {
      // 未读置顶标记
      unreadTop: true,
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
        unreadTop: undefined
      }
    }
  },
  created() {
    // 执行初始化动作
    areYouOk().then(() => {
      this.getList()
    })
  },
  methods: {
    getList() {

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
