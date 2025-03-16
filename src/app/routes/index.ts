import express from 'express';
import { userRoute } from '../modules/user/user.routes';
import { CourseRoutes } from '../modules/course/course.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
