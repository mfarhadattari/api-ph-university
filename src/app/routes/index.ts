import express from 'express';
import { UserRoutes } from '../modules/user/user.route';

// -------------->> Initialized Router <<------------------
const router = express.Router();

// --------------->> Application Routes <<----------------
const moduleRoutes = [
  {
    path: '/users',
    routes: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
