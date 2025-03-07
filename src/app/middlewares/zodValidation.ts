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

import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema, ZodError } from 'zod';

const validateSchema = (schema: ZodSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: 'Validation error',
          errors: error.errors,
        });
      }
      next(error);
    }
  };
};

export default validateSchema;
