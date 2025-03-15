import { z } from 'zod';

const userLoginSchema = z.object({
  userId: z.string().nonempty('User ID is required'),
  password: z.string().nonempty('Password is required'),
});

export const zodAuthSchema = {
  userLoginSchema,
};
