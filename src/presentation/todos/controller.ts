import { Request, Response } from "express";
import { prisma } from "../../data/postgresql";

export class TodosController {
  public async getTodos(req: Request, res: Response) {
    const todos = await prisma.todo.findMany({
      orderBy: {
        id: 'desc'
      }
    })
    res.json(todos)
  }

  public async getTodoById(req: Request, res: Response) {
    const id = req.params.id
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'Missing todo id' })
    }
    const todo = await prisma.todo.findUnique({
      where: {
        id: parseInt(id)
      }
    })
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

  public async updateTodo(req: Request, res: Response) {
    const id = req.params.id
    const { text } = req.body
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'Missing todo id' })
    }

    if (!text) {
      return res.status(400).json({ error: 'Missing todo text' })
    }

    try {
      const todo = await prisma.todo.update({
        where: {
          id: parseInt(id)
        },
        data: {
          text
        }
      })
      res.json(todo)
    } catch (error) {
      res.status(404).json({ message: 'Todo not found', error })
    }
  }

  public async deleteTodo(req: Request, res: Response) {
    const id = req.params.id
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'Missing todo id' })
    }

    try {
      const todo = await prisma.todo.delete({
        where: {
          id: parseInt(id)
        },
      })

      res.status(204).json({
        message: 'Todo deleted successfully',
        todo
      })
    } catch (error) {
      res.status(404).json({ message: 'Todo not found', error })
    }


  }
}