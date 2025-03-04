import { IStudent } from '../student/student.interface';
import { config } from '../../config';
import User from './user.models';
import { studentValidation } from '../student/student.validation';
import { Student } from '../student/student.model';
import { ZodError } from 'zod';
import uuid4 from 'uuid4';

const createStudentInToDb = async ({
  password,
  student,
}: {
  password: string;
  student: IStudent;
}) => {
  try {
    // Generate user ID
    const userId = uuid4();

    // Check if password exists, otherwise set a default password
    const userPassword = password || config.defaultPasssword;

    // Create user
    const user = {
      id: userId,
      password: userPassword,
      role: 'student',
    };

    const userData = await User.create(user);
    if (!userData || !userData._id) {
      throw new Error('User creation failed: userId is missing');
    }

    // Create student with the user ID
    const studentData = {
      ...student,
      userId: userData._id,
    };

    studentValidation.studentValidationSchema.parse(studentData);

    const result = await Student.create(studentData);

    return result;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(`Validation Failed: ${JSON.stringify(error.errors)}`);
    }
    return error;
  }
};

export const userService = {
  createStudentInToDb,
};
