export const USER_ROLE = {
  ADMIN: 'ADMIN',
  VA_COORDINATOR: 'VA_COORDINATOR',
  CARE_STAFF: 'CARE_STAFF',
  FAMILY_PORTAL: 'FAMILY_PORTAL',
} as const;

export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  BLOCKED: 'BLOCKED',
} as const;

export const UserSearchableFields = ['name', 'email', 'phone'];
