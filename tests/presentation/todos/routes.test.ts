import { prisma } from "../../../src/data/postgresql";
import { testServer } from "../../testServer";
import request from "supertest";

describe("Todos routes", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(async () => {
    await testServer.stop();
  });

  const todos = [{ text: "Todo 1" }, { text: "Todo 2" }];

  test("should return 200 when get all todos", async () => {
    await prisma.todo.deleteMany();
    await prisma.todo.createMany({
      data: todos,
    });
    const { body } = await request(testServer.app)
      .get("/api/todos")
      .expect(200);
    expect(body[0]).toEqual(
      expect.objectContaining({
        text: todos[0].text,
        completedAt: null,
        id: expect.any(Number),
      })
    );
    expect(body[1]).toEqual(
      expect.objectContaining({
        text: todos[1].text,
        completedAt: null,
        id: expect.any(Number),
      })
    );
    expect(body).toHaveLength(2);
  });
});
