import { Types } from 'mongoose';
import { z } from 'zod';

const guardianContactValidationSchema = z.object({
  name: z.string().nonempty(),
  relationship: z.string().nonempty(),
  contactNo: z.string().nonempty(),
});

const addressValidationSchema = z.object({
  street: z.string().optional(),
  city: z.string().nonempty(),
  state: z.string().nonempty(),
  postalCode: z.string().optional(),
  country: z.string().nonempty(),
});

const studentValidationSchema = z.object({
  userId: z.union([
    z.string(),
    z.instanceof(Types.ObjectId), // ✅ Allow both string & ObjectId
  ]),
  name: z.string().nonempty(),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.date().optional(),
  email: z.string().email(),
  contactNo: z.string().nonempty(),
  guardianContact: guardianContactValidationSchema,
  address: addressValidationSchema,
  profileImage: z.string().optional(),
  enrolledCourses: z.array(z.string()).optional(),
  isDeleted: z.boolean().default(false),
  completedCourses: z.array(z.string()).optional(),
  discussionPosts: z.array(z.string()).optional(),
});

export const studentValidation = {
  guardianContactValidationSchema,
  addressValidationSchema,
  studentValidationSchema,
};
