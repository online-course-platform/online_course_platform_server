import { z } from 'zod';

const zodValidationSchema = z.object({
  id: z.string().nonempty('ID is required'),
  password: z.string().nonempty('Password is required').optional(),
});

export default zodValidationSchema;
