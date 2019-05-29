import * as ex from "excalibur";
import { Character, CharacterArgs } from "@/game/character";
import { CoordinatesConverter } from "@/game/coordinates-converter";
import { simpleMock } from "../../test-util";

const createMockArgs = (): CharacterArgs => ({
  actor: simpleMock<ex.Actor>(),
  coordinatesConverter: simpleMock<CoordinatesConverter>()
});

describe("Character", (): void => {
  it("has actor", (): void => {
    // Given args
    const args = createMockArgs();

    // When construct character
    const character = new Character(args);

    // Then character has actor
    expect(character.actor).toBe(args.actor);
  });

  it("represent location as area", (): void => {
    // Given character with args
    const expectedLoc = { x: 3, y: 4 };
    const args = createMockArgs();
    args.actor.x = 1;
    args.actor.y = 2;
    args.coordinatesConverter.toAreaPoint = jest
      .fn()
      .mockReturnValueOnce(expectedLoc);
    const character = new Character(args);

    // When get character location in area
    const location = character.location;

    // Then character deal location from canvas location
    expect(location.x).toBe(expectedLoc.x);
    expect(location.y).toBe(expectedLoc.y);
    expect(args.coordinatesConverter.toAreaPoint).toBeCalledWith({
      x: args.actor.x,
      y: args.actor.y
    });
  });
});
