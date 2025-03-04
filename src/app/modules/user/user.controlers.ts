import { Request, Response } from 'express';
import { userService } from './user.services';

const createStudent = async (req: Request, res: Response): Promise<any> => {
  try {
    const { password, student } = req.body;

    const result = await userService.createStudentInToDb({ password, student });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const userController = {
  createStudent,
};
