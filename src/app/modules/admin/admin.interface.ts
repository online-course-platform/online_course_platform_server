/* eslint-disable no-unused-vars */
import { ClientSession, Model, Types } from 'mongoose';

export interface IAdmin {
  _id: string;
  userId: Types.ObjectId;
  name: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  profileImage: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  systemAccessLogs: Array<{ timestamp: Date; action: string }>;
  managedReports: string[];
}

export interface AdminModel extends Model<IAdmin> {
  isUserExist(
    userEmail: string,
    session?: ClientSession,
  ): Promise<IAdmin | null>;
}
