import { Types } from 'mongoose';

export interface TAdlDailyTarget {
  dressing?: string;
  toileting?: string;
  mobility?: string;
  eating?: string;
  bathing?: string;
}

export interface TCarePlanMedication {
  medicineName: string;
  timeFrequency: string;
  instruction?: string;
}

export interface TCarePlanMedicalCondition {
  conditionName: string;
  actionRequired?: string;
}

export interface TCarePlan {
  residentId: Types.ObjectId;
  hydrationDietTarget?: string;
  hydrationDietInstructions?: string;
  adlSupportInstructions?: string;
  adlDailyTarget?: TAdlDailyTarget;
  restrictions?: string;
  medications?: TCarePlanMedication[];
  medicalConditions?: TCarePlanMedicalCondition[];
  notes?: string;
}
