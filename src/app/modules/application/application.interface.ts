import { Types } from 'mongoose';

export interface TApplicantInfo {
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;
  gender: string;
  age: number;
  address: string;
  dateOfBirth: string;
  ssn: string;
}

export interface TMedicalInfo {
  primaryPhysician?: string;
  medicalCondition: string;
  medications: string;
  allergies: string;
  mobilityLevel: 'Independent' | 'Care assistance' | 'Wheelchair' | 'bedridden';
}

export interface TCarePreference {
  desiredCareLevel: 'Standard care' | 'Enhanced Care' | 'Skilled Nursing';
  preferredCareHomeId: Types.ObjectId;
  roomPreference: 'Private Room' | 'Standard' | 'Deluxe' | 'Suite' | 'Accessible';
  dietaryRequirements?: string;
  specialCareNeeds?: string;
}

export type TApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'DOCUMENT_REQUIRED';

export interface TApplication {
  applicantInfo: TApplicantInfo;
  medicalInfo: TMedicalInfo;
  carePreference: TCarePreference;
  moveInDate: Date;
  medicalReportsDoc?: string;
  medicationListDoc?: string;
  status: TApplicationStatus;
  submitterId?: Types.ObjectId; // Family Portal user
  assignedCoordinatorId?: Types.ObjectId; // VA Coordinator
  requestedDocuments?: {
    documentName: string;
    message: string;
  }[];
}
