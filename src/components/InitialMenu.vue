<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-slide-x-reverse-transition>
          <v-card v-show="show">
            <v-card-title primary-title>
              <h1>When you succeed</h1>
            </v-card-title>
            <v-card-actions>
              <v-btn @click="callCallbackIfExist">Start</v-btn>
            </v-card-actions>
          </v-card>
        </v-slide-x-reverse-transition>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { promisify } from "util";
import { NodeCallback } from "@/util";
import { InitialMenuManager } from "@/game/ui-manager";

@Component({})
export default class InitialMenu extends Vue implements InitialMenuManager {
  public show: boolean = false;
  private startGameCallback: NodeCallback<
    Error | null,
    void,
    void
  > | void = undefined;

  public async playInitialMenu(): Promise<void> {
    this.show = true;
    const p = promisify(this.setStartGameCallback).bind(this);
    await p();
    this.show = false;
  }

  private setStartGameCallback(
    callback: NodeCallback<Error | null, void, void>
  ): void {
    if (this.startGameCallback !== undefined)
      throw new Error("Callback was already set");
    this.startGameCallback = callback;
  }

  private callCallbackIfExist(): void {
    if (this.startGameCallback === undefined) return;
    this.startGameCallback(null, undefined);
  }
}
</script>

<style scoped></style>
