import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged: false
  },
  mutations: {
    setIsLogged(state, isLogged) {
      state.isLogged = isLogged
    }
  },
  actions: {
    setIsLogged({ commit }, isLogged) {
      commit('setIsLogged', isLogged)
    }
  },
  modules: {
  }
})
