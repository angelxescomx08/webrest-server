import { testServer } from "../../testServer";
import request from "supertest";

describe("Todos routes", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(async () => {
    await testServer.stop();
  });

  test("should return 200 when get all todos", async () => {
    await request(testServer.app).get("/api/todos").expect(200);
  });
});
