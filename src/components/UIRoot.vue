<template>
  <div>
    <v-slide-x-reverse-transition>
      <InitialMenu
        v-on:start-game="menu = MenuMode.noMenu"
        v-show="menu === MenuMode.initialMenu"
      />
    </v-slide-x-reverse-transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InitialMenu from "./InitialMenu.vue";

enum MenuMode {
  noMenu = "noMenu",
  initialMenu = "initialMenu"
}

@Component({ components: { InitialMenu } })
export default class UIRoot extends Vue {
  private MenuMode = MenuMode;
  private menu: MenuMode = MenuMode.initialMenu;
}
</script>

<style scoped></style>
