import { z } from 'zod';

export const academicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic faculty must be a string',
    required_error: 'Academic faculty is required',
  }),
});
