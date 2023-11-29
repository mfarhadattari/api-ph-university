import { z } from 'zod';
import {
  months,
  semesterCode,
  semesterName,
} from './academicSemester.constant';

export const createAcademicSemesterValidationScheme = z.object({
  body: z.object({
    name: z.enum(semesterName as [string, ...string[]], {
      invalid_type_error: 'Semester name is not a valid',
      required_error: 'Semester name is required',
    }),
    code: z.enum(semesterCode as [string, ...string[]], {
      invalid_type_error: 'Semester code is not a valid',
      required_error: 'Semester code is required',
    }),
    year: z.string({
      invalid_type_error: 'Semester year must be string',
      required_error: 'Semester year is required',
    }),
    startMonth: z.enum(months as [string, ...string[]], {
      invalid_type_error: 'Start month is not a valid',
      required_error: 'Start month is required',
    }),
    endMonth: z.enum(months as [string, ...string[]], {
      invalid_type_error: 'End month is not a valid',
      required_error: 'End month is required',
    }),
  }),
});

export const updateAcademicSemesterValidationScheme = z.object({
  body: z.object({
    name: z
      .enum(semesterName as [string, ...string[]], {
        invalid_type_error: 'Semester name is not a valid',
      })
      .optional(),
    code: z
      .enum(semesterCode as [string, ...string[]], {
        invalid_type_error: 'Semester code is not a valid',
      })
      .optional(),
    year: z
      .string({
        invalid_type_error: 'Semester year must be string',
      })
      .optional(),
    startMonth: z
      .enum(months as [string, ...string[]], {
        invalid_type_error: 'Start month is not a valid',
      })
      .optional(),
    endMonth: z
      .enum(months as [string, ...string[]], {
        invalid_type_error: 'End month is not a valid',
      })
      .optional(),
  }),
});
