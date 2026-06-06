import { z } from 'zod';

const createRoomValidationSchema = z.object({
  body: z.object({
    roomNo: z.string({ required_error: 'Room Number is required' }),
    floorNo: z.number({ required_error: 'Floor Number is required' }),
    notes: z.string().optional(),
    bedsCount: z.number({ required_error: 'Number of beds is required' }),
    bedTypes: z.enum(['Single', 'Double', 'Triple', 'Quad'], {
      required_error: 'Bed Type is required',
    }),
    roomFeatures: z.array(
      z.enum([
        'Private Bathroom',
        'Emergency Call System',
        'Window View',
        'Airconditioning',
        'Mini Refrigerator',
        'TV',
        'Wifi',
      ]),
      { required_error: 'Room features are required' },
    ),
    roomType: z.enum(['Standard', 'Deluxe', 'Suite', 'Accessible'], {
      required_error: 'Room Type is required',
    }),
    careHomeId: z.string({ required_error: 'Care Home ID is required' }),
  }),
});

const updateRoomValidationSchema = z.object({
  body: z.object({
    roomNo: z.string().optional(),
    floorNo: z.number().optional(),
    notes: z.string().optional(),
    bedsCount: z.number().optional(),
    bedTypes: z.enum(['Single', 'Double', 'Triple', 'Quad']).optional(),
    roomFeatures: z
      .array(
        z.enum([
          'Private Bathroom',
          'Emergency Call System',
          'Window View',
          'Airconditioning',
          'Mini Refrigerator',
          'TV',
          'Wifi',
        ]),
      )
      .optional(),
    roomType: z.enum(['Standard', 'Deluxe', 'Suite', 'Accessible']).optional(),
    careHomeId: z.string().optional(),
  }),
});

const createBedValidationSchema = z.object({
  body: z.object({
    bedNo: z.string({ required_error: 'Bed Number is required' }),
    roomId: z.string({ required_error: 'Room ID is required' }),
    careHomeId: z.string({ required_error: 'Care Home ID is required' }),
    status: z.enum(['AVAILABLE', 'OCCUPIED', 'RESERVED', 'MAINTENANCE']).optional(),
    monthlyRate: z.number().optional(),
    bedFeatures: z.array(z.string()).optional(),
  }),
});

const updateBedValidationSchema = z.object({
  body: z.object({
    status: z.enum(['AVAILABLE', 'OCCUPIED', 'RESERVED', 'MAINTENANCE']).optional(),
    residentId: z.string().optional(),
    monthlyRate: z.number().optional(),
    moveInDate: z.string().datetime().optional(),
    assignmentNotes: z.string().optional(),
  }),
});

export const RoomValidations = {
  createRoomValidationSchema,
  updateRoomValidationSchema,
  createBedValidationSchema,
  updateBedValidationSchema,
};
