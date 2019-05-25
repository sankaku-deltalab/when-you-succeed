import { mount } from "@vue/test-utils";
import UIRoot from "@/components/UIRoot.vue";
import InitialMenu from "@/components/InitialMenu.vue";
import "../test-setup";

describe("UIRoot", (): void => {
  it("renders InitialMenu at first", (): void => {
    // Given mounted UIRoot
    const wrapper = mount(UIRoot);

    // Then InitialMenu was contained
    expect(wrapper.contains(InitialMenu)).toBe(true);
  });
});
