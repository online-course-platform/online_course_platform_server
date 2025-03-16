import mongoose from "mongoose";
import { TCourse, TCourseContent, TCourseMilestone, TCourseModule } from "./course.interface";

const { Schema, model } = mongoose;



const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    milestones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseMilestone' }],
    category: {
      type: String,
      required: true,
      enum: ["Programming", "Web Development", "Mobile Development", "UI/UX Design", "Business", "Data Science", "Personal Development", "Machine Learning", "Artificial Intelligence", "Other"]
    },
    tags: {
      type: String,
      enum: ["JavaScript", "Python", "React", "Node.js"]
    },
    instructors: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    enrolledStudents: [{ type: Schema.Types.ObjectId, ref: "User" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    announcements: [{ type: Schema.Types.ObjectId, ref: "Announcement" }],
    visibility: { type: String, enum: ["public", "private", "pending"], default: "public" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);



// #TODO...order a postion unique dite hoibo
// #TODO milesto/module/content a createdby dewya hy nai

const courseMilestone = new Schema<TCourseMilestone>(
  {
    name: { type: String, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    position: { type: Number, required: true },
    contents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseContent' }],
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseModule' }],
  },
  { timestamps: true }
);



const courseModule = new Schema<TCourseModule>(
  {
    name: { type: String, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    milestoneId: { type: Schema.Types.ObjectId, ref: "CourseMilestone"},
    position: { type: Number, required: true },
    contents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseContent' }],
  },
  { timestamps: true }
);



const courseContent = new Schema<TCourseContent>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course",required: true  },
    moduleId: { type: Schema.Types.ObjectId, ref: "CourseModule" },
    milestoneId: { type: Schema.Types.ObjectId, ref: "CourseMilestone" },
    title: { type: String, required: true },
    type: { type: String, enum: ["video", "text", "document"], required: true },
    url: { type: String, required: true },
    position: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Course = model("Course", courseSchema);
export const CourseMilestone = model("CourseMilestone", courseMilestone);
export const CourseModule = model("CourseModule", courseModule);
export const CourseContent = model("CourseContent", courseContent);

















// Review Schema

// const reviewSchema = new Schema(
//   {
//     userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
//     rating: { type: Number, min: 1, max: 5, required: true },
//     comment: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// Quiz Schema
// const quizSchema = new Schema(
//   {
//     title: { type: String, required: true },
//     course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
//     questions: [
//       {
//         questionText: { type: String, required: true },
//         options: [{ type: String, required: true }],
//         correctAnswer: { type: String, required: true },
//       },
//     ],
//     passingCriteria: { type: Number, required: true },
//     timeLimit: { type: Number, required: true }, // Time in minutes
//   },
//   { timestamps: true }
// );


// Assignment Schema
// const assignmentSchema = new Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
//     submissionDeadline: { type: Date, required: true },
//     gradingRubric: { type: String },
//     maxScore: { type: Number, required: true },
//   },
//   { timestamps: true }
// );


// {
//   title: { type: String, required: true }, // Title of the assignment
//   description: { type: String, required: true }, // Description of the assignment
//   courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true }, // Associated course
//   dueDate: { type: Date, required: true }, // Due date for the assignment
//   maxScore: { type: Number, required: true }, // Maximum score for the assignment
//   submissions: [
//     {
//       studentId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Student who submitted
//       submissionDate: { type: Date, default: Date.now }, // Date of submission
//       fileUrl: { type: String, required: true }, // URL of the submitted file
//       grade: { type: Number, default: null }, // Grade given by the instructor
//       feedback: { type: String, default: null }, // Feedback from the instructor
//     },
//   ],
//   createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Instructor who created the assignment
// },



















