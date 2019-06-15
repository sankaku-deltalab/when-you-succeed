import * as ex from "excalibur";
import { Character } from "./character";
import { CoordinatesConverter } from "./coordinates-converter";

/**
 * Receive input and apply input to player.
 */
export class PlayerInput {
  private oldTouchPosition: ex.Vector | null;
  private playerCharacter: Character | null;
  private readonly coordinatesConverter: CoordinatesConverter;

  public constructor(coordinatesConverter: CoordinatesConverter) {
    this.oldTouchPosition = null;
    this.playerCharacter = null;
    this.coordinatesConverter = coordinatesConverter;
  }

  /**
   * Set player character.
   *
   * @param pc Player character
   */
  public setPlayerCharacter(pc: Character): void {
    this.playerCharacter = pc;
  }

  /**
   * Enable input from engine.
   *
   * @param engineInput
   */
  public enableInput(engineInput: ex.Input.EngineInput): void {
    engineInput.pointers.primary.on("down", (ev): void => {
      if (!(ev instanceof ex.Input.PointerEvent))
        throw new Error("Pointer down event is not exist");
      this.pointerDownAt(ev.pos);
    });
    engineInput.pointers.primary.on("up", (ev): void => {
      if (!(ev instanceof ex.Input.PointerEvent))
        throw new Error("Pointer up event is not exist");
      this.pointerUp();
    });
    engineInput.pointers.primary.on("move", (ev): void => {
      if (!(ev instanceof ex.Input.PointerEvent))
        throw new Error("Pointer move event is not exist");
      this.pointerMoveTo(ev.pos);
    });
  }

  /**
   * Notify pointer down.
   *
   * @param pos Pointer downed position
   */
  public pointerDownAt(pos: ex.Vector): void {
    this.oldTouchPosition = pos;
  }

  /**
   * Notify pointer up.
   */
  public pointerUp(): void {
    this.oldTouchPosition = null;
  }

  /**
   * Notify pointer moved.
   *
   * @param pos Pointer moved position
   */
  public pointerMoveTo(pos: ex.Vector): void {
    if (this.oldTouchPosition === null) {
      return;
    }
    const delta = pos.sub(this.oldTouchPosition);
    this.oldTouchPosition = pos;

    if (this.playerCharacter === null) return;
    const destInCanvas = this.playerCharacter.actor.pos.add(delta);
    const newPosInCanvasClamped = this.coordinatesConverter.clampCanvasPointInVisualArea(
      destInCanvas
    );
    this.playerCharacter.actor.pos = new ex.Vector(
      newPosInCanvasClamped.x,
      newPosInCanvasClamped.y
    );
  }
}
