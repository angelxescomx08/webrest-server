import { Router } from "express";

export class AppRoutes {
  static get routes(): Router{
    const router = Router();

    router.get('/api/todos', (req, res) => {});

    return router;
  }
}