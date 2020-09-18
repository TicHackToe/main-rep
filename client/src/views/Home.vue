<template>
  <div class="container">
    <h1>TicHackToe</h1>
    <div>
      <span v-if="winner.player"> {{ winner.player }} Is The Winner </span>
      <span v-else-if="draw"> It's A Draw </span>
      <span v-else>{{ players }} turn</span>
    </div>
    <div class="row">
      <Board
        v-for="(data, i) in datas"
        :key="i"
        :data="data"
        @tellPosition="fillBoard(i)"
      />
    </div>
    <div>
      <button class="button-clear" @click="clearBoard">Clear Board</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Board from "@/components/Board.vue";
import checkForWin from "../utils/winningCondition";

export default {
  name: "Home",
  components: {
    Board,
    checkForWin,
  },
  sockets: {
    init(payload) {
      this.$store.dispatch("populateBoards", payload);
    },
    afterClear(payload) {
      this.$store.dispatch("populateBoards", payload);
    }
  },
  methods: {
    fillBoard(position) {
      // emit ke server
      this.$socket.emit("updateBoard", {
        position,
        currentPlayer: this.players,
        winner: this.winner.player,
      });

      this.$store.dispatch("fillBoard", {
        position,
        boardId: this.boards,
        winner: this.winner.player,
      });
    },
    clearBoard() {
      this.$store.dispatch("clearBoard")
      this.$socket.emit("clearBoard")
    }
  },
  computed: {
    winner() {
      return checkForWin(this.datas);
    },
    draw() {
      return this.datas.filter((el) => !el).length == 0;
    },
    // getters
    boards: {
      get() {
        return this.$store.state.boards;
      },
    },
    datas: {
      get() {
        return this.$store.state.boardData;
      },
    },
    players: {
      get() {
        return this.$store.state.player;
      },
    },
  },
};
</script>

<style scoped>
.row {
  width: 25em;
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 0.5em;
  margin: 0 auto;
  border-radius: 10px;
  background-color: #505e78;
}

.button-clear {
  margin-top: 2em;
  background-color: #1e2229;
  color: white;
  font-size: 20px;
  padding: 0.6em;
  font-weight: bold;
  border-radius: 10px;
  border: none;
}
</style>
