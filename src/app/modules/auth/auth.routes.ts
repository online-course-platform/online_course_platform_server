import express from 'express';
import { zodAuthSchema } from './auth.validation';
import validateSchema from '../../middlewares/zodValidation';

const router = express.Router();

// Correctly defining the route with a request handler
router.post('/login', validateSchema(zodAuthSchema.userLoginSchema));

export const userRoute = router;
