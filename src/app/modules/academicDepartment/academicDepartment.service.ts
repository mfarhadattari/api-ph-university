import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

// ------------------->> Create Academic Department Service <<-------------------------
const createAcademicDepartmentIntoDB = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty',
  );
  return result;
};

// ------------------->> GET All Academic Department Service <<-------------------------
const getAllAcademicDepartmentFromDB = async (): Promise<
  IAcademicDepartment[]
> => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};

// ------------------->> GET A Academic Department Service <<-------------------------
const getSingleAcademicDepartmentFromDB = async (
  id: string,
): Promise<IAcademicDepartment | null> => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};

// ------------------->> Update A Academic Department Service <<-------------------------
const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    id,
    payload,
  ).populate('academicFaculty');
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
