import { Schema, model } from 'mongoose';
import { TInvoice } from './invoice.interface';

const invoiceSchema = new Schema<TInvoice>(
  {
    invoiceNo: { type: String, required: true, unique: true },
    issueDate: { type: Date, required: true, default: Date.now },
    dueDate: { type: Date, required: true },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true, lowercase: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    rates: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true, default: 0 },
    totalAmount: { type: Number, required: true },
    notes: { type: String },
    status: {
      type: String,
      enum: ['PAID', 'PENDING', 'OVERDUE'],
      default: 'PENDING',
    },
    residentId: { type: Schema.Types.ObjectId, ref: 'Resident' },
  },
  {
    timestamps: true,
  },
);

invoiceSchema.pre('validate', function (next) {
  if (this.quantity && this.rates) {
    this.subtotal = this.quantity * this.rates;
    this.tax = Number((this.subtotal * 0.10).toFixed(2)); // 10% tax rate
    this.totalAmount = Number((this.subtotal + this.tax).toFixed(2));
  }
  next();
});

export const Invoice = model<TInvoice>('Invoice', invoiceSchema);
