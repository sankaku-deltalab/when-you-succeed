import * as mat from "transformation-matrix";

const pointToArray = (p: mat.Point): [number, number] => [p.x, p.y];

export interface CoordinatesConverterArgs {
  /** Square area size in canvas.  */
  areaSizeInCanvas: number;
  /** Visual area size in canvas (x: right, y: under) */
  visualAreaSizeInCanvas: mat.Point;
  /** Area center location in canvas (x: right, y: under) */
  centerInCanvas: mat.Point;
}

/**
 * Convert area (:= [-0.5, 0.5]^2) coordinates (x: upper, y: right) to
 * specified canvas coordinates (x: right, y: under).
 *
 * CoordinatesConverter define "area" and "visual area".
 * Area is square, but visual area is rectangle.
 */
export class CoordinatesConverter {
  private readonly areaToCanvasTrans: mat.Matrix;
  private readonly visualAreaToCanvasTrans: mat.Matrix;

  public constructor(args: CoordinatesConverterArgs) {
    this.areaToCanvasTrans = mat.transform(
      mat.translate(...pointToArray(args.centerInCanvas)),
      mat.scale(args.areaSizeInCanvas),
      mat.rotateDEG(-90)
    );
    this.visualAreaToCanvasTrans = mat.transform(
      mat.translate(...pointToArray(args.centerInCanvas)),
      mat.scale(...pointToArray(args.visualAreaSizeInCanvas)),
      mat.rotateDEG(-90)
    );
  }

  /**
   * Convert area point to canvas point.
   *
   * @param pointInField Point in square field
   */
  public toCanvasPoint(pointInField: mat.Point): mat.Point {
    return mat.applyToPoint(this.areaToCanvasTrans, pointInField);
  }

  /**
   * Convert area point to canvas point.
   *
   * @param pointInVisualField Point in square field
   */
  public toCanvasPointFromVisualArea(pointInVisualField: mat.Point): mat.Point {
    return mat.applyToPoint(this.visualAreaToCanvasTrans, pointInVisualField);
  }

  /**
   * Convert canvas point to area point.
   *
   * @param pointInCanvas Point in square field
   */
  public toAreaPoint(pointInCanvas: mat.Point): mat.Point {
    return mat.applyToPoint(mat.inverse(this.areaToCanvasTrans), pointInCanvas);
  }
}
