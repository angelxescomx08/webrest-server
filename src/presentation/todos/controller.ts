import { Request, Response } from "express";
import { prisma } from "../../data/postgresql";

const todos = [
  { id: 1, text: "Buy some milk", createdAt: new Date() },
  { id: 2, text: "Pick up the kids", createdAt: new Date() },
  { id: 3, text: "Get to work", createdAt: new Date() }
]

export class TodosController {
  public getTodos(req: Request, res: Response) {
    res.json(todos)
  }

  public getTodoById(req: Request, res: Response) {
    const id = req.params.id
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'Missing todo id' })
    }
    const todo = todos.find(todo => todo.id === parseInt(id))
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' })
    }
    res.json(todo)
  }

  public async createTodo(req: Request, res: Response) {
    const { text } = req.body

    if (!text) {
      return res.status(400).json({ error: 'Missing todo text' })
    }

    const todo = await prisma.todo.create({
      data: {
        text
      }
    })

    res.status(201).json(todo)
  }

  public updateTodo(req: Request, res: Response) {
    const id = req.params.id
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'Missing todo id' })
    }
    const todo = todos.find(todo => todo.id === parseInt(id))
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' })
    }

    const { text } = req.body

    if (!text) {
      return res.status(400).json({ error: 'Missing todo text' })
    }

    todo.text = text

    res.json(todo)
  }

  public deleteTodo(req: Request, res: Response) {
    const id = req.params.id
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'Missing todo id' })
    }
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id))
    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' })
    }

    todos.splice(todoIndex, 1)

    res.status(204).json({
      message: 'Todo deleted successfully'
    })
  }
}