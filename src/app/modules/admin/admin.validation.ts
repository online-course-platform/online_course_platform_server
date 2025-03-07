import { z } from 'zod';

const CreateAdminSchema = z.object({
  userId: z.string().uuid(),
  name: z.string().min(1, 'Name is required'),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email('Invalid email address'),
  contactNo: z.string().min(1, 'Contact number is required'),
  profileImage: z.string().optional(),
  isDeleted: z.boolean().default(false),
  systemAccessLogs: z
    .array(
      z.object({
        timestamp: z.string(),
        action: z.string(),
      }),
    )
    .optional(),
  managedReports: z.array(z.string()).optional(),
});

export const adminValidation = {
  CreateAdminSchema,
};
