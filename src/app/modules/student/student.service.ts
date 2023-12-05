import { IStudent } from './student.interface';
import { Students } from './student.model';

// ----------------------->> Get All Student Service <<--------------------
const getAllStudentsFromDB = async (): Promise<IStudent[]> => {
  const result = await Students.find().populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: 'academicFaculty',
  });
  return result;
};

// ----------------------->> Get All Student Service <<--------------------
const getSingleStudentFromDB = async (id: string): Promise<IStudent | null> => {
  const result = await Students.findById(id).populate({
    path: 'academicDepartment',
    populate: 'academicFaculty',
  });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
