import { z } from 'zod';

export const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic name must be string',
      required_error: 'Academic name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty must be string',
      required_error: 'Academic Faculty is required',
    }),
  }),
});

export const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic name must be string',
        required_error: 'Academic name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Faculty must be string',
        required_error: 'Academic Faculty is required',
      })
      .optional(),
  }),
});
