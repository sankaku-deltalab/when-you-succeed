import { mount } from "@vue/test-utils";
import GameCanvas from "@/components/GameCanvas.vue";
import "../test-setup";

describe("GameCanvas", (): void => {
  it("renders window sized canvas", (): void => {
    // Given mounted GameCanvas
    const wrapper = mount(GameCanvas);

    // Then renders window sized canvas
    const canvas = wrapper.find("canvas").element as HTMLCanvasElement;
    expect(canvas.width).toBe(window.innerWidth);
    expect(canvas.height).toBe(window.innerHeight);
  });
});
