import express, { NextFunction, Request, Response } from 'express';
import validateSchema from '../../middlewares/zodValidation';
import { upload } from '../../utils/sendImageToCloudinary';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';

const router = express.Router();


router.post(
  '/create-course', 
  // auth("student", "instructor"),
  validateSchema(CourseValidations.CourseValidationSchema),
  CourseControllers.createCourse
);

router.post(
  '/create-milestone',
  validateSchema(CourseValidations.CourseMilestoneValidationSchema),
  CourseControllers.createCourseMilestone
);
router.post(
  '/create-module',
  validateSchema(CourseValidations.CourseModuleValidationSchema),
  CourseControllers.createCourseModule
);

router.post(
  '/create-course-content',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)

    next()
  },
  // validateSchema(CourseValidations.CourseContentValidationSchema),
  CourseControllers.createCourseContent
);


export const CourseRoutes = router;
