import { Types } from "mongoose";

export interface TCourse  {
  title: string;
  description: string;
  milestones: Types.ObjectId[]; 
  category: "Programming"| "Web Development"| "Mobile Development" | "Business"| "Data Science"| "Personal Development"| "UI/UX Design" | "Machine Learning"|"Artificial Intelligence" |"Other"
  instructors: Types.ObjectId[];
  enrolledStudents: Types.ObjectId[]; 
  reviews: Types.ObjectId[]; 
  announcements: Types.ObjectId[]; 
  createdBy: Types.ObjectId;
  tags: "JavaScript"|"Python"|"React"|"Node.js"
  visibility:"public"| "private"| "pending"
  isDeleted:boolean
  createdAt: Date;
  updatedAt: Date;
}

export interface TCourseMilestone {
  name: string;
  courseId: Types.ObjectId;
  position: number;
  contents: Types.ObjectId[]
  modules: Types.ObjectId[]
}

export interface TCourseModule {
  name: string;
  courseId: Types.ObjectId;
  milestoneId: Types.ObjectId;
  position: number;
  contents: Types.ObjectId[]
}

export interface TCourseContent  {
 courseId: Types.ObjectId;
 moduleId: Types.ObjectId;
 milestoneId: Types.ObjectId;
  title: string;
  type: "video" | "text" | "document";
  url: string;
  position: number;
}