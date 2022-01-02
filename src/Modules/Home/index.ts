import { Router } from 'express';
import { homeController } from './home.controller';

const homeRouter = Router();

homeRouter.get('/status', homeController.status);

export default homeRouter;
