/* eslint-disable no-unused-vars */
// middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

import { config } from '../config';
import { AppError } from '../utils/appError';

interface ErrorResponse {
  status: string;
  statusCode: number;
  message: string;
  stack?: string;
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
) => {
  // Handle AppError instances
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
      stack: config.envirnment === 'development' ? err.stack : undefined,
    });
  }

  // Handle generic errors
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: err.message,
    stack: config.envirnment === 'development' ? err.stack : undefined,
  });
};

// throw new AppError('Something went wrong', 500);

export default errorHandler;
