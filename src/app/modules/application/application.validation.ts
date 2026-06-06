import { z } from 'zod';

const createApplicationValidationSchema = z.object({
  body: z.object({
    applicantInfo: z.object({
      name: z.string({ required_error: 'Applicant name is required' }),
      email: z.string().email({ message: 'Invalid email' }),
      phone: z.string({ required_error: 'Phone is required' }),
      emergencyContact: z.string({ required_error: 'Emergency Contact is required' }),
      gender: z.string({ required_error: 'Gender is required' }),
      age: z.number({ required_error: 'Age is required' }),
      address: z.string({ required_error: 'Address is required' }),
      dateOfBirth: z.string({ required_error: 'Date of birth is required' }),
      ssn: z.string({ required_error: 'SSN is required' }),
    }),
    medicalInfo: z.object({
      primaryPhysician: z.string().optional(),
      medicalCondition: z.string({ required_error: 'Medical condition is required' }),
      medications: z.string({ required_error: 'Medications details are required' }),
      allergies: z.string({ required_error: 'Allergies are required' }),
      mobilityLevel: z.enum(['Independent', 'Care assistance', 'Wheelchair', 'bedridden']),
    }),
    carePreference: z.object({
      desiredCareLevel: z.enum(['Standard care', 'Enhanced Care', 'Skilled Nursing']),
      preferredCareHomeId: z.string({ required_error: 'Preferred Care Home ID is required' }),
      roomPreference: z.enum(['Private Room', 'Standard', 'Deluxe', 'Suite', 'Accessible']),
      dietaryRequirements: z.string().optional(),
      specialCareNeeds: z.string().optional(),
    }),
    moveInDate: z.string({ required_error: 'Move in date is required' }),
    medicalReportsDoc: z.string().optional(),
    medicationListDoc: z.string().optional(),
  }),
});

const updateApplicationStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'DOCUMENT_REQUIRED']),
    assignedCoordinatorId: z.string().optional(),
    requestedDocuments: z
      .array(
        z.object({
          documentName: z.string(),
          message: z.string(),
        }),
      )
      .optional(),
  }),
});

export const ApplicationValidations = {
  createApplicationValidationSchema,
  updateApplicationStatusValidationSchema,
};
