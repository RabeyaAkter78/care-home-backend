import { z } from 'zod';

const createIncidentReportValidationSchema = z.object({
  body: z.object({
    dateTime: z.string().datetime().optional(),
    type: z.string({ required_error: 'Incident type is required' }),
    residentId: z.string({ required_error: 'Resident ID is required' }),
    severityLevel: z.enum(['Low', 'Medium', 'High', 'Critical']),
    witnesses: z.array(z.string()).optional(),
    description: z.string({ required_error: 'Incident description is required' }),
    immediateActionTaken: z.string({ required_error: 'Immediate action taken description is required' }),
  }),
});

export const IncidentReportValidations = {
  createIncidentReportValidationSchema,
};
