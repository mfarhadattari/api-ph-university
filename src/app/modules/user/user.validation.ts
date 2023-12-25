import { z } from 'zod';
import { UserStatus } from './user.const';

export const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Must must be string',
    })
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be less then 20 characters')
    .optional(),
});

// --------------->> Update Admin Validation Schema  <<------------ //
export const updateUserStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(UserStatus as [string, ...string[]]),
  }),
});
