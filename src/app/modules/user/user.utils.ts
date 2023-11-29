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

  return lastStudentId?.id || undefined;
};

// ------------------>> Generate Student ID <<-----------------
export const generateStudentId = async (payload: IAcademicSemester) => {
  let currentSN = '0001';
  const lastStudentId = await getLastStudentId();
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentCode = lastStudentId?.substring(4, 6);
  if (
    lastStudentId &&
    lastStudentYear === payload.year &&
    lastStudentCode === payload.code
  ) {
    currentSN = (Number(lastStudentId.substring(6)) + 1)
      .toString()
      .padStart(4, '0');
  }

  return `${payload.year}${payload.code}${currentSN}`;
};