import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needchangePassword: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ['admin', 'student', 'instructor'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      required: true,
      default: 'active',
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const User = model<IUser>('User', userSchema);

export default User;
