import { Schema, model } from 'mongoose';
import {
  IAddress,
  IGuardianContact,
  IStudent,
  StudentModel,
} from './student.interface';

export const guardianContactSchema = new Schema<IGuardianContact>({
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  contactNo: { type: String, required: true },
});
export const addressSchema = new Schema<IAddress>({
  street: { type: String, optional: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, optional: true },
  country: { type: String, required: true },
});
const StudentSchema = new Schema<IStudent>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    dateOfBirth: { type: Date },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    guardianContact: guardianContactSchema, // Define a more specific schema if you have the structure of guardianContact
    address: addressSchema,
    profileImage: { type: String, optional: true },
    enrolledCourses: { type: [String], optional: true },
    isDeleted: { type: Boolean, default: false },
    completedCourses: { type: [String], optional: true },
    discussionPosts: { type: [String], optional: true },
  },
  { timestamps: true },
);

StudentSchema.statics.isUserExist = async function (
  userEmail: string,
): Promise<IStudent | null> {
  const student = await this.findOne({ email: userEmail });
  return student;
};

export const Student = model<IStudent, StudentModel>('Student', StudentSchema);
