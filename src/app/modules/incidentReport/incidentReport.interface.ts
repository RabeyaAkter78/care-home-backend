import { Types } from 'mongoose';

export type TSeverityLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface TIncidentReport {
  dateTime: Date;
  type: string;
  residentId: Types.ObjectId;
  severityLevel: TSeverityLevel;
  reportedBy: Types.ObjectId;
  witnesses: string[];
  description: string;
  immediateActionTaken: string;
}
