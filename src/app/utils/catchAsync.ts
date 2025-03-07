/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';

const catchAsync = <T = any>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default catchAsync;
