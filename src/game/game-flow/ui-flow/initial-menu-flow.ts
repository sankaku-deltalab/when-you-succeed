import { InitialMenuManager } from "@/game/ui-manager";

/**
 * InitialMenuFlow represent ui played after just started game.
 */
export class InitialMenuFlow {
  private readonly menuManager: InitialMenuManager;

  public constructor(menuManager: InitialMenuManager) {
    this.menuManager = menuManager;
  }

  public async play(): Promise<void> {
    await this.menuManager.playInitialMenu();
  }
}
