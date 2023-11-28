import { semesterNameAndCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesters } from './academicSemester.model';

// ---------------->> Create Academic Semester Service <<---------------
const createAcademicSemesterIntoDB = async (payload: IAcademicSemester) => {
  if (semesterNameAndCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester code');
  }
  const result = await AcademicSemesters.create(payload);
  return result;
};

// ------------------> Export Academic Semester Service <<---------------
export const academicSemesterService = {
  createAcademicSemesterIntoDB,
};
