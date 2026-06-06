import { Types } from 'mongoose';

export type TUserRole = 'ADMIN' | 'VA_COORDINATOR' | 'CARE_STAFF' | 'FAMILY_PORTAL';

export interface TUser {
  name: string;
  email: string;
  phone: string;
  password?: string;
  role: TUserRole;
  status: 'ACTIVE' | 'BLOCKED';
  careHomeId?: Types.ObjectId; // assigned care home for VA/Care Staff
  profileImage?: string;
  licenseDoc?: string; // for care staff
  academicDoc?: string; // for care staff
  age?: number; // for family portal signup
  emergencyContact?: string; // for family portal signup
  createdAt?: Date;
  updatedAt?: Date;
}
