import { z } from 'zod';

export const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Must must be string',
    })
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be less then 20 characters')
    .optional(),
});
