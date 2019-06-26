<template>
  <span>
    <canvas ref="canvas" class="game-canvas"></canvas>
    <UIRoot key="ui-root" ref="ui-root" />
  </span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UIRoot from "./UIRoot.vue";
import * as ex from "excalibur";
import { GameManager } from "../game/game-manager";
import { RootFlowCreator } from "../game/game-flow/root-flow-creator";

@Component({ components: { UIRoot } })
export default class GameRoot extends Vue {
  private canvas!: HTMLCanvasElement;
  private uiRoot!: UIRoot;

  public mounted() {
    const h = window.innerHeight;
    const w = window.innerWidth;
    this.canvas = this.$refs.canvas as HTMLCanvasElement;
    this.canvas.width = w;
    this.canvas.height = h;

    this.uiRoot = this.$refs["ui-root"] as UIRoot;

    const gameManager = new GameManager(this.canvas);
    const flowCreator = new RootFlowCreator({
      gameManager,
      stgScene: new ex.Scene(gameManager.engine),
      initialMenuManager: this.uiRoot.initialMenuManager
    });
    const flow = flowCreator.createRootFlow();
    flow.play();
  }
}
</script>

<style scoped>
.game-canvas {
  position: fixed;
  top: 0px;
  left: 0px;
  margin: 0px;
  padding: 0px;
  border: 0px;
  height: 100%;
  width: 100%;
}
</style>
