import { HttpStatusClasses, HttpStatusExtra, INTERNAL_SERVER_ERROR } from 'http-status';
import * as httpStatus from 'http-status';
import { Response, Request, NextFunction } from 'express';
import logger from '../../../Config/logger.config';

export class ApiError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean;
  readonly type: string;

  constructor(
    statusCode: number,
    message: string | number | HttpStatusClasses | HttpStatusExtra,
    isOperational = true,
    stack = '',
    type = 'normal',
  ) {
    super(message as string);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.type = type;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const errorConverter = (err: Error, _req: Request, _res: Response, next: NextFunction) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const message = error.message || httpStatus[INTERNAL_SERVER_ERROR];
    error = new ApiError(INTERNAL_SERVER_ERROR, message, false, err.stack);
  }
  return next(error);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  let { statusCode, message } = err;
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = INTERNAL_SERVER_ERROR;
    message = httpStatus[INTERNAL_SERVER_ERROR] as string;
  }

  res.locals.errorMessage = err.message;
  const response = {
    status: statusCode,
    message,
    type: err.type,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };
  logger.error(err);

  return res.status(statusCode).json(response);
};
