
import mongoose from 'mongoose';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TCourse, TCourseContent, TCourseMilestone, TCourseModule } from './course.interface';
import { Course, CourseContent, CourseMilestone, CourseModule } from './course.model';
import { AppError } from '../../utils/appError';

const createCourse = async (payload:TCourse ) => {
  const result = await Course.create(payload);
  return result
};




const createCourseMilestone = async (payload: TCourseMilestone) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [createMilestone] = await CourseMilestone.create([{ ...payload }], { session });

    if (!createMilestone?._id) {
      throw new AppError('Course milestone creation failed!', 500);
    }

    const updateCourse = await Course.findByIdAndUpdate(
      payload.courseId,
      { $push: { milestones: createMilestone._id } }, 
      { session, new: true } 
    );

    if (!updateCourse) {
      throw new AppError('Course update failed!', 500);
    }

    await session.commitTransaction();
    return createMilestone;

  // eslint-disable-next-line no-unused-vars
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError('Course milestone creation failed!', 500);

  } finally {
    session.endSession();
  }
};









// const createCourseMilestone = async (payload:TCourseMilestone ) => {
//   const result = await CourseMilestone.create(payload);
//   return result
// };


const createCourseModule = async (payload:TCourseModule ) => {
  const result = await CourseModule.create(payload);
  return result
};


// #TODO  course content create korary somoy milestone module soho create karte hbe akhne

const createCourseContent = async (file: any, payload:TCourseContent) => {

  // photo upload in Cloudinary
  if (file) {
    const path = file?.path
    const imageName = `${new Date()} ${payload?.title}`
   
    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path)
    console.log(payload,file,secure_url);
    payload.url = secure_url as string
    payload.type=file?.type||"document"
  }

  const result = await CourseContent.create(payload)
  return result
}


export const CourseServices = {
    createCourse,
    createCourseMilestone,
    createCourseModule,
    createCourseContent
};
