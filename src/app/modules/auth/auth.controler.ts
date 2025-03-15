import { Request, Response } from 'express';

import catchAsync from '../../utils/catchAsync';
import { sendCreated } from '../../utils/apiResponse';

const loginUser = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const result = await userService.loginUser({ email, password });
    return sendCreated(res, result, 'User logged in successfully');
  },
);

export const authController = {
  loginUser,
};
