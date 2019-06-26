<template>
  <div id="app">
    <GameRoot key="game-root" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GameRoot from "./components/GameRoot.vue";

@Component({
  components: {
    GameRoot
  }
})
export default class App extends Vue {}
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
  overflow: hidden;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0px;
}

#ui-root {
  position: absolute;
  margin: 0px;
  padding: 0px;
  border: 0px;
}

#game-canvas {
  position: absolute;
  top: 0px;
  left: 0px;
  margin: 0px;
  padding: 0px;
  border: 0px;
}
</style>
