import { Schema, model } from 'mongoose';
import { TCareHome } from './careHome.interface';

const careHomeSchema = new Schema<TCareHome>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    facilityTypes: {
      type: [String],
      enum: ['Assisted Living', 'Memory Care', 'Skilled Nursing', 'Independent Living', 'Continuing Care'],
      required: true,
    },
    licenseNo: { type: String, required: true },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'UNDER_MAINTENANCE'],
      default: 'ACTIVE',
    },
    phone: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    email: { type: String },
    manager: { type: String, required: true },
    totalCapacity: { type: Number, required: true, default: 0 },
    currentOccupancy: { type: Number, required: true, default: 0 },
    notes: { type: String },
  },
  {
    timestamps: true,
  },
);

export const CareHome = model<TCareHome>('CareHome', careHomeSchema);
