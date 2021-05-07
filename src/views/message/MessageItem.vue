<template>
  <div style="margin-bottom: 10px;">
    <el-row>
      <el-col :span="2" style="text-align: center;">
        <i v-if="itemData.hasRead===1" class="el-icon-message-solid green-alarm" />
        <i v-if="itemData.hasRead===0" class="el-icon-message-solid red-alarm" />
        <i v-if="itemData.hasRead===undefined" class="el-icon-message-solid gray-alarm" />
      </el-col>
      <el-col :span="22">
        <div class="item-meta">
          <span>来自 {{ itemData.sender }} 的消息 · {{ itemData.createTime }}</span>
          <div style="float: right;">
            <el-button v-if="itemData.hasRead===0" type="text" @click="markItemAsRead">标为已读</el-button>
          </div>
        </div>
        <div class="item-title">
          <span> {{ itemData.title }}</span>
        </div>
        <div class="item-content">
          <span> {{ itemData.content }}</span>
        </div>
        <el-divider />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { messageMarkReadAPI } from '@/api/message'

export default {
  name: 'MessageItem',
  props: {
    // 接收父组件传参
    itemDataProp: {
      type: Object,
      default: () => {
        return { id: undefined,
          sender: undefined,
          title: undefined,
          content: undefined,
          createTime: undefined,
          hasRead: undefined
        }
      }
    }},
  data() {
    return {
      itemData: {
        id: undefined,
        sender: undefined,
        title: undefined,
        content: undefined,
        createTime: undefined,
        hasRead: undefined
      }
    }
  },
  computed: {
    itemDataPropGetter() {
      return this.itemDataProp
    }
  },
  watch: {
    itemDataPropGetter: {
      handler(data) {
        this.itemData = data
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    /** 将本项目标记为已读 */
    markItemAsRead() {
      messageMarkReadAPI([this.itemData.id]).then(resp => {
        this.itemData.hasRead = 1
        this.$store.dispatch('message/changeUnreadCount')
      })
    }
  }
}
</script>

<style>
  .green-alarm {
    font-size: xx-large;
    color: #67C23A;
  }
  .red-alarm {
    font-size: xx-large;
    color: #F56C6C;
  }
  .gray-alarm {
    font-size: xx-large;
    color: #909399;
  }
  .warn-alarm {
    font-size: xx-large;
    color: #E6A23C;
  }
  .item-meta{
    color: #909399;
    font-size: small;
  }
  .item-title {
    font-weight: bold;
    margin-top: 5px;
  }
  .item-content {
    margin-top: 5px;
  }
</style>
