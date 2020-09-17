<template>
  <div class="squares" @click="tellPosition">
    <span> {{ data }} </span>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: ["data"],
  methods: {
    tellPosition() {
      this.$emit('tellPosition')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.squares {
  color: white;
  font-weight: bold;
  padding: 2em;
  background-color: #648a53;
  margin: 4px;
}
</style>
