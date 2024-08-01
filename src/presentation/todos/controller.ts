import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy some milk", createdAt: new Date() },
  { id: 2, text: "Pick up the kids", createdAt: new Date() },
  { id: 3, text: "Get to work",  createdAt: new Date()}
]

export class TodosController {
  public getTodos(req: Request, res: Response) {
    res.json(todos)
  }

  public getTodoById(req: Request, res: Response) {
    const id = req.params.id
    if(isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'Missing todo id'})
    }
    const todo = todos.find(todo => todo.id === parseInt(id))
    if(!todo) {
      return res.status(404).json({ error: 'Todo not found'})
    }
    res.json(todo)
  }

  public createTodo (req: Request, res: Response) {
    const {text} = req.body

    if(!text) {
      return res.status(400).json({ error: 'Missing todo text'})
    }

    const newTodo = {
      id: todos.length + 1,
      text,
      createdAt: new Date()
    }

    todos.push(newTodo)

    res.status(201).json(newTodo)
  }
}