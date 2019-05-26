import * as ex from "excalibur";

/**
 * Character explains actor like player character, enemy or etc..
 */
export class Character {
  /** Actor */
  public readonly actor: ex.Actor;

  public constructor(actor: ex.Actor) {
    this.actor = actor;
  }
}
