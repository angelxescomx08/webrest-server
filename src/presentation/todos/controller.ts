import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, UpdateTodo } from "../../domain";

export class TodosController {

  constructor(
    private readonly todoRepository: TodoRepository
  ) { }

  public getTodos = async (req: Request, res: Response) => {
    new GetTodos(this.todoRepository).execute()
      .then(todos => res.json(todos))
      .catch(error => res.status(500).json({ error }))
  }

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id
    new GetTodo(this.todoRepository).execute(id)
      .then(todo => res.json(todo))
      .catch(error => res.status(404).json({ error }))
  }

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body)
    if (error) {
      return res.status(400).json({ error })
    }

    new CreateTodo(this.todoRepository).execute(createTodoDto!)
      .then(todo => res.json({
        message: 'Todo created successfully',
        todo
      }))
      .catch(error => res.status(500).json({ error }))
  }

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })

    if (error) {
      return res.status(400).json({ error })
    }

    new UpdateTodo(this.todoRepository).execute(updateTodoDto!)
      .then(todo => res.json({
        message: 'Todo updated successfully',
        todo
      }))
      .catch(error => res.status(500).json({ error }))
  }

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id

    new DeleteTodo(this.todoRepository).execute(id)
      .then((todo) => res.json({ 
        message: 'Todo deleted successfully', todo 
      }))
      .catch(error => res.status(500).json({ error }))

  }
}