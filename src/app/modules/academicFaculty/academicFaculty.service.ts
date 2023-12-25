import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

// ------------------->> Create Academic Faculty Service <<-------------------------
const createAcademicFacultyIntoDB = async (
  payload: IAcademicFaculty,
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// ------------------->> GET All Academic Faculty Service <<-------------------------
const getAllAcademicFacultyFromDB = async (): Promise<IAcademicFaculty[]> => {
  const result = await AcademicFaculty.find();
  return result;
};

// ------------------->> GET A Academic Faculty Service <<-------------------------
const getSingleAcademicFacultyFromDB = async (
  id: string,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

// ------------------->> Update A Academic Faculty Service <<-------------------------
const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: IAcademicFaculty,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload);
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
