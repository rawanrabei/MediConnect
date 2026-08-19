import api from './api';

const buildQuery = (params = {}) => {
  const entries = Object.entries(params).filter(([, value]) => value != null && value !== '');
  if (!entries.length) return '';
  return `?${new URLSearchParams(entries).toString()}`;
};

export const appointmentService = {
  getAppointments: async (params) => {
    const response = await api.get(`/appointments${buildQuery(params)}`);
    return response.data;
  },
  getAppointmentById: async (id) => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },
  bookAppointment: async (data) => {
    const response = await api.post('/appointments', data);
    return response.data;
  },
  updateAppointmentStatus: async (id, status) => {
    const response = await api.patch(`/appointments/${id}`, { status });
    return response.data;
  },
};

export default appointmentService;
