import { config } from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import logger from './Config/logger.config';
import app from './app';
import { MONGODB_URL } from './Config/app.config';

config();

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
console.log(MONGODB_URL);
mongoose
  .connect(MONGODB_URL as string)
  .then(() => {
    logger.info('MongoDB connection is established');
    server.listen(PORT, () => logger.info('App running on port: ' + PORT));
  })
  .catch((err) => {
    logger.error('MongoDB connection error. Please make sure MongoDB is running.');
    logger.error(err);
  });
