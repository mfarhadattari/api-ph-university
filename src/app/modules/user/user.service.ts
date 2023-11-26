import { config } from '../../config';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';

// -------------------->> Create A Student Service <<-------------------
const createStudentIntoDB = async (password: string, studentData: IStudent) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //   setting password in user object
  userData.password = password || (config.default_password as string);

  //   set user role
  userData.role = 'student';

  //   setting user id : TODO: It will generate automatically
  userData.id = '203010001';

  //   creating a user
  const newUser = await User.create(userData);

  //   creating student
  if (newUser._id) {
    studentData.id = newUser.id;
    studentData.userId = newUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

// -------------------->> Export Student Services <<-------------------
export const UserServices = {
  createStudentIntoDB,
};
