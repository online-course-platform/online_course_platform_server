import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.custom<Types.ObjectId>(
  (val) => Types.ObjectId.isValid(val),
  { message: "Invalid ObjectId" }
);

export const CourseValidationSchema = z.object({
 body:z.object({
    title: z.string({required_error:"Title is required"}),
    description: z.string({required_error:"Description is required"}),
    milestones: z.array(ObjectIdSchema).optional(),
    category: z.enum([
      "Programming",
      "Web Development",
      "Mobile Development",
      "Business",
      "Data Science",
      "Personal Development",
      "UI/UX Design",
      "Machine Learning",
      "Artificial Intelligence",
      "Other",
    ]),
    instructors: z.array(ObjectIdSchema).optional(),
    enrolledStudents: z.array(ObjectIdSchema).optional(),
    reviews: z.array(ObjectIdSchema).optional(),
    announcements: z.array(ObjectIdSchema).optional(),
    tags: z.enum(["JavaScript", "Python", "React", "Node.js"]).optional(),
    visibility: z.enum(["public", "private", "pending"]).default("public"),
    isDeleted: z.boolean().default(false),
 })
});


export const CourseMilestoneValidationSchema  = z.object({
 body:z.object({
    name: z.string({required_error:"Milestone name is required"}),
    courseId: ObjectIdSchema,
    position: z.number({required_error:"Position is required"}).min(0),
    contents: z.array(ObjectIdSchema).optional(),
    modules: z.array(ObjectIdSchema).optional(),
 })
});


export const CourseModuleValidationSchema = z.object({
  body:z.object({
    name: z.string().min(1, "Module name is required"),
  courseId: ObjectIdSchema,
  milestoneId: ObjectIdSchema,
  position: z.number({required_error:"Position is required"}).min(0),
  contents: z.array(ObjectIdSchema).optional(),
  })
});


export const CourseContentValidationSchema = z.object({
 body:z.object({
    courseId: ObjectIdSchema,
    moduleId: ObjectIdSchema.nullable(),
    milestoneId: ObjectIdSchema.nullable(),
    title: z.string().min(1, "Content title is required"),
    position: z.number({required_error:"Position is required"}).min(0),
 }).refine(
    (data) => data.moduleId || data.milestoneId,
    "Either moduleId or milestoneId is required"
  )
  .refine(
    (data) => !(data.moduleId && data.milestoneId),
    "Both moduleId and milestoneId cannot be set at the same time"
  )
  })





  export const CourseValidations = {
    CourseValidationSchema,
    CourseMilestoneValidationSchema,
    CourseModuleValidationSchema,
    CourseContentValidationSchema
  }
  
