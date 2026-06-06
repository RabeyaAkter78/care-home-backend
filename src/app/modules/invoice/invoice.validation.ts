import { z } from 'zod';

const createInvoiceValidationSchema = z.object({
  body: z.object({
    invoiceNo: z.string({ required_error: 'Invoice number is required' }),
    dueDate: z.string({ required_error: 'Due date is required' }),
    clientName: z.string({ required_error: 'Client name is required' }),
    clientEmail: z.string().email({ message: 'Invalid client email' }),
    description: z.string({ required_error: 'Description is required' }),
    quantity: z.number().min(1).optional(),
    rates: z.number({ required_error: 'Rate is required' }),
    notes: z.string().optional(),
    residentId: z.string().optional(),
  }),
});

const updateInvoiceStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(['PAID', 'PENDING', 'OVERDUE']),
  }),
});

export const InvoiceValidations = {
  createInvoiceValidationSchema,
  updateInvoiceStatusValidationSchema,
};
