import { IStudent } from '../student/student.interface';
import { config } from '../../config';
import User from './user.models';
import { Student } from '../student/student.model';

import { AppError } from '../../utils/appError';
import mongoose from 'mongoose';
import { IInstructor } from '../instructor/instructor.interface';
import { Instructor } from '../instructor/instructor.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

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

    return newStudent;
  } catch (error) {
    await session.abortTransaction();

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
  }
};

const createInstructorInToDb = async ({
  password,
  instructor,
}: {
  password: string;
  instructor: IInstructor;
}) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (await Instructor.isUserExist(instructor.email, session)) {
      throw new AppError('instructor already exists', 400);
    }

    // Test Case 2: Verify user creation rolls back if student creation fails
    const [newUser] = await User.create(
      [
        {
          // Test Case 3: Remove manual ID generation to test MongoDB's native ID
          id: new mongoose.Types.ObjectId(), // Comment this out
          password: password || config.defaultPasssword,
          role: 'instructor',
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
    const [newInstructor] = await Instructor.create(
      [
        {
          ...instructor,
          userId: newUser.id,
        },
      ],
      { session },
    );

    // Verification Point 2: Check student-user relationship
    if (newInstructor.userId.toString() !== newUser.id.toString()) {
      throw new AppError('User-instructor linkage failed', 500);
    }

    await session.commitTransaction();

    return newInstructor;
  } catch (error) {
    await session.abortTransaction();

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
  }
};
const createAdminInToDb = async ({
  password,
  admin,
}: {
  password: string;
  admin: IAdmin;
}) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (await Admin.isUserExist(admin.email, session)) {
      throw new AppError('Admin already exists', 400);
    }

    // Test Case 2: Verify user creation rolls back if student creation fails
    const [newUser] = await User.create(
      [
        {
          // Test Case 3: Remove manual ID generation to test MongoDB's native ID
          id: new mongoose.Types.ObjectId(), // Comment this out
          password: password || config.defaultPasssword,
          role: 'admin',
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
    const [newAdmin] = await Admin.create(
      [
        {
          ...admin,
          userId: newUser.id,
        },
      ],
      { session },
    );

    // Verification Point 2: Check student-user relationship
    if (newAdmin.userId.toString() !== newUser.id.toString()) {
      throw new AppError('User-Admin linkage failed', 500);
    }

    await session.commitTransaction();

    return newAdmin;
  } catch (error) {
    await session.abortTransaction();

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
  }
};

export const userService = {
  createStudentInToDb,
  createAdminInToDb,
  createInstructorInToDb,
};
