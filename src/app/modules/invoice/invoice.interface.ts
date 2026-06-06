import { Types } from 'mongoose';

export type TInvoiceStatus = 'PAID' | 'PENDING' | 'OVERDUE';

export interface TInvoice {
  invoiceNo: string;
  issueDate: Date;
  dueDate: Date;
  clientName: string;
  clientEmail: string;
  description: string;
  quantity: number;
  rates: number;
  subtotal: number;
  tax: number;
  totalAmount: number;
  notes?: string;
  status: TInvoiceStatus;
  residentId?: Types.ObjectId;
}
