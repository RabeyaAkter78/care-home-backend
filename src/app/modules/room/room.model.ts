import { Schema, model } from 'mongoose';
import { TRoom, TBed } from './room.interface';

const roomSchema = new Schema<TRoom>(
  {
    roomNo: { type: String, required: true },
    floorNo: { type: Number, required: true },
    notes: { type: String },
    bedsCount: { type: Number, required: true, default: 1 },
    bedTypes: {
      type: String,
      enum: ['Single', 'Double', 'Triple', 'Quad'],
      required: true,
    },
    roomFeatures: {
      type: [String],
      enum: [
        'Private Bathroom',
        'Emergency Call System',
        'Window View',
        'Airconditioning',
        'Mini Refrigerator',
        'TV',
        'Wifi',
      ],
      required: true,
    },
    roomType: {
      type: String,
      enum: ['Standard', 'Deluxe', 'Suite', 'Accessible'],
      required: true,
    },
    careHomeId: { type: Schema.Types.ObjectId, ref: 'CareHome', required: true },
  },
  {
    timestamps: true,
  },
);

const bedSchema = new Schema<TBed>(
  {
    bedNo: { type: String, required: true },
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    careHomeId: { type: Schema.Types.ObjectId, ref: 'CareHome', required: true },
    status: {
      type: String,
      enum: ['AVAILABLE', 'OCCUPIED', 'RESERVED', 'MAINTENANCE'],
      default: 'AVAILABLE',
    },
    residentId: { type: Schema.Types.ObjectId, ref: 'Resident' },
    monthlyRate: { type: Number },
    moveInDate: { type: Date },
    assignmentNotes: { type: String },
    bedFeatures: { type: [String] },
  },
  {
    timestamps: true,
  },
);

export const Room = model<TRoom>('Room', roomSchema);
export const Bed = model<TBed>('Bed', bedSchema);
