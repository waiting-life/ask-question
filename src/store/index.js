import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      nickname: '',
      user_id: '',
      password: '',
      birthday: '',
      gender: '',
      signature: '',
      avatarUrl: ''
    },
    askDialogVisible: false,
    questionsInfo: [],
    currentTagIndex: 0,
    editBoxVisible: false
  },
  mutations: {
    showAskDialog(state) {
      state.askDialogVisible = true
    },
    hiddenAskDialog(state) {
      state.askDialogVisible = false
    },
    getUserInfo(state, payload) {
      state.userInfo.user_id = payload._id
      state.userInfo.nickname = payload.nickname
      state.userInfo.signature = payload.signature
      state.userInfo.avatarUrl = payload.avatarUrl
    },
    getQuestions(state, payload) {
      state.questionsInfo = payload
    },
    changeCurrentIndex(state, payload) {
      state.currentTagIndex = payload
    },
    updateUserInfo(state, payload) {
      state.userInfo.nickname = payload.nickname
      state.userInfo.signature = payload.signature
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
