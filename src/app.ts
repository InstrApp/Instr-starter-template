import express, { Application } from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import indexRouter from './Modules';
import { errorConverter, errorHandler } from './Modules/Shared';

const app: Application = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'pug');

// setting up the app
app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', indexRouter);

app.use(errorConverter);
app.use(errorHandler);

export default app;
