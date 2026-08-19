export const MOCK_ADMIN = {
  id: 'admin-1',
  name: 'Platform Admin',
  email: 'admin@mediconnect.com',
  role: 'admin',
  createdAt: '2026-01-15T10:00:00.000Z',
};

export const USER_STATUSES = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
};

export const DOCTOR_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  SUSPENDED: 'suspended',
};

export const DEFAULT_DOCTOR_STATUS = DOCTOR_STATUSES.APPROVED;

// Demo: last two doctors start as pending for approval workflow
export const DEFAULT_PENDING_DOCTOR_IDS = [15, 16];
