<template>
  <span>
    <canvas ref="canvas" class="game-canvas"></canvas>
  </span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InitialMenu from "./InitialMenu.vue";

@Component({ components: { InitialMenu } })
export default class GameCanvas extends Vue {
  private canvas!: HTMLCanvasElement;

  public mounted() {
    const h = window.innerHeight;
    const w = window.innerWidth;
    this.canvas = this.$refs.canvas as HTMLCanvasElement;
    this.canvas.width = w;
    this.canvas.height = h;
  }
}
</script>

<style scoped>
.game-canvas {
  margin: 0px;
  padding: 0px;
  border: 0px;
  height: 100%;
  width: 100%;
}
</style>
