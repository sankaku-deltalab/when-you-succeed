import * as ex from "excalibur";

export class GameManager {
  private readonly canvas: HTMLCanvasElement;
  private readonly engine: ex.Engine;

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = this.createEngine(canvas);

    // TODO: 4:3のフィールドを作る
  }

  /**
   * Create `ex.Engine` with canvas.
   *
   * @param canvas Canvas used with game
   */
  private createEngine(canvas: HTMLCanvasElement): ex.Engine {
    // Override document.getElementById
    // because ex.Engine use it but vue override it
    const originalGetElementById = document.getElementById;
    document.getElementById = (): HTMLElement => canvas;

    const game = new ex.Engine({
      width: canvas.width,
      height: canvas.height,
      canvasElementId: "__anyId",
      pointerScope: ex.Input.PointerScope.Canvas,
      backgroundColor: ex.Color.DarkGray,
      suppressConsoleBootMessage: true
    });

    document.getElementById = originalGetElementById;

    return game;
  }
}
