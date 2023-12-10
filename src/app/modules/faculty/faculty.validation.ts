import { z } from 'zod';
import {
  createNameValidationSchema,
  updateNameValidationSchema,
} from '../student/student.validation';

// --------------->> Create faculty Validation Schema  <<------------ //
export const createFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      name: createNameValidationSchema,
      designation: z.string({
        invalid_type_error: 'Faculty designation must be a string',
        required_error: 'Faculty designation is required',
      }),
      gender: z.enum(['male', 'female', 'other'], {
        invalid_type_error: 'Gender is not a valid',
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.coerce.date({
        invalid_type_error: 'Faculty Date of Birth is invalid',
        required_error: 'Faculty Date of Birth is required',
      }),
      email: z
        .string({
          invalid_type_error: 'Faculty Email must be a string',
          required_error: 'Faculty Email is required',
        })
        .email('Invalid Faculty email'),
      contractNo: z.string({
        invalid_type_error: 'Faculty Contract Number must be a string',
        required_error: 'Faculty Contract Number is required',
      }),
      emergencyContactNo: z.string({
        invalid_type_error: 'Faculty Emergency Contact Number must be a string',
        required_error: 'Faculty Emergency Contact Number is required',
      }),
      presentAddress: z.string({
        invalid_type_error: 'Faculty Present Address must be a string',
        required_error: 'Faculty Present Address is required',
      }),
      permanentAddress: z.string({
        invalid_type_error: 'Faculty Permanent Address must be a string',
        required_error: 'Faculty Permanent Address is required',
      }),
      profileImage: z.string({
        invalid_type_error: 'Faculty Profile Image must be a string',
        required_error: 'Faculty Profile Image is required',
      }),
      academicDepartment: z.string({
        invalid_type_error: 'Faculty Academic Department must be a string',
        required_error: 'Faculty Academic Department is required',
      }),
      academicFaculty: z.string({
        invalid_type_error: 'Faculty Academic Faculty must be a string',
        required_error: 'Faculty Academic Faculty is required',
      }),
    }),
  }),
});

// --------------->> Update faculty Validation Schema  <<------------ //
export const updateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      name: updateNameValidationSchema.optional(),
      designation: z
        .string({
          invalid_type_error: 'Faculty designation must be a string',
          required_error: 'Faculty designation is required',
        })
        .optional(),
      gender: z
        .enum(['male', 'female', 'other'], {
          invalid_type_error: 'Gender is not a valid',
          required_error: 'Gender is required',
        })
        .optional(),
      dateOfBirth: z.coerce
        .date({
          invalid_type_error: 'Faculty Date of Birth is invalid',
          required_error: 'Faculty Date of Birth is required',
        })
        .optional(),
      email: z
        .string({
          invalid_type_error: 'Faculty Email must be a string',
          required_error: 'Faculty Email is required',
        })
        .email('Invalid Faculty email')
        .optional(),
      contractNo: z
        .string({
          invalid_type_error: 'Faculty Contract Number must be a string',
          required_error: 'Faculty Contract Number is required',
        })
        .optional(),
      emergencyContactNo: z
        .string({
          invalid_type_error:
            'Faculty Emergency Contact Number must be a string',
          required_error: 'Faculty Emergency Contact Number is required',
        })
        .optional(),
      presentAddress: z
        .string({
          invalid_type_error: 'Faculty Present Address must be a string',
          required_error: 'Faculty Present Address is required',
        })
        .optional(),
      permanentAddress: z
        .string({
          invalid_type_error: 'Faculty Permanent Address must be a string',
          required_error: 'Faculty Permanent Address is required',
        })
        .optional(),
      profileImage: z
        .string({
          invalid_type_error: 'Faculty Profile Image must be a string',
          required_error: 'Faculty Profile Image is required',
        })
        .optional(),
      academicDepartment: z
        .string({
          invalid_type_error: 'Faculty Academic Department must be a string',
          required_error: 'Faculty Academic Department is required',
        })
        .optional(),
      academicFaculty: z
        .string({
          invalid_type_error: 'Faculty Academic Faculty must be a string',
          required_error: 'Faculty Academic Faculty is required',
        })
        .optional(),
    }),
  }),
});
