import { prisma } from "../../data/postgresql";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";

export class TodoDatasourceImpl extends TodoDatasource {

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto!
    })

    return TodoEntity.fromObject(todo)
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany({
      orderBy: {
        id: 'desc'
      }
    })
    return todos.map(todo => TodoEntity.fromObject(todo))
  }

  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findUnique({
      where: {
        id
      }
    })
    if (!todo) {
      throw new Error('Todo not found')
    }
    return TodoEntity.fromObject(todo)
  }

  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById(updateTodoDto.id)

    const todo = await prisma.todo.update({
      where: {
        id: updateTodoDto.id
      },
      data: updateTodoDto.values
    })

    return TodoEntity.fromObject(todo)
  }

  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id)

    const todo = await prisma.todo.delete({
      where: {
        id
      }
    })

    return TodoEntity.fromObject(todo)
  }

}