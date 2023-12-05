import { z } from 'zod';

// --------------->> Create Name Validation Schema  <<------------ //
export const createNameValidationSchema = z.object({
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

// --------------->> Create Parents Validation Schema  <<------------ //
export const createParentsValidationSchema = z.object({
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

// --------------->> Create Guardian Validation Schema  <<------------ //
export const createGuardianValidationSchema = z.object({
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

// --------------->> Create Student Validation Schema  <<------------ //
export const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: createNameValidationSchema,
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
      parents: createParentsValidationSchema,
      guardian: createGuardianValidationSchema,
      profileImage: z.string({
        invalid_type_error: 'Student Profile Image must be a string',
        required_error: 'Student Profile Image is required',
      }),
      academicDepartment: z.string({
        invalid_type_error: 'Student Academic Department must be a string',
        required_error: 'Student Academic Department is required',
      }),
      admissionSemester: z.string({
        invalid_type_error: 'Student Admission Semester must be a string',
        required_error: 'Student Admission Semester is required',
      }),
    }),
  }),
});

// --------------->> Update Name Validation Schema  <<------------ //
export const updateNameValidationSchema = z.object({
  firstName: z
    .string({
      invalid_type_error: 'First Name must be a string',
      required_error: 'First Name is required',
    })
    .max(20, 'First Name must be less then 20 characters')
    .optional(),
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
    .max(20, 'Last Name must be less then 20 characters')
    .optional(),
});

// --------------->> Update Parents Validation Schema  <<------------ //
export const updateParentsValidationSchema = z.object({
  fatherName: z
    .string({
      invalid_type_error: 'Father Name must be a string',
      required_error: 'Father Name is required',
    })
    .optional(),
  fatherOccupation: z
    .string({
      invalid_type_error: 'Father Occupation must be a string',
      required_error: 'Father Occupation is required',
    })
    .optional(),
  fatherContact: z
    .string({
      invalid_type_error: 'Father Contact must be a string',
      required_error: 'Father Contact is required',
    })
    .optional(),
  motherName: z
    .string({
      invalid_type_error: 'Mother Name must be a string',
      required_error: 'Mother Name is required',
    })
    .optional(),
  motherOccupation: z
    .string({
      invalid_type_error: 'Mother Occupation must be a string',
      required_error: 'Mother Occupation is required',
    })
    .optional(),
  motherContact: z
    .string({
      invalid_type_error: 'Mother Contact must be a string',
      required_error: 'Mother Contact is required',
    })
    .optional(),
});

// --------------->> Update Guardian Validation Schema  <<------------ //
export const updateGuardianValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Guardian Name must be a string',
      required_error: 'Guardian Name is required',
    })
    .optional(),
  occupation: z
    .string({
      invalid_type_error: 'Guardian Occupation must be a string',
      required_error: 'Guardian Occupation is required',
    })
    .optional(),
  contact: z
    .string({
      invalid_type_error: 'Guardian Contact must be a string',
      required_error: 'Guardian Contact is required',
    })
    .optional(),
  relation: z
    .string({
      invalid_type_error: 'Guardian Relation must be a string',
      required_error: 'Guardian Relation is required',
    })
    .optional(),
});

// --------------->> Update Student Validation Schema  <<------------ //
export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateNameValidationSchema,
      gender: z
        .enum(['male', 'female', 'other'], {
          invalid_type_error: 'Gender is not a valid',
          required_error: 'Gender is required',
        })
        .optional(),
      dateOfBirth: z.coerce
        .date({
          invalid_type_error: 'Student Date of Birth is invalid',
          required_error: 'Student Date of Birth is required',
        })
        .optional(),
      email: z
        .string({
          invalid_type_error: 'Student Email must be a string',
          required_error: 'Student Email is required',
        })
        .email('Invalid student email')
        .optional(),
      contractNo: z
        .string({
          invalid_type_error: 'Student Contract Number must be a string',
          required_error: 'Student Contract Number is required',
        })
        .optional(),
      emergencyContactNo: z
        .string({
          invalid_type_error:
            'Student Emergency Contact Number must be a string',
          required_error: 'Student Emergency Contact Number is required',
        })
        .optional(),
      presentAddress: z
        .string({
          invalid_type_error: 'Student Present Address must be a string',
          required_error: 'Student Present Address is required',
        })
        .optional(),
      permanentAddress: z
        .string({
          invalid_type_error: 'Student Permanent Address must be a string',
          required_error: 'Student Permanent Address is required',
        })
        .optional(),
      parents: updateParentsValidationSchema,
      guardian: updateGuardianValidationSchema,
      profileImage: z
        .string({
          invalid_type_error: 'Student Profile Image must be a string',
          required_error: 'Student Profile Image is required',
        })
        .optional(),
      academicDepartment: z
        .string({
          invalid_type_error: 'Student Academic Department must be a string',
          required_error: 'Student Academic Department is required',
        })
        .optional(),
      admissionSemester: z
        .string({
          invalid_type_error: 'Student Admission Semester must be a string',
          required_error: 'Student Admission Semester is required',
        })
        .optional(),
    }),
  }),
});
