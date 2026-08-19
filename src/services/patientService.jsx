import api from './api';

export const patientService = {
  getPatients: async (params) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/patients?${queryString}`);
    return response.data;
  },
  getPatientById: async (id) => {
    const response = await api.get(`/patients/${id}`);
    return response.data;
  },
  updatePatientProfile: async (id, data) => {
    const response = await api.put(`/patients/${id}`, data);
    return response.data;
  },
  getPatientAppointments: async (id) => {
    const response = await api.get(`/patients/${id}/appointments`);
    return response.data;
  },
  addFavoriteDoctor: async (patientId, doctorId) => {
    const response = await api.post(`/patients/${patientId}/favorites`, { doctorId });
    return response.data;
  },
  removeFavoriteDoctor: async (patientId, doctorId) => {
    const response = await api.delete(`/patients/${patientId}/favorites/${doctorId}`);
    return response.data;
  },
};

export default patientService;
