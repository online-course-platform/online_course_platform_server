/* eslint-disable no-unused-vars */
import { ClientSession, Model, Types } from 'mongoose';

export interface IGuardianContact {
  name: string;
  relationship: string;
  contactNo: string;
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
export interface IStudent {
  _id: string;
  userId: Types.ObjectId;
  name: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  guardianContact: IGuardianContact;
  address: IAddress;
  profileImage: string;
  enrolledCourses: string[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  completedCourses: string[];
  discussionPosts: string[];
}

export interface StudentModel extends Model<IStudent> {
  isUserExist(
    userEmail: string,
    session?: ClientSession,
  ): Promise<IStudent | null>;
}
