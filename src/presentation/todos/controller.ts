import { Request, Response } from "express";
import { prisma } from "../../data/postgresql";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

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
    const [error, createTodoDto] = CreateTodoDto.create(req.body)
    if (error) {
      return res.status(400).json({ error })
    }

    const todo = await prisma.todo.create({
      data: createTodoDto!
    })

    res.status(201).json(todo)
  }

  public async updateTodo(req: Request, res: Response) {
    const id = +req.params.id
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })

    if (error) {
      return res.status(400).json({ error })
    }

    const todo = await prisma.todo.findFirst({
      where: {
        id
      }
    })

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' })
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id
      },
      data: updateTodoDto!.values
    })
    res.json(updatedTodo)

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