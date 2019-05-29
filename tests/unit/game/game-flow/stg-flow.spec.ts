import * as ex from "excalibur";
import { Character } from "@/game/character";
import { STGFlow, STGFlowArgs } from "@/game/game-flow/stg-flow";
import { CoordinatesConverter } from "@/game/coordinates-converter";
import { simpleMock } from "../../../test-util";

const createMockEngine = (): ex.Engine => {
  const engine = simpleMock<ex.Engine>();
  engine.addScene = jest.fn();
  engine.goToScene = jest.fn();
  return engine;
};

const createMockScene = (): ex.Scene => {
  const scene = simpleMock<ex.Scene>();
  scene.add = jest.fn();
  return scene;
};

const createMockArgs = (): STGFlowArgs => ({
  engine: createMockEngine(),
  scene: createMockScene(),
  coordinatesConverter: simpleMock<CoordinatesConverter>(),
  playerCharacter: simpleMock<Character>()
});

describe("STGFlow", (): void => {
  it("add scene to engine when constructed", (): void => {
    // Given STGFlow args
    const args = createMockArgs();

    // When create STGFlow
    new STGFlow(args);

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
    expect(flow.playerCharacter).not.toBe(undefined);
  });

  it("goto scene when start", (): void => {
    // Given STGFlow args
    const args = createMockArgs();

    // And STGFlow
    const flow = new STGFlow(args);

    // When start flow
    flow.start();

    // Then player character was spawned
    expect(args.engine.goToScene).toBeCalledWith("stg");
  });
});
