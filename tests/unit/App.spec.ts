import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import UIRoot from "@/components/UIRoot.vue";
import GameRoot from "@/components/GameRoot.vue";
import "../test-setup";

describe("App", (): void => {
  beforeEach((): void => {});
  it("render UIRoot anytime", (): void => {
    // Given mounted UIRoot
    const wrapper = shallowMount(App);

    // Then UIRoot was contained
    expect(wrapper.contains(UIRoot)).toBe(true);
  });

  it("render GameRoot anytime", (): void => {
    // Given mounted UIRoot
    const wrapper = shallowMount(App);

    // Then GameRoot was contained
    expect(wrapper.contains(GameRoot)).toBe(true);
  });
});
