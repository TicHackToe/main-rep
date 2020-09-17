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
  created() {
    // this.$socket.
    console.log(this.boards);
  },
  sockets: {
    init(payload) {
      this.$store.dispatch("populateBoards", payload);
    },
  },
  methods: {
    fillBoard(position) {
      // emit ke server
      this.$socket.emit("updateBoard", {
        position,
        currentPlayer: this.players,
      });

      this.$store.dispatch("fillBoard", {
        position,
        boardId: this.boards,
        winner: this.winner.player,
      });
    },
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
</style>
