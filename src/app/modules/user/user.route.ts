import express from 'express';
import { UserControllers } from './user.controller';

// -------->> Initialized Router <<------------ //
const router = express.Router();

// ------------->> Create A Student Route <<--------------- //
router.post('/create-student', UserControllers.createStudent);

// ---------->> Export User Routes <------------- //
export const UserRoutes = router;
