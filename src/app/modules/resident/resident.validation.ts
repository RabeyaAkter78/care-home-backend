import { z } from 'zod';

const createResidentValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Resident name is required' }),
    email: z.string().email().optional(),
    phone: z.string({ required_error: 'Phone is required' }),
    emergencyContact: z.string({ required_error: 'Emergency Contact is required' }),
    age: z.number({ required_error: 'Age is required' }),
    roomId: z.string().optional(),
    bedId: z.string().optional(),
    careHomeId: z.string({ required_error: 'Care Home ID is required' }),
    careLevel: z.enum(['Standard', 'Normal', 'High', 'Enhanced', 'Skilled Nursing']).optional(),
    status: z.enum(['ACTIVE', 'DISCHARGED']).optional(),
    admittedDate: z.string().datetime().optional(),
    paymentStatus: z.enum(['PAID', 'PENDING', 'OVERDUE']).optional(),
    monthlyPaymentAmount: z.number({ required_error: 'Monthly payment amount is required' }),
    assignedCareStaffId: z.string().optional(),
    assignedCoordinatorId: z.string().optional(),
    medicalDocuments: z.array(z.string()).optional(),
    allergies: z.string({ required_error: 'Allergies info is required' }),
    medications: z.string({ required_error: 'Medication list is required' }),
    lastCheckup: z.string().datetime().optional(),
    physician: z.string().optional(),
    mobilityStatus: z.enum(['Independent', 'Care assistance', 'Wheelchair', 'bedridden']),
    dietary: z.string().optional(),
    applicationId: z.string().optional(),
  }),
});

const updateResidentValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    emergencyContact: z.string().optional(),
    age: z.number().optional(),
    roomId: z.string().optional(),
    bedId: z.string().optional(),
    careHomeId: z.string().optional(),
    careLevel: z.enum(['Standard', 'Normal', 'High', 'Enhanced', 'Skilled Nursing']).optional(),
    status: z.enum(['ACTIVE', 'DISCHARGED']).optional(),
    paymentStatus: z.enum(['PAID', 'PENDING', 'OVERDUE']).optional(),
    monthlyPaymentAmount: z.number().optional(),
    assignedCareStaffId: z.string().optional(),
    assignedCoordinatorId: z.string().optional(),
    medicalDocuments: z.array(z.string()).optional(),
    allergies: z.string().optional(),
    medications: z.string().optional(),
    lastCheckup: z.string().datetime().optional(),
    physician: z.string().optional(),
    mobilityStatus: z.enum(['Independent', 'Care assistance', 'Wheelchair', 'bedridden']).optional(),
    dietary: z.string().optional(),
  }),
});

// Zod schema for vital signs validation
const addVitalSignsValidationSchema = z.object({
  body: z.object({
    bloodPressure: z.string({ required_error: 'Blood pressure is required' }),
    heartRate: z.number({ required_error: 'Heart rate is required' }),
    temperature: z.number({ required_error: 'Temperature is required' }),
    saturation: z.number({ required_error: 'Oxygen saturation is required' }),
    notes: z.string().optional(),
  }),
});

export const ResidentValidations = {
  createResidentValidationSchema,
  updateResidentValidationSchema,
  addVitalSignsValidationSchema,
};
