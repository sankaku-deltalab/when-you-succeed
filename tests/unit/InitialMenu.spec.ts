import { mount } from "@vue/test-utils";
import InitialMenu from "@/components/InitialMenu.vue";
import { InitialMenuManager } from "@/game/ui-manager";
import "../test-setup";

describe("InitialMenu.vue", (): void => {
  it("renders start button", (): void => {
    // Given mounted InitialMenu
    const wrapper = mount(InitialMenu);

    // Then button was contained
    expect(wrapper.contains("button")).toBe(true);
  });

  it("finish flow when button pressed", async (): Promise<void> => {
    // Given mounted InitialMenu
    const wrapper = mount(InitialMenu);
    const menu = wrapper.vm as InitialMenuManager;

    // When play flow
    const flow = menu.playInitialMenu();

    // And click button
    wrapper.find("button").trigger("click");

    // Then flow was finished
    await flow; // If flow was finished, then Promise was not ended
  });
});
