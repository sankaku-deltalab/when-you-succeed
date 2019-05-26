import * as ex from "excalibur";
import { Character } from "@/game/character";
import { simpleMock } from "tests/test-util";

describe("Character", (): void => {
  it("has actor", (): void => {
    // Given actor
    const actor = simpleMock<ex.Actor>();

    // When construct character
    const character = new Character(actor);

    // Then actor has actor
    expect(character.actor).toBe(actor);
  });
});
