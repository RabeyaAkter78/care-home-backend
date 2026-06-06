import { z } from 'zod';

const createCareHomeValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Care Home Name is required' }),
    address: z.string({ required_error: 'Address is required' }),
    facilityTypes: z.array(
      z.enum(['Assisted Living', 'Memory Care', 'Skilled Nursing', 'Independent Living', 'Continuing Care']),
      { required_error: 'Facility Types are required' },
    ),
    licenseNo: z.string({ required_error: 'License No is required' }),
    status: z.enum(['ACTIVE', 'INACTIVE', 'UNDER_MAINTENANCE']).optional(),
    phone: z.string({ required_error: 'Phone No is required' }),
    emergencyContact: z.string({ required_error: 'Emergency contact is required' }),
    email: z.string().email().optional(),
    manager: z.string({ required_error: 'Manager name/ID is required' }),
    totalCapacity: z.number({ required_error: 'Total capacity is required' }),
    notes: z.string().optional(),
  }),
});

const updateCareHomeValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    facilityTypes: z
      .array(z.enum(['Assisted Living', 'Memory Care', 'Skilled Nursing', 'Independent Living', 'Continuing Care']))
      .optional(),
    licenseNo: z.string().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'UNDER_MAINTENANCE']).optional(),
    phone: z.string().optional(),
    emergencyContact: z.string().optional(),
    email: z.string().email().optional(),
    manager: z.string().optional(),
    totalCapacity: z.number().optional(),
    notes: z.string().optional(),
  }),
});

export const CareHomeValidations = {
  createCareHomeValidationSchema,
  updateCareHomeValidationSchema,
};
