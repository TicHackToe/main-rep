<template>
  <div class="container">
    <h1>TicHackToe</h1>

    <div v-if="players.length < 1">
      <h4>Waiting For Other To Join</h4>
    </div>
    <div v-else class="detail">
      <div v-for="(player, index) in players" :key="player.id">
        <div>
          Player {{ index + 1 }} : {{ player.name }} Piece Is
          {{ index == 1 ? "O" : "X" }}
        </div>
      </div>
      <div>
        <span v-if="winner.player">
          <h4>
            {{ winner.player == "X" ? players[0].name : players[1].name }} Is
            The Winner
          </h4>
        </span>
        <span v-else-if="draw"> It's A Draw </span>
        <span v-else>
          <h4>
            {{
              piece == "X" ? players[0].name : players[1].name || !winner.player
            }}
            turn
          </h4></span
        >
      </div>
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
  created() {},
  sockets: {
    init(payload) {
      this.$store.dispatch("populateBoards", payload);
    },
    afterClear(payload) {
      this.$store.dispatch("populateBoards", payload);
    },
    player(payload) {
      this.$store.dispatch("populateUsers", payload);
    },
  },
  methods: {
    fillBoard(position) {
      // emit ke server
      this.$socket.emit("updateBoard", {
        position,
        currentPlayer: this.piece,
        winner: this.winner.player,
      });

      this.$store.dispatch("fillBoard", {
        position,
        boardId: this.boards,
        winner: this.winner.player,
      });
    },
    clearBoard() {
      this.$store.dispatch("clearBoard");
      this.$socket.emit("clearBoard");
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
        return this.$store.state.players;
      },
    },
    piece: {
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

.detail {
  display: flex;
  flex-direction: column;
}
</style>
