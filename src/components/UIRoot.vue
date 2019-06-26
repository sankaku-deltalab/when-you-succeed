<template>
  <span>
    <InitialMenu ref="initial-menu" />
  </span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InitialMenu from "./InitialMenu.vue";
import { InitialMenuManager } from "@/game/ui-manager";

@Component({ components: { InitialMenu } })
export default class UIRoot extends Vue {
  public initialMenuManager!: InitialMenuManager;

  public mounted(): void {
    this.initialMenuManager = this.$refs["initial-menu"] as InitialMenu;
  }
}
</script>

<style scoped></style>
