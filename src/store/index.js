import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      nickname: '',
      user_id: ''
    },
    askDialogVisible: false,
    questionsInfo: [],
    currentTagIndex: 0
  },
  mutations: {
    showAskDialog(state) {
      state.askDialogVisible = true
    },
    hiddenAskDialog(state) {
      state.askDialogVisible = false
    },
    getUserInfo(state, payload) {
      state.userInfo.user_id = payload.user_id
      state.userInfo.nickname = payload.nickname
    },
    getQuestions(state, payload) {
      state.questionsInfo = payload
    },
    changeCurrentIndex(state, payload) {
      state.currentTagIndex = payload
    }
  },
  actions: {
    async getQuestions({commit}) {
      const res = await fetch('/allQuestions')
      const result = await res.json()
      commit('getQuestions', result.data[0])
    },
    // async addQuestion({commit, state}) {
    //   await fetch('/addQuestion', {
    //     method: 'POST',
    //     body: JSON.stringify(state.message),
    //     headers: {
    //       'Content-Type': 'application/json; charset=utf-8'
    //     }
    //   })
    //   commit()
    // },
  },
  modules: {
  }
})
