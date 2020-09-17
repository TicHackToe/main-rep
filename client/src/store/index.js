import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    boardData: Array(9).fill(null),
    player: "X"
  },
  mutations: {
    fill(state, position) {
      Vue.set(state.boardData, position, state.player)
    },
    player(state) {
      state.player = state.player == "X" ? "O" : "X"
    }
  },
  actions: {
    fillBoard(context, payload) {
      if(this.state.boardData[payload.position] != null || payload.winner != null){
        return
      }
      context.commit('fill', payload.position)
      context.commit('player')
    }
  },
  modules: {
  }
})
