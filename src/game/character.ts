import * as ex from "excalibur";
import { CoordinatesConverter } from "@/game/coordinates-converter";

export interface CharacterArgs {
  actor: ex.Actor;
  coordinatesConverter: CoordinatesConverter;
}

/**
 * Character explains actor like player character, enemy or etc..
 */
export class Character {
  /** Actor */
  public readonly actor: ex.Actor;
  private readonly coordinatesConverter: CoordinatesConverter;

  public constructor(args: CharacterArgs) {
    this.actor = args.actor;
    this.coordinatesConverter = args.coordinatesConverter;
  }

  public get location(): ex.Vector {
    const loc = this.coordinatesConverter.toAreaPoint({
      x: this.actor.x,
      y: this.actor.y
    });
    return new ex.Vector(loc.x, loc.y);
  }
}
