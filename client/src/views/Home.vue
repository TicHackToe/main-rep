<template>
  <div>
    <h1>TicHackToe</h1>
    <div>
      <span v-if="winner.player"> {{ winner.player }} Is The Winner </span>
      <span v-else-if="draw"> It's A Draw </span>
      <span v-else>It's {{ players }} turn</span>
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
  methods: {
    fillBoard(position) {
      this.$store.dispatch("fillBoard", {position, winner : this.winner.player});
    },
  },
  computed: {
    winner() {
      return checkForWin(this.datas);
    },
    draw() {
      return this.datas.filter(el => !el).length == 0
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
  margin: 2em 20em 4em 20em;
  display: grid;
  grid-template-columns: auto auto auto;
}
</style>
