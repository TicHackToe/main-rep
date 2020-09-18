import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    boardData: [],

    currentPlayer: '',
    player: "X",

    players: [],
    stats: [],

  },
  // setter
  mutations: {
    fill(state, position) {
      Vue.set(state.boardData, position, state.player)
    },
    player(state) {
      state.player = state.player == "X" ? "O" : "X"
    },
    boards(state, payload){
      state.boardData = payload.squares
    },
    SOCKET_updateBoard(state, payload){
      Vue.set(state.boardData, payload.position, payload.currentPlayer)
      state.player = state.player == "X" ? "O" : "X"
    },
    clearBoard(state) {
      state.boardData = Array(9).fill(null)
    },
    fillPlayer(state, payload) {
      state.players = payload
    }
  },
  // methods
  actions: {
    fillBoard(context, payload) {
      if(this.state.boardData[payload.position] != null || payload.winner != null){
        return
      }
      context.commit('fill', payload.position)
      context.commit('player')
    },
    populateBoards(context, payload) {
      context.commit('boards', payload)
    },
    clearBoard(context) {
      context.commit('clearBoard')
    },
    populatePlayers(context, payload) {
      context.commit('fillPlayer', payload)
    }
  },
  modules: {
  }
})
