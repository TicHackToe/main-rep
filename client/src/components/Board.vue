<template>
  <div
    class="squares"
    @click="tellPosition"
    :class="{ 'squares---x': data === 'X', 'squares---o': data === 'O' }"
  >
    <span class="text"> {{ data }} </span>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: ["data"],
  computed: {
    playing() {
      return localStorage.getItem("playerPlaying");
    },
  },
  methods: {
    tellPosition() {
      this.$emit("tellPosition");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.squares {
  height: 2em;
  color: white;
  font-weight: bold;
  font-size: 40px;
  padding: 0.2em;
  background-color: #1e2229;
  border: 1px solid #57698a;
}

.squares:hover {
  background-color: #2e3542;
  cursor: grab;
}

.squares---x {
  color: white;
  -webkit-animation: glow 2s ease-in-out infinite alternate;
  -moz-animation: glow 2s ease-in-out infinite alternate;
  animation: glow 2s ease-in-out infinite alternate;
}

.squares---o {
  color: white;
  -webkit-animation: glaw 2s ease-in-out infinite alternate;
  -moz-animation: glaw 2s ease-in-out infinite alternate;
  animation: glaw 2s ease-in-out infinite alternate;
}

@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #2470c7,
      0 0 40px #2470c7, 0 0 50px #2470c7, 0 0 60px #2470c7, 0 0 70px #2470c7;
  }
  to {
    text-shadow: 0 0 20px #fff, 0 0 30px #2470c7, 0 0 40px #2470c7,
      0 0 50px #2470c7, 0 0 60px #2470c7, 0 0 70px #2470c7, 0 0 80px #2470c7;
  }
}

@-webkit-keyframes glaw {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #b03743,
      0 0 40px #b03743, 0 0 50px #b03743, 0 0 60px #b03743, 0 0 70px #b03743;
  }
  to {
    text-shadow: 0 0 20px #fff, 0 0 30px #b03743, 0 0 40px #b03743,
      0 0 50px #b03743, 0 0 60px #b03743, 0 0 70px #b03743, 0 0 80px #b03743;
  }
}
</style>
