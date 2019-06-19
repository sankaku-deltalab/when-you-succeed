<template>
  <span>
    <canvas ref="canvas" class="game-canvas"></canvas>
    <UIRoot key="ui-root" />
  </span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UIRoot from "./UIRoot.vue";
import { GameManager } from "../game/game-manager";

@Component({ components: { UIRoot } })
export default class GameRoot extends Vue {
  private canvas!: HTMLCanvasElement;

  public mounted() {
    const h = window.innerHeight;
    const w = window.innerWidth;
    this.canvas = this.$refs.canvas as HTMLCanvasElement;
    this.canvas.width = w;
    this.canvas.height = h;

    const game = new GameManager(this.canvas);
    game.start();
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
