import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: window.localStorage.getItem('username') == null ? '' : window.localStorage.getItem('username')
  },
  mutations: {
    login(state, user){
      state.username = user.username;
      window.localStorage.setItem('username', user.username);
    },
    logout(state){
      state.username = '';
      window.localStorage.removeItem('username');
    }
  },
  actions: {
  }
});
