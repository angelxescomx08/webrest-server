import { envs } from "../src/config/envs";
import { Server } from "../src/presentation/server";

// Crea un mock de la clase Server
jest.mock("../src/presentation/server");

describe("App", () => {
  it("should work", async () => {
    await import("../src/app");
    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      public_path: envs.PUBLIC_PATH,
      routes: expect.any(Function),
    });
  });
});