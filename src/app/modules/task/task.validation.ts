import { z } from 'zod';

const createTaskValidationSchema = z.object({
  body: z.object({
    taskName: z.string({ required_error: 'Task Name is required' }),
    taskType: z.enum(['Medication', 'Vital Sign', 'Meals & nutrition', 'Activities', 'Rounds & checks']),
    priority: z.enum(['High', 'Medium', 'Low']),
    scheduledTime: z.string({ required_error: 'Scheduled time is required' }),
    residentId: z.string({ required_error: 'Resident ID is required' }),
    careStaffId: z.string({ required_error: 'Care Staff ID is required' }),
    careHomeId: z.string().optional(),
    roomId: z.string().optional(),
    bedId: z.string().optional(),
    notes: z.string().optional(),
  }),
});

const updateTaskStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(['COMPLETED', 'INCOMPLETED']),
  }),
});

export const TaskValidations = {
  createTaskValidationSchema,
  updateTaskStatusValidationSchema,
};
