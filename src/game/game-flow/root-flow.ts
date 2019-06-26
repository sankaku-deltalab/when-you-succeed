import { GameManager } from "../game-manager";
import { STGFlow } from "./stg-flow";
import { InitialMenuFlow } from "./ui-flow/initial-menu-flow";

export interface RootFlowArgs {
  gameManager: GameManager;
  stgFlow: STGFlow;
  initialMenuFlow: InitialMenuFlow;
}

/**
 * STGFlow represent game flow in STG part.
 */
export class RootFlow {
  private readonly gameManager: GameManager;
  private readonly stgFlow: STGFlow;
  private readonly initialMenuFlow: InitialMenuFlow;

  public constructor(args: RootFlowArgs) {
    this.gameManager = args.gameManager;
    this.stgFlow = args.stgFlow;
    this.initialMenuFlow = args.initialMenuFlow;
  }

  /**
   * Start game.
   */
  public async play(): Promise<void> {
    await this.initialMenuFlow.play();

    this.stgFlow.start();
  }
}
