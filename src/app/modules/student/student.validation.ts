import { z } from 'zod';

// --------------->> Name Validation Schema  <<------------ //
export const nameValidationSchema = z.object({
  firstName: z
    .string({
      invalid_type_error: 'First Name must be a string',
      required_error: 'First Name is required',
    })
    .max(20, 'First Name must be less then 20 characters'),
  middleName: z
    .string({
      invalid_type_error: 'Middle Name must be a string',
    })
    .max(20, 'Middle Name must be less then 20 characters')
    .optional(),
  lastName: z
    .string({
      invalid_type_error: 'Last Name must be a string',
      required_error: 'Last Name is required',
    })
    .max(20, 'Last Name must be less then 20 characters'),
});

// --------------->> Parents Validation Schema  <<------------ //
export const parentsValidationSchema = z.object({
  fatherName: z.string({
    invalid_type_error: 'Father Name must be a string',
    required_error: 'Father Name is required',
  }),
  fatherOccupation: z.string({
    invalid_type_error: 'Father Occupation must be a string',
    required_error: 'Father Occupation is required',
  }),
  fatherContact: z.string({
    invalid_type_error: 'Father Contact must be a string',
    required_error: 'Father Contact is required',
  }),
  motherName: z.string({
    invalid_type_error: 'Mother Name must be a string',
    required_error: 'Mother Name is required',
  }),
  motherOccupation: z.string({
    invalid_type_error: 'Mother Occupation must be a string',
    required_error: 'Mother Occupation is required',
  }),
  motherContact: z.string({
    invalid_type_error: 'Mother Contact must be a string',
    required_error: 'Mother Contact is required',
  }),
});

// --------------->> Guardian Validation Schema  <<------------ //
export const guardianValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Guardian Name must be a string',
    required_error: 'Guardian Name is required',
  }),
  occupation: z.string({
    invalid_type_error: 'Guardian Occupation must be a string',
    required_error: 'Guardian Occupation is required',
  }),
  contact: z.string({
    invalid_type_error: 'Guardian Contact must be a string',
    required_error: 'Guardian Contact is required',
  }),
  relation: z.string({
    invalid_type_error: 'Guardian Relation must be a string',
    required_error: 'Guardian Relation is required',
  }),
});

// --------------->> Student Validation Schema  <<------------ //
export const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: nameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        invalid_type_error: 'Gender is not a valid',
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.coerce.date({
        invalid_type_error: 'Student Date of Birth is invalid',
        required_error: 'Student Date of Birth is required',
      }),
      email: z
        .string({
          invalid_type_error: 'Student Email must be a string',
          required_error: 'Student Email is required',
        })
        .email('Invalid student email'),
      contractNo: z.string({
        invalid_type_error: 'Student Contract Number must be a string',
        required_error: 'Student Contract Number is required',
      }),
      emergencyContactNo: z.string({
        invalid_type_error: 'Student Emergency Contact Number must be a string',
        required_error: 'Student Emergency Contact Number is required',
      }),
      presentAddress: z.string({
        invalid_type_error: 'Student Present Address must be a string',
        required_error: 'Student Present Address is required',
      }),
      permanentAddress: z.string({
        invalid_type_error: 'Student Permanent Address must be a string',
        required_error: 'Student Permanent Address is required',
      }),
      parents: parentsValidationSchema,
      guardian: guardianValidationSchema,
      profileImage: z.string({
        invalid_type_error: 'Student Profile Image must be a string',
        required_error: 'Student Profile Image is required',
      }),
      academicDepartment: z.string(),
    }),
  }),
});
