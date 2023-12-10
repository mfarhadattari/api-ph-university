import { z } from 'zod';
import { createNameValidationSchema } from '../student/student.validation';

// --------------->> Create Admin Validation Schema  <<------------ //
export const createAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: createNameValidationSchema,
      designation: z.string({
        invalid_type_error: 'Admin designation must be a string',
        required_error: 'Admin designation is required',
      }),
      gender: z.enum(['male', 'female', 'other'], {
        invalid_type_error: 'Gender is not a valid',
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.coerce.date({
        invalid_type_error: 'Admin Date of Birth is invalid',
        required_error: 'Admin Date of Birth is required',
      }),
      email: z
        .string({
          invalid_type_error: 'Admin Email must be a string',
          required_error: 'Admin Email is required',
        })
        .email('Invalid Admin email'),
      contractNo: z.string({
        invalid_type_error: 'Admin Contract Number must be a string',
        required_error: 'Admin Contract Number is required',
      }),
      emergencyContactNo: z.string({
        invalid_type_error: 'Admin Emergency Contact Number must be a string',
        required_error: 'Admin Emergency Contact Number is required',
      }),
      presentAddress: z.string({
        invalid_type_error: 'Admin Present Address must be a string',
        required_error: 'Admin Present Address is required',
      }),
      permanentAddress: z.string({
        invalid_type_error: 'Admin Permanent Address must be a string',
        required_error: 'Admin Permanent Address is required',
      }),
      profileImage: z.string({
        invalid_type_error: 'Admin Profile Image must be a string',
        required_error: 'Admin Profile Image is required',
      }),
      managementDepartment: z.string({
        invalid_type_error: 'Admin Management Department must be a string',
        required_error: 'Admin Management Department is required',
      }),
    }),
  }),
});

// --------------->> Update Admin Validation Schema  <<------------ //
export const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: createNameValidationSchema.optional(),
      designation: z
        .string({
          invalid_type_error: 'Admin designation must be a string',
        })
        .optional(),
      gender: z
        .enum(['male', 'female', 'other'], {
          invalid_type_error: 'Gender is not a valid',
        })
        .optional(),
      dateOfBirth: z.coerce
        .date({
          invalid_type_error: 'Admin Date of Birth is invalid',
        })
        .optional(),
      email: z
        .string({
          invalid_type_error: 'Admin Email must be a string',
        })
        .email('Invalid Admin email')
        .optional(),
      contractNo: z
        .string({
          invalid_type_error: 'Admin Contract Number must be a string',
        })
        .optional(),
      emergencyContactNo: z
        .string({
          invalid_type_error: 'Admin Emergency Contact Number must be a string',
        })
        .optional(),
      presentAddress: z
        .string({
          invalid_type_error: 'Admin Present Address must be a string',
        })
        .optional(),
      permanentAddress: z
        .string({
          invalid_type_error: 'Admin Permanent Address must be a string',
        })
        .optional(),
      profileImage: z
        .string({
          invalid_type_error: 'Admin Profile Image must be a string',
        })
        .optional(),
      managementDepartment: z
        .string({
          invalid_type_error: 'Admin Management Department must be a string',
        })
        .optional(),
    }),
  }),
});
