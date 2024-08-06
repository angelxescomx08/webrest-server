import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface CreateTodoUseCase {
  execute: (todo: CreateTodoDto) => Promise<TodoEntity>
}

export class CreateTodo implements CreateTodoUseCase {
  constructor(private readonly repository: TodoRepository) { }

  async execute(todo: CreateTodoDto): Promise<TodoEntity> {
    return this.repository.create(todo)
  }
}