
import { sendCreated } from '../../utils/apiResponse';
import catchAsync from '../../utils/catchAsync';
import { CourseServices } from './course.service';


// #TODO ..auth gurd hoile payload a created by bosate hbe createCourse a

const createCourse = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await CourseServices.createCourse(payload);
  return sendCreated(res, result, 'Course created successfully');
});

const createCourseMilestone = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await CourseServices.createCourseMilestone(payload);
  return sendCreated(res, result, 'Course milestone created successfully');
});


const createCourseModule = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await CourseServices.createCourseModule(payload);
  return sendCreated(res, result, 'Course module created successfully');
});



const createCourseContent = catchAsync(async (req, res) => {
  const payload = req.body
  const file = req.file;

  const result = await CourseServices.createCourseContent(file, payload)
  return sendCreated(res, result, 'Course content created successfully');
})



export const CourseControllers = {
  createCourse,
  createCourseMilestone,
  createCourseModule,
  createCourseContent
};
