<template>
  <div style="margin-bottom: 10px;">
    <el-row>
      <el-col :xs="0" :span="2" style="text-align: center;">
        <i
          class="el-icon-message-solid"
          :class="{'green-alarm': itemData.hasRead===1, 'red-alarm':itemData.hasRead===0}"
        />
      </el-col>
      <el-col :xs="24" :span="22">
        <div class="item-meta">
          <span>来自 {{ itemData.sender }} 的消息 · {{ itemData.createTime }} · {{ itemData.hasRead?'已读':'未读' }}</span>
          <div style="float: right;">
            <transition name="el-fade-in">
              <el-button v-show="itemData.hasRead===0" type="text" @click="markItemAsRead">标为已读</el-button>
            </transition>
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
import { mapGetters } from 'vuex'
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
    ...mapGetters([
      'device'
    ]),
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
    margin-top: 10px;
    font-size: 30px;
    color: #67C23A;
  }
  .red-alarm {
    margin-top: 10px;
    font-size: 30px;
    color: #F56C6C;
  }
  .gray-alarm {
    margin-top: 10px;
    font-size: 30px;
    color: #909399;
  }
  .warn-alarm {
    font-size: 30px;
    color: #E6A23C;
  }
  .item-meta{
    color: #909399;
    font-size: small;
  }
  .item-title {
    font-weight: bold;
    margin-top: 10px;
    color: #303133;
  }
  .item-content {
    margin-top: 8px;
    color: #303133;
  }
</style>
