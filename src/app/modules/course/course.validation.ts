import { z } from 'zod';
const createPreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

export const createdCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.string(),
    credits: z.number(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z
      .array(createPreRequisiteCourseValidationSchema)
      .optional(),
  }),
});

const updatePreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean(),
});

export const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.string().optional(),
    credits: z.number().optional(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z
      .array(updatePreRequisiteCourseValidationSchema)
      .optional(),
  }),
});
