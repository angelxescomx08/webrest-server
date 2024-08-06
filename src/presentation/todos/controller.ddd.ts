import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from '../../domain/repositories/todo.repository';

export class TodosController {

  constructor(
    private readonly todoRepository: TodoRepository
  ) { }

  public getTodos = async (req: Request, res: Response) => {
    try {
      const todos = await this.todoRepository.getAll()
      res.json(todos)
    } catch (error) {
      console.log(error);
      res.status(500).json({ error })
    }
  }

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id
    try {
      const todo = await this.todoRepository.findById(id)
      res.json(todo)
    } catch (error) {
      res.status(404).json({ error: 'Todo not found' })
    }
  }

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body)
    if (error) {
      return res.status(400).json({ error })
    }

    const todo = await this.todoRepository.create(createTodoDto!)
    res.status(201).json(todo)
  }

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })

    if (error) {
      return res.status(400).json({ error })
    }

    const updatedTodo = await this.todoRepository.updateById(updateTodoDto!)
    res.json(updatedTodo)
  }

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id

    const deletedTodo = await this.todoRepository.deleteById(id)
    res.json(deletedTodo)

  }
}