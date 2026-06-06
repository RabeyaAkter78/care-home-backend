import { Types } from 'mongoose';

export type TTaskType = 'Medication' | 'Vital Sign' | 'Meals & nutrition' | 'Activities' | 'Rounds & checks';
export type TTaskPriority = 'High' | 'Medium' | 'Low';
export type TTaskStatus = 'COMPLETED' | 'INCOMPLETED';

export interface TTask {
  taskName: string;
  taskType: TTaskType;
  priority: TTaskPriority;
  scheduledTime: Date | string; // scheduled time / frequency
  residentId: Types.ObjectId;
  careStaffId: Types.ObjectId;
  careHomeId?: Types.ObjectId;
  roomId?: Types.ObjectId;
  bedId?: Types.ObjectId;
  notes?: string;
  status: TTaskStatus;
  completedAt?: Date;
}
