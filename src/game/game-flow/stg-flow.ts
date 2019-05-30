import * as ex from "excalibur";
import { Character } from "../character";
import { CoordinatesConverter } from "../coordinates-converter";
import { PlayerInput } from "../player-input";

export interface STGFlowArgs {
  engine: ex.Engine;
  scene: ex.Scene;
  coordinatesConverter: CoordinatesConverter;
  playerCharacter: Character;
  playerInput: PlayerInput;
}

/**
 * STGFlow represent game flow in STG part.
 */
export class STGFlow {
  private readonly engine: ex.Engine;
  private readonly scene: ex.Scene;
  private readonly coordinatesConverter: CoordinatesConverter;
  /** Current player character */
  public playerCharacter: Character;
  private playerInput: PlayerInput;

  public constructor(args: STGFlowArgs) {
    this.engine = args.engine;
    this.scene = args.scene;
    this.coordinatesConverter = args.coordinatesConverter;
    this.playerCharacter = args.playerCharacter;
    this.playerInput = args.playerInput;

    this.engine.addScene("stg", this.scene);
  }

  /**
   * Start flow.
   */
  public async start(): Promise<void> {
    this.enableInput();

    // Setup player character
    this.scene.add(this.playerCharacter.actor);

    this.engine.goToScene("stg");
  }

  private enableInput(): void {
    this.playerInput.setPlayerCharacter(this.playerCharacter);
    this.playerInput.enableInput(this.engine.input);
  }
}
