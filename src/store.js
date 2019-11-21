import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: "",
    userLevel: "",
    showNavabar: true,
    items: [
      {
        text: '리뷰 작성',
        to: '/NewReview'
      },
      {
        text: '모든 리뷰',
        to: '/ReviewList'
      }
    ]
  },
  data: {

  },

  getters: {
    getShowNavbar: function (state) {
      return state.showNavabar;
    }

  },
  mutations: {
    updateShowNavbar: function (state, payload) {
      return state.showNavabar = payload
    },
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
    },
    setLevel(state, userLevel) {
      state.userLevel = userLevel
    }
  },
  actions: {
    getUser({ commit }, user, level) {
      commit('setUser', user)
      if (!user) return
      user.getIdToken()
        .then(token => {
          commit('setToken', token)
        })
        .catch(e)
        commit('setLevel', level)
    },
    getLevel({ commit }, userLevel) {
      commit('setLevel', userLevel)
    },
    afterLogout({ commit }, user) {
      commit('setUser', user)
      commit('setToken', user)
      commit('setLevel', user)
    }
  }
})
