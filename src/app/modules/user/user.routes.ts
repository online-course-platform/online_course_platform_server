import express from 'express';
import { userController } from './user.controlers';
import validateSchema from '../../middlewares/zodValidation';
import { studentValidation } from '../student/student.validation';

const router = express.Router();

// Correctly defining the route with a request handler
router.post(
  '/create-student',
  validateSchema(studentValidation.createStudentValidationSchema),
  userController.createStudent,
);
router.post('/create-instructor', userController.createInstructor);
router.post('/create-admin', userController.createAdmin);

export const userRoute = router;
