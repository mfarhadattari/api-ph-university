import express from 'express';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { CourseRoutes } from './../modules/course/course.route';

// -------------->> Initialized Router <<------------------
const router = express.Router();

// --------------->> Application Routes <<----------------
const moduleRoutes = [
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/students',
    routes: StudentRoutes,
  },
  {
    path: '/faculties',
    routes: FacultyRoutes,
  },
  {
    path: '/academic-semesters',
    routes: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    routes: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    routes: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    routes: CourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
