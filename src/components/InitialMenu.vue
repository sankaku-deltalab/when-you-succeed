<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <h1>When you succeed</h1>
      </v-card-title>

      <v-card-actions>
        <v-btn @click="startGame">Start</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component
export default class InitialMenu extends Vue {
  @Emit()
  private startGame(): void {}
}
</script>

<style scoped></style>
