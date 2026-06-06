import { z } from 'zod';

const sendMessageValidationSchema = z.object({
  body: z.object({
    receiverId: z.string({ required_error: 'Receiver ID is required' }),
    content: z.string({ required_error: 'Message content cannot be empty' }),
  }),
});

export const MessageValidations = {
  sendMessageValidationSchema,
};
