import * as ex from "excalibur";
import { RootFlow } from "./root-flow";
import { CoordinatesConverter } from "../coordinates-converter";
import { Character } from "../character";
import { STGFlow } from "./stg-flow";
import { PlayerInput } from "../player-input";
import { InitialMenuFlow } from "./ui-flow/initial-menu-flow";
import { GameManager } from "../game-manager";
import { InitialMenuManager } from "../ui-manager";

export interface RootFlowCreatorArgs {
  gameManager: GameManager;
  stgScene: ex.Scene;
  initialMenuManager: InitialMenuManager;
}

export class RootFlowCreator {
  private readonly args: RootFlowCreatorArgs;

  public constructor(args: RootFlowCreatorArgs) {
    this.args = args;
  }

  public createRootFlow(): RootFlow {
    const stgFlow = this.createSTGFlow();
    const initialMenuFlow = new InitialMenuFlow(this.args.initialMenuManager);
    return new RootFlow({
      initialMenuFlow,
      stgFlow,
      gameManager: this.args.gameManager
    });
  }

  private createSTGFlow(): STGFlow {
    const cc = this.args.gameManager.coordinatesConverter;
    const pc = this.createPlayerCharacter(cc);
    const playerInput = new PlayerInput(cc);
    return new STGFlow({
      playerInput,
      engine: this.args.gameManager.engine,
      scene: this.args.stgScene,
      coordinatesConverter: cc,
      playerCharacter: pc
    });
  }

  private createPlayerCharacter(cc: CoordinatesConverter): Character {
    const pcLoc = { x: -0.25, y: 0 };
    const pcLocCanvas = cc.toCanvasPoint(pcLoc);
    const pcActor = new ex.Actor({
      width: 50,
      height: 50,
      color: ex.Color.Cyan,
      ...pcLocCanvas
    });
    return new Character({
      actor: pcActor,
      coordinatesConverter: cc
    });
  }
}
