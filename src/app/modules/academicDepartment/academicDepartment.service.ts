import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartments } from './academicDepartment.model';

// ------------------->> Create Academic Department Service <<-------------------------
const createAcademicDepartmentIntoDB = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
  const result = await AcademicDepartments.create(payload);
  return result;
};

// ------------------->> GET All Academic Department Service <<-------------------------
const getAllAcademicDepartmentFromDB = async (): Promise<
  IAcademicDepartment[]
> => {
  const result = await AcademicDepartments.find();
  return result;
};

// ------------------->> GET A Academic Department Service <<-------------------------
const getSingleAcademicDepartmentFromDB = async (
  id: string,
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartments.findById(id);
  return result;
};

// ------------------->> Update A Academic Department Service <<-------------------------
const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartments.findByIdAndUpdate(id, payload);
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
