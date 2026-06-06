import { Schema, model } from 'mongoose';
import { TCarePlan } from './carePlan.interface';

const adlDailyTargetSchema = new Schema({
  dressing: { type: String },
  toileting: { type: String },
  mobility: { type: String },
  eating: { type: String },
  bathing: { type: String },
});

const carePlanMedicationSchema = new Schema({
  medicineName: { type: String, required: true },
  timeFrequency: { type: String, required: true },
  instruction: { type: String },
});

const carePlanMedicalConditionSchema = new Schema({
  conditionName: { type: String, required: true },
  actionRequired: { type: String },
});

const carePlanSchema = new Schema<TCarePlan>(
  {
    residentId: { type: Schema.Types.ObjectId, ref: 'Resident', required: true, unique: true },
    hydrationDietTarget: { type: String },
    hydrationDietInstructions: { type: String },
    adlSupportInstructions: { type: String },
    adlDailyTarget: { type: adlDailyTargetSchema },
    restrictions: { type: String },
    medications: { type: [carePlanMedicationSchema], default: [] },
    medicalConditions: { type: [carePlanMedicalConditionSchema], default: [] },
    notes: { type: String },
  },
  {
    timestamps: true,
  },
);

export const CarePlan = model<TCarePlan>('CarePlan', carePlanSchema);
