// import { Request, Response, NextFunction } from 'express';
// import { ZodSchema, ZodError } from 'zod';

// const validateSchema = (schema: ZodSchema) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       console.log(req.body);
//       schema.parse(req.body);

//       next();
//     } catch (error) {
//       if (error instanceof ZodError) {
//         return res.status(400).json({
//           message: 'zod Validation error',
//           errors: error.errors,
//         });
//       }
//       next(error);
//     }
//   };
// };

// export default validateSchema;


import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'
import catchAsync from '../utils/catchAsync'


const validateSchema = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parseData = await schema.parseAsync({
      body: req.body,
      cookies: req.cookies
    })
    req.body = parseData.body;
    next()
  })
}

export default validateSchema