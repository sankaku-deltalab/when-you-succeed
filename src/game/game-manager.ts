import * as ex from "excalibur";
import { CoordinatesConverter } from "./coordinates-converter";

export class GameManager {
  private readonly canvas: HTMLCanvasElement;
  private readonly engine: ex.Engine;
  private readonly cc: CoordinatesConverter;

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = this.createEngine(canvas);
    this.cc = this.createCoordinatesConverter(this.engine);
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

  /**
   * Create `CoordinatesConverter`.
   *
   * @param engine Engine used with game
   */
  private createCoordinatesConverter(engine: ex.Engine): CoordinatesConverter {
    const areaUnit = new ex.Vector(3, 4).scale(1 / 4);
    const canvasSize = new ex.Vector(engine.drawWidth, engine.drawHeight);
    const areaSize = Math.min(
      canvasSize.x / areaUnit.x,
      canvasSize.y / areaUnit.y
    );
    const visualAreaSize = areaUnit.scale(areaSize);
    const areaCenter = new ex.Vector(canvasSize.x / 2, areaSize / 2);
    return new CoordinatesConverter({
      areaSizeInCanvas: areaSize,
      visualAreaSizeInCanvas: visualAreaSize,
      centerInCanvas: areaCenter
    });
  }
}
