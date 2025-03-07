import { z } from 'zod';

const CreateAdminSchema = z.object({
  body: z.object({
    admin: z.object({
      name: z.string().min(1, 'Name is required'),
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z
        .string()
        .transform((str) => new Date(str))
        .optional(),
      email: z.string().email('Invalid email address'),
      contactNo: z.string().min(1, 'Contact number is required'),
      profileImage: z.string().optional(),
      systemAccessLogs: z
        .array(
          z.object({
            timestamp: z.string(),
            action: z.string(),
          }),
        )
        .optional(),
      managedReports: z.array(z.string()).optional(),
    }),
  }),
});

export const adminValidation = {
  CreateAdminSchema,
};
