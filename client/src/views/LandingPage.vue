<template>
  <div class="inputName">
    <form @submit.prevent="login" class="form shadow">
      <div>
        <input
          type="text"
          placeholder="Enter Your Name"
          class="form-control"
          v-model="name"
        />
      </div>

      <div>
        <button class="btn btn-secondary" type="submit">Join The Game</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    login() {
      this.$socket.emit("newPlayer", {
        name: this.name,
      });
    },
  },
  sockets: {
    afterClear(board) {
      this.$store.dispatch("populateBoards", board);
    },

    populatePlayer(player) {
      this.$store.dispatch("populatePlayers", player);
      localStorage.setItem("playerPlaying", this.name);
      this.$router.push("/play");
    },

    init(payload) {
      this.$store.dispatch("populatePlayers", payload.board);
      this.$store.dispatch("populateBoards", payload.players);
    }
  },
  computed: {
    // players: get()
  }
};
</script>

<style>
.form {
  display: flex;
  flex-direction: column;
  width: 40em;
  padding: 2em;
  margin: 0 auto;
}

.btn {
  margin-top: 2em;
}
</style>
