import { z } from 'zod';

const CreateInstructorSchema = z.object({
  body: z.object({
    instructor: z.object({
      name: z.string().nonempty(),
      gender: z.string().nonempty(),
      email: z.string().email(),
      contactNo: z.string().nonempty(),
      profileImage: z.string().optional(),
      expertise: z.string().optional(),
      assignedCourses: z.array(z.string()).optional(),
      reviews: z.array(z.string()).optional(),
      certifications: z.array(z.string()).optional(),
    }),
  }),
});

export const instructorValidation = {
  CreateInstructorSchema,
};
