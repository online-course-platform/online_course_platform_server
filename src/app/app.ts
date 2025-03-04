import express from 'express';
import cors from 'cors';
import { userRoute } from './modules/user/user.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/users', userRoute);

export default app;
