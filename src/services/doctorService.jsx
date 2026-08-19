import api from './api';

const buildQuery = (params = {}) => {
  const entries = Object.entries(params).filter(([, value]) => value != null && value !== '');
  if (!entries.length) return '';
  return `?${new URLSearchParams(entries).toString()}`;
};

export const doctorService = {
  getDoctors: async (params) => {
    const response = await api.get(`/doctors${buildQuery(params)}`);
    return response.data;
  },
  getDoctorById: async (id) => {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  },
  updateDoctorProfile: async (id, data) => {
    const response = await api.patch(`/doctors/${id}`, data);
    return response.data;
  },
};

export default doctorService;
