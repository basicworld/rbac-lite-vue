import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'
import message from './modules/message'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    message,
    settings,
    user
  },
  getters
})

export default store
