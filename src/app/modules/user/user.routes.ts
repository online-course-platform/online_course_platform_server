import express from 'express';
import { userController } from './user.controlers';

const router = express.Router();

// Correctly defining the route with a request handler
router.post('/create-student', userController.createStudent);

export const userRoute = router;
