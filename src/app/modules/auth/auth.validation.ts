import { z } from 'zod';

export const loginUserValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is required' }),
    newPassword: z.string({ required_error: 'New password is required' }),
  }),
});

export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    'ph-refresh-token': z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required' }),
  }),
});

export const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required' }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
});
