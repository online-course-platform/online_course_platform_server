import { ClientSession, Schema, model } from 'mongoose';
import { IInstructor, InstructorModel } from './instructor.interface';

const CreateInstructorSchema = new Schema<IInstructor, InstructorModel>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, optional: true },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  profileImage: { type: String, optional: true },
  expertise: { type: String, required: true },
  assignedCourses: { type: [String], optional: true },
  isDeleted: { type: Boolean, default: false },
  reviews: { type: [String], optional: true },
  certifications: { type: [String], optional: true },
});

CreateInstructorSchema.statics.isUserExist = async function (
  userEmail: string,
  session?: ClientSession,
): Promise<IInstructor | null> {
  const instructor = this.findOne({ email: userEmail }).session(
    session || null,
  );
  return instructor;
};

export const Instructor = model<IInstructor, InstructorModel>(
  'Instructor',
  CreateInstructorSchema,
);
