import { Schema, model } from 'mongoose';
import { TTask } from './task.interface';

const taskSchema = new Schema<TTask>(
  {
    taskName: { type: String, required: true },
    taskType: {
      type: String,
      enum: ['Medication', 'Vital Sign', 'Meals & nutrition', 'Activities', 'Rounds & checks'],
      required: true,
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      required: true,
    },
    scheduledTime: { type: Schema.Types.Mixed, required: true },
    residentId: { type: Schema.Types.ObjectId, ref: 'Resident', required: true },
    careStaffId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    careHomeId: { type: Schema.Types.ObjectId, ref: 'CareHome' },
    roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
    bedId: { type: Schema.Types.ObjectId, ref: 'Bed' },
    notes: { type: String },
    status: {
      type: String,
      enum: ['COMPLETED', 'INCOMPLETED'],
      default: 'INCOMPLETED',
    },
    completedAt: { type: Date },
  },
  {
    timestamps: true,
  },
);

export const Task = model<TTask>('Task', taskSchema);
