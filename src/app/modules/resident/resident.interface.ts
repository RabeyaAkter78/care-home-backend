import { Types } from 'mongoose';

export type TCareLevel = 'Standard' | 'Normal' | 'High' | 'Enhanced' | 'Skilled Nursing';
export type TResidentStatus = 'ACTIVE' | 'DISCHARGED';
export type TPaymentStatus = 'PAID' | 'PENDING' | 'OVERDUE';
export type TMobilityStatus = 'Independent' | 'Care assistance' | 'Wheelchair' | 'bedridden';

export interface TVitalSign {
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  saturation: number;
  notes?: string;
  recordedBy: Types.ObjectId;
  recordedAt: Date;
}

export interface TResident {
  name: string;
  email?: string;
  phone: string;
  emergencyContact: string;
  age: number;
  roomId?: Types.ObjectId;
  bedId?: Types.ObjectId;
  careHomeId: Types.ObjectId;
  careLevel: TCareLevel;
  status: TResidentStatus;
  admittedDate: Date;
  paymentStatus: TPaymentStatus;
  lastPaymentDate?: Date;
  monthlyPaymentAmount: number;
  assignedCareStaffId?: Types.ObjectId;
  assignedCoordinatorId?: Types.ObjectId;
  medicalDocuments?: string[];
  allergies: string;
  medications: string;
  lastCheckup?: Date;
  physician?: string;
  mobilityStatus: TMobilityStatus;
  dietary?: string;
  applicationId?: Types.ObjectId;
  vitalSigns?: TVitalSign[];
}
