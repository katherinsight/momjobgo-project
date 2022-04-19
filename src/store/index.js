import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'Home',
    appBarVisible: true,
    appNavVisible: true,
    appFooterVisible: true,

    user: {
      token: ''
    }

  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})