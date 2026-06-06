export type TFacilityType =
  | 'Assisted Living'
  | 'Memory Care'
  | 'Skilled Nursing'
  | 'Independent Living'
  | 'Continuing Care';

export interface TCareHome {
  name: string;
  address: string;
  facilityTypes: TFacilityType[];
  licenseNo: string;
  status: 'ACTIVE' | 'INACTIVE' | 'UNDER_MAINTENANCE';
  phone: string;
  emergencyContact: string;
  email?: string;
  manager: string; // name or id
  totalCapacity: number;
  currentOccupancy: number;
  notes?: string;
}
