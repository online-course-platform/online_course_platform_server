/* eslint-disable no-unused-vars */
import { ClientSession, Model, Types } from 'mongoose';

export interface IInstructor {
  _id: string;
  userId: Types.ObjectId;
  name: string;
  gender: string;
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  profileImage: string;
  expertise: string;
  assignedCourses: string[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  reviews: string[];
  certifications: string[];
}

export interface InstructorModel extends Model<IInstructor> {
  isUserExist(
    userEmail: string,
    session?: ClientSession,
  ): Promise<IInstructor | null>;
}
