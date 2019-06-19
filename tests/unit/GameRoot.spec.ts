import { shallowMount } from "@vue/test-utils";
import GameRoot from "@/components/GameRoot.vue";
import "../test-setup";

describe("GameRoot", (): void => {
  it("renders window sized canvas", (): void => {
    // Given mounted GameRoot
    const wrapper = shallowMount(GameRoot);

    // Then renders window sized canvas
    const canvas = wrapper.find("canvas").element as HTMLCanvasElement;
    expect(canvas.width).toBe(window.innerWidth);
    expect(canvas.height).toBe(window.innerHeight);
  });
});
