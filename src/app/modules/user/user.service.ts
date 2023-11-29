import { config } from '../../config';
import { AcademicSemesters } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Students } from '../student/student.model';
import { IUser } from './user.interface';
import { Users } from './user.model';
import { generateStudentId } from './user.utils';

// -------------------->> Create A Student Service <<-------------------
const createStudentIntoDB = async (password: string, payload: IStudent) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //   setting password in user object
  userData.password = password || (config.default_password as string);

  //   set user role
  userData.role = 'student';

  // get academic semester
  const admissionSemester = await AcademicSemesters.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }

  //   setting user id : TODO: It will generate automatically
  userData.id = await generateStudentId(admissionSemester);

  //   creating a user
  const newUser = await Users.create(userData);

  //   creating student
  if (newUser._id) {
    payload.id = newUser.id;
    payload.userId = newUser._id;

    const newStudent = await Students.create(payload);
    return newStudent;
  }
};

// -------------------->> Export Student Services <<-------------------
export const UserServices = {
  createStudentIntoDB,
};
