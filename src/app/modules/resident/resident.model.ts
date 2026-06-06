import { Schema, model } from 'mongoose';
import { TResident } from './resident.interface';

const vitalSignsSchema = new Schema({
  bloodPressure: { type: String, required: true },
  heartRate: { type: Number, required: true },
  temperature: { type: Number, required: true },
  saturation: { type: Number, required: true },
  notes: { type: String },
  recordedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recordedAt: { type: Date, required: true, default: Date.now },
});

const residentSchema = new Schema<TResident>(
  {
    name: { type: String, required: true },
    email: { type: String, lowercase: true },
    phone: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    age: { type: Number, required: true },
    roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
    bedId: { type: Schema.Types.ObjectId, ref: 'Bed' },
    careHomeId: { type: Schema.Types.ObjectId, ref: 'CareHome', required: true },
    careLevel: {
      type: String,
      enum: ['Standard', 'Normal', 'High', 'Enhanced', 'Skilled Nursing'],
      default: 'Standard',
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'DISCHARGED'],
      default: 'ACTIVE',
    },
    admittedDate: { type: Date, required: true, default: Date.now },
    paymentStatus: {
      type: String,
      enum: ['PAID', 'PENDING', 'OVERDUE'],
      default: 'PENDING',
    },
    lastPaymentDate: { type: Date },
    monthlyPaymentAmount: { type: Number, required: true, default: 0 },
    assignedCareStaffId: { type: Schema.Types.ObjectId, ref: 'User' },
    assignedCoordinatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    medicalDocuments: { type: [String], default: [] },
    allergies: { type: String, required: true },
    medications: { type: String, required: true },
    lastCheckup: { type: Date },
    physician: { type: String },
    mobilityStatus: {
      type: String,
      enum: ['Independent', 'Care assistance', 'Wheelchair', 'bedridden'],
      required: true,
    },
    dietary: { type: String },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application' },
    vitalSigns: { type: [vitalSignsSchema], default: [] },
  },
  {
    timestamps: true,
  },
);

export const Resident = model<TResident>('Resident', residentSchema);
