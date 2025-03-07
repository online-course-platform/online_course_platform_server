import { Request, Response } from 'express';
import { userService } from './user.services';
import catchAsync from '../../utils/catchAsync';
import { sendCreated } from '../../utils/apiResponse';

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body.body;
  const result = await userService.createStudentInToDb({ password, student });
  return sendCreated(res, result, 'Student created successfully');
});
const createInstructor = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { password, instructor } = req.body.body;

    const result = await userService.createInstructorInToDb({
      password,
      instructor,
    });
    return sendCreated(res, result, 'Instructor created successfully');
  },
);
const createAdmin = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { password, admin } = req.body.body;
    const result = await userService.createAdminInToDb({ password, admin });
    return sendCreated(res, result, 'Admin created successfully');
  },
);

export const userController = {
  createStudent,
  createAdmin,
  createInstructor,
};
