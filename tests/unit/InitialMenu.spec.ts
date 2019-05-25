import { mount } from "@vue/test-utils";
import InitialMenu from "@/components/InitialMenu.vue";
import "../test-setup";

describe("InitialMenu.vue", (): void => {
  it("renders start button", (): void => {
    // Given mounted InitialMenu
    const wrapper = mount(InitialMenu);

    // Then button was contained
    expect(wrapper.contains("button")).toBe(true);
  });

  it("emit start game event when button was clicked", (): void => {
    // Given mounted InitialMenu
    const wrapper = mount(InitialMenu);

    // When click button
    wrapper.find("button").trigger("click");

    // Then start event was emit
    expect(wrapper.emitted()["start-game"]).toBeTruthy();
  });
});
