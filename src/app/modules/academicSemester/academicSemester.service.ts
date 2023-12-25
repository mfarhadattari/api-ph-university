import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { semesterNameAndCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

// ---------------->> Create Academic Semester Service <<---------------
const createAcademicSemesterIntoDB = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (semesterNameAndCodeMapper[payload.name] !== payload.code) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Invalid Semester code',
    );
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

// ----------------->> Get All Academic Semesters <<--------------------
const getAllAcademicSemestersFromDB = async (): Promise<
  IAcademicSemester[]
> => {
  const result = await AcademicSemester.find();
  return result;
};

// ----------------->> Get Single Academic Semesters <<--------------------
const getSingleAcademicSemesterFromDB = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

// ----------------->> Update Academic Semesters <<--------------------
const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: IAcademicSemester,
): Promise<IAcademicSemester | null> => {
  if (
    payload.name &&
    payload.code &&
    semesterNameAndCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Invalid Semester code',
    );
  }
  const result = await AcademicSemester.findByIdAndUpdate(id, payload);
  return result;
};

// ------------------> Export Academic Semester Service <<---------------
export const academicSemesterService = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
