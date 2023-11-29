import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// ------------------->> Get Last Student Id <----------------
const getLastStudentId = async () => {
  const lastStudentId = await User.findOne(
    { role: 'student' },
    { id: 1, _id: 0 },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudentId?.id ? lastStudentId.id.substring(6) : '0';
};

// ------------------>> Generate Student ID <<-----------------
export const generateStudentId = async (payload: IAcademicSemester) => {
  const currentId = await getLastStudentId();
  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  return `${payload.year}${payload.code}${incrementId}`;
};
