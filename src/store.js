import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  },
  mutations: {
    changeUser(state, newUser) {
      state.user = newUser;
    },
  },
  actions: {
    changeUser(context, user) {
      context.commit('changeUser', user);
    }
  }
})
