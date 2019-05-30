import * as ex from "excalibur";
import { Character } from "@/game/character";
import { STGFlow, STGFlowArgs } from "@/game/game-flow/stg-flow";
import { CoordinatesConverter } from "@/game/coordinates-converter";
import { PlayerInput } from "@/game/player-input";
import { simpleMock } from "../../../test-util";

const createMockEngine = (): ex.Engine => {
  const engine = simpleMock<ex.Engine>();
  engine.addScene = jest.fn();
  engine.goToScene = jest.fn();
  engine.input = simpleMock();
  return engine;
};

const createMockScene = (): ex.Scene => {
  const scene = simpleMock<ex.Scene>();
  scene.add = jest.fn();
  return scene;
};

const createMockPlayerInput = (): PlayerInput => {
  const playerInput = simpleMock<PlayerInput>();
  playerInput.enableInput = jest.fn();
  playerInput.setPlayerCharacter = jest.fn();
  return playerInput;
};

const createMockArgs = (): STGFlowArgs => ({
  engine: createMockEngine(),
  scene: createMockScene(),
  coordinatesConverter: simpleMock<CoordinatesConverter>(),
  playerCharacter: simpleMock<Character>(),
  playerInput: createMockPlayerInput()
});

describe("STGFlow", (): void => {
  it("add scene to engine when start", (): void => {
    // Given STGFlow args
    const args = createMockArgs();

    // And STGFlow
    const flow = new STGFlow(args);

    // When start flow
    flow.start();

    // Then player character was spawned
    expect(args.engine.addScene).toBeCalledWith("stg", args.scene);
  });

  it("add player character to scene when start", (): void => {
    // Given STGFlow args
    const args = createMockArgs();

    // And STGFlow
    const flow = new STGFlow(args);

    // When start flow
    flow.start();

    // Then player character was spawned
    expect(flow.playerCharacter).toBeDefined();
  });

  it("goto scene when start", (): void => {
    // Given STGFlow args
    const args = createMockArgs();

    // And STGFlow
    const flow = new STGFlow(args);

    // When start flow
    flow.start();

    // Then scene was go to stg
    expect(args.engine.goToScene).toBeCalledWith("stg");
  });

  it("use PlayerInput when start", (): void => {
    // Given STGFlow args
    const args = createMockArgs();

    // And STGFlow
    const flow = new STGFlow(args);

    // When start flow
    flow.start();

    // Then PlayerInput was enabled
    expect(args.playerInput.enableInput).toBeCalledWith(args.engine.input);

    // And PlayerInput set player character
    expect(args.playerInput.setPlayerCharacter).toBeCalledWith(
      args.playerCharacter
    );
  });
});
