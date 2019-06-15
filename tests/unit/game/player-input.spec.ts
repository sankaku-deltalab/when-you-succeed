import * as mat from "transformation-matrix";
import * as ex from "excalibur";
import { Character } from "@/game/character";
import { PlayerInput } from "@/game/player-input";
import { simpleMock } from "../../test-util";
import { CoordinatesConverter } from "@/game/coordinates-converter";

const createMockEngineInput = (): ex.Input.EngineInput => {
  const engineInput = simpleMock<ex.Input.EngineInput>();
  engineInput.pointers = simpleMock();
  engineInput.pointers.primary = simpleMock();
  engineInput.pointers.primary.on = jest.fn();
  return engineInput;
};

const createMockCharacter = (): Character => {
  const characterClass = jest.fn((): { actor: ex.Actor } => ({
    actor: simpleMock<ex.Actor>()
  }));
  return new characterClass() as Character;
};

const createMockCoordinatesConverter = (): CoordinatesConverter => {
  const cc = simpleMock<CoordinatesConverter>();
  cc.clampCanvasPointInVisualArea = jest
    .fn()
    .mockImplementation((point: mat.Point): mat.Point => point);
  return cc;
};

describe("PlayerInput", (): void => {
  it("receive pointer input when constructed", (): void => {
    // Given EngineInput
    const engineInput = createMockEngineInput();

    // And CoordinatesConverter
    const cc = createMockCoordinatesConverter();

    // And construct PlayerInput
    const playerInput = new PlayerInput(cc);

    // When enable PlayerInput
    playerInput.enableInput(engineInput);

    // Then receive input
    expect(engineInput.pointers.primary.on).toBeCalled();
  });

  it("move player character when downed pointer moved", (): void => {
    // Given character as player character
    const initialActorPos = new ex.Vector(80, 90);
    const pc = createMockCharacter();
    pc.actor.pos = initialActorPos;

    // And CoordinatesConverter
    const cc = createMockCoordinatesConverter();

    // And construct PlayerInput
    const playerInput = new PlayerInput(cc);

    // When set player character
    playerInput.setPlayerCharacter(pc);

    // And down pointer
    const downPos = new ex.Vector(5, 6);
    playerInput.pointerDownAt(downPos);

    // And move pointer
    const moveDest = new ex.Vector(7, 8);
    playerInput.pointerMoveTo(moveDest);

    // Then character was moved
    const delta = moveDest.sub(downPos);
    expect(pc.actor.pos).toEqual(initialActorPos.add(delta));
  });

  it("do not move player character when upped pointer moved", (): void => {
    // Given character as player character
    const initialActorPos = new ex.Vector(80, 90);
    const pc = createMockCharacter();
    pc.actor.pos = initialActorPos;

    // And CoordinatesConverter
    const cc = createMockCoordinatesConverter();

    // And construct PlayerInput
    const playerInput = new PlayerInput(cc);

    // When set player character
    playerInput.setPlayerCharacter(pc);

    // And down pointer
    const downPos = new ex.Vector(5, 6);
    playerInput.pointerDownAt(downPos);

    // And up pointer
    playerInput.pointerUp();

    // And move pointer
    const moveDest = new ex.Vector(7, 8);
    playerInput.pointerMoveTo(moveDest);

    // Then character was not moved
    expect(pc.actor.pos).toEqual(initialActorPos);
  });

  it("move player character in visual area", (): void => {
    // Given character as player character
    const initialActorPos = new ex.Vector(0, 1);
    const pc = createMockCharacter();
    pc.actor.pos = initialActorPos;

    // And CoordinatesConverter
    const cc = new CoordinatesConverter({
      areaSizeInCanvas: 10,
      visualAreaSizeInCanvas: { x: 100, y: 100 },
      centerInCanvas: { x: 50, y: 50 }
    });

    // And construct PlayerInput
    const playerInput = new PlayerInput(cc);

    // When set player character
    playerInput.setPlayerCharacter(pc);

    // And down pointer
    const downPos = new ex.Vector(0, 0);
    playerInput.pointerDownAt(downPos);

    // And move pointer
    const moveDest = new ex.Vector(200, 0);
    playerInput.pointerMoveTo(moveDest);

    // Then character was moved in visual area
    const actualClampedPoint = new ex.Vector(100, 1);
    expect(pc.actor.pos.x).toBeCloseTo(actualClampedPoint.x);
    expect(pc.actor.pos.y).toBeCloseTo(actualClampedPoint.y);
  });
});
