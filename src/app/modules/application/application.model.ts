import { Schema, model } from 'mongoose';
import { TApplication } from './application.interface';

const applicantInfoSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  ssn: { type: String, required: true },
});

const medicalInfoSchema = new Schema({
  primaryPhysician: { type: String },
  medicalCondition: { type: String, required: true },
  medications: { type: String, required: true },
  allergies: { type: String, required: true },
  mobilityLevel: {
    type: String,
    enum: ['Independent', 'Care assistance', 'Wheelchair', 'bedridden'],
    required: true,
  },
});

const carePreferenceSchema = new Schema({
  desiredCareLevel: {
    type: String,
    enum: ['Standard care', 'Enhanced Care', 'Skilled Nursing'],
    required: true,
  },
  preferredCareHomeId: { type: Schema.Types.ObjectId, ref: 'CareHome', required: true },
  roomPreference: {
    type: String,
    enum: ['Private Room', 'Standard', 'Deluxe', 'Suite', 'Accessible'],
    required: true,
  },
  dietaryRequirements: { type: String },
  specialCareNeeds: { type: String },
});

const applicationSchema = new Schema<TApplication>(
  {
    applicantInfo: { type: applicantInfoSchema, required: true },
    medicalInfo: { type: medicalInfoSchema, required: true },
    carePreference: { type: carePreferenceSchema, required: true },
    moveInDate: { type: Date, required: true },
    medicalReportsDoc: { type: String },
    medicationListDoc: { type: String },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED', 'DOCUMENT_REQUIRED'],
      default: 'PENDING',
    },
    submitterId: { type: Schema.Types.ObjectId, ref: 'User' },
    assignedCoordinatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    requestedDocuments: [
      {
        documentName: { type: String },
        message: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Application = model<TApplication>('Application', applicationSchema);
