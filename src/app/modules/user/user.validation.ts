import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string({ required_error: 'Phone number is required' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    role: z.enum(['ADMIN', 'VA_COORDINATOR', 'CARE_STAFF', 'FAMILY_PORTAL']),
    careHomeId: z.string().optional(),
    age: z.number().optional(),
    emergencyContact: z.string().optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    profileImage: z.string().optional(),
    licenseDoc: z.string().optional(),
    academicDoc: z.string().optional(),
    status: z.enum(['ACTIVE', 'BLOCKED']).optional(),
    careHomeId: z.string().optional(),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is required' }),
    newPassword: z.string().min(6, { message: 'New password must be at least 6 characters' }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
  changePasswordValidationSchema,
  loginValidationSchema,
};
