import { Request, Response } from 'express';

class HomeController {
  async status(req: Request, res: Response) {
    return res.json({
      message: 'Cron Server is Up and running',
    });
  }
}

export const homeController = new HomeController();
