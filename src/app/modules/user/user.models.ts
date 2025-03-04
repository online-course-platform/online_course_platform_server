/* eslint-disable no-unused-vars */
import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import { config } from '../../config';
import bcrypt from 'bcrypt';

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

userSchema.pre<IUser>('save', async function (next) {
  const saltRounds = Number(config.saltRounds);
  this.password = await bcrypt.hash(this.password, saltRounds);

  next();
});

userSchema.post<IUser>('save', function (doc, next) {
  doc.password = undefined;
  next();
});

const User = model<IUser>('User', userSchema);

export default User;
