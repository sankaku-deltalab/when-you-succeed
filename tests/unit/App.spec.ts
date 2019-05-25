import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import UIRoot from "@/components/UIRoot.vue";
import GameCanvas from "@/components/GameCanvas.vue";
import "../test-setup";

describe("APP", (): void => {
  it("render UIRoot anytime", (): void => {
    // Given mounted UIRoot
    const wrapper = mount(App);

    // Then UIRoot was contained
    expect(wrapper.contains(UIRoot)).toBe(true);
  });

  it("render GameCanvas anytime", (): void => {
    // Given mounted UIRoot
    const wrapper = mount(App);

    // Then GameCanvas was contained
    expect(wrapper.contains(GameCanvas)).toBe(true);
  });
});
