import { z } from 'zod';

const createCarePlanValidationSchema = z.object({
  body: z.object({
    residentId: z.string({ required_error: 'Resident ID is required' }),
    hydrationDietTarget: z.string().optional(),
    hydrationDietInstructions: z.string().optional(),
    adlSupportInstructions: z.string().optional(),
    adlDailyTarget: z
      .object({
        dressing: z.string().optional(),
        toileting: z.string().optional(),
        mobility: z.string().optional(),
        eating: z.string().optional(),
        bathing: z.string().optional(),
      })
      .optional(),
    restrictions: z.string().optional(),
    medications: z
      .array(
        z.object({
          medicineName: z.string(),
          timeFrequency: z.string(),
          instruction: z.string().optional(),
        }),
      )
      .optional(),
    medicalConditions: z
      .array(
        z.object({
          conditionName: z.string(),
          actionRequired: z.string().optional(),
        }),
      )
      .optional(),
    notes: z.string().optional(),
  }),
});

const updateCarePlanValidationSchema = z.object({
  body: z.object({
    hydrationDietTarget: z.string().optional(),
    hydrationDietInstructions: z.string().optional(),
    adlSupportInstructions: z.string().optional(),
    adlDailyTarget: z
      .object({
        dressing: z.string().optional(),
        toileting: z.string().optional(),
        mobility: z.string().optional(),
        eating: z.string().optional(),
        bathing: z.string().optional(),
      })
      .optional(),
    restrictions: z.string().optional(),
    medications: z
      .array(
        z.object({
          medicineName: z.string(),
          timeFrequency: z.string(),
          instruction: z.string().optional(),
        }),
      )
      .optional(),
    medicalConditions: z
      .array(
        z.object({
          conditionName: z.string(),
          actionRequired: z.string().optional(),
        }),
      )
      .optional(),
    notes: z.string().optional(),
  }),
});

export const CarePlanValidations = {
  createCarePlanValidationSchema,
  updateCarePlanValidationSchema,
};
