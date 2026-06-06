import { Schema, model } from 'mongoose';
import { TIncidentReport } from './incidentReport.interface';

const incidentReportSchema = new Schema<TIncidentReport>(
  {
    dateTime: { type: Date, required: true, default: Date.now },
    type: { type: String, required: true },
    residentId: { type: Schema.Types.ObjectId, ref: 'Resident', required: true },
    severityLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      required: true,
    },
    reportedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    witnesses: { type: [String], default: [] },
    description: { type: String, required: true },
    immediateActionTaken: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const IncidentReport = model<TIncidentReport>('IncidentReport', incidentReportSchema);
