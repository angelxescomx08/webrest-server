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

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  const todos = [{ text: "Todo 1" }, { text: "Todo 2" }];

  test("should return 200 when get all todos", async () => {
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

  test("Should return a TODO by id",async ()=>{
    const todoCreated = await prisma.todo.create({
      data: todos[0]
    })
    const { body } = await request(testServer.app)
      .get(`/api/todos/${todoCreated.id}`)
      .expect(200)
    expect(body).toEqual(todoCreated)
  })

  test("Should return 500 when TODO not found",async ()=>{
    const todoId = 99999
    const { body } = await request(testServer.app)
      .get(`/api/todos/${todoId}`)
      .expect(404)

    expect(body)
    .toEqual(expect.objectContaining({error: expect.any(Object)}))
  })

  test("Should create a TODO",async ()=>{
    const { body } = await request(testServer.app)
      .post(`/api/todos`)
      .send(todos[0])
      .expect(200)
    expect(body)
    .toEqual(expect.objectContaining({
      message: "Todo created successfully",
      todo: expect.objectContaining({
        text: todos[0].text,
        completedAt: null,
        id: expect.any(Number)
      })
    }))
  })

  test("Should not create a TODO with invalid data",async ()=>{
    const { body } = await request(testServer.app)
      .post(`/api/todos`)
      .send({})
      .expect(400)
    expect(body)
    .toEqual(expect.objectContaining({error: expect.any(String)}))
  })
});
