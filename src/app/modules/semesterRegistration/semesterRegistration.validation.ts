import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.const';

export const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z
      .enum([...(SemesterRegistrationStatus as [string, ...string[]])])
      .default('UPCOMING'),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredits: z.number().default(3),
    maxCredits: z.number().default(15),
  }),
});

export const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z
      .enum([...(SemesterRegistrationStatus as [string, ...string[]])])
      .optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredits: z.number().optional(),
    maxCredits: z.number().optional(),
  }),
});
