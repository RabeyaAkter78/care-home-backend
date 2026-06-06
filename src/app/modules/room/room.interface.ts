import { Types } from 'mongoose';

export type TBedType = 'Single' | 'Double' | 'Triple' | 'Quad';
export type TRoomFeature =
  | 'Private Bathroom'
  | 'Emergency Call System'
  | 'Window View'
  | 'Airconditioning'
  | 'Mini Refrigerator'
  | 'TV'
  | 'Wifi';

export type TRoomType = 'Standard' | 'Deluxe' | 'Suite' | 'Accessible';

export interface TRoom {
  roomNo: string;
  floorNo: number;
  notes?: string;
  bedsCount: number;
  bedTypes: TBedType;
  roomFeatures: TRoomFeature[];
  roomType: TRoomType;
  careHomeId: Types.ObjectId;
}

export type TBedStatus = 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'MAINTENANCE';

export interface TBed {
  bedNo: string;
  roomId: Types.ObjectId;
  careHomeId: Types.ObjectId;
  status: TBedStatus;
  residentId?: Types.ObjectId;
  monthlyRate?: number;
  moveInDate?: Date;
  assignmentNotes?: string;
  bedFeatures?: string[];
}
