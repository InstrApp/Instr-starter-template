import { Router } from 'express';
import homeRouter from './Home';

const indexRouter = Router();

indexRouter.use('/', homeRouter);

export default indexRouter;
