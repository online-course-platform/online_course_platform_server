import { IStudent } from '../student/student.interface';
import { config } from '../../config';
import User from './user.models';
import { Student } from '../student/student.model';
import uuid4 from 'uuid4';
import { AppError } from '../../utils/appError';
import mongoose from 'mongoose';

const createStudentInToDb = async ({
  password,
  student,
}: {
  password: string;
  student: IStudent;
}) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (await Student.isUserExist(student.email, session)) {
      throw new AppError('Student already exists', 400);
    }

    // Test Case 2: Verify user creation rolls back if student creation fails
    const [newUser] = await User.create(
      [
        {
          // Test Case 3: Remove manual ID generation to test MongoDB's native ID
          id: new mongoose.Types.ObjectId(), // Comment this out
          password: password || config.defaultPasssword,
          role: 'student',
        },
      ],
      { session },
    );

    // Verification Point 1: Check user creation
    if (!newUser?.id) {
      throw new AppError('User creation failed', 500);
    }

    // Test Case 4: Force student creation failure
    // Uncomment to simulate failure:
    // if (newUser?.id) {
    //   throw new Error('Simulated student creation failure');
    // }

    // Test Case 5: Create invalid student data
    const [newStudent] = await Student.create(
      [
        {
          ...student,
          userId: newUser.id,
        },
      ],
      { session },
    );

    // Verification Point 2: Check student-user relationship
    if (newStudent.userId.toString() !== newUser.id.toString()) {
      throw new AppError('User-Student linkage failed', 500);
    }

    await session.commitTransaction();
    console.log('Transaction committed successfully');
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    console.log('Transaction aborted:', error.message);

    // Verification Point 3: Check rollback
    // Add these checks after calling the function:
    // const userExists = await User.exists({ _id: newUser?._id });
    // const studentExists = await Student.exists({ _id: newStudent?._id });
    // Both should be false

    throw new AppError(
      error instanceof Error ? error.message : 'Transaction failed',
      500,
    );
  } finally {
    session.endSession();
    // Verification Point 4: Check session state
    console.log('Session ended with status:', session.transaction);
  }
};
const createInstructorInToDb = async ({
  password,
  student,
}: {
  password: string;
  student: IStudent;
}) => {
  if (await Student.isUserExist(student.email)) {
    throw new AppError('Student already exists');
  }

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
    throw new AppError('User creation failed: userId is missing');
  }

  // Create student with the user ID
  const studentData = {
    ...student,
    userId: userData._id,
  };

  const result = await Student.create(studentData);

  return result;
};
const createAdminInToDb = async ({
  password,
  student,
}: {
  password: string;
  student: IStudent;
}) => {
  if (await Student.isUserExist(student.email)) {
    throw new AppError('Student already exists');
  }

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

  const result = await Student.create(studentData);

  return result;
};

export const userService = {
  createStudentInToDb,
  createAdminInToDb,
  createInstructorInToDb,
};
