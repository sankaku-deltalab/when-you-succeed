import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import UIRoot from "@/components/UIRoot.vue";
import GameCanvas from "@/components/GameCanvas.vue";
import "../test-setup";

describe("App", (): void => {
  beforeEach((): void => {});
  it("render UIRoot anytime", (): void => {
    // Given mounted UIRoot
    const wrapper = shallowMount(App);

    // Then UIRoot was contained
    expect(wrapper.contains(UIRoot)).toBe(true);
  });

  it("render GameCanvas anytime", (): void => {
    // Given mounted UIRoot
    const wrapper = shallowMount(App);

    // Then GameCanvas was contained
    expect(wrapper.contains(GameCanvas)).toBe(true);
  });
});
