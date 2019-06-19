import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import GameRoot from "@/components/GameRoot.vue";
import "../test-setup";

describe("App", (): void => {
  it("render GameRoot anytime", (): void => {
    // Given mounted UIRoot
    const wrapper = shallowMount(App);

    // Then GameRoot was contained
    expect(wrapper.contains(GameRoot)).toBe(true);
  });
});
