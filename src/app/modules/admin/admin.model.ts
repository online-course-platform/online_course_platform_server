import { ClientSession, Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';

const CreateAdminSchema = new Schema<IAdmin, AdminModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    dateOfBirth: { type: Date, optonal: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    profileImage: { type: String, optional: true },
    isDeleted: { type: Boolean, default: false },
    systemAccessLogs: {
      type: [{ timestamp: Date, action: String }],
      optional: true,
    },
    managedReports: {
      type: [String],
      optional: true,
    },
  },
  { timestamps: true },
);

CreateAdminSchema.statics.isUserExist = async function (
  email: string,
  session?: ClientSession,
): Promise<IAdmin | null> {
  const admin = await this.findOne({ email }).session(session || null);
  return admin;
};

export const Admin = model<IAdmin, AdminModel>('Admin', CreateAdminSchema);
