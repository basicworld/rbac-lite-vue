import { messageUnreadCountAPI } from '@/api/message'

const state = {
  unread_count: 0
}

const mutations = {
  CHANGE_UNREAD_COUNT: (state, value) => {
    state.unread_count = value
  }
}

const actions = {
  changeUnreadCount({ commit }, data) {
    messageUnreadCountAPI().then(resp => {
      commit('CHANGE_UNREAD_COUNT', resp.data)
      // this.$store.dispatch('message/changeUnreadCount', resp.data)
      // this.$store.commit('message/CHANGE_UNREAD_COUNT', resp.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

